Flow.Theme.OutcomePreviewView = Backbone.View.extend({

	template: [
		'<div title="<%= title %>" class="clickable clickable-colour">',
		'	<img src="<%= image %>" height="75px" width="75px" alt="<%= title %>" />',
		'	<br />',
		'	<div class="outcome-preview-abbreviation"><%= abbreviation %></div>',
		'</div>'
	].join(''),

	render: function() {
		
		var title = this.model.get('title');
		var image = (this.model.get('image') || 'images/place-holder.png');
		
		this.$el.html(_.template(
			this.template, {
				title: title,
				image: image,
				abbreviation: this.model.get('abbreviation')
			}
		));
	}
});
