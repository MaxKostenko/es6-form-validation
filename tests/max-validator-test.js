function maxValidatorTest() {
	
	function quantityTest(value, condition, isValid) {
		let validator = new MaxValidator();
		validator.condition = condition;
		it("Value `" + value + "` should be " + ( isValid ? '' : 'in' ) + "valid for condition quantity <= " + condition, function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	quantityTest(2, 4, true);
	quantityTest('3', 4, true);
	quantityTest(4, 4, true);
	quantityTest('', 4, true);
	quantityTest(2.5, 4, true);
	quantityTest('-4.001', 4, true);
	quantityTest(4.001, 4, false);
	quantityTest(6, 4, false);
	quantityTest('ab', 4, false);
};