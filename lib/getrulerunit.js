/**
 * Get ruler unit type of view preferences measurement units of the orientation passed as an 
 * argument
 */
var getRulerUnit = function(p_viewPreferences, p_orientation) {
	
	var units;
		
	if(p_orientation == 'horizontal') {
		units = p_viewPreferences.horizontalMeasurementUnits;
	} else {
		units = p_viewPreferences.verticalMeasurementUnits;
	}
	
	switch (units) {
		case 2051106676: 
			return 'ag';
		case 2053336435: 
			return 'cm';
		case 2053335395: 
			return 'c';
		case 2053729891: 
			return 'in';
		case 2053729892: 
			return 'in';
		case 2053991795: 
			return 'mm';
		case 2054187363: 
			return 'p';
		case 2054188905: 
			return 'pt';
		
	}
	
};
