Flow.Question = Backbone.Model.extend({
	
	hasAnswer: function(requiredAnswer) {
	
		// first check that the answer is actually available within the question. If not there is a problem
		var found = _.find(this.get('answers'), function(answer) {
			return requiredAnswer == answer;
		});
		
		if(!found) {
			Flow.Log.error('Question "' + this.get('id') + '" checked for answer but answer "' + requiredAnswer + '" not available');
			return;
		}
		
		var selected = !!_.find(this.get('selectedAnswers'), function(answer) {
			return requiredAnswer == answer;
		});
		
		Flow.Log.debug('Question ' + this.get('id') + ' has selected answer ' + requiredAnswer + ': ' + selected);
		
		return selected;
	}
});
