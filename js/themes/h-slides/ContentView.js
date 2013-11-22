Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	model: undefined,	// all this view's data is passed by main view. This is a skin component only and doesn't interact with the rest of the app
	
	questions: [],
	outcomes: [],
	
	showQuestion: function(question) {
		
		Flow.Log.debug('ContentView.showQuestion (' + question.get('id') + ')');
		
		var questionElId = 'question_container_' + question.get('id');
		var questionEl = $('<div id="' + questionElId + '"/>');
		
		this.$el.html(questionEl);
		
		var questionView = new Flow.Theme.QuestionView({el: '#' + questionElId, model: question});
		questionView.render();
		this.questions.push(questionView);
	},
	
	showOutcomes: function(outcomes) {
		
		Flow.Log.debug('ContentView.showOutcomes');
		
		this.$el.html('');
		
		this.outcomes = [];
		_.each(outcomes, function(outcome) {
		
			var outcomeElId = 'outcome_container_' + outcome.get('id');
			var outcomeEl = $('<div id="' + outcomeElId + '"/>');
		
			this.$el.append(outcomeEl);
			
			this.outcomes.push(new Flow.Theme.OutcomeView({el: '#' + outcomeElId, model: outcome}));
		}, this);
		
		_.each(this.outcomes, function(outcomeView) {
			outcomeView.render();
		});
	}
});
