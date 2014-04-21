define([], function() {
	
	return {

		getIdFromText: function(text) {
			
			var specialChar = '_';
			
			// handle text starting with a number
			if(text.match(/^\d/)) {
				text = specialChar + text;
			}
			
			return text.toLowerCase().replace(/[^a-z0-9]+/g, specialChar);
		},
		
		// using http://stackoverflow.com/a/2117523/519575
		generateId: function() {
			return 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		},
		
		padZeros: function(number, size) {
		
			var numberStr = number.toString();
			if(numberStr.length >= size) {
				return number;
			}
			
			var zeros = [];
			while(numberStr.length + zeros.length < size) { 
				zeros.push('0');
			}
			
			return zeros.join('') + numberStr;
		},
		
		emailValid: function(input) {
			return !!input.match(/[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i);
		}
	};
});
