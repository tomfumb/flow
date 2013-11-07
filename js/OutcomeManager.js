Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	reset: function(data) {
		
		var outcomeProperties, outcome;
		
		_.each(data.outcomes, function(outcomeProperties) {
			
			outcome = this.add({title: outcomeProperties.title, id: outcomeProperties.id});
			outcome.description = outcomeProperties.description;
			outcome.url = outcomeProperties.url;
		}, this);
		
		// overriding reset function means crucial event doesn't get thrown
		this.trigger('reset', this);
	},

	getByTitle: function(title) {
		return this.get(Flow.Util.getIdFromText(title));
	}
}));
