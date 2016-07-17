function maxLengthValidatorTest() {
	
	function lengthTest(value, condition, isValid) {
		let validator = new MaxLengthValidator();
		validator.condition = condition;
		it("Value `" + value + "` should be " + ( isValid ? '' : 'in' ) + "valid for condition length <= " + condition, function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	lengthTest('abc', 4, true);
	lengthTest('abcd', 4, true);
	lengthTest('abcde', 4, false);
	lengthTest('abcdef', 4, false);
};