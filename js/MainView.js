Flow.MainView = Backbone.View.extend({
	
	isFirstQuestion: true,
	
	constructor: function(model) {
	
		Backbone.View.prototype.constructor({model: model});
		
		this.listenToOnce(this.getQuestions(), 'reset', _.bind(this.onQuestionsReset, this));
		this.on('nextQuestionAvailable', _.bind(this.onNextQuestionAvailable, this));
	},
	
	onQuestionsReset: function() {
		$('#flow_start').removeAttr('disabled').on('click', _.bind(this.onStartClicked, this));
	},
	
	onStartClicked: function(event) {
		
		event.preventDefault();
		this.getQuestions().readyForFirstQuestion();
	},
	
	getQuestions: function() {
		return this.model.get('Questions');
	},
	
	onNextQuestionAvailable: function(data) {
		
		debugger;
		
		this.isFirstQuestion = false;
	}
});
