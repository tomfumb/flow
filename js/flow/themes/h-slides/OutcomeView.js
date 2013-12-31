Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<img src="<%= image %>" height="60px" width="60px" title="<%= title %><%= availability %>" alt="<%= title %>" class="clickable" />',
		'<br />',
		'<h5 class="clickable clickable-colour"><%= title %></h5>'
	].join(''),

	render: function() {
		
		var title = this.model.get('title');
		var image = (this.model.get('image') || 'images/place-holder.png');
		
		this.$el.html(_.template(
			this.template, {
				title: title,
				image: image,
				availability: (this.model.get('available') ? '' : ' (unavailable)')
			}
		));
		
		this.$el.find('.clickable').click(_.bind(function(event) {
				
			event.preventDefault();
			this.onOutcomeSelected(this.model);
		}, this));
	},
	
	onOutcomeSelected: function(outcome) {
		Flow.Log.warn('OutcomeView.onOutcomeSelected has not been overridden');
	}
});
