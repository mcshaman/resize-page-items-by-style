/**
 * Get first instance of ancestor object of another object
 */
var getAncestor = function(p_object, p_ancestor) {

	var parent = p_object.parent;
	
	while(parent.constructor != p_ancestor && parent.constructor != Application) {
		parent = parent.parent;
	}
	
	if(parent.constructor === Application && p_ancestor !== Application) {
		return false;
	} else {
		return parent;
	}
	
};
