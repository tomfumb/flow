function getRoutesToOutcomes(outcomes, answers) {
	
	
	// *** go back through this and extract functions from loops
	
	
	var routes = {};
	
	_.each(outcomes, function(outcome) {
		
		routes[outcome.id] = [outcome];
		
		_.each(answers, function(answer) {
		
			if(answer.nextInfo.nextType === '') {
				
				
			}
		});
	});
}

function getPreceding(answers, nextType, nextIdentifierType, nextIdentifier) {
	
}
