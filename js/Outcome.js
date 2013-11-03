Flow.Outcome = function(title, id) {
	
	this.index = this.INDEX_UNINITIALISED;
	
	switch(true) {
		case (typeof id !== 'undefined'):
			this.id = id;
			break;
		case (typeof id === 'undefined' && typeof title === 'string' && title.length > 0):
			this.id = Flow.Util.getIdFromText(title);
			break;
		default:
			this.id = Flow.Util.generateId();
			Flow.Log.log(Flow.Log.logLevels.WARNING, 'Outcome created without title, id: ' + this.id);
			break;
	}
	
	this.title = title;
	this.description = title;
	this.url = undefined;
	
	this.precedingAnswers = [];
};

Flow.Outcome.prototype.identifierTypes = {
	ID: 'id',
	TITLE: 'title'
};

Flow.Outcome.prototype.INDEX_UNINITIALISED = -1;
