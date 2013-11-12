Flow.Answer = Backbone.Model.extend({
	
	initialize: function() {
		if(typeof this.get('value') === 'undefined') {
			this.set('value', this.get('text'));
		}
	},
	
	setNextInfo: function(nextType, identifierType, identifier) {
		
		this.set('nextInfo', {
			nextType: nextType,
			identifierType: identifierType,
			identifier: identifier
		});
	},
	
	setSelected: function() {
		this.get('question').set('selectedAnswer', this);	
	}
});
