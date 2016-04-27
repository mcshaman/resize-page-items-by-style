/**
 * Get width and height of a page item
 */
var getPageItemSize = function(p_item) {
		
	var bounds = p_item.geometricBounds,
		width = bounds[3] - bounds[1],
		height = bounds[2] - bounds[0];
	
	return [width, height];
	
};
