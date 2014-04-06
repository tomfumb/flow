define(['jquery'], function($) {
	return {
		/* Extraordinary Chambers for Cambodia */
		selector: $('#ccij_outcome_eccc'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10) {
			
			var relevantCountries = [{country: "Cambodia", date: ["1975/04/17", "1979/01/06"]}];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes', 'Unknown'];

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
				(q1.isAnswered() && q1Dates && q3.isBetweenDates(q1Dates, q1Dates, 0, 1)) ||
				(q2b.isAnswered() && q2bDates && q3.isBetweenDates(q2bDates, q2bDates, 0, 1))) {
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
			
			// check scenario in which abuse occurred. Only a no in 7, 8, or 9 will rule out ECCC. Unanswered, yes, or unknown will keep it in
			proceed = true;
			if(q7.hasAnswer('No') && q8.hasAnswer('No') && q9.hasAnswer('No')) {
				proceed = false;
			}
			// exit if no relevant scenario
			if(!proceed) {
				return false;
			}
			
			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check against statute of limitations
			proceed = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(40)) {
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
