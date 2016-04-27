/**
 * Attempt to create an Adobe UnitValue object from value with an option of a fallback unit type 
 * where value passed is a number without appended unit type
 * @todo Implement better solution for managing unit types unsupported by the UnitValue object
 */
var getUnitValue = function(p_value, p_fallbackUnit) {
	
	var pattern = /^ *([\-+]?(?:\d+(?:\.\d*)?|\.\d+)) ?(\w+)* *$/,
		string = p_value + '',
		match = string.match(pattern),
		unitType,
		unitValue;
		
	if(match) {
		
		if(match[2]) {
			unitType = match[2];
		} else {
			unitType = p_fallbackUnit;
		}
		
		try {
			unitValue = UnitValue(match[1], unitType);
		} catch (p_error) {
			// Catch unsuported unit value types like picas and ciceros
			unitValue = UnitValue(match[1], 'pt');
		}
		
		if(unitValue.type !== '?') {
			return unitValue;
		}
		
	}
	
	return false;
	
};
