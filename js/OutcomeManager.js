Flow.OutcomeManager = new (Backbone.Collection.extend({

	model: Flow.Outcome,
	
	reset: function(data) {
		
		var outcomeProperties, outcome;
		
		_.each(data.outcomes, function(outcomeProperties) {
			
			outcome = this.add(this.ensureIdAvailable(outcomeProperties.title, outcomeProperties.id));
			outcome.set('description', outcomeProperties.description);
			outcome.set('url', outcomeProperties.url);
		}, this);
		
		// overriding reset function means crucial event doesn't get thrown
		this.trigger('reset');
	},
	
	ensureIdAvailable: function(title, id) {
		id = (typeof id === 'undefined' ? Flow.Util.getIdFromText(title) : id);
		return {title: title, id: id};
	},

	getByTitle: function(title) {
		return this.get(Flow.Util.getIdFromText(title));
	},
	
	checkAvailableOutcomes: function(questions) {
	
		var changed = false;
		var localAvailableOutcomes = [];
		
		_.each(this.models, function(outcome) {
		
			// logic to determine if an outcome is still available, based on answered questions
			
			if(true) {
				localAvailableOutcomes.push(outcome.id);
			}
			
		}, this);
		
		if(this.availableOutcomes && this.availableOutcomes.length) {
			if(localAvailableOutcomes.join('') !== this.availableOutcomes.join('')) {
				changed = true;
			}
		}
		else {
			changed = true;
		}
		
		if(changed) {
		
			this.availableOutcomes = localAvailableOutcomes;
			var outcomes = [];
			
			_.each(this.availableOutcomes, function(outcomeId) {
				outcomes.push(this.get(outcomeId));
			}, this);
			
			this.trigger('availableOutcomesUpdated', outcomes);
		}
	}
}));
