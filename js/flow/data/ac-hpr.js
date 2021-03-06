define(['jquery', 'data/outcome-common'], function($, Common) {
	return {
		/* African Commission on Human and Peoples' Rights */
		selector: $('#ccij_outcome_acm_hpr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Algeria", date: "1987/03/01"},
				{country: "Angola", date: "1990/03/02"},
				{country: "Benin", date: "1986/01/20"},
				{country: "Botswana", date: "1986/07/17"},
				{country: "Burkina Faso", date: "1984/07/06"},
				{country: "Burundi", date: "1989/07/28"},
				{country: "Cameroon", date: "1989/06/20"},
				{country: "Central African Republic", date: "1986/04/26"},
				{country: "Cape Verde", date: "1987/06/02"},
				{country: "Chad", date: "1986/10/09"},
				{country: "Cote d'Ivoire", date: "1992/01/06"},
				{country: "Comoros", date: "1986/06/01"},
				{country: "Congo, Republic of the", date: "1982/12/09"},
				{country: "Djibouti", date: "1991/11/11"},
				{country: "Congo, Democratic Republic of the", date: "1987/07/20"},
				{country: "Egypt", date: "1984/03/20"},
				{country: "Equatorial Guinea", date: "1986/04/07"},
				{country: "Eritrea", date: "1999/01/14"},
				{country: "Ethiopia", date: "1998/06/15"},
				{country: "Gabon", date: "1986/02/20"},
				{country: "Gambia, The", date: "1983/06/08"},
				{country: "Ghana", date: "1989/01/24"},
				{country: "Guinea-Bissau", date: "1985/12/04"},
				{country: "Guinea", date: "1982/02/16"},
				{country: "Kenya", date: "1992/01/23"},
				{country: "Libya", date: "1986/07/19"},
				{country: "Lesotho", date: "1992/02/10"},
				{country: "Liberia", date: "1982/08/04"},
				{country: "Madagascar", date: "1992/03/09"},
				{country: "Mali", date: "1981/12/21"},
				{country: "Malawi", date: "1989/11/17"},
				{country: "Mozambique", date: "1989/02/22"},
				{country: "Mauritania", date: "1986/06/14"},
				{country: "Mauritius", date: "1992/06/19"},
				{country: "Namibia", date: "1992/07/30"},
				{country: "Nigeria", date: "1983/06/22"},
				{country: "Niger", date: "1986/07/15"},
				{country: "Rwanda", date: "1983/07/15"},
				{country: "South Africa", date: "1996/07/09"},
				{country: "Sahrawi Arab Democratic Republic (Western Sahara)", date: "1986/05/02"},
				{country: "Senegal", date: "1982/08/13"},
				{country: "Seychelles", date: "1992/04/13"},
				{country: "Sierra Leone", date: "1983/09/21"},
				{country: "Somalia", date: "1985/07/31"},
				{country: "Sao Tome and Principe", date: "1986/05/23"},
				{country: "Sudan", date: "1986/02/18"},
				{country: "Swaziland", date: "1995/09/15"},
				{country: "Tanzania", date: "1984/02/18"},
				{country: "Togo", date: "1982/11/05"},
				{country: "Tunisia", date: "1983/03/16"},
				{country: "Uganda", date: "1986/05/10"},
				{country: "Zambia", date: "1984/01/10"},
				{country: "Zimbabwe", date: "1986/05/30"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Disappearance', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
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
