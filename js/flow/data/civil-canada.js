define(['jquery'], function($) {
	
	return {
		/* Civil lawsuit in Canada */
		selector: $('#ccij_outcome_civ_law_can'),
		condition: function(q1, q2a, q2b, q3, q4, q5a, q5b, q6, q10, q11, q14a) {
			
			var relevantCountries = [{country: "Canada"}];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var permanentRelevantAbuses = ['Rape or other sexual assault'];
			
			var relevantAbusers = ['Company or corporation', 'Person in plainclothes', 'Soldier in rebel army'];
			
			var proceed;
			
			// check Canada is a relevant country - either abuse was by a Canadian, the abused was Canadian, the abuser currently lives in Canada, or a fair trial is not possible in the country of the abuse
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			if(q4.isNotAnswered() || q4.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q5a.hasAnswer('Yes') && (q5b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			if(q11.isUnknownOrNotAnswered() || q11.hasAnswer('Yes')) {
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
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}
			
			// check for relevant abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check if recent enough (within last 2 years unless a permanently relevant abuse such as rape or other sexual assault)
			proceed = q6.hasAnswer(permanentRelevantAbuses);
			if(!proceed) {
				proceed = q3.isWithinYearsAgo(2);
			}
			// exit if abuse too long ago
			if(!proceed) {
				return false;
			}
			
			return true;
		}
	};
});
