Flow.MainView = Backbone.View.extend({
	
	hadFirstQuestion: false,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising MainView');
		var questions = this.getQuestions();
		var outcomes = this.getOutcomes();
		
		questions.on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
		questions.on('downstreamQuestionsReset', _.bind(this.onDownstreamQuestionsReset, this));
		
		outcomes.on('availableOutcomesUpdated', _.bind(this.onAvailableOutcomesUpdated, this));
		outcomes.on('outcomeReached', _.bind(this.onOutcomeReached, this));
	},
	
	render: function() {
		Flow.Log.debug('MainView.render');
		this.$el.show();
		this.getOutcomes().checkAvailableOutcomes(this.getQuestions());
	},
	
	onNextQuestionAvailable: function(question) {
		
		if(!this.hadFirstQuestion) {
			this.render();
			this.hadFirstQuestion = true;
		}
	
		Flow.Log.debug('MainView.onNextQuestionAvailable');
	},
	
	onAvailableOutcomesUpdated: function(availableOutcomes) {
		Flow.Log.debug('MainView.onAvailableOutcomesUpdated (' + availableOutcomes.length + ')');
	},
	
	onAnswerSelected: function(answer) {
		
		Flow.Log.debug('MainView.onAnswerSelected');
		var answers = this.getAnswers();
		if(typeof answer === 'string') {
			answer = answers.get(answer);
		}
		
		var questions = this.getQuestions();
		questions.setAnswer(answer);
		this.getOutcomes().checkAvailableOutcomes(questions);
	},
	
	onDownstreamQuestionsReset: function() {
		Flow.Log.debug('MainView.onDownstreamQuestionsReset');
	},
	
	onOutcomeReached: function() {
		Flow.Log.debug('MainView.onOutcomeReached');
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
