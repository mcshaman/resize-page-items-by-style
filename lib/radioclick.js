/**
 * Event listener for radio button click event that sets the default values for edit text elements 
 * based on the radio button triggering the event
 */
var radioClick = function(p_editTexts, p_radios) {
	
	var document,
		viewPreferences,
		size = [0, 0]; // Default values for edit text elements
	
	if(app.documents.length) {
		
		document = app.activeDocument;
		viewPreferences = document.viewPreferences;
		
		if (p_radios.absolute.value && document.selection.length === 1) {
			// Set to the dimensions of the selected object
			size = getPageItemSize(document.selection[0]);
		}
		
	} else {
		// No documents open use application view preferences
		viewPreferences = app.viewPreferences;
		
	}
	
	p_editTexts.width.text = getUnitValue(size[0], getRulerUnit(viewPreferences, 'horizontal'));
	p_editTexts.height.text = getUnitValue(size[1], getRulerUnit(viewPreferences, 'vertical'));
	
};
