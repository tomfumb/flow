Flow.MainView = Backbone.View.extend({
	
	initialize: function() {
		
		Flow.Log.debug('Initialising MainView');
		
		this.questions = this.model.get('Questions');
		this.outcomes = this.model.get('Outcomes');
		
		this.questions.listenToOnce(this.questions, 'start', _.bind(this.onStart, this));
		this.questions.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
		this.questions.on('change:questionAnswered', _.bind(this.onQuestionAnswered, this));
	},
	
	render: function() {
		
		Flow.Log.debug('MainView.render');
		this.$el.show();
		
		this.content = new Flow.Theme.ContentView();
		this.content.render();
		
		this.content.addOutcomes(this.outcomes);
	},
	
	onStart: function() {
		
		Flow.Log.debug('MainView.onStart');
		
		this.render();
		this.content.addQuestions(this.questions.models);
		this.content.showFirstQuestion();
	},
	
	onAnswersSelected: function(answeredQuestion, answers) {
		
		// execute any condition functions that determine if questions are now available or unavailable
		var changedQuestions = this.questions.checkAvailableQuestions();
		changedQuestions.push(answeredQuestion);
		
		this.outcomes.checkAvailableOutcomes(this.questions, changedQuestions);
	},
	
	onQuestionAnswered: function(answeredQuestion) {
		this.content.showNextQuestion();
	}
});
