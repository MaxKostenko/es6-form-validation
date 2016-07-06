class MinQuantityValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'min';
	}

	static test(value, condition) {
		if( condition ) {
			if( !QuantityValidator.test(value) )
				return false;
			return  parseInt( value ) >= condition;
		}
		return true;
	}
}