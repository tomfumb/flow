define(['jquery', 'data/outcome-common'], function($, Common) {
	
	return {
		selector: $('#ccij_outcome_un_hrc'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Albania", date: "2007/10/04"},
				{country: "Algeria", date: "1989/09/12"},
				{country: "Andorra", date: "2006/09/22"},
				{country: "Angola", date: "1992/01/10"},
				{country: "Argentina", date: "1986/08/08"},
				{country: "Armenia", date: "1993/06/23"},
				{country: "Australia", date: "1991/09/25"},
				{country: "Austria", date: "1987/12/10"},
				{country: "Azerbaijan", date: "2001/11/27"},
				{country: "Barbados", date: "1973/01/05"},
				{country: "Belarus", date: "1992/09/30"},
				{country: "Belgium", date: "1994/05/17"},
				{country: "Benin", date: "1992/03/12"},
				{country: "Bolivia", date: "1982/08/12"},
				{country: "Bosnia and Herzegovina", date: "1995/03/01"},
				{country: "Brazil", date: "2009/09/25"},
				{country: "Bulgaria", date: "1992/03/26"},
				{country: "Burkina Faso", date: "1999/01/04"},
				{country: "Cameroon", date: "1984/06/27"},
				{country: "Canada", date: "1976/05/19"},
				{country: "Cape Verde", date: "2000/05/19"},
				{country: "Central African Republic", date: "1981/05/08"},
				{country: "Chad", date: "1995/06/09"},
				{country: "Chile", date: "1992/05/27"},
				{country: "Colombia", date: "1969/10/29"},
				{country: "Congo, Democratic Republic of the", date: "1976/11/01"},
				{country: "Congo, Republic of the", date: "1983/10/05"},
				{country: "Costa Rica", date: "1968/11/29"},
				{country: "Cote d'Ivoire", date: "1997/03/05"},
				{country: "Croatia", date: "1995/10/12"},
				{country: "Cyprus", date: "1992/04/15"},
				{country: "Czech Republic", date: "1993/02/22"},
				{country: "Denmark", date: "1972/01/06"},
				{country: "Djibouti", date: "2002/11/05"},
				{country: "Dominican Republic", date: "1978/01/04"},
				{country: "Ecuador", date: "1969/03/06"},
				{country: "El Salvador", date: "1995/06/06"},
				{country: "Equatorial Guinea", date: "1987/09/25"},
				{country: "Estonia", date: "1991/10/21"},
				{country: "Finland", date: "1975/08/19"},
				{country: "France", date: "1984/02/17"},
				{country: "Gambia, The", date: "1988/06/09"},
				{country: "Georgia", date: "1994/05/03"},
				{country: "Germany", date: "1993/08/25"},
				{country: "Ghana", date: "2000/09/07"},
				{country: "Greece", date: "1997/05/05"},
				{country: "Guatemala", date: "2000/11/28"},
				{country: "Guinea", date: "1993/06/17"},
				{country: "Guinea-Bissau", date: "2013/09/24"},
				{country: "Guyana", date: "1999/01/05"},
				{country: "Honduras", date: "2005/06/07"},
				{country: "Hungary", date: "1988/09/07"},
				{country: "Iceland", date: "1979/08/22"},
				{country: "Ireland", date: "1989/12/08"},
				{country: "Italy", date: "1978/09/15"},
				{country: "Kazakhstan", date: "2009/06/30"},
				{country: "Korea, South", date: "1990/04/10"},
				{country: "Kyrgyzstan", date: "1994/10/07"},
				{country: "Latvia", date: "1994/06/22"},
				{country: "Lesotho", date: "2000/09/06"},
				{country: "Libya", date: "1989/05/16"},
				{country: "Liechtenstein", date: "1998/12/10"},
				{country: "Lithuania", date: "1991/11/20"},
				{country: "Luxembourg", date: "1983/08/18"},
				{country: "Macedonia", date: "1994/12/12"},
				{country: "Madagascar", date: "1971/06/21"},
				{country: "Malawi", date: "1996/06/11"},
				{country: "Maldives", date: "2006/09/19"},
				{country: "Mali", date: "2001/10/24"},
				{country: "Malta", date: "1990/09/13"},
				{country: "Mauritius", date: "1973/12/12"},
				{country: "Mexico", date: "2002/03/15"},
				{country: "Mongolia", date: "1991/04/16"},
				{country: "Montenegro", date: "2006/10/23"},
				{country: "Moldova", date: "2008/01/23"},
				{country: "Namibia", date: "1994/11/28"},
				{country: "Nepal", date: "1991/05/14"},
				{country: "Netherlands", date: "1978/12/11"},
				{country: "New Zealand", date: "1989/05/26"},
				{country: "Nicaragua", date: "1980/03/12"},
				{country: "Niger", date: "1986/03/07"},
				{country: "Norway", date: "1972/09/13"},
				{country: "Panama", date: "1977/03/08"},
				{country: "Paraguay", date: "1995/01/10"},
				{country: "Peru", date: "1980/10/03"},
				{country: "Philippines", date: "1989/08/22"},
				{country: "Poland", date: "1991/11/07"},
				{country: "Portugal", date: "1983/05/03"},
				{country: "Romania", date: "1993/07/20"},
				{country: "Russia", date: "1991/10/01"},
				{country: "Saint Vincent and the Grenadines", date: "1981/11/09"},
				{country: "San Marino", date: "1985/10/18"},
				{country: "Senegal", date: "1978/02/13"},
				{country: "Serbia", date: "2001/09/06"},
				{country: "Seychelles", date: "1992/05/05"},
				{country: "Sierra Leone", date: "1996/08/23"},
				{country: "Slovakia", date: "1993/05/28"},
				{country: "Slovenia", date: "1993/07/16"},
				{country: "Somalia", date: "1990/01/24"},
				{country: "South Africa", date: "2002/08/28"},
				{country: "Spain", date: "1985/01/25"},
				{country: "Sri Lanka", date: "1997/10/03"},
				{country: "Suriname", date: "1976/12/28"},
				{country: "Sweden", date: "1971/12/06"},
				{country: "Tajikistan", date: "1999/01/04"},
				{country: "Togo", date: "1988/03/30"},
				{country: "Trinidad and Tobago", date: "1978/12/21"},
				{country: "Tunisia", date: "2011/06/29"},
				{country: "Turkey", date: "2006/11/24"},
				{country: "Turkmenistan", date: "1997/05/01"},
				{country: "Uganda", date: "1995/11/14"},
				{country: "Ukraine", date: "1991/07/25"},
				{country: "Uruguay", date: "1970/04/01"},
				{country: "Uzbekistan", date: "1995/09/28"},
				{country: "Venezuela", date: "1978/05/10"},
				{country: "Zambia", date: "1984/04/10"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Disappearance', 'Electric shock', 'Forced nudity', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
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
