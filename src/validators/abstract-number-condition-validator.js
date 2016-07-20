import AbstractValidator from './abstract-validator';

export default class AbstractNumberConditionValidator extends AbstractValidator {

	prepareCondition(condition) {
		condition = parseInt(condition);
		if( !isNaN(condition) && (condition > 0) ) {
			return condition;
		}
		return null;
	}
}
module.exports = AbstractNumberConditionValidator;
