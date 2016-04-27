/**
 * Event listener for when palette show event that initialises the user interface elements
 */
var paletteShow = function(p_editTexts, p_radios) {
	
	p_radios.relative.value = true;
	radioClick(p_editTexts, p_radios);
	p_editTexts.width.active = true;
	
};
