class QuantityValidator extends AbstractValidator { //целое положительное

	static get abbr() {
		return 'quantity';
	}

	static test(value) {
		return value != undefined ? String(value).match( /^(\d+)$/ ) : true;
	}
}