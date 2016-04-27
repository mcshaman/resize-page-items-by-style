﻿/**
 * @todo Implement a solution for absolutely adjusting objects in only one direction
 * argument
	try {
		return true;
	} catch(p_error) {
		return false;
	}
 * where value passed is a number without appended unit type
 * @todo Implement better solution for managing unit types unsupported by the UnitValue object
		try {
		} catch (p_error) {
			// Catch unsuported unit value types like picas and ciceros
			unitValue = UnitValue(match[1], 'pt');
		}
 * to key interface elements for hooking on to
 * valid measurement that reflects the measurement unit type of the active document or application
		viewPreferences,
		direction,
		unitValue;
	if (app.documents.length) {
		viewPreferences = app.activeDocument.viewPreferences;
	} else {
		viewPreferences = app.viewPreferences;
	}
	
	unitValue = getUnitValue(text, getRulerUnit(viewPreferences, p_orientation));
	
 * based on the radio button triggering the event
			// Set to the dimensions of the selected object
 * inputted measurements
		error = false;
			error = true;
		
	
	if (error) {
		alert('Some pate items were unable to be resized because the resulting measurement is not a legal dimension.');
	}
		editTextBlur(editTexts.width, 'horizontal');
	});
		editTextBlur(editTexts.height, 'vertical');
	});
if(typeof interfaceElements === 'undefined') {
	
	interfaceElements = layoutInterface('Resize page items by style');
	
	addEventListeners(interfaceElements);

}

// Show user interface
interfaceElements.palette.show();