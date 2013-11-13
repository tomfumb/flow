Flow.IntroView = Backbone.View.extend({
	
	initialize: function() {
		
		Flow.Log.debug('initialising IntroView');
		this.listenToOnce(this.model, 'reset', _.bind(this.onQuestionsReset, this));
	},
	
	onQuestionsReset: function() {
		
		Flow.Log.debug('IntroView.onQuestionsReset');
		this.$el.find('#flow_start').removeAttr('disabled').on('click', _.bind(this.onStartRequested, this));
	},
	
	onStartRequested: function(event) {
		
		Flow.Log.debug('IntroView.onStartRequested');
		if(event && typeof event.preventDefault === 'function') {
			event.preventDefault();
		}
		
		this.$el.hide();
		
		this.model.readyForFirstQuestion();
	}
});
