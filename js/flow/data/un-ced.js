define(['jquery'], function($) {
	
	return {
		/* U.N. Committee on Enforced Disappearances (CED) */
		selector: $('#ccij_outcome_un_ced'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [{country: "Albania", date: "2007/11/08"},
				{country: "Argentina", date: "2008/06/11"},
				{country: "Austria", date: "2012/06/07"},
				{country: "Belgium", date: "2011/06/02"},
				{country: "Bosnia and Herzegovina", date: "2012/12/30"},
				{country: "Chile", date: "2009/12/08"},
				{country: "Ecuador", date: "2009/10/20"},
				{country: "France", date: "2008/12/09"},
				{country: "Germany", date: "2009/09/24"},
				{country: "Lithuania", date: "2013/08/14"},
				{country: "Mali", date: "2010/02/02"},
				{country: "Montenegro", date: "2011/09/20"},
				{country: "Netherlands", date: "2011/03/23"},
				{country: "Portugal", date: "2014/01/27"},
				{country: "Serbia", date: "2011/05/18"},
				{country: "Spain", date: "2011/01/05"},
				{country: "Uruguay", date: "2009/03/04"}
			];
			
			var relevantAbuses = ['Disappearance', 'Kidnapping', 'Incommunicado detention'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			var proceed;
			
			// check relevant country(ies) selected
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			
			// exit if no relevant country(ies)
			if(!proceed) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			proceed = false;
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				q3.isNotAnswered() ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			} 
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			proceed = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				proceed = true;
			}
			// exit if domestic remedy reached a particular outcome	
			if(!proceed) {
				return false;
			}
			
			// check whether other international remedies sought
			proceed = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!proceed) {
				return false;
			}
			
			return true;
		}
	};
});
