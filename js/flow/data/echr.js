define(['jquery'], function($) {
	return {
		/* European Court of Human Rights */
		selector: $('#ccij_outcome_echr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Albania", date: "1996/10/02"},
				{country: "Andorra", date: "1996/07/22"},
				{country: "Armenia", date: "1996/04/26"},
				{country: "Austria", date: "1958/09/03"},
				{country: "Azerbaijan", date: "2002/04/15"},
				{country: "Belgium", date: "1956/06/14"},
				{country: "Bosnia and Herzegovina", date: "2002/07/12"},
				{country: "Bulgaria", date: "1992/09/07"},
				{country: "Croatia", date: "1997/11/05"},
				{country: "Cyprus", date: "1962/10/06"},
				{country: "Czech Republic", date: "1992/03/18"},
				{country: "Denmark", date: "1953/09/03"},
				{country: "Estonia", date: "1996/04/16"},
				{country: "Finland", date: "1990/05/10"},
				{country: "France", date: "1974/05/03"},
				{country: "Georgia", date: "1999/05/20"},
				{country: "Germany", date: "1953/09/03"},
				{country: "Greece", date: "1974/11/28"},
				{country: "Hungary", date: "1992/11/05"},
				{country: "Iceland", date: "1953/09/03"},
				{country: "Ireland", date: "1953/09/03"},
				{country: "Italy", date: "1955/10/26"},
				{country: "Latvia", date: "1997/06/27"},
				{country: "Liechtenstein", date: "1992/09/08"},
				{country: "Lithuania", date: "1995/06/20"},
				{country: "Luxembourg", date: "1953/09/03"},
				{country: "Macedonia", date: "1997/04/10"},
				{country: "Malta", date: "1967/01/23"},
				{country: "Moldova", date: "1997/09/12"},
				{country: "Monaco", date: "2005/11/30"},
				{country: "Montenegro", date: "2006/06/06"},
				{country: "Netherlands", date: "1954/08/31"},
				{country: "Norway", date: "1953/09/03"},
				{country: "Poland", date: "1993/01/19"},
				{country: "Portugal", date: "1978/11/09"},
				{country: "Romania", date: "1994/06/20"},
				{country: "Russia", date: "1998/05/05"},
				{country: "San Marino", date: "1989/03/22"},
				{country: "Serbia", date: "2004/03/03"},
				{country: "Slovakia", date: "1993/01/01"},
				{country: "Slovenia", date: "1994/06/28"},
				{country: "Spain", date: "1979/10/04"},
				{country: "Sweden", date: "1953/09/03"},
				{country: "Switzerland", date: "1974/11/28"},
				{country: "Turkey", date: "1954/05/18"},
				{country: "Ukraine", date: "1997/09/11"},
				{country: "United Kingdom", date: "1953/09/03"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ['Other government official', 'Police officer', "Soldier in government's army"];
			
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
			
			return true;
		}
	};
});
