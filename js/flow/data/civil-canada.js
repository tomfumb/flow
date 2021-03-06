define(['jquery', 'data/outcome-common'], function($, Common) {
	
	return {
		/* Civil lawsuit in Canada */
		selector: $('#ccij_outcome_civ_law_can'),
		condition: function(q1, q2a, q2b, q3, q4, q5a, q5b, q6, q10, q11, q14a) {
			
			var relevantCountries = [{country: "Canada"}];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping', 'Killing', 'Mock execution', 'Persecution on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ['Company or corporation', 'None of the above', 'Soldier in rebel army'];
			
			var proceed;
			
			// check Canada is a relevant country - either abuse was by a Canadian, the abused was Canadian, the abuser currently lives in Canada, or a fair trial is not possible in the country of the abuse
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2b.isAvailable() && q2b.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q4.isNotAnswered() || q4.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q5a.hasAnswer('Yes') && (q5b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			if(q11.isNotAnswered() || q11.hasAnswer('Yes')) {
				proceed = true;
			}
			if(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) {
				proceed = true;
			}
			
			// exit if no connection to Canada and fair trial possible in country of abuse
			if(!proceed) {
				return false;
			}
			
			// check for relevant abuses
			if(!Common.abuses(q6, relevantAbuses, this)) {
				return false;
			}
			
			// check for relevant abusers
			if(!Common.abusers(q10, relevantAbusers, this)) {
				return false;
			}
			
			return true;
		}
	};
});
