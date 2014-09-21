define(['jquery', 'data/outcome-common'], function($, Common) {

	return {
		/* War Crimes Chamber of the Court of Bosnia and Herzegovina */
		selector: $('#ccij_outcome_bosnia'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10) {
			
			var relevantCountries = [
				{country: "Bosnia and Herzegovina", date: "2002/07/03"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
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
			
			// check if war crime
			proceed = false;
			if(q7.isNotAnswered() || q7.hasAnswer('Yes')) {
				proceed = true;
			}
			// exit if not war crime
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			if(!Common.abusers(q10, relevantAbusers, this)) {
				return false;
			}
			
			return true;
		}
	};
});
