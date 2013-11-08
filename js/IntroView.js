Flow.IntroView = Backbone.View.extend({
	
	initialize: function() {
		this.listenToOnce(this.model, 'reset', _.bind(this.onQuestionsReset, this));
	},
	
	onQuestionsReset: function() {
		this.$el.find('#flow_start').removeAttr('disabled').on('click', _.bind(this.onStartRequested, this));
	},
	
	onStartRequested: function(event) {
		
		if(event && typeof event.preventDefault === 'function') {
			event.preventDefault();
		}
		
		this.$el.hide();
		
		this.model.readyForFirstQuestion();
	}
});
