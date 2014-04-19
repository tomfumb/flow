define(['jquery', 'underscore', 'backbone', 'text!templates/outcome.html'], function($, _, Backbone, template) {
	
	return Backbone.View.extend({

		render: function() {
			
			var title = this.model.get('title');
			var imageClasses = this.model.get('imageClasses');
			var caveats = this.model.get('caveats');
			
			this.$el.html(_.template(
				template, {
					title: title,
					imageClasses: imageClasses,
					caveats: caveats
				}
			));
			
			if(!caveats) {
				this.$el.find('.outcome-caveats').hide();
			}
		}
	});
});
