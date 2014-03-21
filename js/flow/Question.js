define(['jquery', 'underscore', 'backbone', 'flow/Log', 'flow/Util'], function($, _, Backbone, Log, Util) {

	return Backbone.Model.extend({
		
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
		
		isNotAnswered: function() {
			return !this.isAnswered();
		},
		
		isUnknownOrNotAnswered: function() {
			return (!this.isAnswered() || this.hasAnswer('Unknown'));
		},
		
		hasAnswer: function(requiredAnswer) {
		
			// first check that the answer is actually available within the question. If not there is a problem
			var found = _.find(this.get('answers'), function(answer) {
				return requiredAnswer == answer;
			});
			
			if(!found) {
				Log.error('Question "' + this.get('id') + '" checked for answer but answer "' + requiredAnswer + '" not available');
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
		
		doesNotHaveAnswer: function(requiredAnswer) {
			return !this.hasAnswer(requiredAnswer);
		},
		
		hasOneOfAnswers: function(possibleAnswers) {
			
			// ensure all possible answers are iterated-over to highlight bad data 
			var found = false;
			_.each(possibleAnswers, function(possibleAnswer) {
				if(this.hasAnswer(possibleAnswer)) {
					found = true;
				}
			}, this);
			
			return found;
		},
		
		doesNotHaveOneOfAnswers: function(possibleAnswers) {
			return !this.hasOneOfAnswers(possibleAnswers);
		},
		
		checkDate: function(checkDateStr, when) {
			
			var dateRegex = /\d{4}\/\d{2}\/\d{2}/;
			
			if(!(typeof checkDateStr === 'string' && checkDateStr.match(dateRegex))) {
				Log.error('checkDate supplied with bad checkDateStr format. Must be YYYY/MM/DD');
				return;
			}
			
			var selectedAnswers = this.get('selectedAnswers');
			if(!(selectedAnswers && selectedAnswers.length)) {
				return false;
			}
			
			if(selectedAnswers.length > 1) {
				Log.error('checkDate attempting to check date on answers array with > 1 entry');
				return false;
			}
			
			selectedDateStr = selectedAnswers[0];
			if(!(typeof selectedDateStr === 'string' && selectedDateStr.match(dateRegex))) {
				Log.error('checkDate supplied with bad selectedDateStr format. Must be YYYY/MM/DD');
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
		},
		
		isWithinYearsAgo: function(years) {
			
			var date = new Date();
			date.setFullYear(date.getFullYear() - years);
			
			var historicDateStr = date.getFullYear() + '/' + Util.padZeros(date.getMonth() + 1, 2) + '/' + Util.padZeros(date.getDate(), 2);
			
			return this.isAfterOrOnDate(historicDateStr);
		}
	});
});
