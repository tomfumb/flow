Flow.Question = function(title, id) {
	
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
			Flow.Log.log(Flow.Log.logLevels.WARNING, 'Question created without title, id: ' + this.id);
			break;
	}
	
	this.title = title;
	this.content = title;
	
	this.answers = [];
	this.precedingAnswers = [];
	
	this.selectedAnswer = undefined;
};

Flow.Question.prototype.addAnswer = function(text, value) {
	
	var answer = new Flow.Answer(text, value);
	answer.question = this;
	this.answers.push(answer);
	
	return answer;
};

Flow.Question.prototype.identifierTypes = {
	ID: 'id',
	TITLE: 'title'
};

Flow.Question.prototype.nextTypes = {
	QUESTION: 'question',
	OUTCOME: 'outcome'
};

Flow.Question.prototype.INDEX_UNINITIALISED = -1;
