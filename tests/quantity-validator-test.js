function quantityValidatorTest() {
	
	function quantityTest(value, isValid) {
		let validator = new QuantityValidator();
		it("Quantity `" + value + "` should be " + ( isValid ? '' : 'in' ) + "valid", function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	quantityTest(6, true);
	quantityTest(4, true);
	quantityTest('5', true);
	quantityTest(0, true);
	quantityTest('', false);
	quantityTest(4.5, false);
	quantityTest(-4, false);
	quantityTest('ab', false);
};