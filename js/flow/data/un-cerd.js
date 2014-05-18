define(['jquery', 'data/outcome-common'], function($, Common) {
	
	return {
		/* U.N. Committee on the Elimination of Racial Discrimination (CERD) */
		selector: $('#ccij_outcome_un_cerd'),
		condition: function(q1, q2a, q2b, q3, q6, q9, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = [
				{country: "Algeria", date: "1989/09/12"},
				{country: "Andorra", date: "2006/09/22"},
				{country: "Argentina", date: "2007/02/05"},
				{country: "Australia", date: "1993/01/28"},
				{country: "Austria", date: "2002/02/20"},
				{country: "Azerbaijan", date: "2001/09/27"},
				{country: "Belgium", date: "2000/10/10"},
				{country: "Bolivia", date: "2006/02/14"},
				{country: "Brazil", date: "2002/06/17"},
				{country: "Bulgaria", date: "1993/05/12"},
				{country: "Chile", date: "1994/05/18"},
				{country: "Costa Rica", date: "1974/01/08"},
				{country: "Cyprus", date: "1993/12/30"},
				{country: "Czech Republic", date: "2000/10/11"},
				{country: "Denmark", date: "1985/10/11"},
				{country: "Ecuador", date: "1977/03/18"},
				{country: "Estonia", date: "2010/07/21"},
				{country: "Finland", date: "1994/11/16"},
				{country: "France", date: "1982/08/16"},
				{country: "Georgia", date: "2005/06/30"},
				{country: "Germany", date: "2001/08/30"},
				{country: "Hungary", date: "1989/09/13"},
				{country: "Iceland", date: "1981/08/10"},
				{country: "Ireland", date: "2000/12/29"},
				{country: "Italy", date: "1978/05/05"},
				{country: "Kazakhstan", date: "2008/05/29"},
				{country: "Liechtenstein", date: "2004/03/18"},
				{country: "Luxembourg", date: "1996/07/22"},
				{country: "Macedonia", date: "1999/12/22"},
				{country: "Malta", date: "1998/12/16"},
				{country: "Mexico", date: "2002/03/15"},
				{country: "Moldova", date: "2013/05/08"},
				{country: "Monaco", date: "2001/11/06"},
				{country: "Montenegro", date: "2006/10/23"},
				{country: "Morocco", date: "2006/10/19"},
				{country: "Netherlands", date: "1971/12/10"},
				{country: "Norway", date: "1976/01/23"},
				{country: "Peru", date: "1984/11/27"},
				{country: "Poland", date: "1998/12/01"},
				{country: "Portugal", date: "2000/03/02"},
				{country: "Romania", date: "2003/03/21"},
				{country: "Russia", date: "1991/10/01"},
				{country: "San Marino", date: "2008/02/22"},
				{country: "Senegal", date: "1982/12/03"},
				{country: "Serbia", date: "2001/06/27"},
				{country: "Slovakia", date: "1995/03/17"},
				{country: "Slovenia", date: "2001/11/10"},
				{country: "South Africa", date: "1998/12/10"},
				{country: "South Korea", date: "1997/03/05"},
				{country: "Spain", date: "1998/01/13"},
				{country: "Sweden", date: "1971/12/06"},
				{country: "Switzerland", date: "2003/06/19"},
				{country: "Ukraine", date: "1992/07/28"},
				{country: "Uruguay", date: "1972/09/11"},
				{country: "Venezuela", date: "2003/09/22"}
			];
			
			var reservationCountries = [
				{country: "Andorra"},
				{country: "Austria"},
				{country: "Denmark"},
				{country: "Estonia"},
				{country: "Finland"},
				{country: "Germany"},
				{country: "Iceland"},
				{country: "Ireland"},
				{country: "Italy"},
				{country: "Liechtenstein"},
				{country: "Macedonia"},
				{country: "Malta"},
				{country: "Moldova"},
				{country: "Norway"},
				{country: "Portugal"},
				{country: "Slovenia"},
				{country: "Spain"},
				{country: "Sweden"},
				{country: "Switzerland"}
			];
			
			var primaryAbuse = 'Persecution on political, racial, or religious grounds';
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			var proceed;
			
			// check relevant country(ies) selected
			if(!Common.location(q1, q2a, q2b, relevantCountries, this)) {
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
			
			// check if mechanism has jurisdiction based on racial aspect of abuse
			proceed = (q9.isUnknownOrNotAnswered() || (q9.hasAnswer('Yes') || (q9.doesNotHaveAnswer('Yes') && (q6.isNotAnswered() || q6.hasAnswer(primaryAbuse)))));
			// exit if abuse not racially-motivated
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
			
			// check if all selected countries are subject to reservations concerning other judicial bodies
			var countriesSelected = 0;
			if(q1.isAnswered()) {
				countriesSelected++;
			}
			if(q2b.isAnswered()) {
				countriesSelected++;
			}
			
			var reservationCountriesSelected = 0;
			if(q1.hasCountry(reservationCountries)) {
				reservationCountriesSelected++;
			}
			if(q2b.hasCountry(reservationCountries)) {
				reservationCountriesSelected++;
			}
			
			// determine if reservations for select countries are relevant
			if(countriesSelected > 0 && reservationCountriesSelected === countriesSelected) {
				proceed = q15.doesNotHaveAnswer('Yes');
			}
			else {
				proceed = true;
			}
			// exit if reservations apply
			if(!proceed) {
				return false;
			}
			
			return true;
		}
	};
});
