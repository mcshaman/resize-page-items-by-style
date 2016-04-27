/**
 * Add event listeners to the user interface elements
 */
var addEventListeners = function(p_elements) {
	
	var editTexts = p_elements.editTexts,
		radios = p_elements.radios
	
	p_elements.palette.onShow = function() {
		paletteShow(editTexts, radios);
	}
	
	radios.relative.onClick = function() {
		radioClick(editTexts, radios);
	};
	radios.absolute.onClick = function() {
		radioClick(editTexts, radios);
	};
	
	editTexts.width.addEventListener('blur', function() {
		editTextBlur(editTexts.width, 'horizontal');
	});
	editTexts.height.addEventListener('blur', function() {
		editTextBlur(editTexts.height, 'vertical');
	});
	
	p_elements.resizeButton.onClick = function() {
		resizeButtonClick(editTexts, radios);
	};
	
};
