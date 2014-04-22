define(['jquery'], function($) {
	
	return {
		/* U.N. Working Group on Enforced Disappearances (WGEID) */
		selector: $('#ccij_outcome_un_wgeid'),
		condition: function(q6, q10) {
			
			var relevantAbuses = ['Disappearance', 'Incommunicado detention'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var proceed;
			
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
			
			return true;
		}
	};
});
