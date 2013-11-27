Flow.Theme.OutcomePreviewView = Backbone.View.extend({
	
	template: [
		'<div class="outcome-preview outcome-preview-available">',
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
	},
	
	onPreviewSelected: function(event) {
		
		Flow.Log.debug('Outcome Preview selected');
	}
});
