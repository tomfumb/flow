Flow.IntroView = Backbone.View.extend({
	
	template: [
		'<div class="container">',
		'	<h3>Intro Text</h3>',
		'	<p>Here will be some introduction text and a start button that is initially disabled</p>',
		'	<button id="flow_start" type="button" class="btn btn-default" disabled="disabled">Start</button>',
		'</div>'
	].join(''),
	
	render: function() {
		this.$el.html(_.template(this.template));
	},
	
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
