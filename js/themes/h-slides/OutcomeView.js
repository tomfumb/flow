Flow.Theme.OutcomeView = Backbone.View.extend({

	template: [
		'<div class="modal fade" id="flow_outcome_modal" tabindex="-1" role="dialog" aria-labelledby="flow_outcome_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_outcome_modal_label"><%= outcome.get("title") %></h4>',
		'			</div>',
		'			<div class="modal-body"><%= outcome.get("description") %></div>',
		'			<div class="modal-footer">',
		'				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		'			</div>',
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
		
		this.$el.find('#flow_outcome_modal').modal();
	}
});
