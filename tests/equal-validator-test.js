function equalFieldsValidatorTest() {

	function equalTest(firstInputValue, secondInputValue, isValid) {
		let formValidator = new FormValidation;
		let form = document.createElement('form');
		form.innerHTML = '<input name=field1 data-validate="eq_field2" /><br/><input name=field2 /><br/><input type=submit>';
		form.field1.value = firstInputValue;
		form.field2.value = secondInputValue;
		formValidator.bind(form);
		it('Should be ' + ( isValid ? 'valid' : 'invalid' ), function() {
			chai.assert.equal(formValidator.isValid(form), isValid);
		});
	}
	equalTest('test', 'test', true);
	equalTest('', '', true);
	equalTest('test2', 'test', false);
	equalTest('test', 'test3', false);
};