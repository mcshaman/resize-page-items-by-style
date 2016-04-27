/**
 * Make user interface using ScriptUI layout engine returning object literal containing references 
 * to key interface elements for hooking on to
 */
var layoutInterface = function(p_message) {
	
	var palette,
		group,
		radiosRelative,
		radiosAbsolute,
		staticText,
		widthEditText,
		heightEditText,
		resizeButton;
	
	palette = new Window('palette', p_message);
	palette.alignChildren = ['', 'center'];
		group = palette.add('group');
			group = group.add('panel');
			group.alignChildren = ['left', 'center'];
				radiosRelative = group.add('radiobutton', undefined, 'Relative');
				radiosAbsolute = group.add('radiobutton', undefined, 'Absolute');
		group = group.parent;
			group = group.add('group');
			group.orientation = 'column';
			group.alignChildren = ['right', 'center'];
				group = group.add('group');
					staticText = group.add('statictext');
					staticText.text = 'Width:';
					widthEditText = group.add('edittext');
					widthEditText.characters = 10;
			group = group.parent;
				group = group.add('group');
					staticText = group.add('statictext');
					staticText.text = 'Height:';
					heightEditText = group.add('edittext');
					heightEditText.characters = 10;
		resizeButton = palette.add('button', undefined, 'Resize', {name: 'ok'});
	
	return {
		palette: palette,
		radios: {
			relative: radiosRelative,
			absolute: radiosAbsolute
		},
		editTexts: {
			width: widthEditText,
			height: heightEditText
		},
		resizeButton: resizeButton
	};
	
};
