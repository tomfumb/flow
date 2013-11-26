Flow.Question = Backbone.Model.extend({
	
	initialize: function() {
		this.resetAnswers();
		this.set('precedingAnswers', []);
	},

	addAnswer: function(answer) {
		answer.set('question', this);
		this.get('answers').push(answer);
	},
	
	resetAnswers: function() {
		Flow.Log.debug('Question.resetAnswers (' + this.get('id') + ')');	
		this.set('answers', []);
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
