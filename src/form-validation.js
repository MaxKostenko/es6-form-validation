import RequireValidator from './validators/require-validator';
import LengthValidator from './validators/length-validator';
import MaxLengthValidator from './validators/max-length-validator';
import MinLengthValidator from './validators/min-length-validator';
import QuantityValidator from './validators/quantity-validator';
import MaxValidator from './validators/max-validator';
import MinValidator from './validators/min-validator';
import EmailValidator from './validators/email-validator';
import EqualValidator from './validators/equal-validator';
import CheckedValidator from './validators/checked-validator';
import NumberValidator from './validators/number-validator';
import IntValidator from './validators/int-validator';
import ValidatorFabric from './validator-fabric';

export default class FormValidation {

	get defaults() {
		return {
			errorInputClassName: 'error',
			errorTextClassName: 'errorTxt',
			autoApplyFormAttributeName: 'data-need-validate',
			autoApply: true,
			validationAttributeName: 'data-validate',
			submitElementSelector: false,
			defaultBrowserValidation: false, // switch off browser validation
			autoTrim: false, // Trim field values before validation
			errors: { //Default error text
				email: 'Please enter a valid email address.',
				require: 'This information is required.',
				minlength: 'Value is too short (minimum is {{cond}} characters).',
				maxlength: 'Value is too long (maximum is {{cond}} characters).',
				min: 'Value is too small (minimum is {{cond}}).',
				max: 'Value is too big (maximum is {{cond}}).',
				quantity: 'Use digits only.',
				number: 'Value must be set to a number',
				int: 'Value must be an integer',
				length: 'Value must content {{cond}} characters',
				eq: 'Value must match {{cond}} field'
			},

			// callbacks
			getErrorTextBlock: false, //params field
			setError: false, //params: field, text
			clearError: false, // params: field
			afterValidate: false, //params: form return: boolean //form wouldn't send if callback return false
			validators: [
				RequireValidator,
				LengthValidator,
				MaxLengthValidator,
				MinLengthValidator,
				QuantityValidator,
				MaxValidator,
				MinValidator,
				EmailValidator,
				EqualValidator,
				CheckedValidator,
				NumberValidator,
				IntValidator
			]
		};
	}

	constructor(settings = {}) {
		this.validation = new ValidatorFabric();
		this.validation.validators = this.defaults.validators;
		if( settings.validators && Array.isArray( settings.validators ) ) {
			this.validation.validators = settings.validators;
			delete settings.validators;
		}

		this.settings = settings;
		if (this.settings.autoApply) {
			this.autoApply();
		}
	}

	set settings( settings ) {
		if (this[Symbol.for('settings')] == undefined) {
			this[Symbol.for('settings')] = this.defaults;
		}
		if( settings.errors ) {
			settings.errors = Object.assign( this.defaults.errors, settings.errors );
		}
		Object.assign(this[Symbol.for('settings')], settings );
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
				let validator = this.validation.buildValidator(rule);
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

module.exports = FormValidation;