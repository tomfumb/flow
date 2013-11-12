Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	reset: function(data) {
		
		var outcomeProperties, outcome;
		
		_.each(data.outcomes, function(outcomeProperties) {
			
			outcome = this.add(this.ensureIdAvailable(outcomeProperties.title, outcomeProperties.id));
			outcome.set('description', outcomeProperties.description);
			outcome.set('url', outcomeProperties.url);
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
	
	checkAvailableOutcomes: function(questions) {
	
		var changed = false;
		var localAvailableOutcomeIdsObj = {};
		var localAvailableOutcomeIdsArr = [];
		
		_.each(questions.models, function(question) {
			this.getOutcomeIdsFromQuestion(question, localAvailableOutcomeIdsObj);
		}, this);
		
		_.each(localAvailableOutcomeIdsObj, function(key, value) {
			localAvailableOutcomeIdsArr.push(this.get(key));
		}, this);
		
		if(this.availableOutcomes) {
			if(localAvailableOutcomeIdsArr.join('') !== this.availableOutcomes.join('')) {
				changed = true;
			}
		}
		else {
			changed = true;
		}
		
		
		
		// seem to be having issues here - possible that this function is being called too many times (by what?)
		// seems that outcomes array is not being correctly populated as
		// event handler is seeing id: undefined
		
		
		
		if(changed) {
		
			this.availableOutcomes = localAvailableOutcomeIdsArr;
			var outcomes = [];
			
			_.each(this.availableOutcomes, function(outcomeId) {
				outcomes.push(this.get(outcomeId));
			}, this);
			
			this.trigger('availableOutcomesUpdated', outcomes);
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
