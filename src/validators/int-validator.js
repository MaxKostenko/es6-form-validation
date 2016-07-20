import AbstractValidator from './abstract-validator';

export default class IntValidator extends AbstractValidator {

	static get abbr() {
		return 'int';
	}

	static test(value) {
		return value != undefined && String(value).length ? String(value).match(  /^\-?\d+$/ ) != null : true;
	}
}