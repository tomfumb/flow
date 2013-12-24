Flow.PrintView = Backbone.View.extend({
	
	initialize: function() {
			
		Flow.Log.debug('Initialising PrintView');
		var questions = this.model.get('Questions');
		var outcomes = this.model.get('Outcomes');
		
		questions.on('questionAnswered', _.bind(this.onQuestionAnswered, this));
		questions.on('downstreamQuestionsReset', _.bind(this.onDownstreamQuestionsReset, this));
		outcomes.on('outcomesReached', _.bind(this.onOutcomesReached, this));
	},
	
	onQuestionAnswered: function(question, answer) {
		Flow.Log.debug('PrintView.onQuestionAnswered');
	},
	
	onDownstreamQuestionsReset: function() {
		Flow.Log.debug('PrintView.onDownstreamQuestionsReset');
	},
	
	onOutcomesReached: function(outcome) {
		Flow.Log.debug('PrintView.onOutcomesReached');
	}
});
