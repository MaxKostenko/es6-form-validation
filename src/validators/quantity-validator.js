import AbstractValidator from './abstract-validator';

export default class QuantityValidator extends AbstractValidator {

	static get abbr() {
		return 'quantity';
	}

	static test(value) {
		return value != undefined ? String(value).match( /^(\d+)$/ ) != null : true;
	}
}