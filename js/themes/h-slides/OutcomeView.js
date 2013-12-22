Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<img src="<%= image %>" height="75px" width="75px" title="<%= title %><%= availability %>" alt="<%= title %>" class="clickable" />',
		'<br />',
		'<h5 class="clickable"><%= title %></h5>'
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
		
		this.$el.find('.clickable').click(function(event) {
				
			event.preventDefault();
			
			Flow.Log.debug('outcome view clicked');
		});
	}
});
