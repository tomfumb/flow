Flow.Question = Backbone.Model.extend({
	
	initialize: function() {
		this.set('answers', []);
		this.set('precedingAnswers', []);
	},

	addAnswer: function(answer) {
		answer.question = this;
		this.get('answers').push(answer);
	},
	
	addPrecedingAnswer: function(answer) {
		this.get('precedingAnswers').push(answer);
	},

	identifierTypes: {
		ID: 'id',
		TITLE: 'title'
	},

	nextTypes: {
		QUESTION: 'question',
		OUTCOME: 'outcome'
	}
});
