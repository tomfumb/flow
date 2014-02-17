Flow.Question = Backbone.Model.extend({
	
	dateWhens: {
		BOO: 'before or on',
		AOO: 'after or on'
	},
	
	isAnswered: function() {
		
		// cannot let unavailable questions interfere with the outcome
		if(!this.get('available')) {
			return false;
		}
		
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
		if(!this.get('available') || typeof this.get('selectedAnswers') === 'undefined') {
			return false;
		}
		
		var selected = !!_.find(this.get('selectedAnswers'), function(answer) {
			return requiredAnswer == answer;
		});
		
		return selected;
	},
	
	hasOneOfAnswers: function(possibleAnswers) {
		
		return !!_.find(possibleAnswers, function(possibleAnswer) {
			return this.hasAnswer(possibleAnswer);
		}, this);
	},
	
	checkDate: function(checkDateStr, when) {
		
		var dateRegex = /\d{4}\/\d{2}\/\d{2}/;
		
		if(!(typeof checkDateStr === 'string' && checkDateStr.match(dateRegex))) {
			Flow.Log.error('checkDate supplied with bad checkDateStr format. Must be YYYY/MM/DD');
			return;
		}
		
		var selectedAnswers = this.get('selectedAnswers'), selectedDate;
		if(!(selectedAnswers && selectedAnswers.length)) {
			return false;
		}
		
		if(selectedAnswers.length > 1) {
			Flow.Log.error('checkDate attempting to check date on answers array with > 1 entry');
			return false;
		}
		
		selectedDateStr = selectedAnswers[0];
		if(!(typeof selectedDateStr === 'string' && selectedDateStr.match(dateRegex))) {
			Flow.Log.error('checkDate supplied with bad selectedDateStr format. Must be YYYY/MM/DD');
			return;
		}
		
		var checkDate = new Date(checkDateStr);
		var selectedDate = new Date(selectedDateStr);
		
		switch(when) {
			case this.dateWhens.AOO:
				return (selectedDate >= checkDate);
			case this.dateWhens.BOO:
				return (selectedDate <= checkDate);
			default:
				return false;
		}
	},
	
	isAfterOrOnDate: function(checkDateStr) {
		return this.checkDate(checkDateStr, this.dateWhens.AOO);
	},
	
	isBeforeOrOnDate: function(checkDateStr) {
		return this.checkDate(checkDateStr, this.dateWhens.BOO);
	},
	
	isBetweenDates: function(checkDateStartStr, checkDateEndStr) {
		return (this.isAfterOrOnDate(checkDateStartStr) && this.isBeforeOrOnDate(checkDateEndStr));
	}
});
