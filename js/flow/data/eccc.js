define(['jquery', 'data/outcome-common'], function($, Common) {
	return {
		/* Extraordinary Chambers for Cambodia */
		selector: $('#ccij_outcome_eccc'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10) {
			
			var relevantCountries = [{country: "Cambodia", date: ["1975/04/17", "1979/01/06"]}];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'None of the above'];

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
				(q1.isAnswered() && q1Dates && q3.isBetweenDates(q1Dates, q1Dates, 0, 1)) ||
				(q2b.isAnswered() && q2bDates && q3.isBetweenDates(q2bDates, q2bDates, 0, 1))) {
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
			if(!Common.abusers(q10, relevantAbusers, this)) {
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
