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
			var found = !!_.find(this.get('answers'), function(answer) {
				return requiredAnswer == answer;
			});
			
			if(!found) {
				Log.error('Question "' + this.get('id') + '" checked for answer but answer "' + requiredAnswer + '" not available');
				return false;
			}
			
			// cannot let answered but now unavailable questions interfere with the outcome
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
		
		dateValid: function(dateStr) {
			return !!dateStr.match(/\d{4}\/\d{2}\/\d{2}/);
		},
		
		checkDate: function(checkDateStr, when) {
			
			if(!(typeof checkDateStr === 'string' && this.dateValid(checkDateStr))) {
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
			if(!(typeof selectedDateStr === 'string' && this.dateValid(selectedDateStr))) {
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
		
		isAfterOrOnDate: function(checkDateStr, dateIdx) {
			
			if(_.isArray(checkDateStr) && checkDateStr.length) {
				checkDateStr = (isNaN(dateIdx) ? checkDateStr[0] : checkDateStr[dateIdx]); 
			}
			
			return this.checkDate(checkDateStr, this.dateWhens.AOO);
		},
		
		isBeforeOrOnDate: function(checkDateStr, dateIdx) {
			
			if(_.isArray(checkDateStr) && checkDateStr.length) {
				checkDateStr = (isNaN(dateIdx) ? checkDateStr[0] : checkDateStr[dateIdx]); 
			}
			
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
		},
		
		relevantDatesForCountry: function(countriesData) {
			
			var selectedCountryData;
			// only validate every single country in the list once. After that only look for the specific requested answer
			if(countriesData.validated) {
				
				selectedCountryData = _.find(countriesData, function(countryData) {
					return this.hasAnswer(countryData.country);
				}, this);
				
				return selectedCountryData;
			}
			else {
				
				_.each(countriesData, function(countryData) {
					
					if(this.hasAnswer(countryData.country)) {
						selectedCountryData = countryData;
					}
					
					var dateForCheck = (_.isArray(countryData.date) ? countryData.date : [countryData.date]);
					_.each(dateForCheck, function(date) {
						
						if(!dateValid(date)) {
							Log.error('country date supplied with bad format. Must be YYYY/MM/DD');
						}
					}, this);
					
				}, this);
				
				countriesData.validated = true;
				return selectedCountryData;
			}
		},
		
		hasCountry: function(countriesData) {
			return !!this.relevantDatesForCountry(countriesData);
		}
	});
});
