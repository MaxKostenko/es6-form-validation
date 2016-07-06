class ValidatorFabric {

	constructor() {
		this.initValidators();
	}

	initValidators() {
		this.validators = [
			RequireValidator,
			LengthValidator,
			MaxLengthValidator,
			MinLengthValidator,
			QuantityValidator,
			MaxQuantityValidator,
			MinQuantityValidator,
			EmailValidator,
			EqualValidator,
			CheckedValidator
		];
	}

	attach( ValidatorClass ) {
		this.validators[ValidatorClass.abbr] = ValidatorClass;
	}

	set validators( validator_list ) {
		for( let validator of validator_list ) {
			this.attach(validator);
		}
	}

	get validators() {
		if( this[Symbol.for('validators')] == undefined ) {
			this[Symbol.for('validators')] = {};
		}
		return this[Symbol.for('validators')];
	}

	buildValidator( rule ) {
		let [abbr, condition = false] = rule.split('_');
		let validator = this.validators[abbr];
		if (validator) {
			validator = new validator();
			if (condition)
				validator.condition = condition;
			return validator;
		}
		return false;
	}
}
