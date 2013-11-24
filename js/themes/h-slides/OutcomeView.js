Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<div style="height: 400px; width: 100%; background-color: blue;">&nbsp;</div>',
		'<div class="container">',
		'	<div class="carousel-caption">',
		'		<div id="outcome_<%= outcome.get("id") %>">',
		'			<h4><%= outcome.get("title") %></h4>',
		'			<p><%= outcome.get("description") %></p>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''),
	
	render: function() {
		
		Flow.Log.debug('OutcomeView.render');
		
		this.$el.addClass('item');
		
		this.$el.html(_.template(
			this.template, {
				outcome: this.model
			}
		));
	}
});
