/**
 * Event listener for resize button click event that attempts to resize page items based on user 
 * inputted measurements
 */
var resizeButtonClick = function(p_editTexts, p_radios) {
	
	var document,
		pageItems,
		i = 0,
		leng,
		relative,
		error = false;
	
	if(!app.documents.length) {
		alert('There are currently no open InDesign documents.');
		return;
	}
	
	document = app.activeDocument;
	
	if(document.selection.length !== 1) {
		alert('A single page item with the object style of the page items you would like to resize must be selected.');
		return;
	}
	
	pageItems = getPageItemsByObjectStyle(document.selection[0]);
	
	leng = pageItems.length;
		
	relative = p_radios.relative.value || false;
	
	for(; i < leng; i++) {
		
		if (!setPageItemSize(pageItems[i], [p_editTexts.width.text, p_editTexts.height.text], relative)) {
			error = true;
		}
		
	}
	
	if (error) {
		alert('Some pate items were unable to be resized because the resulting measurement is not a legal dimension.');
	}
	
};
