define(['jquery', 'underscore', 'backbone', 'flow/Log', 'text!templates/intro.html'], function($, _, Backbone, Log, template) {
	
	return Backbone.View.extend({
		
		render: function() {
			this.$el.html(_.template(template));
		},
		
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
			this.model.userReady();
		}
	});
});
