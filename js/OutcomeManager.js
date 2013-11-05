Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,

	getByTitle: function(title) {
		return this.get(Flow.Util.getIdFromText(title));
	}
}));
