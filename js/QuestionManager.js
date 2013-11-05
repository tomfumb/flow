Flow.QuestionManager = new (Backbone.Collection.extend({
	
	model: Flow.Question,

	getByTitle: function(title) {
		return this.get(Flow.Util.getIdFromText(title));
	}
}));
