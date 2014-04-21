define(['jquery'], function($) {
	return {
		/* Criminal Prosecution in Canada */
		selector: $('#ccij_outcome_crim_pro_can'),
		condition: function(q6, q7, q8, q9, q10) {
			
			var scenario1RelevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var scenario1RelevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes'];
			
			var scenario2RelevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced nudity', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var scenario2RelevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var scenario1Proceed = false, scenario2Proceed = false;
			
			scenario1Proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(scenario1RelevantAbuses));
			
			if(scenario1Proceed) {
				// check if war crime, crime against humanity, or genocide
				scenario1Proceed = !(q7.hasAnswer('No') && q8.hasAnswer('No') && q9.hasAnswer('No'));
			}
			
			if(scenario1Proceed) {
				scenario1Proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(scenario1RelevantAbusers));
			}
			
			scenario2Proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(scenario2RelevantAbuses));
			
			if(scenario2Proceed) {
				scenario2Proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(scenario2RelevantAbusers));
			}
			
			return (scenario1Proceed || scenario2Proceed);
		}
	};
});
