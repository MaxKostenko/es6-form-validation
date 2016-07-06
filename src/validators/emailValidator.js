class EmailValidator extends AbstractValidator {

	static get abbr() {
		return 'email';
	}

	static test(value) {
		return value.match( /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i );
	}

	isValid(val) {
		return ( val != undefined ) && String(val).length ? this.constructor.test(val) : true;
	}
}