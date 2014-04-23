define(['jquery'], function($) {
	
	return {
		selector: $('#ccij_outcome_un_cat'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Algeria", date: "1989/09/12"},
				{country: "Andorra", date: "2006/09/22"},
				{country: "Argentina", date: "1987/06/26"},
				{country: "Australia", date: "1989/08/08"},
				{country: "Austria", date: "1987/07/29"},
				{country: "Azerbaijan", date: "1996/08/16"},
				{country: "Belgium", date: "1999/06/25"},
				{country: "Bolivia", date: "1999/04/12"},
				{country: "Bosnia and Herzegovina", date: "1993/09/01"},
				{country: "Brazil", date: "1989/09/28"},
				{country: "Bulgaria", date: "1987/06/26"},
				{country: "Burundi", date: "1993/02/18"},
				{country: "Cameroon", date: "1987/06/26"},
				{country: "Canada", date: "1987/06/26"},
				{country: "Chile", date: "1988/09/30"},
				{country: "Costa Rica", date: "1993/11/11"},
				{country: "Croatia", date: "1992/10/12"},
				{country: "Cyprus", date: "1991/07/18"},
				{country: "Czech Republic", date: "1993/02/22"},
				{country: "Denmark", date: "1987/06/26"},
				{country: "Ecuador", date: "1988/03/30"},
				{country: "Finland", date: "1989/08/30"},
				{country: "France", date: "1987/06/26"},
				{country: "Georgia", date: "1994/10/26"},
				{country: "Germany", date: "1990/10/01"},
				{country: "Ghana", date: "2000/09/07"},
				{country: "Greece", date: "1988/10/06"},
				{country: "Guatemala", date: "1990/01/05"},
				{country: "Guinea-Bissau", date: "2013/09/24"},
				{country: "Hungary", date: "1987/06/26"},
				{country: "Iceland", date: "1996/10/23"},
				{country: "Ireland", date: "2002/04/11"},
				{country: "Italy", date: "1989/01/12"},
				{country: "Kazakhstan", date: "1998/08/26"},
				{country: "Liechtenstein", date: "1990/11/02"},
				{country: "Luxembourg", date: "1987/09/29"},
				{country: "Malta", date: "1990/09/13"},
				{country: "Mexico", date: "1987/06/26"},
				{country: "Monaco", date: "1991/12/06"},
				{country: "Montenegro", date: "2006/10/23"},
				{country: "Morocco", date: "1993/06/21"},
				{country: "Netherlands", date: "1988/12/21"},
				{country: "New Zealand", date: "1989/12/10"},
				{country: "Norway", date: "1987/06/26"},
				{country: "Paraguay", date: "1990/03/12"},
				{country: "Peru", date: "1988/07/07"},
				{country: "Poland", date: "1989/07/26"},
				{country: "Portugal", date: "1989/02/09"},
				{country: "Qatar", date: "2012/03/14"},
				{country: "South Korea", date: "1995/01/09"},
				{country: "Moldova", date: "1995/11/28"},
				{country: "Russia", date: "1987/06/26"},
				{country: "Senegal", date: "1987/06/26"},
				{country: "Serbia", date: "2001/03/12"},
				{country: "Seychelles", date: "1992/05/05"},
				{country: "Slovakia", date: "1993/05/28"},
				{country: "Slovenia", date: "1993/07/16"},
				{country: "South Africa", date: "1998/12/10"},
				{country: "Spain", date: "1987/10/21"},
				{country: "Sweden", date: "1987/06/26"},
				{country: "Switzerland", date: "1987/06/26"},
				{country: "Togo", date: "1987/11/18"},
				{country: "Tunisia", date: "1988/09/23"},
				{country: "Turkey", date: "1988/08/02"},
				{country: "Ukraine", date: "2003/09/12"},
				{country: "Uruguay", date: "1987/06/26"},
				{country: "Venezuela", date: "1991/07/29"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
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
				(q1.isNotAnswered() || (q2b.isAvailable() && q2b.isNotAnswered()) || q3.isNotAnswered()) ||
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
			
			// check against statute of limitations
			proceed = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(10)) {
				proceed = true;
			}
			// exit if abuse too long ago
			if(!proceed) {
				return false;
			}
				
			return true;
		}
	};
});
