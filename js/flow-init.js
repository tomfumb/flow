$(function() {
	
	var data = Flow.config, logLevels = Flow.Log.logLevels, log = Flow.Log.log, QuestionManager = Flow.QuestionManager, OutcomeManager = Flow.OutcomeManager, AnswerCollection = Flow.AnswerCollection;
	
	if(!(data && data.questions && data.outcomes)) {
		log(logLevels.ERROR, 'Reached flow-init script without adequate Flow.config', true);
		return;
	}
	
	var outcomeProperties, outcome;
	
	_.each(data.outcomes, function(outcomeProperties) {
		
		outcome = OutcomeManager.addOutcome(outcomeProperties.title);
		outcome.description = outcomeProperties.description;
		outcome.url = outcomeProperties.url;
	});
	
	var questionProperties, question, answerProperties, answer, next;
	
	// create the answers iterator function as a literal outside the questions loop, to avoid re-defining the function
	var createAnswers = function(answerProperties) {
		
		answer = question.addAnswer(answerProperties.text, answerProperties.value);
		answer.setNextInfo(answerProperties.next.nextType, answerProperties.next.identifierType, answerProperties.next.identifier);
		AnswerCollection.addAnswer(answer);
	};
	
	_.each(data.questions, function(questionProperties) {
		
		question = QuestionManager.addQuestion(questionProperties.title);
		
		if(typeof questionProperties.content !== 'undefined') {
			question.content = questionProperties.content;
		}
		
		_.each(questionProperties.answers.options, createAnswers);
	});
	
	_.each(AnswerCollection.asArray(), function(answer) {
		
		next = undefined;
			
		switch(answer.nextInfo.nextType) {
			case Flow.Question.prototype.nextTypes.OUTCOME:
				switch(answer.nextInfo.identifierType) {
					case Flow.Outcome.prototype.identifierTypes.TITLE:
						next = OutcomeManager.getOutcomeByTitle(answer.nextInfo.identifier);
						break;
					case Flow.Outcome.prototype.identifierTypes.ID:
						next = OutcomeManager.getOutcomeById(answer.nextInfo.identifier);
						break;
					default:
						break;
				}
				break;
			case Flow.Question.prototype.nextTypes.QUESTION:
				switch(answer.nextInfo.identifierType) {
					case Flow.Question.prototype.identifierTypes.TITLE:
						next = QuestionManager.getQuestionByTitle(answer.nextInfo.identifier);
						break;
					case Flow.Question.prototype.identifierTypes.ID:
						next = QuestionManager.getQuestionById(answer.nextInfo.identifier);
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
			next.precedingAnswers.push(answer);
		}
		
		answer.next = next;
	});
});
