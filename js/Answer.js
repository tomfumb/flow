Flow.Answer = function(text, value) {
	
	this.text = text;
	this.value = (typeof value === 'undefined' ? text : value);
	this.id = Flow.Util.generateId();
	
	this.nextInfo = undefined;
	this.next = undefined;
};

Flow.Answer.prototype.setNextInfo = function(nextType, identifierType, identifier) {
	
	this.nextInfo = {
		nextType: nextType,
		identifierType: identifierType,
		identifier: identifier
	};
};
