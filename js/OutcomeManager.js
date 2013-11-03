Flow.OutcomeManager = {
	
	count: 0,
	outcomes: {},

	addOutcome: function(title, id) {
		
		var outcome = new Flow.Outcome(title, id);
		outcome.index = this.count++;
		
		if(Flow.Util.idAlreadyExists(outcome.id)) {
			Flow.Log.log(Flow.Log.logLevels.ERROR, 'Attempt to add outcome with duplicate id: ' + outcome.id, true);
		}
		else {
			this.outcomes[outcome.id] = outcome;
		}
		
		return outcome;
	},

	getOutcomeByTitle: function(title) {
		return this.getOutcomeById(Flow.Util.getIdFromText(title));
	},

	getOutcomeById: function(id) {
		
		if(this.outcomes.hasOwnProperty(id)) {
			return this.outcomes[id];
		}
		
		Flow.Log.log(Flow.Log.logLevels.ERROR, 'Attempt to retrieve outcome but id not found: ' + id, true);
		
		return undefined;
	},
	
	asArray: function() {
		return _.toArray(this.outcomes);
	}
}
