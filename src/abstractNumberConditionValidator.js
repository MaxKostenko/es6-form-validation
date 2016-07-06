class AbstractNumberConditionValidator extends AbstractValidator {

	prepareCondition(condition) {
		condition = parseInt(condition);
		if( !isNaN(condition) && (condition > 0) ) {
			return condition;
		}
		return null;
	}
}
