/** * Resize page items by style * @version 1.0.1  * @author Tim McLaren
 * @todo Implement a solution for absolutely adjusting objects in only one direction */#targetengine "session";/** * Get first instance of ancestor object of another object */var getAncestor = function(p_object, p_ancestor) {	var parent = p_object.parent;		while(parent.constructor != p_ancestor && parent.constructor != Application) {		parent = parent.parent;	}		if(parent.constructor === Application && p_ancestor !== Application) {		return false;	} else {		return parent;	}	};/** * Get ruler unit type of view preferences measurement units of the orientation passed as an 
 * argument */var getRulerUnit = function(p_viewPreferences, p_orientation) {		var units;			if(p_orientation == 'horizontal') {		units = p_viewPreferences.horizontalMeasurementUnits;	} else {		units = p_viewPreferences.verticalMeasurementUnits;	}		switch (units) {		case 2051106676: 			return 'ag';		case 2053336435: 			return 'cm';		case 2053335395: 			return 'c';		case 2053729891: 			return 'in';		case 2053729892: 			return 'in';		case 2053991795: 			return 'mm';		case 2054187363: 			return 'p';		case 2054188905: 			return 'pt';			}	};/** * Get page items in document with the same object style as page item argument */var getPageItemByObjectStyle = function(p_pageItem) {		var objectStyle,		document,		pageItems,		pageItem,		i = 0,		leng,		matches = [];		objectStyle = p_pageItem.appliedObjectStyle;		document = getAncestor(objectStyle, Document);		pageItems = document.allPageItems;		for(leng = pageItems.length; i < leng; i++) {				pageItem = pageItems[i];				if(pageItem.appliedObjectStyle === objectStyle) {						matches.push(pageItem);					}			}		return matches;	};/** * Get width and height of a page item */var getPageItemSize = function(p_item) {			var bounds = p_item.geometricBounds,		width = bounds[3] - bounds[1],		height = bounds[2] - bounds[0];		return [width, height];	};/** * Set the size of a page item relatively or absolutely depending on the relative argument passed */var setPageItemSize = function(p_pageItem, p_measurements, p_relative) {		var method,		i = 0,		unitValue,		document = getAncestor(p_pageItem, Document),		directions = ['horizontal', 'vertical'],		points = [];		if(p_relative) {		method = ResizeMethods.ADDING_CURRENT_DIMENSIONS_TO;	} else {		method = ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH;	}		for(; i < 2; i++) {				unitValue = getUnitValue(p_measurements[i], getRulerUnit(document.viewPreferences, directions[i]));				points[i] = unitValue.as('pt');			}	
	try {		p_pageItem.resize(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, method, points);
		return true;
	} catch(p_error) {
		return false;
	}	};/** * Attempt to create an Adobe UnitValue object from value with an option of a fallback unit type 
 * where value passed is a number without appended unit type
 * @todo Implement better solution for managing unit types unsupported by the UnitValue object */var getUnitValue = function(p_value, p_fallbackUnit) {		var pattern = /^ *([\-+]?(?:\d+(?:\.\d*)?|\.\d+)) ?(\w+)* *$/,		string = p_value + '',		match = string.match(pattern),		unitType,		unitValue;			if(match) {				if(match[2]) {			unitType = match[2];		} else {			unitType = p_fallbackUnit;		}		
		try {			unitValue = UnitValue(match[1], unitType);
		} catch (p_error) {
			// Catch unsuported unit value types like picas and ciceros
			unitValue = UnitValue(match[1], 'pt');
		}				if(unitValue.type !== '?') {			return unitValue;		}			}		return false;	};/** * Make user interface using ScriptUI layout engine returning object literal containing references 
 * to key interface elements for hooking on to */var layoutInterface = function(p_message) {		var palette,		group,		radiosRelative,		radiosAbsolute,		staticText,		widthEditText,		heightEditText,		resizeButton;		palette = new Window('palette', p_message);	palette.alignChildren = ['', 'center'];		group = palette.add('group');			group = group.add('panel');			group.alignChildren = ['left', 'center'];				radiosRelative = group.add('radiobutton', undefined, 'Relative');				radiosAbsolute = group.add('radiobutton', undefined, 'Absolute');		group = group.parent;			group = group.add('group');			group.orientation = 'column';			group.alignChildren = ['right', 'center'];				group = group.add('group');					staticText = group.add('statictext');					staticText.text = 'Width:';					widthEditText = group.add('edittext');					widthEditText.characters = 10;			group = group.parent;				group = group.add('group');					staticText = group.add('statictext');					staticText.text = 'Height:';					heightEditText = group.add('edittext');					heightEditText.characters = 10;		resizeButton = palette.add('button', undefined, 'Resize', {name: 'ok'});		return {		palette: palette,		radios: {			relative: radiosRelative,			absolute: radiosAbsolute		},		editTexts: {			width: widthEditText,			height: heightEditText		},		resizeButton: resizeButton	};	};/** * Event listener for when palette show event that initialises the user interface elements */var paletteShow = function(p_editTexts, p_radios) {		p_radios.relative.value = true;	radioClick(p_editTexts, p_radios);	p_editTexts.width.active = true;	};/** * Event listener for edit text defocusing event that updates the text in the edit text element to a
 * valid measurement that reflects the measurement unit type of the active document or application */var editTextBlur = function(p_editText, p_orientation) {		var text = p_editText.text,
		viewPreferences,
		direction,
		unitValue;	
	if (app.documents.length) {
		viewPreferences = app.activeDocument.viewPreferences;
	} else {
		viewPreferences = app.viewPreferences;
	}
	
	unitValue = getUnitValue(text, getRulerUnit(viewPreferences, p_orientation));
		if (unitValue) {		p_editText.text = unitValue;	} else {		alert(text + ' is not a valid measurment');		p_editText.active = true;	}	};/** * Event listener for radio button click event that sets the default values for edit text elements 
 * based on the radio button triggering the event */var radioClick = function(p_editTexts, p_radios) {		var document,		viewPreferences,		size = [0, 0]; // Default values for edit text elements		if(app.documents.length) {				document = app.activeDocument;		viewPreferences = document.viewPreferences;				if (p_radios.absolute.value && document.selection.length === 1) {
			// Set to the dimensions of the selected object			size = getPageItemSize(document.selection[0]);		}			} else {		// No documents open use application view preferences		viewPreferences = app.viewPreferences;			}		p_editTexts.width.text = getUnitValue(size[0], getRulerUnit(viewPreferences, 'horizontal'));	p_editTexts.height.text = getUnitValue(size[1], getRulerUnit(viewPreferences, 'vertical'));	};/** * Event listener for resize button click event that attempts to resize page items based on user 
 * inputted measurements */var resizeButtonClick = function(p_editTexts, p_radios) {		var document,		pageItems,		i = 0,		leng,		relative,
		error = false;		if(!app.documents.length) {		alert('There are currently no open InDesign documents.');		return;	}		document = app.activeDocument;		if(document.selection.length !== 1) {		alert('A single page item with the object style of the page items you would like to resize must be selected.');		return;	}		pageItems = getPageItemByObjectStyle(document.selection[0]);		leng = pageItems.length;			relative = p_radios.relative.value || false;		for(; i < leng; i++) {				if (!setPageItemSize(pageItems[i], [p_editTexts.width.text, p_editTexts.height.text], relative)) {
			error = true;		}
			}
	
	if (error) {
		alert('Some pate items were unable to be resized because the resulting measurement is not a legal dimension.');
	}	};/** * Add event listeners to the user interface elements */var addEventListeners = function(p_elements) {		var editTexts = p_elements.editTexts,		radios = p_elements.radios		p_elements.palette.onShow = function() {		paletteShow(editTexts, radios);	}		radios.relative.onClick = function() {		radioClick(editTexts, radios);	};	radios.absolute.onClick = function() {		radioClick(editTexts, radios);	};		editTexts.width.addEventListener('blur', function() {
		editTextBlur(editTexts.width, 'horizontal');
	});	editTexts.height.addEventListener('blur', function() {
		editTextBlur(editTexts.height, 'vertical');
	});		p_elements.resizeButton.onClick = function() {		resizeButtonClick(editTexts, radios);	};	};// Check if user interface already loaded into memory
if(typeof interfaceElements === 'undefined') {
	
	interfaceElements = layoutInterface('Resize page items by style');
	
	addEventListeners(interfaceElements);

}

// Show user interface
interfaceElements.palette.show();