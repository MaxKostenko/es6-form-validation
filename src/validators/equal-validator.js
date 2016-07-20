import AbstractValidator from './abstract-validator';

export default class EqualValidator extends AbstractValidator {

	static get abbr() {
		return 'eq';
	}

	isValid(val, field) {
		if( field && field.form && field.form.elements && this.condition ) {
			let fieldVal = field.form.elements[this.condition].value;
			return val == fieldVal;
		}
		return true;
	}
}