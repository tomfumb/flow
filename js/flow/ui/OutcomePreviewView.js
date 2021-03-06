define(['jquery', 'underscore', 'backbone', 'text!templates/outcome-preview-image.html'], function($, _, Backbone, template) {
	
	return Backbone.View.extend({

		render: function() {
			
			var title = this.model.get('title');
			var imageClasses = this.model.get('imageClasses');
			
			this.$el.html(_.template(
				template, {
					title: title,
					imageClasses: imageClasses,
					abbreviation: this.model.get('abbreviation')
				}
			));
			
			this.$el.find('img').addClass('outcome-preview-logo');
			
			return this;
		},
		
		refreshEl: function(parent) {
			this.el = parent.find('#' + this.el.id);
			this.$el = $(this.el);
		},
		
		width: function() {
			return this.$el.outerWidth();
		},
		
		isShown: function() {
			return !!this.model.get('available');
		}
	});
});
