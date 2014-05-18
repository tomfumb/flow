define(['flow/Log'], function(Log) {

	return {
		
		
		// example usage
		/*
			// check relevant country(ies) selected
			if(!Common.location(q1, q2a, q2b, relevantCountries, this)) {
				return false;
			}
		*/

		location: function(q1, q2a, q2b, relevantCountries, caller) {

			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				return true;
			}
			
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				return true;
			}

			// no relevant country(ies)
			Log.info(this.getOutcomeIdentifier(caller) + ' does not have relevant location (q1, q2a & q2b)');
			return false;
		},

		getOutcomeIdentifier: function(outcome) {
			return outcome.get('selector').attr('id').replace(/^ccij_outcome_/i, '');
		}
	};
});
