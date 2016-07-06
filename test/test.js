let m = new FormValidation({
	autoApply: true,
	submitElementSelector: '.sub'
});

m.validatorFabric.attach(MineralsValidator);
