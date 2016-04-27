/**
 * Event listener for edit text defocusing event that updates the text in the edit text element to a
 * valid measurement that reflects the measurement unit type of the active document or application
 */
var editTextBlur = function(p_editText, p_orientation) {
	
	var text = p_editText.text,
		viewPreferences,
		direction,
		unitValue;
	
	if (app.documents.length) {
		viewPreferences = app.activeDocument.viewPreferences;
	} else {
		viewPreferences = app.viewPreferences;
	}
	
	unitValue = getUnitValue(text, getRulerUnit(viewPreferences, p_orientation));
	
	if (unitValue) {
		p_editText.text = unitValue;
	} else {
		alert(text + ' is not a valid measurment');
		p_editText.active = true;
	}
	
};
