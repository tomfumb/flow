Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<div title="<%= title %>" class="clickable outcome-view">',
		'	<img src="images/0.png" class="<%= imageClasses %>" height="75px" width="75px" alt="<%= title %>" style="float: left;" />',
		'	<h5 style="float: left; margin-left: 10px;"><%= title %></h5>',
		'	<div style="clear: both;"></div>',
		'</div>'
	].join(''),

	render: function() {
		
		var title = this.model.get('title');
		var imageClasses = this.model.get('imageClasses');
		
		this.$el.html(_.template(
			this.template, {
				title: title,
				imageClasses: imageClasses
			}
		));
	}
});
