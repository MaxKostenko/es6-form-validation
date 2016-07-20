function minValidatorTest() {
	
	function quantityTest(value, condition, isValid) {
		let formValidation = new FormValidation;
		let validator = new formValidation.validation.validators['min'];
		validator.condition = condition;
		it("Value `" + value + "` should be " + ( isValid ? '' : 'in' ) + "valid for condition quantity >= " + condition, function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	quantityTest(6, 4, true);
	quantityTest(4, 4, true);
	quantityTest('5', 4, true);
	quantityTest('', 4, true);
	quantityTest(4.5, 4, true);
	quantityTest(3.99, 4, false);
	quantityTest(3, 4, false);
	quantityTest('ab', 4, false);
};