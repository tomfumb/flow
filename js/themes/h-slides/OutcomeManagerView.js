Flow.Theme.OutcomeManagerView = Backbone.View.extend({
	
	el: '#flow_outcomes',
	
	template: [
		'<div class="row">',
		'	<h5 id="flow_outcome_count_report" class="clickable">Outcomes: <%= availableCount %> available of <%= totalCount %> total</h5>',
		'</div>',
		'<div class="row" id="flow_outcome_preview"></div>',
		'<div class="modal fade" id="flow_outcome_modal" tabindex="-1" role="dialog" aria-labelledby="flow_outcome_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_outcome_modal_label">Outcomes</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_outcome_modal_body">',
		'				<div id="flow_outcome_listing">',
		'					<div id="flow_outcomes_available" class="row outcome-availability-container">',
		'						<h4>Available</h4>',
		'					</div>',
		'					<div id="flow_outcomes_unavailable" class="row outcome-availability-container">',
		'						<h4>Unavailable</h4>',
		'					</div>',
		'				</div>',
		'				<div id="flow_outcome_details"></div>',
		'			</div>',
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
		
		this.previewContainer = this.$el.find('#flow_outcome_preview');
		
		this.updatePreviews();
			
		this.model.on('change:available', _.bind(this.onOutcomesUpdated, this));
		this.$el.find('#flow_outcome_count_report').click(_.bind(this.onCountReportClicked, this));
	},
	
	onOutcomesUpdated: function() {
		this.updatePreviews();
	},
	
	updatePreviews: function() {
		
		this.previewContainer.html('');
		
		_.each(this.sort(), function(model, index) {
		
			var availabilityClass = (model.get('available') ? 'outcome-preview-available' : 'outcome-preview-unavailable');
			var outcomeElId = 'flow_outcome_preview_' + index;
			var outcomeEl = $('<div id="' + outcomeElId + '" class="outcome-preview-container col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 ' + availabilityClass + '"></div>');
			
			this.previewContainer.append(outcomeEl);
				
			var view = new Flow.Theme.OutcomeView({ model: model, el: '#' + outcomeElId });
			view.render();
		}, this);
	},
	
	onCountReportClicked: function() {
	
		Flow.Log.debug('ContentView.onCountReportClicked');
		
		this.showOutcomesInModal();
	},
	
	showOutcomesInModal: function() {
	
		var modal = this.$el.find('#flow_outcome_modal');
		
		if(!this.availableContainer) {
			this.availableContainer = $('#flow_outcomes_available');
		}
		
		if(!this.unavailableContainer) {
			this.unavailableContainer = $('#flow_outcomes_unavailable');
		}
		
		this.availableContainer.find('div.outcome-container').remove();
		this.unavailableContainer.find('div.outcome-container').remove();
		
		_.each(this.sort(), function(model, index) {
			
			var outcomeElId = 'flow_outcome_' + index;
			var outcomeEl = $('<div id="' + outcomeElId + '" class="outcome-container col-3 col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>');
			
			if(model.get('available')) {
				this.availableContainer.append(outcomeEl);
			}
			else {
				this.unavailableContainer.append(outcomeEl);
			}
				
			var view = new Flow.Theme.OutcomeView({ model: model, el: '#' + outcomeElId });
			view.render();
			
		}, this);
		
		modal.modal();
	},
	
	sort: function() {
		
		var models = $.extend(true, [], this.model.models);
		
		// first sort alphabetically
		models.sort(function(a, b) {
			
			var aTitle = a.get('title'), bTitle = b.get('title');
			var sortedTitles = [aTitle, bTitle].sort();
			
			if(aTitle === sortedTitles[0]) {
				return -1;
			}
			
			return 1;
		});
		
		var availableModels = [], unavailableModels = [];
		_.each(models, function(model) {
		
			if(model.get('available')) {
				availableModels.push(model);
			}
			else {
				unavailableModels.push(model);
			}
		});
		
		return availableModels.concat(unavailableModels);
	}
});
