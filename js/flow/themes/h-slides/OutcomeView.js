define(['jquery', 'underscore', 'backbone', 'text!template/flow/themes/h-slides/outcome.html'], function($, _, Backbone, template) {
	
	return Backbone.View.extend({

		render: function() {
			
			var title = this.model.get('title');
			var imageClasses = this.model.get('imageClasses');
			
			this.$el.html(_.template(
				template, {
					title: title,
					imageClasses: imageClasses
				}
			));
		}
	});
});
