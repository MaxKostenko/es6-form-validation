function numberValidatorTest() {
	
	function numberTest(value, isValid) {
		let validator = new NumberValidator();
		it("Value `" + value + "` is " + ( isValid ? '' : 'in' ) + "valid number", function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	numberTest(6, true);
	numberTest(4, true);
	numberTest('5', true);
	numberTest(0, true);
	numberTest('', true);
	numberTest(null, true);
	numberTest(4.5, true);
	numberTest(-4, true);
	numberTest('.03', false);
	numberTest('1..03', false);
	numberTest('-.03', false);
	numberTest('ab12', false);
	numberTest('a12b', false);
	numberTest('12ab', false);
};