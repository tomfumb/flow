Flow.Theme.OutcomePreviewView = Backbone.View.extend({
	
	template: [
		'<div class="outcome-preview <%= (outcome.get("available") ? "outcome-preview-available" : "outcome-preview-unavailable") %>">',
		'	<button type="button" class="btn btn-default"><%= outcome.get("title") %></button>',
		'</div>'
	].join(''),
	
	render: function() {
		
		this.$el.html(_.template(
			this.template, {
				outcome: this.model
			}
		));
		
		this.$el.find('div.outcome-preview').click(_.bind(this.onPreviewSelected, this));
		
		this.model.on('change:available', _.bind(this.onAvailableChanged, this));
	},
	
	onPreviewSelected: function(event) {
		
		Flow.Log.debug('Outcome Preview selected');
	},
	
	onAvailableChanged: function(outcome) {
		
		var boundingElement = this.$el.find('div.outcome-preview');
		if(outcome.get('available')) {
			boundingElement.removeClass('outcome-preview-unavailable');
			boundingElement.addClass('outcome-preview-available');
		}
		else {
			boundingElement.removeClass('outcome-preview-available');
			boundingElement.addClass('outcome-preview-unavailable');
		}
	}
});
