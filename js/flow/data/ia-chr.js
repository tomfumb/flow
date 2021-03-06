define(['jquery', 'data/outcome-common'], function($, Common) {

	return {
		/* Inter-American Commission of Human Rights */
		selector: $('#ccij_outcome_ia_chr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {

			var relevantCountries = [
				{country: "Argentina", date: "1984/08/14"},
				{country: "Bahamas, The", date: "1982/03/03"},
				{country: "Barbados", date: "1981/11/05"},
				{country: "Antigua and Barbuda", date: "1981/12/03"},
				{country: "Belize", date: "1991/01/08"},
				{country: "Bolivia", date: "1979/06/20"},
				{country: "Brazil", date: "1992/07/09"},
				{country: "Canada", date: "1990/01/08"},
				{country: "Chile", date: "1990/08/10"},
				{country: "Colombia", date: "1978/07/18"},
				{country: "Costa Rica", date: "1978/07/18"},
				{country: "Dominica", date: "1993/06/03"},
				{country: "Dominican Republic", date: "1978/07/18"},
				{country: "Ecuador", date: "1978/07/18"},
				{country: "El Salvador", date: "1978/07/18"},
				{country: "Grenada", date: "1978/07/18"},
				{country: "Guatemala", date: "1978/07/18"},
				{country: "Guyana", date: "1991/01/08"},
				{country: "Haiti", date: "1978/07/18"},
				{country: "Honduras", date: "1978/07/18"},
				{country: "Jamaica", date: "1978/07/19"},
				{country: "Mexico", date: "1981/03/02"},
				{country: "Nicaragua", date: "1979/09/25"},
				{country: "Panama", date: "1978/07/18"},
				{country: "Paraguay", date: "1989/08/18"},
				{country: "Peru", date: "1978/07/12"},
				{country: "Saint Kitts and Nevis", date: "1984/03/12"},
				{country: "Saint Lucia", date: "1979/05/22"},
				{country: "Saint Vincent and the Grenadines", date: "1981/12/03"},
				{country: "Suriname", date: "1987/11/12"},
				{country: "Trinidad and Tobago", date: "1991/04/03"},
				{country: "United States of America", date: "1951/06/19"},
				{country: "Uruguay", date: "1985/03/26"},
				{country: "Venezuela", date: "1978/07/18"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
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
