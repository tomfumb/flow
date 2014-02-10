Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising OutcomeManager');
		
		this.on('reset', _.bind(this.onReset, this));
	},
	
	onReset: function() {
		_.each(this.models, function(model) {
			model.set('id', Flow.Util.generateId());
			if(!model.get('abbreviation')) {
				model.set('abbreviation', model.get('title').substring(0, 7) + '...');
			}
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
