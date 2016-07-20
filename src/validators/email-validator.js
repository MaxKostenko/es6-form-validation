import AbstractValidator from './abstract-validator';

export default class EmailValidator extends AbstractValidator {

	static get abbr() {
		return 'email';
	}

	static test(value) {
		return value.match( /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/ );
	}

	isValid(val) {
		return ( val != undefined ) && String(val).length ? this.constructor.test(val) != null : true;
	}
}