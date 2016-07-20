import AbstractValidator from './abstract-validator';

export default class RequireValidator extends AbstractValidator {

	static get abbr() {
		return 'require';
	}

	static test(val) {
		return ( val != undefined ) && ( String(val).trim().length > 0 );
	}
}