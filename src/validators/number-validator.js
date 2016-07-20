import AbstractValidator from './abstract-validator';

//A field is any number decimal or non-decimal
export default class NumberValidator extends AbstractValidator {

	static get abbr() {
		return 'number';
	}

	static test(value) {
		return value != undefined && String(value).length ? String(value).match( /^\-?\d+(\.\d+)?$/ ) != null : true;
	}
}