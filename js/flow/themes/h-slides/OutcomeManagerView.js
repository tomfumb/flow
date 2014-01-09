Flow.Theme.OutcomeManagerView = Backbone.View.extend({
	
	el: '#flow_outcomes',
	
	template: [
		'<div class="row">',
		'	<div class="col-12 col-sm-12 col-md-12 col-lg-12">',
		'		<h5 id="flow_outcome_count_report" class="clickable">Outcomes: <%= availableCount %> available of <%= totalCount %> total</h5>',
		'	</div>',
		'</div>',
		'<div class="row" id="flow_outcome_preview"></div>',
		'<div class="modal" id="flow_outcome_modal" tabindex="-1" role="dialog" aria-labelledby="flow_outcome_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_outcome_modal_label">Outcomes</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_outcome_modal_body">',
		'				<div id="flow_outcome_modal_unanswered_count"></div>',
		'				<div id="flow_outcome_listing">',
		'					<div id="flow_outcomes_available" class="row outcome-availability-container">',
		'						<h4>Available</h4>',
		'					</div>',
		'					<div id="flow_outcomes_unavailable" class="row outcome-availability-container">',
		'						<h4>Unavailable</h4>',
		'					</div>',
		'				</div>',
		'				<div id="flow_outcome_details">',
		'					<h5 id="flow_outcome_listing_return" class="clickable clickable-colour">Back to listing</h5>',
		'					<img id="flow_outcome_details_image" width="75px" height="75px" />',
		'					<h4 id="flow_outcome_details_title"></h4>',
		'					<div id="flow_outcome_details_description"></div>',
		'				</div>',
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
			
		this.model.on('change:available', _.bind(this.onOutcomesUpdated, this));
		this.$el.find('#flow_outcome_count_report').click(_.bind(this.onCountReportClicked, this));
		this.$el.find('#flow_outcome_listing_return').click(_.bind(this.onListingReturnClicked, this));
		
		this.previewContainer = this.$el.find('#flow_outcome_preview');
		this.modal = this.$el.find('#flow_outcome_modal');
		this.outcomeListPane = this.$el.find('#flow_outcome_listing');
		this.outcomeDetailsPane = this.$el.find('#flow_outcome_details');
		this.availableContainer = this.$el.find('#flow_outcomes_available');
		this.unavailableContainer = this.$el.find('#flow_outcomes_unavailable');
		
		this.updatePreviews();
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
			
			view.onOutcomeSelected = _.bind(this.onOutcomeSelected, this);
			view.render();
		}, this);
	},
	
	onCountReportClicked: function() {
	
		Flow.Log.debug('ContentView.onCountReportClicked');
		
		this.showOutcomesInModal();
	},
	
	showOutcomesInModal: function(unansweredQuestions) {
		
		this.renderOutcomesInModal();
		
		this.outcomeListPane.show();
		this.outcomeDetailsPane.hide();
		
		if(unansweredQuestions) {
			this.$el.find('#flow_outcome_modal_unanswered_count').show().html(unansweredQuestions + ' questions are unanswered. See question numbers <span class="summary-unanswered">like this</span> above question area.');
		}
		else {
			this.$el.find('#flow_outcome_modal_unanswered_count').hide();
		}
		
		this.modal.modal();
	},
	
	renderOutcomesInModal: function() {
			
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
			
			view.onOutcomeSelected = _.bind(this.onOutcomeSelected, this);
			view.render();
			
		}, this);
	},
	
	sort: function() {
		
		// sort a shallow copy of the models array - don't affect Backbone's model ordering but reference the same model objects to support model events
		var models = this.model.models.slice();
		
		// first sort alphabetically
		models.sort(function(a, b) {
			
			var aTitle = a.get('title'), bTitle = b.get('title');
			var sortedTitles = [aTitle, bTitle].sort();
			
			if(aTitle === sortedTitles[0]) {
				return -1;
			}
			
			return 1;
		});
		
		// then sort by availability
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
	},
	
	onOutcomeSelected: function(outcome) {
	
		var modalData = this.modal.data('bs.modal');
		var modalShowing = (modalData ? modalData.isShown : false);
		
		var image = (outcome.get('image') || 'images/place-holder.png');
		
		$('#flow_outcome_details_image').attr('src', image);
		$('#flow_outcome_details_title').html(outcome.get('title'));
		$('#flow_outcome_details_description').html(outcome.get('description'));
		
		if(modalShowing) {
			
			if(this.outcomeListPane.is(':visible')) {
				this.outcomeListPane.fadeOut(200, _.bind(function() {
					this.outcomeDetailsPane.fadeIn(200);
				}, this));
			}
			// else do nothing
		}
		else {
			this.outcomeListPane.hide();
			this.outcomeDetailsPane.show();
			
			this.modal.modal();
		}
	},
	
	onListingReturnClicked: function(event) {
	
		event.preventDefault();
		
		// outcomes may not previously been rendered in the modal window, so make sure something will be shown
		if(!this.modal.find('div.outcome-container').length) {
			this.renderOutcomesInModal();
		}
		
		this.outcomeDetailsPane.fadeOut(200, _.bind(function() {
			this.outcomeListPane.fadeIn(200);
		}, this));
	}
});
