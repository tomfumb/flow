Flow.Theme.OutcomeManagerView = Backbone.View.extend({
	
	el: '#flow_outcomes',
	
	template: [
		'<div class="modal" id="flow_outcome_modal" tabindex="-1" role="dialog" aria-labelledby="flow_outcome_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_outcome_modal_label">Your Options</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_outcome_modal_body">',
		'				<div id="flow_outcome_modal_unanswered_count" class="alert alert-warning"></div>',
		'				<ul class="nav nav-tabs">',
		'					<li id="flow_outcome_available_link"><a class="outcome-tab-link" href="#flow_outcome_available" data-toggle="tab">Available</a></li>',
		'					<li><a class="outcome-tab-link" href="#flow_outcome_unavailable" data-toggle="tab">Unavailable</a></li>',
		'					<li style="display: none;" id="flow_outcome_detail_link"><a class="outcome-tab-link" href="#flow_outcome_detail" data-toggle="tab">Detail</a></li>',
		'				</ul>',
		'				<div class="tab-content">',
		'					<div class="tab-pane active" id="flow_outcome_available">',
		'						<div class="spacer-10"></div>',
		'						<p id="flow_some_options_note">Based on the questions you have answered the following options may be available to you.</p>',
		'						<div id="flow_no_options_note_container">',
		'							<h4>No Available Options</h4>',
		'							<p>Based on the questions you have answered we have not been able to find any suitable options.</p>',
		'							<p>Please note that an automated tool cannot provide perfect results and therefore we recommend that you discuss your case with a CCIJ lawyer.</p>',
		'						</div>',
		'						<div id="flow_outcome_available_outcomes"></div>',
		'					</div>',
		'					<div class="tab-pane" id="flow_outcome_unavailable">',
		'						<div class="spacer-10"></div>',
		'						<p>Based on the questions you have answered the following options may not be available to you.</p>',
		'						<div id="flow_outcome_unavailable_outcomes"></div>',
		'					</div>',
		'					<div class="tab-pane" id="flow_outcome_detail"></div>',
		'				</div>',
		'			</div>',
		'			<div class="modal-footer">',
		'				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''),
	
	outcome_template: [
		'<div class="row">',
		'	<div id="<%= outcomeElId %>" class="outcome-manager-outcome-container col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">',
		'	</div>',
		'</div>'
	].join(''),
	
	render: function() {
		
		this.$el.html(_.template(this.template));
		
		this.modal = this.$el.find('#flow_outcome_modal');
		
		this.$el.find('#flow_outcome_modal_body a.outcome-tab-link').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
		
		this.availableOutcomesContainer = this.$el.find('#flow_outcome_available_outcomes');
		this.unavailableOutcomesContainer = this.$el.find('#flow_outcome_unavailable_outcomes');
		
		this.someOptionsNote = this.$el.find('#flow_some_options_note');
		this.noOptionsNote = this.$el.find('#flow_no_options_note_container');
	},
	
	showOutcomesInModal: function() {
		
		this.renderOutcomesInModal();
		this.$el.find('#flow_outcome_available_link a').tab('show');
		this.modal.modal();
	},
	
	showOutcomeInModal: function(outcome, internal) {
		
		internal = (typeof internal === 'undefined' ? false : !!internal);
		
		if(!internal) {
			this.renderOutcomesInModal();
			this.modal.modal();
		}
		
		this.$el.find('#flow_outcome_detail_link').show().find('>a').html(outcome.get('abbreviation')).tab('show');
		this.$el.find('#flow_outcome_detail').html(outcome.get('selector').html());
	},
	
	renderOutcomesInModal: function() {
			
		this.availableOutcomesContainer.html('');
		this.unavailableOutcomesContainer.html('');
			
		var outcomeElId, outcomeEl, availableCount = 0;
		_.each(this.model.models, function(outcome, index) {
			
			outcomeElId = this.getContainerIdFromOutcome(outcome);
			outcomeEl = $(_.template(
				this.outcome_template, {
					outcomeElId: outcomeElId
				}
			));
			
			if(outcome.get('available')) {
				availableCount++;
				this.availableOutcomesContainer.append(outcomeEl);
			}
			else {
				this.unavailableOutcomesContainer.append(outcomeEl);
			}
				
			(new Flow.Theme.OutcomeView({ model: outcome, el: '#' + outcomeElId })).render();
			
		}, this);
		
		if(availableCount === 0) {
			this.someOptionsNote.hide();
			this.noOptionsNote.show();
		}
		else {
			this.someOptionsNote.show();
			this.noOptionsNote.hide();
		}
		
		this.modal.find('.outcome-manager-outcome-container').click(_.bind(function(event) {
			var jqEl = $(event.target);
			var element = (jqEl.hasClass('outcome-manager-outcome-container') ? jqEl : jqEl.parents('.outcome-manager-outcome-container'));
			var outcomeElementId = element.attr('id');
			var outcome = this.model.findWhere({id: this.getOutcomeIdFromContainerId(outcomeElementId)});
			this.showOutcomeInModal(outcome, true);
		}, this));
		
		if(this.unansweredQuestions > 0) {
			
			var questionPluralPart = (this.unansweredQuestions > 1 ? 's are' : ' is');
			
			this.$el.find('#flow_outcome_modal_unanswered_count').show().html(this.unansweredQuestions + ' question' + questionPluralPart + ' unanswered.');
		}
		else {
			this.$el.find('#flow_outcome_modal_unanswered_count').hide();
		}
	},
	
	getContainerIdFromOutcome: function(outcome) {
		return 'o_' + outcome.get('id');
	},
	
	getOutcomeIdFromContainerId: function(elId) {
		return elId.replace(/o_/, '');
	}
});
