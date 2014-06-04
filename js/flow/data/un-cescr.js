define(['jquery', 'data/outcome-common'], function($, Common) {
	
	return {
		/* U.N. Committee on Economic, Social and Cultural Rights (CESCR) */
		selector: $('#ccij_outcome_un_cescr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Argentina", date: "2011/10/24"},
				{country: "Bolivia", date: "2012/01/13"},
				{country: "Bosnia and Herzegovina", date: "2012/01/18"},
				{country: "Ecuador", date: "2010/06/11"},
				{country: "El Salvador", date: "2011/09/20"},
				{country: "Finland", date: "2014/01/31"},
				{country: "Gabon", date: "2014/04/01"},
				{country: "Mongolia", date: "2010/07/01"},
				{country: "Montenegro", date: "2013/09/24"},
				{country: "Portugal", date: "2013/01/28"},
				{country: "Slovakia", date: "2012/03/07"},
				{country: "Spain", date: "2010/09/23"},
				{country: "Uruguay", date: "2013/02/05"}
			];
			
			var relevantAbuses = ['Enslavement', 'Persecution on political, racial, or religious grounds'];
			
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
			
			// exit if another remedy sought
			if(q15.hasAnswer('Yes')) {
				return false;
			}
			
			return true;
		}
	};
});
