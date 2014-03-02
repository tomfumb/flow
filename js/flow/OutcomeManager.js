Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising OutcomeManager');
		
		this.on('reset', _.bind(this.onReset, this));
	},
	
	onReset: function() {
		
		var selector, condition;
		_.each(this.models, function(model) {
			
			model.set('id', Flow.Util.generateId());
			selector = model.get('selector');
			
			model.set('title', selector.find('.outcome-title').html());
			model.set('abbreviation', (selector.find('.outcome-abbreviation').html() || model.get('title').substring(0, 10) + '...'));
			model.set('url', selector.find('.outcome-url').html());
			model.set('description', selector.find('.outcome-description').html());
			model.set('image', selector.find('img').attr('src'));		
			
			model.set('available', true);	
			
			condition = model.get('condition');
			if(condition) {
				
				// extract argument names from condition function, use to derive which questions this outcome is dependent upon
				// non-standard approach but considered necessary to avoid risk of bad configuration leading to poor results
				var conditionStr = condition.toString();
				var open = conditionStr.indexOf('('), close = conditionStr.indexOf(')');
				var args = conditionStr.substring(open + 1, close).match(/\bq\d+([a-z]+)?\b/ig);
				
				if(args) {
					
					var depends = [];
					_.each(args, function(arg) {
						depends.push(arg.replace(/^q/, ''));
					});
					
					model.set('depends', depends);
				}
			}
		}, this);
	},
	
	checkAvailableOutcomes: function(questions, changedQuestions) {
		
		var changed = {added: [], removed: []};
		
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
						
						if(available && !outcome.get('available')) {
							changed.added.push(outcome);
						}
						else if(!available && outcome.get('available')) {
							changed.removed.push(outcome);
						}
						
						outcome.set('available', available);
					}
				}
			}
		}, this);
		
		return changed;
	}
}));
