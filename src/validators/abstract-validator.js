export default class AbstractValidator {

	set condition(condition) {
		this[Symbol.for('condition')] = this.prepareCondition(condition);
	}

	get condition() {
		return this[Symbol.for('condition')];
	}

	prepareCondition(condition) {
		return condition;
	}

	get defaultErrorTextTpl() {
		return 'Please enter a valid value.';
	}

	set errorTextTpl(tpl) {
		this[Symbol.for('error_text')] = tpl;
	}

	get errorTextTpl() {
		let tpl = this[Symbol.for('error_text')];
		if( tpl == undefined ) {
			tpl = this.defaultErrorTextTpl;
		}
		return tpl;
	}

	formatText(text, value) {
		text = text.replace('{{val}}', value);
		if(this.condition) {
			text = text.replace('{{cond}}', this.condition);
		}
		return text;
	}

	getErrorText(value, field) {
		let errorTextTpl;
		let customInlineErrorText = field.getAttribute('data-' + this.constructor.abbr + '-error-text');
		if( customInlineErrorText ) {
			errorTextTpl = customInlineErrorText.trim();
		} else {
			errorTextTpl = this.errorTextTpl;
		}
		return this.formatText(errorTextTpl, value);
	}

	static test(value, condition) {
		return true;
	}

	isValid(val, field) {
		return this.constructor.test(val, this.condition);
	}
}
module.exports = AbstractValidator;