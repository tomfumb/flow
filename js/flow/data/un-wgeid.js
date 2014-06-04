define(['jquery', 'data/outcome-common'], function($, Common) {
	
	return {
		/* U.N. Working Group on Enforced Disappearances (WGEID) */
		selector: $('#ccij_outcome_un_wgeid'),
		condition: function(q6, q10) {
			
			var relevantAbuses = ['Disappearance', 'Kidnapping', 'Incommunicado detention'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			// check for covered abuses
			if(!Common.abuses(q6, relevantAbuses, this)) {
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
