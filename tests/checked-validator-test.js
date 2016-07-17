function checkedFieldsValidatorTest() {


	function checkedTest(form, isValid) {
		let formValidator = new FormValidation;
		formValidator.bind(form);
		it('Form should be ' + ( isValid ? 'valid' : 'invalid' ), function() {
			chai.assert.equal(formValidator.isValid(form), isValid);
		});
	}

	let form = document.createElement('form');
	form.innerHTML = '<input name=field1 type=checkbox data-validate="checked" checked /><br/><input type=submit>';
	checkedTest(form, true);
	
	form = document.createElement('form');
	form.innerHTML = '<input name=field1 type=checkbox data-validate="checked" /><br/><input type=submit>';
	form.field1.checked = true;
	checkedTest(form, true);

	form = document.createElement('form');
	form.innerHTML = '<input name=field1 type=checkbox data-validate="checked" /><br/><input type=submit>';
	checkedTest(form, false);
};