function lengthValidatorTest() {
	
	function lengthTest(value, condition, isValid) {
		let formValidation = new FormValidation;
		let validator = new formValidation.validation.validators['length'];
		validator.condition = condition;
		it("Value `" + value + "` should be " + ( isValid ? '' : 'in' ) + "valid for condition length=" + condition, function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	lengthTest('test', 4, true);
	lengthTest('12345', 5, true);
	lengthTest('', 4, true);
	lengthTest('test', 3, false);
	lengthTest('test', 5, false);
};