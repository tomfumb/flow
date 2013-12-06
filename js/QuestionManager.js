Flow.QuestionManager = new (Backbone.Collection.extend({
	
	model: Flow.Question,

	initialize: function() {
		
		_.each(this.models, function(model) {
			var content = model.get('content');
			if(!content) {
				content = $('#q' + model.get('id')).html();
				model.set('content', content);
				if(!content) {
					Flow.Log.warn('No content available for question ' + model.get('id'));
				}
			}
		}, this);
	},
	
	readyForFirstQuestion: function() {
		Flow.Log.debug('QuestionManager triggering start');		
		this.trigger('start');
	}
}));
