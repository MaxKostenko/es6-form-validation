import AbstractNumberConditionValidator from './abstract-number-condition-validator';

export default class MinLengthValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'minlength';
	}

	static test(value, condition) {
		if( condition ) {
			let len = String(value).length;
			return !len || ( len >= condition )
		}
		return true;
	}
}