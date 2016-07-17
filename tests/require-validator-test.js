function requireValidatorTest() {
	
	function requireTest(value, isValid) {
		let validator = new RequireValidator();
		it("This value `" + value + "` is " + ( isValid ? 'not' : '' ) + " empty", function() {
			chai.assert.equal(validator.isValid(value), isValid);
		});
	}
	requireTest('ere', true);
	requireTest(0, true);
	requireTest(' ab', true);
	requireTest('', false);
	requireTest(' ', false);
	requireTest(null, false);
};