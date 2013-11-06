Flow.CombinedModel = Backbone.Model.extend({

	constructor: function(OutcomeManager, QuestionManager, AnswerCollection) {
			
		this.set({
			Outcomes: OutcomeManager,
			Questions: QuestionManager,
			Answers: AnswerCollection
		});
	}
});
