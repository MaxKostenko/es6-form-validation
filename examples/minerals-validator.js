class MineralsValidator extends AbstractValidator {

	static get abbr() {
		return 'minerals';
	}


	get defaultErrorTextTpl() {
		return 'Value must be `minerals`';
	}

	static test(value) {
		return 'minerals' == value;
	}
}