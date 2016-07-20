import AbstractNumberConditionValidator from './abstract-number-condition-validator';

export default class MaxValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'max';
	}

	static test(value, condition)  {
		if( condition && ( value != undefined ) && String(value).length ) {
			return  parseFloat( value ) <= condition;
		}
		return true;
	}
}