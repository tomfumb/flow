Flow.Theme.OutcomePreviewView = Backbone.View.extend({

	template: [
		'<div title="<%= title %>" class="clickable clickable-colour">',
		'	<img src="images/0.png" class="<%= imageClasses %>" height="75px" width="75px" alt="<%= title %>" />',
		'	<br />',
		'	<div class="outcome-preview-abbreviation"><%= abbreviation %></div>',
		'</div>'
	].join(''),

	render: function() {
		
		var title = this.model.get('title');
		var imageClasses = this.model.get('imageClasses');
		
		this.$el.html(_.template(
			this.template, {
				title: title,
				imageClasses: imageClasses,
				abbreviation: this.model.get('abbreviation')
			}
		));
	}
});
