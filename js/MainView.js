Flow.MainView = Backbone.View.extend({
	
	hadFirstQuestion: false,
	
	initialize: function() {
		
		Flow.Log.debug('Initialising MainView');
		var questions = this.getQuestions();
		var outcomes = this.getOutcomes();
		
		questions.on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
		questions.on('answerChanged', _.bind(this.onAnswerChanged, this));
		questions.on('downstreamQuestionsReset', _.bind(this.onDownstreamQuestionsReset, this));
		questions.on('outcomesReached', _.bind(this.onOutcomesReached, this));
		
		outcomes.on('availableOutcomesUpdated', _.bind(this.onAvailableOutcomesUpdated, this));
		
		questions.on('change:selectedAnswer', _.bind(this.onAnswerSelected, this));
	},
	
	render: function() {
		
		Flow.Log.debug('MainView.render');
		this.$el.show();
		
		this.content = new Flow.Theme.ContentView();
		this.content.render();
		
		this.getOutcomes().checkAvailableOutcomes(this.getQuestions());
	},
	
	onNextQuestionAvailable: function(question) {
		
		if(!this.hadFirstQuestion) {
			this.render();
			this.hadFirstQuestion = true;
		}
	
		Flow.Log.debug('MainView.onNextQuestionAvailable');
		
		this.content.addQuestion(question);
	},
	
	onAvailableOutcomesUpdated: function(outcomes, availableCount) {
		
		Flow.Log.debug('MainView.onAvailableOutcomesUpdated (' + availableCount + ' available)');
		
		this.content.showAvailableOutcomes(outcomes);
	},
	
	onAnswerSelected: function(question) {
		
		var answer = question.get('selectedAnswer');
		var questions = this.getQuestions();
		
		var logMessage = 'MainView.onAnswerSelected (Question ' + question.get('id') + ')';
		if(answer) {
			logMessage += '(Answer: ' + answer.get('id');
		}
		Flow.Log.debug(logMessage);
		
		questions.setAnswer(answer);
		
		this.getOutcomes().checkAvailableOutcomes(questions);
	},
	
	onAnswerChanged: function(question) {
		
		Flow.Log.debug('MainView.onAnwerChanged');
		
		this.content.answerChanged(question);
	},
	
	onDownstreamQuestionsReset: function() {
		Flow.Log.debug('MainView.onDownstreamQuestionsReset');
	},
	
	onOutcomesReached: function(outcomes) {
		
		Flow.Log.debug('MainView.onOutcomesReached (' + outcomes.length + ' outcomes)');
		
		this.content.showOutcomes(outcomes);
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
