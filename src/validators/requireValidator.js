class RequireValidator extends AbstractValidator {

	static get abbr() {
		return 'require';
	}

	static test(val) {
		return ( val != undefined ) && ( String(val).trim().length );
	}
}