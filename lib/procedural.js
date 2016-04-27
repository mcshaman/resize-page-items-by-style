// Check if user interface already loaded into memory
if(typeof interfaceElements === 'undefined') {
	
	interfaceElements = layoutInterface('Resize page items by style');
	
	addEventListeners(interfaceElements);

}

// Show user interface
interfaceElements.palette.show();
