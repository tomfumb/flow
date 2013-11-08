Flow.Outcome = Backbone.Model.extend({
	
	initialize: function() {
		this.set('precedingAnswers', []);
	},
	
	addPrecedingAnswer: function(answer) {
		this.get('precedingAnswers').push(answer);
	},
	
	identifierTypes: {
		ID: 'id',
		TITLE: 'title'
	}
});
