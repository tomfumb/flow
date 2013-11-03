Flow.AnswerCollection = {

	count: 0,
	answers: {},
	
	addAnswer: function(answer) {
		this.answers[answer.id] = answer;
	},
	
	asArray: function() {
		return _.toArray(this.answers);
	}
};
