define(['jquery'], function($) {

	return {
		/* U.N. Committee on Elimination of Discrimination against Women (CEDAW) */
		selector: $('#ccij_outcome_un_cedaw'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {

			var relevantCountries = [
				{country: "Albania", date: "2003/06/23"},
				{country: "Andorra", date: "2002/10/14"},
				{country: "Angola", date: "2007/11/01"},
				{country: "Antigua and Barbuda", date: "2006/06/05"},
				{country: "Argentina", date: "2007/03/20"},
				{country: "Armenia", date: "2006/09/14"},
				{country: "Australia", date: "2008/12/04"},
				{country: "Austria", date: "2000/09/06"},
				{country: "Azerbaijan", date: "2001/06/01"},
				{country: "Bangladesh", date: "2000/09/06"},
				{country: "Belarus", date: "2004/02/03"},
				{country: "Belgium", date: "2004/06/17"},
				{country: "Belize", date: "2002/12/09"},
				{country: "Bolivia", date: "2000/09/27"},
				{country: "Bosnia and Herzegovina", date: "2002/09/04"},
				{country: "Botswana", date: "2007/02/21"},
				{country: "Brazil", date: "2002/06/28"},
				{country: "Bulgaria", date: "2006/09/20"},
				{country: "Burkina Faso", date: "2005/10/10"},
				{country: "Cambodia", date: "2010/10/13"},
				{country: "Cameroon", date: "2005/01/07"},
				{country: "Canada", date: "2002/10/18"},
				{country: "Cape Verde", date: "2001/10/10"},
				{country: "Colombia", date: "2007/01/23"},
				{country: "Cook Islands", date: "2007/11/27"},
				{country: "Costa Rica", date: "2001/09/20"},
				{country: "Cote d'Ivoire", date: "2012/01/20"},
				{country: "Croatia", date: "2001/03/07"},
				{country: "Cyprus", date: "2002/04/26"},
				{country: "Czech Republic", date: "2001/02/26"},
				{country: "Denmark", date: "2000/05/31"},
				{country: "Dominican Republic", date: "2001/08/10"},
				{country: "Ecuador", date: "2002/02/05"},
				{country: "Equatorial Guinea", date: "2009/10/16"},
				{country: "Finland", date: "2002/12/29"},
				{country: "France", date: "2000/06/09"},
				{country: "Gabon", date: "2004/11/05"},
				{country: "Georgia", date: "2002/08/01"},
				{country: "Germany", date: "2002/01/15"},
				{country: "Ghana", date: "2011/02/03"},
				{country: "Greece", date: "2002/01/24"},
				{country: "Guatemala", date: "2002/05/09"},
				{country: "Guinea-Bissau", date: "2009/08/05"},
				{country: "Hungary", date: "2000/12/22"},
				{country: "Iceland", date: "2001/03/06"},
				{country: "Ireland", date: "2000/09/07"},
				{country: "Italy", date: "2000/09/22"},
				{country: "Kazakhstan", date: "2001/08/24"},
				{country: "Kyrgyzstan", date: "2002/07/22"},
				{country: "Lesotho", date: "2004/09/24"},
				{country: "Libya", date: "2004/06/18"},
				{country: "Liechtenstein", date: "2001/10/24"},
				{country: "Lithuania", date: "2004/08/05"},
				{country: "Luxembourg", date: "2003/07/01"},
				{country: "Macedonia", date: "2003/10/17"},
				{country: "Maldives", date: "2006/03/13"},
				{country: "Mali", date: "2000/12/05"},
				{country: "Mauritius", date: "2008/10/31"},
				{country: "Mexico", date: "2002/03/15"},
				{country: "Moldova", date: "2006/02/28"},
				{country: "Mongolia", date: "2002/03/28"},
				{country: "Montenegro", date: "2006/10/23"},
				{country: "Mozambique", date: "2008/11/04"},
				{country: "Namibia", date: "2000/05/26"},
				{country: "Nepal", date: "2007/06/15"},
				{country: "Netherlands", date: "2002/05/22"},
				{country: "New Zealand", date: "2000/09/07"},
				{country: "Niger", date: "2004/09/30"},
				{country: "Nigeria", date: "2004/11/22"},
				{country: "Norway", date: "2002/03/05"},
				{country: "Panama", date: "2001/05/09"},
				{country: "Paraguay", date: "2001/05/14"},
				{country: "Peru", date: "2001/04/09"},
				{country: "Philippines", date: "2003/11/12"},
				{country: "Poland", date: "2003/12/22"},
				{country: "Portugal", date: "2002/04/26"},
				{country: "Romania", date: "2003/08/25"},
				{country: "Russia", date: "2004/07/28"},
				{country: "Rwanda", date: "2008/12/15"},
				{country: "Saint Kitts and Nevis", date: "2006/01/20"},
				{country: "San Marino", date: "2005/09/15"},
				{country: "Senegal", date: "2000/05/26"},
				{country: "Serbia", date: "2003/07/31"},
				{country: "Seychelles", date: "2011/03/01"},
				{country: "Slovakia", date: "2000/11/17"},
				{country: "Slovenia", date: "2004/09/23"},
				{country: "Solomon Islands", date: "2002/05/06"},
				{country: "South Africa", date: "2005/10/18"},
				{country: "South Korea", date: "2006/09/18"},
				{country: "Spain", date: "2001/07/06"},
				{country: "Sri Lanka", date: "2002/10/15"},
				{country: "Sweden", date: "2003/04/24"},
				{country: "Switzerland", date: "2008/09/29"},
				{country: "Tanzania", date: "2006/01/12"},
				{country: "Thailand", date: "2000/06/14"},
				{country: "East Timor", date: "2003/04/16"},
				{country: "Tunisia", date: "2008/09/23"},
				{country: "Turkey", date: "2002/10/29"},
				{country: "Turkmenistan", date: "2009/05/20"},
				{country: "Ukraine", date: "2003/09/26"},
				{country: "United Kingdom", date: "2004/12/17"},
				{country: "Uruguay", date: "2001/07/26"},
				{country: "Vanuatu", date: "2007/05/17"},
				{country: "Venezuela", date: "2002/05/13"}
			];
			
			var primaryAbuse = 'Abuse against a woman';
			var relevantAbuses = ['Disappearance', 'Enslavement', 'Forced nudity', 'Kidnapping', 'Rape or other sexual assault'];
			
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
			
			// check for covered abuses, primary abuse (against a woman) must be checked in combination with any of the other relevant abuses
			proceed = (q6.isNotAnswered() || (q6.hasAnswer(primaryAbuse) && q6.hasOneOfAnswers(relevantAbuses)));
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
