function intValidatorTest() {
	
	function integerTest(value, isValid) {
			let formValidation = new FormValidation;
			let validator = new formValidation.validation.validators['int'];
		it("Value `" + value + "` is" + ( isValid ? '' : 'n\'t' ) + " integer", function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	integerTest(6, true);
	integerTest(4, true);
	integerTest('5', true);
	integerTest(0, true);
	integerTest('', true);
	integerTest(null, true);
	integerTest(-4, true);
	integerTest(4.5, false);
	integerTest('-4.5', false);
	integerTest('ab12', false);
	integerTest('a12b', false);
	integerTest('12ab', false);
};