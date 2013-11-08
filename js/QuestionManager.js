Flow.QuestionManager = new (Backbone.Collection.extend({
	
	model: Flow.Question,
	
	reset: function(data, AnswerCollection, OutcomeManager) {
		
		var questionProperties, question, answerProperties, answer, next;
	
		// create the answers iterator function as a literal outside the questions loop, to avoid re-defining the function
		var createAnswers = function(answerProperties) {
			
			answer = AnswerCollection.add({text: answerProperties.text, value: answerProperties.value});
			answer.setNextInfo(answerProperties.next.nextType, answerProperties.next.identifierType, answerProperties.next.identifier);
			
			question.addAnswer(answer);
		};
	
		_.each(data.questions, function(questionProperties) {
			
			question = this.add(this.ensureIdAvailable(questionProperties.title, questionProperties.id));
			question.set('content', questionProperties.content);
			
			_.each(questionProperties.answers.options, createAnswers);
		}, this);
	
		_.each(AnswerCollection.toArray(), function(answer) {
		
			next = undefined;
				
			switch(answer.nextInfo.nextType) {
				case Flow.Question.prototype.nextTypes.OUTCOME:
					switch(answer.nextInfo.identifierType) {
						case Flow.Outcome.prototype.identifierTypes.TITLE:
							next = OutcomeManager.getByTitle(answer.nextInfo.identifier);
							break;
						case Flow.Outcome.prototype.identifierTypes.ID:
							next = OutcomeManager.get(answer.nextInfo.identifier);
							break;
						default:
							break;
					}
					break;
				case Flow.Question.prototype.nextTypes.QUESTION:
					switch(answer.nextInfo.identifierType) {
						case Flow.Question.prototype.identifierTypes.TITLE:
							next = this.getByTitle(answer.nextInfo.identifier);
							break;
						case Flow.Question.prototype.identifierTypes.ID:
							next = this.get(answer.nextInfo.identifier);
							break;
						default:
							break;
					}
					break;
				default:
					log(logLevels.ERROR, 'Answer created with invalid nextType, id: ' + answer.id, true);
					break;
			}
					
			if(next) {
				next.addPrecedingAnswer(answer);
			}
			
			answer.next = next;
		}, this);
		
		// overriding reset function means crucial event doesn't get thrown
		this.trigger('reset');
	},
	
	ensureIdAvailable: function(title, id) {
		id = (typeof id === 'undefined' ? Flow.Util.getIdFromText(title) : id);
		return {title: title, id: id};
	},
	
	getByTitle: function(title) {
		return this.get(Flow.Util.getIdFromText(title));
	},
	
	readyForFirstQuestion: function() {
		this.trigger('nextQuestionAvailable', this.at(0));
	}
}));
