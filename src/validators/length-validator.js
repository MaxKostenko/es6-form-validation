import AbstractNumberConditionValidator from './abstract-number-condition-validator';

export default class LengthValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'length';
	}

	static test(value, condition) {
		if( condition ) {
			let len = String(value).length;
			return !len || ( len == condition )
		}
		return true;
	}
}