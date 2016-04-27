/**
 * Set the size of a page item relatively or absolutely depending on the relative argument passed
 */
var setPageItemSize = function(p_pageItem, p_measurements, p_relative) {
	
	var method,
		i = 0,
		unitValue,
		document = getAncestor(p_pageItem, Document),
		directions = ['horizontal', 'vertical'],
		points = [];
	
	if(p_relative) {
		method = ResizeMethods.ADDING_CURRENT_DIMENSIONS_TO;
	} else {
		method = ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH;
	}
	
	for(; i < 2; i++) {
		
		unitValue = getUnitValue(p_measurements[i], getRulerUnit(document.viewPreferences, directions[i]));
		
		points[i] = unitValue.as('pt');
		
	}
	
	try {
		p_pageItem.resize(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, method, points);
		return true;
	} catch(p_error) {
		return false;
	}
	
};
