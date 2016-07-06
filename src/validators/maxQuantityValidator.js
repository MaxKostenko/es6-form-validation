class MaxQuantityValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'max';
	}

	static test(value, condition)  {
		if( condition ) {
			if( !QuantityValidator.test(value) )
				return false;
			return  parseInt( value ) <= condition;
		}
		return true;
	}
}