Flow.Question = Backbone.Model.extend({
	
	isAnswered: function() {
		
		var selectedAnswers = this.get('selectedAnswers');
		if(typeof selectedAnswers !== 'undefined' && selectedAnswers.length) {
			return true;
		}
		
		return false;
	},
	
	hasAnswer: function(requiredAnswer) {
	
		// first check that the answer is actually available within the question. If not there is a problem
		var found = _.find(this.get('answers'), function(answer) {
			return requiredAnswer == answer;
		});
		
		if(!found) {
			Flow.Log.error('Question "' + this.get('id') + '" checked for answer but answer "' + requiredAnswer + '" not available');
			return false;
		}
		
		// cannot let unavailable questions interfere with the outcome
		if(!this.get('available')) {
			return false;
		}
		
		var selected = !!_.find(this.get('selectedAnswers'), function(answer) {
			return requiredAnswer == answer;
		});
		
		Flow.Log.debug('Question (model) ' + this.get('id') + ' has selected answer ' + requiredAnswer + ': ' + selected);
		
		return selected;
	},
	
	isBeforeOrOnDate: function(checkDateStr) {
		
		if(!(typeof checkDateStr === 'string' && checkDateStr.match(/\d{4}\/\d{2}\/\d{2}/))) {
			Flow.Log.error('isBeforeOrOnDate supplied with bad checkDateStr format. Must be YYYY/MM/DD');
			return;
		}
		
		var selectedAnswers = this.get('selectedAnswers'), selectedDate;
		
		if(!(selectedAnswers && selectedAnswers.length)) {
			return false;
		}
		
		if(selectedAnswers.length > 1) {
			Flow.Log.error('isBeforeOrOnDate attempting to check date on answers array with > 1 entry');
			return false;
		}
		
		selectedDateStr = selectedAnswers[0];
		
		if(!(typeof selectedDateStr === 'string' && selectedDateStr.match(/\d{4}\/\d{2}\/\d{2}/))) {
			Flow.Log.error('isBeforeOrOnDate supplied with bad selectedDateStr format. Must be YYYY/MM/DD');
			return;
		}
		
		var checkDate = new Date(checkDateStr);
		var selectedDate = new Date(selectedDateStr);
		
		return (selectedDate <= checkDate);
	}
});
