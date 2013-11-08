Flow.MainView = Backbone.View.extend({
	
	hadFirstQuestion: false,
	
	constructor: function(model) {
	
		Backbone.View.prototype.constructor({model: model});
		
		this.listenToOnce(this.getQuestions(), 'reset', _.bind(this.onQuestionsReset, this));
		
		this.getQuestions().on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
		this.getOutcomes().on('availableOutcomesUpdated', _.bind(this.onAvailableOutcomesUpdated, this));
	},
	
	onQuestionsReset: function() {
		$('#flow_start').removeAttr('disabled').on('click', _.bind(this.onStartRequested, this));
	},
	
	onStartRequested: function(event) {
		
		// start request may not have come from click event
		if(event && typeof event.preventDefault === 'function') {
			event.preventDefault();
		}
		
		var questions = this.getQuestions();
		this.getOutcomes().checkAvailableOutcomes(questions);
		questions.readyForFirstQuestion();
	},
	
	onNextQuestionAvailable: function(question) {
	
		debugger;
	
		this.hadFirstQuestion = true;
	},
	
	onAvailableOutcomesUpdated: function(availableOutcomes) {

		debugger;
	},
	
	
	
	
	getQuestions: function() {
		return this.model.get('Questions');
	},
	
	getOutcomes: function() {
		return this.model.get('Outcomes');
	}
});
