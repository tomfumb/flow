Flow.MainView = Backbone.View.extend({
	
	hadFirstQuestion: false,
	
	initialize: function() {
		
		var questions = this.getQuestions();
		var outcomes = this.getOutcomes();
		
		questions.on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
		questions.on('downstreamQuestionsReset', _.bind(this.onDownstreamQuestionsReset, this));
		
		outcomes.on('availableOutcomesUpdated', _.bind(this.onAvailableOutcomesUpdated, this));
		outcomes.on('outcomeReached', _.bind(this.onOutcomeReached, this));
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
	},
	
	onAvailableOutcomesUpdated: function(availableOutcomes) {

		debugger;
	},
	
	onAnswerSelected: function(answer) {
		
		var answers = this.getAnswers();
		if(typeof answer === 'string') {
			answer = answers.get(answer);
		}
		
		var questions = this.getQuestions();
		questions.setAnswer(answer);
		this.getOutcomes().checkAvailableOutcomes(questions);
	},
	
	onDownstreamQuestionsReset: function() {
		
		debugger;
	},
	
	onOutcomeReached: function() {
		
		debugger;
	},
	
	getQuestions: function() {
		return this.model.get('Questions');
	},
	
	getOutcomes: function() {
		return this.model.get('Outcomes');
	},
	
	getAnswers: function() {
		return this.model.get('Answers');
	}
});
