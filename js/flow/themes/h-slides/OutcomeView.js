Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<div title="<%= title %>" class="clickable outcome-view">',
		'	<img src="<%= image %>" height="75px" width="75px" alt="<%= title %>" style="float: left;" />',
		'	<h5 style="float: left; margin-left: 10px;"><%= title %></h5>',
		'	<div style="clear: both;"></div>',
		'</div>'
	].join(''),

	render: function() {
		
		var title = this.model.get('title');
		var image = (this.model.get('image') || 'images/place-holder.png');
		
		this.$el.html(_.template(
			this.template, {
				title: title,
				image: image
			}
		));
	}
});
