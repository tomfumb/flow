Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising OutcomeManager');
		
		this.on('reset', _.bind(this.onReset, this));
	},
	
	onReset: function() {
		
		var selector;
		_.each(this.models, function(model) {
			
			model.set('id', Flow.Util.generateId());
			selector = model.get('selector');
			
			model.set('title', selector.find('.outcome-title').html());
			model.set('abbreviation', (selector.find('.outcome-abbreviation').html() || model.get('title').substring(0, 7) + '...'));
			model.set('url', selector.find('.outcome-url').html());
			model.set('description', selector.find('.outcome-description').html());
			model.set('image', selector.find('img').attr('src'));		
			
			model.set('available', true);	
		}, this);
	},
	
	checkAvailableOutcomes: function(questions, answeredQuestion) {
		
		var answeredQuestionId = (answeredQuestion ? answeredQuestion.get('id') : false);
		
		_.each(this.models, function(outcome) {
			
			var condition = outcome.get('condition'), depends, relevantQuestions = [];
			if(typeof condition === 'function') {
				
				depends = outcome.get('depends');
				if(depends) {
					
					// if an answered question was provided then only re-evaluate outcomes that depend on this question
					if(answeredQuestionId === false || (_.indexOf(depends, answeredQuestionId) > -1)) {
					
						_.each(depends, function(questionId) {
							relevantQuestions.push(questions.get(questionId));
						});
					
						if(relevantQuestions.length) {
							var available = condition.apply(this, relevantQuestions);
							outcome.set('available', available);
						}
					}
				}
			}
		}, this);
	}
}));
