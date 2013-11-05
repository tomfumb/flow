Flow.Answer = Backbone.Model.extend({
	
	constructor: function(attributes) {
	
		this.text = attributes.text;
		this.value = (typeof attributes.value === 'undefined' ? attributes.text : attributes.value);
		this.id = Flow.Util.generateId();
		
		this.nextInfo = undefined;
		this.next = undefined;
	},
	
	setNextInfo: function(nextType, identifierType, identifier) {
		
		this.nextInfo = {
			nextType: nextType,
			identifierType: identifierType,
			identifier: identifier
		}
	}
});
