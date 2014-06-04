define(['flow/Log'], function(Log) {

	return {

		location: function(q1, q2a, q2b, relevantCountries, caller) {

			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				return true;
			}
			
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				return true;
			}

			Log.info(this.getOutcomeIdentifier(caller) + ' does not have relevant location (q1, q2a & q2b)');
			return false;
		},
		
		singleDate: function(q1, q2b, q3, relevantCountries, caller) {
			
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				(q1.isNotAnswered() || (q2b.isAvailable() && q2b.isNotAnswered()) || q3.isNotAnswered()) ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates))) {
					
				return true;
			}
			
			Log.info(this.getOutcomeIdentifier(caller) + ' does not have relevant date (q1, q2b, q3)');
			return false;
		},
		
		abuses: function(q6, relevantAbuses, caller) {
			
			if(q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses)) {
				return true;
			}
			
			Log.info(this.getOutcomeIdentifier(caller) + ' does not have relevant abuses (q6)');
			return false;
		},
		
		abusers: function(q10, relevantAbusers, caller) {
		
			if(q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers)) {
				return true;
			}
			
			Log.info(this.getOutcomeIdentifier(caller) + ' does not have relevant abusers (q10)');
			return false;
		},
		
		domesticExhausted: function(q14a, q14b, q14c, relevantActionOutcomes, caller) {
		
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				
				return true;
			}
			
			Log.info(this.getOutcomeIdentifier(caller) + ' eliminated as domestic remedies not exhausted (q14a, q14b, q14c)');
			return false;
		},

		getOutcomeIdentifier: function(outcome) {
			return outcome.get('selector').attr('id').replace(/^ccij_outcome_/i, '');
		}
	};
});
