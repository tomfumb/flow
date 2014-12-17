define(['jquery', 'underscore', 'data/outcome-common'], function($, _, Common) {
	
	return {
		selector: $('#ccij_outcome_icc'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10, q14a, q14b, q14c) {
			
			var relevantCountries = [
				{country: "Afghanistan", date: "2003/05/01"},
				{country: "Albania", date: "2003/04/01"},
				{country: "Andorra", date: "2002/07/01"},
				{country: "Antigua and Barbuda", date: "2002/07/01"},
				{country: "Argentina", date: "2002/07/01"},
				{country: "Australia", date: "2002/09/01"},
				{country: "Austria", date: "2002/07/01"},
				{country: "Bangladesh", date: "2010/06/01"},
				{country: "Barbados", date: "2003/03/01"},
				{country: "Belgium", date: "2002/07/01"},
				{country: "Belize", date: "2002/07/01"},
				{country: "Benin", date: "2002/07/01"},
				{country: "Bolivia", date: "2002/09/01"},
				{country: "Bosnia and Herzegovina", date: "2002/07/01"},
				{country: "Botswana", date: "2002/07/01"},
				{country: "Brazil", date: "2002/09/01"},
				{country: "Bulgaria", date: "2002/07/01"},
				{country: "Burkina Faso", date: "2004/07/01"},
				{country: "Burundi", date: "2004/12/01"},
				{country: "Cambodia", date: "2002/07/01"},
				{country: "Canada", date: "2002/07/01"},
				{country: "Cape Verde", date: "2012/01/01"},
				{country: "Central African Republic", date: "2002/07/01"},
				{country: "Chad", date: "2007/01/01"},
				{country: "Chile", date: "2009/09/01"},
				{country: "Colombia", date: ["2002/11/01", "2009/11/01"]},
				{country: "Comoros", date: "2006/11/01"},
				{country: "Congo, Democratic Republic of the", date: "2002/07/01"},
				{country: "Congo, Republic of the", date: "2004/08/01"},
				{country: "Cook Islands", date: "2008/10/01"},
				{country: "Costa Rica", date: "2002/07/01"},
				{country: "Cote d'Ivoire", date: "2013/05/01"},
				{country: "Croatia", date: "2002/07/01"},
				{country: "Cyprus", date: "2002/07/01"},
				{country: "Czech Republic", date: "2009/10/01"},
				{country: "Denmark", date: "2002/07/01"},
				{country: "Djibouti", date: "2003/02/01"},
				{country: "Dominica", date: "2002/07/01"},
				{country: "Dominican Republic", date: "2005/08/01"},
				{country: "Ecuador", date: "2002/07/01"},
				{country: "East Timor", date: "2002/12/01"},
				{country: "Estonia", date: "2002/07/01"},
				{country: "Fiji", date: "2002/07/01"},
				{country: "Finland", date: "2002/07/01"},
				{country: "France", date: "2002/07/01"},
				{country: "Gabon", date: "2002/07/01"},
				{country: "Gambia, The", date: "2002/09/01"},
				{country: "Georgia", date: "2003/12/01"},
				{country: "Germany", date: "2002/07/01"},
				{country: "Ghana", date: "2002/07/01"},
				{country: "Greece", date: "2002/08/01"},
				{country: "Grenada", date: "2011/08/01"},
				{country: "Guatemala", date: "2012/07/01"},
				{country: "Guinea", date: "2003/10/01"},
				{country: "Guyana", date: "2004/12/01"},
				{country: "Honduras", date: "2002/09/01"},
				{country: "Hungary", date: "2002/07/01"},
				{country: "Iceland", date: "2002/07/01"},
				{country: "Ireland", date: "2002/07/01"},
				{country: "Italy", date: "2002/07/01"},
				{country: "Japan", date: "2007/10/01"},
				{country: "Jordan", date: "2002/07/01"},
				{country: "Kenya", date: "2005/06/01"},
                {country: "Korea, South", date: "2003/02/01"},
				{country: "Latvia", date: "2002/09/01"},
				{country: "Lesotho", date: "2002/07/01"},
				{country: "Liberia", date: "2004/12/01"},
				{country: "Liechtenstein", date: "2002/07/01"},
				{country: "Lithuania", date: "2003/08/01"},
				{country: "Luxembourg", date: "2002/07/01"},
				{country: "Macedonia", date: "2002/07/01"},
				{country: "Madagascar", date: "2008/06/01"},
				{country: "Malawi", date: "2002/12/01"},
				{country: "Maldives", date: "2011/12/01"},
				{country: "Mali", date: "2002/07/01"},
				{country: "Malta", date: "2003/02/01"},
				{country: "Marshall Islands", date: "2002/07/01"},
				{country: "Mauritius", date: "2002/07/01"},
				{country: "Mexico", date: "2006/01/01"},
				{country: "Moldova", date: "2011/01/01"},
				{country: "Mongolia", date: "2002/07/01"},
				{country: "Montenegro", date: "2007/01/01"},
				{country: "Namibia", date: "2002/09/01"},
				{country: "Nauru", date: "2002/07/01"},
				{country: "Netherlands", date: "2002/07/01"},
				{country: "New Zealand", date: "2002/07/01"},
				{country: "Niger", date: "2002/07/01"},
				{country: "Nigeria", date: "2002/07/01"},
				{country: "Norway", date: "2002/07/01"},
				{country: "Panama", date: "2002/07/01"},
				{country: "Paraguay", date: "2002/07/01"},
				{country: "Peru", date: "2002/07/01"},
				{country: "Philippines", date: "2011/11/01"},
				{country: "Poland", date: "2002/07/01"},
				{country: "Portugal", date: "2002/07/01"},
				{country: "Romania", date: "2002/07/01"},
				{country: "Saint Kitts and Nevis", date: "2006/11/01"},
				{country: "Saint Lucia", date: "2010/11/01"},
				{country: "Saint Vincent and the Grenadines", date: "2003/03/01"},
				{country: "Samoa", date: "2002/12/01"},
				{country: "San Marino", date: "2002/07/01"},
				{country: "Senegal", date: "2002/07/01"},
				{country: "Serbia", date: "2002/07/01"},
				{country: "Seychelles", date: "2010/11/01"},
				{country: "Sierra Leone", date: "2002/07/01"},
				{country: "Slovakia", date: "2002/07/01"},
				{country: "Slovenia", date: "2002/07/01"},
				{country: "South Africa", date: "2002/07/01"},
				{country: "Spain", date: "2002/07/01"},
				{country: "Suriname", date: "2008/10/01"},
				{country: "Sweden", date: "2002/07/01"},
				{country: "Switzerland", date: "2002/07/01"},
				{country: "Tajikistan", date: "2002/07/01"},
				{country: "Tanzania", date: "2002/11/01"},
				{country: "Trinidad and Tobago", date: "2002/07/01"},
				{country: "Tunisia", date: "2011/09/01"},
				{country: "Uganda", date: "2002/09/01"},
				{country: "United Kingdom", date: "2002/07/01"},
				{country: "Uruguay", date: "2002/09/01"},
				{country: "Vanuatu", date: "2012/03/01"},
				{country: "Venezuela", date: "2002/07/01"},
				{country: "Zambia", date: "2003/02/01"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'None of the above'];
			
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
				(q1.isNotAnswered() || q3.isNotAnswered()) ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates, 0)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates, 0))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			}
			
			// check for covered abuses
			if(!Common.abuses(q6, relevantAbuses, this)) {
				return false;
			}
			
			// check if war crime, crime against humanity, or genocide
			proceed = false;
			if(
				(q7.isNotAnswered() || q7.hasAnswer('Yes')) ||
				(q8.isNotAnswered() || q8.hasAnswer('Yes')) ||
				(q9.isNotAnswered() || q9.hasAnswer('Yes'))) {
				proceed = true;
			}
			// exit if not war crime, crime against humanity, or genocide
			if(!proceed) {
				return false;
			}
			
			// check if Colombia's war crime option applies (Colombia is selected, date of abuse is after war crimes date, crime committed during war and not a crime against humanity or genocide)
			proceed = true;
			var colombia = _.find(relevantCountries, function(countryData) {
				return countryData.country === 'Colombia';
			});
			if(!colombia) {
				Log.error('Colombia not found, unable to check war crime option');
				proceed = false;
			}
			if((q1.hasAnswer(colombia.country) || q2b.hasAnswer(colombia.country)) && q3.isBeforeDate(colombia.date, 1) && (q7.hasAnswer('Yes') && q8.hasAnswer('No') && q9.hasAnswer('No'))) {
				proceed = false;
			}
			// exit if war crime in Colombia before mechanism is relevant (Colombia's second date in relevantCountries above)
			if(!proceed) {
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
			
			return true;
		}
	};
});
