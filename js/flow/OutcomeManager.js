Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising OutcomeManager');
	
		_.each(this.models, function(model) {
			
			var description = model.get('description');
			if(!description) {
				description = $('#o' + model.get('id')).html();
				model.set('description', description);
				if(!description) {
					Flow.Log.warn('No content available for outcome ' + model.get('id'));
				}
			}
			
			model.set('available', true);			
		}, this);
	},
	
	checkAvailableOutcomes: function(questions) {
		
		var indexedQuestions = _.indexBy(questions, function(question) {
			return question.get('id');
		});
		
		_.each(this.models, function(outcome) {
			
			var condition = outcome.get('condition');
			if(typeof condition === 'function') {
				var available = condition.apply(this, [indexedQuestions]);
				Flow.Log.info('OutcomeManager.checkAvailableOutcomes Setting outcome ' + outcome.get('title') + ' available to ' + available);
				outcome.set('available', available);
			}
		}, this);
	}
}));
