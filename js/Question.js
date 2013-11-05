Flow.Question = Backbone.Model.extend({
	
	constructor: function(attributes) {
		
		this.index = this.INDEX_UNINITIALISED;
		
		switch(true) {
			case (typeof attributes.id !== 'undefined'):
				this.id = attributes.id;
				break;
			case (typeof attributes.id === 'undefined' && typeof attributes.title === 'string' && attributes.title.length > 0):
				this.id = Flow.Util.getIdFromText(attributes.title);
				break;
			default:
				this.id = Flow.Util.generateId();
				Flow.Log.log(Flow.Log.logLevels.WARNING, 'Question created without title, id: ' + this.id);
				break;
		}
		
		this.title = attributes.title;
		this.content = attributes.content;
		
		this.answers = [];
		this.precedingAnswers = [];
		
		this.selectedAnswer = undefined;
	},

	addAnswer: function(answer) {
	
		answer.question = this;
		this.answers.push(answer);
	},

	identifierTypes: {
		ID: 'id',
		TITLE: 'title'
	},

	nextTypes: {
		QUESTION: 'question',
		OUTCOME: 'outcome'
	},

	INDEX_UNINITIALISED: -1
});
