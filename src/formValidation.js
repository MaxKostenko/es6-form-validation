class FormValidation {

	get defaults() {
		return {
			errorInputClassName: 'error',
			errorTextClassName: 'errorTxt',
			warningInputClassName: 'warning',
			warningTextClassName: 'warningTxt',
			autoApplyFormAttributeName: 'data-need-validate',
			validationAttributeName: 'data-validate',
			autoApply: false,
			submitElementSelector: false,
			defaultBrowserValidation: false, // switch off browser validation
			autoTrim: false, // Trim field values before validation
			errors: { //Default error text
				require: 'This information is required.',
				email: 'Please enter a valid email address.',
				quantity: 'Use numbers only.',
				minlength: 'Value is too short (minimum is {{cond}} characters).',
				maxlength: 'Value is too long (maximum is {{cond}} characters).',
				min: 'Value is too small (minimum is {{cond}}).',
				max: 'Value is too big (maximum is {{cond}}).'
			},

			// callbacks
			getErrorTextBlock: false, //params field
			setError: false, //params: field, text
			clearError: false, // params: field
			afterValidate: false //params: form return: boolean //form wouldn't send if callback return false
		};
	}

	constructor(settings = {}) {
		this.settings = settings;
		if (this.settings.autoApply) {
			this.autoApply();
		}
		this.validatorFabric = new ValidatorFabric();
	}

	set settings( value ) {
		if (this[Symbol.for('settings')] == undefined) {
			this[Symbol.for('settings')] = this.defaults;
		}
		Object.assign(this[Symbol.for('settings')], value );
	}

	get settings() {
		return this[Symbol.for('settings')];
	}

	autoApply() {
		let forms = document.querySelectorAll(`form[${this.settings.autoApplyFormAttributeName}]`);
		for (let i=0; i < forms.length; ++i) {
			this.bind(forms[i]);
		}
	}

	bind(formDomElement) {
		if (formDomElement instanceof HTMLFormElement) {
			if (this.settings.submitElementSelector) {
				let submitElements = formDomElement.querySelectorAll( this.settings.submitElementSelector );
				for (let i=0; i < submitElements.length; ++i) {
					submitElements[i].addEventListener( "click", (event) => this.onSubmit( formDomElement, event ) );
				}
			}
			formDomElement.addEventListener( "submit", (event) => this.onSubmit( formDomElement, event ) );
			if (!this.settings.defaultBrowserValidation) {
				formDomElement.noValidate = true;
			}
		}
	}

	onSubmit(form, event) {
		let isOk = this.isValid(form);
		console.log(`onSubmit:${isOk}`);
		if ( isOk && this.settings.afterValidate ) {
			isOk = this.settings.afterValidate(form);
		}
		if( !isOk )
			event.preventDefault();
		return isOk;
	}

	isValid(formDomElement) {
		let isValid = true;
		let fields = formDomElement.querySelectorAll( `[${this.settings.validationAttributeName}]:enabled` );
		if (this.settings.autoTrim) {
			for (let i=0; i < fields.length; ++i) {
				fields[i].value = fields[i].value.trim();
			}
		}
		for (let i=0; i < fields.length; ++i) {
			if ( !this.fieldIsValid(fields[i]) ) {
				isValid = false;
			}
		}
		return isValid;
	}

	fieldIsValid(field) {
		let isValid = true;
		let validation_rules = field.getAttribute(this.settings.validationAttributeName).trim();
		let value = field.value;
		if( validation_rules ) {
			for( let rule of validation_rules.split( ' ' ) ) {
				let validator = this.validatorFabric.buildValidator(rule);
				if( validator ) {
					if( !validator.isValid(value, field) ) {
						isValid = false;
						let errorTextFromSettings = this.settings.errors[validator.constructor.abbr];
						if(errorTextFromSettings) {
							validator.errorTextTpl = errorTextFromSettings;
						}
						this.setError( field, validator.getErrorText(value, field) );
						break;
					}
				}
			}
		}
		if( isValid )
			this.clearError( field );
		return isValid;
	}

	getErrorTextBlock(field) {
		if( this.settings.getErrorTextBlock ) {
			return this.settings.getErrorTextBlock(field);
		} else {
			let prevElement = field.previousElementSibling;
			if( prevElement && prevElement.classList.contains(this.settings.errorTextClassName) ) {
				return prevElement;
			}
			return null;

		}
	}

	setError(field, text) {
		if( this.settings.setError ) {
			this.settings.setError(field, text);
		} else {
			field.classList.add(this.settings.errorInputClassName);
			let errorBlock = this.getErrorTextBlock(field);
			if( errorBlock ) {
				errorBlock.innerHTML = text;
			} else {
				let errorElement = document.createElement('div');
				errorElement.classList.add(this.settings.errorTextClassName);
				errorElement.innerHTML = text;
				field.parentNode.insertBefore(errorElement, field);
			}

		}
	}

	clearError(field) {
		if( this.settings.clearError ) {
			this.settings.clearError(field);
		} else {
			field.classList.remove(this.settings.errorInputClassName);
			let errorBlock = this.getErrorTextBlock(field);
			if( errorBlock ) {
				errorBlock.innerHTML = '';
			}
		}
	}

}