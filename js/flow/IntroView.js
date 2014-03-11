define(['jquery', 'underscore', 'backbone', 'flow/Log', 'text!template/intro.html'], function($, _, Backbone, Log, template) {
	
	return Backbone.View.extend({
	
		template: [

		].join(''),
		
		render: function() {
			this.$el.html(_.template(template));
		},
		
		initialize: function() {
			
			Log.debug('initialising IntroView');
			this.listenToOnce(this.model, 'reset', _.bind(this.onQuestionsReset, this));
		},
		
		onQuestionsReset: function() {
			
			Log.debug('IntroView.onQuestionsReset');
			this.$el.find('#flow_start').removeAttr('disabled').on('click', _.bind(this.onStartRequested, this));
		},
		
		onStartRequested: function(event) {
			
			Log.debug('IntroView.onStartRequested');
			if(event && typeof event.preventDefault === 'function') {
				event.preventDefault();
			}
			
			this.$el.hide();
			
			this.model.readyForFirstQuestion();
		}
	});
});
