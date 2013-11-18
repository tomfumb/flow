Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	reset: function(data) {
		
		Flow.Log.debug('OutcomeManager.reset');		
		var outcomeProperties, outcome;
		
		_.each(data.outcomes, function(outcomeProperties) {
			
			outcome = this.add(this.ensureIdAvailable(outcomeProperties.title, outcomeProperties.id));
			outcome.set('description', outcomeProperties.description);
			outcome.set('url', outcomeProperties.url);
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
	
	checkAvailableOutcomes: function(questions) {
	
		Flow.Log.debug('OutcomeManager.checkAvailableOutcomes');	
		var changed = true;
		var localAvailableOutcomeIdsObj = {};
		var localAvailableOutcomeIdsArr;
		
		_.each(questions.models, function(question) {
			this.getOutcomeIdsFromQuestion(question, localAvailableOutcomeIdsObj);
		}, this);
		
		localAvailableOutcomeIdsArr = _.keys(localAvailableOutcomeIdsObj);
		if(this.availableOutcomes) {
			if(localAvailableOutcomeIdsArr.join('') === this.availableOutcomes.join('')) {
				changed = false;
			}
		}	
		
		if(changed) {
		
			this.availableOutcomes = localAvailableOutcomeIdsArr;
			var outcomes = [], id;
			
			_.each(this.models, function(outcome) {
				
				id = outcome.get('id');
				outcome.set('available', (localAvailableOutcomeIdsObj.hasOwnProperty(id)));
				
				outcomes.push(outcome);
			}, this);
			
			Flow.Log.debug('OutcomeManager triggering availableOutcomesUpdated');	
			this.trigger('availableOutcomesUpdated', outcomes, this.availableOutcomes.length);
		}
		else {
			Flow.Log.debug('OutcomeManager not triggering availableOutcomesUpdated');	
		}
	},
	
	getOutcomeIdsFromQuestion: function(question, outcomeIds) {
		
		var selectedAnswer = question.get('selectedAnswer'), answers = [];
		if(selectedAnswer) {
			answers.push(selectedAnswer);
		}
		else {
			_.each(question.get('answers'), function(answer) {
				answers.push(answer);
			});
		}
	
		_.each(answers, function(answer) {
			if(answer.get('nextInfo').nextType === 'outcome') {
				outcomeIds[answer.get('next').id] = true;
			}
			else if (answer.get('nextInfo').nextType === 'question') {
				this.getOutcomeIdsFromQuestion(answer.get('next'), outcomeIds);
			}
		}, this);
	},
	
	getPathForOutcome: function(outcome) {
		
		Flow.Log.debug('OutcomeManager.getPathForOutcome');	
		if(typeof outcome === 'string') {
			outcome = this.get(outcome);
		}
		
		var answersToOutcome = outcome.get('precedingAnswers'), levelsFromOutcome = [];
		this.addQuestionsToOutcomePath(answersToOutcome, levelsFromOutcome);
		
		return levelsFromOutcome;
	},
	
	addQuestionsToOutcomePath: function(answersToOutcome, levelsFromOutcome) {
		
		var thisLevelIndex = levelsFromOutcome.length;
		levelsFromOutcome.push({});
		var question;
		_.each(answersToOutcome, function(answerToOutcome) {
		
			question = {};
			
			$.extend(true, question, answerToOutcome.question);
			
			if(!levelsFromOutcome[thisLevelIndex].hasOwnProperty(question.id)) {
				question.resetAnswers();
				levelsFromOutcome[thisLevelIndex][question.id] = question;
			}
			
			question.addAnswer(answerToOutcome);
			
			var precedingAnswers = question.get('precedingAnswers');
			if(precedingAnswers.length) {
				this.addQuestionsToOutcomePath(precedingAnswers, levelsFromOutcome);
			}
		}, this);
	}
}));
