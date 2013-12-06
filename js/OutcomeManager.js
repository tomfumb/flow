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
		
		Flow.Log.debug('OutcomeManager.checkAvailableOutcomes');
		
		_.each(this.models, function(model) {
			
			var condition = model.get('condition'), depends = model.get('depends');
			if(condition && depends) {
				
				var argument = _.indexBy(questions.models, function(question) {
					return question.get('id');
				});
				
				var available = condition.apply(this, [argument]);
				
				model.set('available', available);
			}
		}, this);
	}
}));
