define(['jquery', 'underscore', 'backbone', 'text!template/flow/themes/h-slides/outcome-preview-image.html'], function($, _, Backbone, template) {
	
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
			
			return this;
		},
		
		isShown: function() {
			return !!this.model.get('available');
		}
	});
});
