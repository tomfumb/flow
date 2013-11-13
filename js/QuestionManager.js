Flow.QuestionManager = new (Backbone.Collection.extend({
	
	model: Flow.Question,
	
	reset: function(data, AnswerCollection, OutcomeManager) {

		Flow.Log.debug('QuestionManager.reset');		
		var questionProperties, question, answerProperties, answer, next, nextInfo;
	
		// create the answers iterator function as a literal outside the questions loop, to avoid re-defining the function
		var createAnswers = function(answerProperties) {
			
			answer = AnswerCollection.add({id: Flow.Util.generateId(), text: answerProperties.text, value: answerProperties.value});
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
			nextInfo = answer.get('nextInfo');
			switch(nextInfo.nextType) {
				case Flow.Question.prototype.nextTypes.OUTCOME:
					switch(nextInfo.identifierType) {
						case Flow.Outcome.prototype.identifierTypes.TITLE:
							next = OutcomeManager.getByTitle(nextInfo.identifier);
							break;
						case Flow.Outcome.prototype.identifierTypes.ID:
							next = OutcomeManager.get(nextInfo.identifier);
							break;
						default:
							break;
					}
					break;
				case Flow.Question.prototype.nextTypes.QUESTION:
					switch(nextInfo.identifierType) {
						case Flow.Question.prototype.identifierTypes.TITLE:
							next = this.getByTitle(nextInfo.identifier);
							break;
						case Flow.Question.prototype.identifierTypes.ID:
							next = this.get(nextInfo.identifier);
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
			
			answer.set('next', next);
		}, this);
		
		// overriding reset function means crucial event doesn't get thrown
		Flow.Log.debug('OutcomeManager triggering reset');	
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
		
		Flow.Log.debug('QuestionManager triggering nextQuestionAvailable');		
		this.trigger('nextQuestionAvailable', this.at(0));
	},
	
	setAnswer: function(answer) {
		
		Flow.Log.debug('QuestionManager.setAnswer');		
		answer.setSelected();
		
		Flow.Log.debug('QuestionManager triggering questionAnswered');		
		this.trigger('questionAnswered', answer.get('question'), answer);
		
		// reset any downstream questions in case the user has back-tracked
		var list = [], changed = false;
		this.getFollowingAnsweredQuestions(answer, list);
		_.each(list, function(question) {
			question.set('selectedAnswer', undefined);
			changed = true;
		});
		
		if(changed) {
			Flow.Log.debug('QuestionManager triggering downstreamQuestionsReset');		
			this.trigger('downstreamQuestionsReset');
		}
		
		switch(answer.get('nextInfo').nextType) {
			case Flow.Question.prototype.nextTypes.QUESTION:
				Flow.Log.debug('QuestionManager triggering nextQuestionAvailable');		
				this.trigger('nextQuestionAvailable', answer.get('next'));
				break;
			case Flow.Question.prototype.nextTypes.OUTCOME:
				Flow.Log.debug('QuestionManager triggering outcomeReached');		
				this.trigger('outcomeReached', answer.get('next'));
				break;
		}
	},
	
	getFollowingAnsweredQuestions: function(answer, list) {
			
		var next, selectedAnswer;
		if(answer.get('nextInfo').nextType === Flow.Question.prototype.nextTypes.QUESTION) {
			next = answer.get('next');
			selectedAnswer = next.get('selectedAnswer');
			if(typeof selectedAnswer !== 'undefined') {
				list.push(next);
				this.getFollowingAnsweredQuestions(selectedAnswer, list);
			}
		}
	}
}));
