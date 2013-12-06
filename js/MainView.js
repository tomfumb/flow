Flow.MainView = Backbone.View.extend({
	
	initialize: function() {
		
		Flow.Log.debug('Initialising MainView');
		
		this.questions = this.model.get('Questions');
		this.outcomes = this.model.get('Outcomes');
		
		this.questions.listenToOnce(this.questions, 'start', _.bind(this.onStart, this));
		this.questions.on('change:selectedAnswer', _.bind(this.onAnswerSelected, this));
	},
	
	render: function() {
		
		Flow.Log.debug('MainView.render');
		this.$el.show();
		
		this.content = new Flow.Theme.ContentView();
		this.content.render();
		
		this.outcomes.checkAvailableOutcomes(this.questions);
		this.content.addOutcomes(this.outcomes.models);
	},
	
	onStart: function() {
		
		Flow.Log.debug('MainView.onStart');
		
		this.render();
		this.content.addQuestions(this.questions.models);
		this.content.showFirstQuestion();
	},
	
	onAnswerSelected: function(question) {
		
		var answer = question.get('selectedAnswer');
		
		var logMessage = 'MainView.onAnswerSelected (Question ' + question.get('id') + ')';
		if(answer) {
			logMessage += '(Answer: ' + answer;
		}
		
		Flow.Log.debug(logMessage);
		
		
		// check if a different answer was previously selected - necessary?
		
		
	}
});
