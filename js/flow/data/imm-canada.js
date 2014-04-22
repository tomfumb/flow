define(['jquery'], function($) {
	
	return {
		/* Immigration penalties in Canada */
		selector: $('#ccij_outcome_imm_pen_can'),
		condition: function(q6, q7, q8, q9, q10, q11, q12) {
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Disappearance', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes'];
			
			var proceed; 
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}
			
			// check if war crime, crime against humanity, or genocide
			proceed = false;
			if(
				(q7.isUnknownOrNotAnswered() || q7.hasAnswer('Yes')) ||
				(q8.isUnknownOrNotAnswered() || q8.hasAnswer('Yes')) ||
				(q9.isUnknownOrNotAnswered() || q9.hasAnswer('Yes'))) {
				proceed = true;
			}
			// exit if not war crime, crime against humanity, or genocide
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check if in or attempting to enter Canada
			proceed = false;
			if(q11.isUnknownOrNotAnswered() || q11.hasAnswer('Yes')) {
				proceed = true;
			}
			if(q12.isUnknownOrNotAnswered() || q12.hasAnswer('Yes')) {
				proceed = true;
			}
			// exit if not in or attempting to enter Canada
			if(!proceed) {
				return false;
			}
			
			return true;
		}
	};
});
