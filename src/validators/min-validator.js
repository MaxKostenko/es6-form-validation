import AbstractNumberConditionValidator from './abstract-number-condition-validator';

export default class MinValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'min';
	}

	static test(value, condition) {
		if( condition && ( value != undefined ) && String(value).length ) {
			return  parseFloat( value ) >= condition;
		}
		return true;
	}
}