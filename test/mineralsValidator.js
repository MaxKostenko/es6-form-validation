class MineralsValidator extends AbstractValidator {

	static get abbr() {
		return 'minerals';
	}


	get defaultErrorTextTpl() {
		return 'Need more minerals';
	}

	static test(value) {
		return 'minerals' == value;
	}
}