Flow.Theme.OutcomeManagerView = Backbone.View.extend({
	
	el: '#flow_outcomes',
	
	template: [
		'<h5 id="flow_outcome_count_report" class="clickable">Outcomes: <%= availableCount %> available of <%= totalCount %> total</h5>',
		'<div class="modal fade" id="flow_outcome_modal" tabindex="-1" role="dialog" aria-labelledby="flow_outcome_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_outcome_modal_label">Outcomes</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_outcome_modal_body"></div>',
		'			<div class="modal-footer">',
		'				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''),
	
	render: function() {
		
		var availableCount = 0, totalCount = 0;
		_.each(this.model.models, function(outcome) {
		
			totalCount++;
			if(outcome.get('available')) {
				availableCount++;
			}
		}, this);
		
		this.$el.html(_.template(
			this.template, {
				availableCount: availableCount,
				totalCount: totalCount
			}
		));
		
		if(!this.hadFirstRender) {
			
			this.hadFirstRender = true;
			
			this.model.on('change:available', _.bind(this.render, this));
			this.$el.find('#flow_outcome_count_report').click(_.bind(this.onCountReportClicked, this));
		}
	},
	
	onCountReportClicked: function() {
	
		Flow.Log.debug('ContentView.onCountReportClicked');
		
		var modal = this.$el.find('#flow_outcome_modal');
		modal.find('#flow_outcome_modal_body').html('Populate with available outcomes followed by unavailable...');
		modal.modal();
	}
});
