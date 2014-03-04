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
		
		this.on('reset', _.bind(this.onReset, this));
	},
	
	onReset: function() {
		
		this.indexedQuestions = _.indexBy(this.models, function(question) {
			return question.get('id');
		});
		
		_.each(this.models, function(model) {
			
			var condition = model.get('condition');
			
			if(typeof condition === 'function') {
				model.set('available', condition.apply(this, [this.indexedQuestions]));
			}
			else {
				model.set('available', true);
			}
		}, this);
	},
	
	readyForFirstQuestion: function() {
		Flow.Log.debug('QuestionManager triggering start');		
		this.trigger('start');
	},
	
	checkAvailableQuestions: function() {
		
		Flow.Log.debug('QuestionManager.checkAvailableQuestions');
		
		var changedQuestions = [];
	
		_.each(this.models, function(question) {
			
			var condition = question.get('condition');
			if(typeof condition === 'function') {
				
				var available = condition.apply(this, [this.indexedQuestions]);
				
				// coercive comparison in case property started as undefined
				if(available != question.get('available')) {
					changedQuestions.push(question);
				}
				
				question.set('available', available);
			}
		}, this);
		
		return changedQuestions;
	}
}))();
