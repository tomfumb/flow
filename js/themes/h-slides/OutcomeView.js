Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<div id="outcome_<%= outcome.get("id") %>">',
		'	<h4><%= outcome.get("title") %></h4>',
		'	<p><%= outcome.get("description") %></p>',
		'</div>'
	].join(''),
	
	render: function() {
		
		Flow.Log.debug('OutcomeView.render');
		this.$el.html(_.template(
			this.template, {
				outcome: this.model
			}
		));
	}
});
