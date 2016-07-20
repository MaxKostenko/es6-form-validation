import AbstractNumberConditionValidator from './abstract-number-condition-validator';

export default class MaxLengthValidator extends AbstractNumberConditionValidator {

	static get abbr() {
		return 'maxlength';
	}

	static test(value, condition) {
		if( condition ) {
			let len = String(value).length;
			return !len || ( len <= condition )
		}
		return true;
	}
}