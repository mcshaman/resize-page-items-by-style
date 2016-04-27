/**
 * Get page items in document with the same object style as page item argument
 */
var getPageItemsByObjectStyle = function(p_pageItem) {
	
	var objectStyle,
		document,
		pageItems,
		pageItem,
		i = 0,
		leng,
		matches = [];
	
	objectStyle = p_pageItem.appliedObjectStyle;
	
	document = getAncestor(objectStyle, Document);
	
	pageItems = document.allPageItems;
	
	for(leng = pageItems.length; i < leng; i++) {
		
		pageItem = pageItems[i];
		
		if(pageItem.appliedObjectStyle === objectStyle) {
			
			matches.push(pageItem);
			
		}
		
	}
	
	return matches;
	
};
