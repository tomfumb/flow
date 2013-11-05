Flow.Outcome = Backbone.Model.extend({
	
	constructor: function(attributes) {
		
		switch(true) {
			case (typeof attributes.id !== 'undefined'):
				this.id = attributes.id;
				break;
			case (typeof attributes.id === 'undefined' && typeof attributes.title === 'string' && attributes.title.length > 0):
				this.id = Flow.Util.getIdFromText(attributes.title);
				break;
			default:
				this.id = Flow.Util.generateId();
				Flow.Log.log(Flow.Log.logLevels.WARNING, 'Outcome created without title, id: ' + this.id);
				break;
		}
		
		this.title = attributes.title;
		this.description = attributes.description;
		this.url = attributes.url;
		
		this.precedingAnswers = [];
	},
	
	identifierTypes: {
		ID: 'id',
		TITLE: 'title'
	}
});
