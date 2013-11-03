Flow.QuestionManager = {
	
	count: 0,
	questions: {},

	addQuestion: function(title, id) {
	
		var question = new Flow.Question(title, id);
		question.index = this.count++;
		
		if(Flow.Util.idAlreadyExists(question.id)) {
			Flow.Log.log(Flow.Log.logLevels.ERROR, 'Attempt to add question with duplicate id: ' + question.id, true);
		}
		else {
			this.questions[question.id] = question;
		}
		
		return question;
	},

	getQuestionByTitle: function(title) {
		return this.getQuestionById(Flow.Util.getIdFromText(title));
	},

	getQuestionById: function(id) {
	
		if(this.questions.hasOwnProperty(id)) {
			return this.questions[id];
		}
		
		Flow.Log.log(Flow.Log.logLevels.ERROR, 'Attempt to retrieve question but id not found: ' + id, true);
		
		return undefined;
	},
	
	asArray: function() {
		return _.toArray(this.answers);
	}
}
