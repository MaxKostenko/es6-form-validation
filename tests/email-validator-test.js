function emailValidatorTest() {
	let validator = new EmailValidator();
	function emailTest(email, isValid) {
		it("Email `" + email + "` should be " + ( isValid ? '' : 'in' ) + "valid ", function() {
			chai.assert.equal(validator.isValid(email), isValid);
		});
	}
	emailTest('test@gmail.com', true);
	emailTest('test@g.ru', true);
	emailTest('', true);
	emailTest('test@gr.u', false);
	emailTest('.test@gmail.com', false);
	emailTest('@gmail.com', false);
	emailTest('"test-me@te..st.de",', false);
};