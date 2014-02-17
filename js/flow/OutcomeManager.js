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
	
	checkAvailableOutcomes: function(questions, changedQuestions) {
		
		_.each(this.models, function(outcome) {
			
			var condition = outcome.get('condition'), depends = outcome.get('depends'), relevantQuestions = [];
			if(condition && depends) {
					
				var outcomeAffected = false;
				_.each(changedQuestions, function(changedQuestion) {
					if(_.indexOf(depends, changedQuestion.get('id')) > -1) {
						outcomeAffected = true;
						return false;
					}
				});
				
				if(outcomeAffected) {
				
					_.each(depends, function(questionId) {
						relevantQuestions.push(questions.get(questionId));
					});
				
					if(relevantQuestions.length) {
						var available = condition.apply(this, relevantQuestions);
						outcome.set('available', available);
					}
				}
			}
		}, this);
	}
}));
