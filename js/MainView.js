Flow.MainView = Backbone.View.extend({
	
	hadFirstQuestion: false,
	
	initialize: function() {
		
		var questions = this.getQuestions();
		var outcomes = this.getOutcomes();
		
		questions.on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
		questions.on('change:selectedAnswer', _.bind(this.onQuestionAnswered, this));
		outcomes.on('availableOutcomesUpdated', _.bind(this.onAvailableOutcomesUpdated, this));
	},
	
	render: function() {
		this.$el.show();
	},
	
	onNextQuestionAvailable: function(question) {
	
		this.getOutcomes().checkAvailableOutcomes(this.getQuestions());
	
		debugger;
		
		if(!this.hadFirstQuestion) {
			this.render();
			this.hadFirstQuestion = true;
		}
		
		//
		// show question
		//
	
	},
	
	onAvailableOutcomesUpdated: function(availableOutcomes) {

		debugger;
	},
	
	onQuestionAnswered: function(question, answer) {
	
		this.getOutcomes().checkAvailableOutcomes(this.getQuestions());
		
		debugger;
	},
	
	getQuestions: function() {
		return this.model.get('Questions');
	},
	
	getOutcomes: function() {
		return this.model.get('Outcomes');
	}
});
