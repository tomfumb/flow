define(['jquery', 'underscore', 'backbone', 'flow/Log', 'flow/Question'], function($, _, Backbone, Log, Question) {
	
	return new (Backbone.Collection.extend({
	
		model: Question,

		initialize: function() {
			
			_.each(this.models, function(model) {
				var content = model.get('content');
				if(!content) {
					content = $('#q' + model.get('id')).html();
					model.set('content', content);
					if(!content) {
						Log.warn('No content available for question ' + model.get('id'));
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
				
				var selector = $('#flow_question_' + model.get('id'));
				model.set('content', selector.find('.question-content').html());
				
				var explanations = [];
				selector.find('.question-explanation').each(function() {
					explanations.push(this.innerHTML);
				});
				
				if(explanations.length) {
					model.set('explanations', explanations);
				}
				
				var condition = model.get('condition');
				if(typeof condition === 'function') {
					model.set('available', condition.apply(this, [this.indexedQuestions]));
				}
				else {
					model.set('available', true);
				}
			}, this);
			
			this.trigger('modelReady');
		},
		
		userReady: function() {
			this.trigger('userReady');
		},
		
		checkAvailableQuestions: function() {
			
			Log.debug('QuestionManager.checkAvailableQuestions');
			
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
});
