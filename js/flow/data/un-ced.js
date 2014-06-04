define(['jquery', 'data/outcome-common'], function($, Common) {
	
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
			if(!Common.location(q1, q2a, q2b, relevantCountries, this)) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			if(!Common.singleDate(q1, q2b, q3, relevantCountries, this)) {
				return false;
			}
			
			// check for covered abuses
			if(!Common.abuses(q6, relevantAbuses, this)) {
				return false;
			}

			// check for covered abusers
			if(!Common.abusers(q10, relevantAbusers, this)) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			if(!Common.domesticExhausted(q14a, q14b, q14c, relevantActionOutcomes, this)) {
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
