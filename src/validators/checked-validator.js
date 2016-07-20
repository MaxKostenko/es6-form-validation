import AbstractValidator from './abstract-validator';

export default class CheckedValidator extends AbstractValidator {

	static get abbr() {
		return 'checked';
	}

	isValid(val, field) {
		if( field ) {
			return field.checked;
		}
		return true;
	}
}