define(['jquery', 'underscore', 'backbone', 'theme/OutcomeView', 'text!template/flow/themes/h-slides/outcome-manager.html', 'text!template/flow/themes/h-slides/outcome-manager-outcome.html'], function($, _, Backbone, OutcomeView, managerTemplate, outcomeTemplate) {
	
	return Backbone.View.extend({
	
		el: '#flow_outcomes',
		
		outcome_template: [
		].join(''),
		
		render: function() {
			
			this.$el.html(_.template(managerTemplate));
			
			this.modal = this.$el.find('#flow_outcome_modal');
			this.modalContent = this.modal.find('.modal-content');
			
			this.$el.find('#flow_outcome_modal_body a.outcome-tab-link').click(function (e) {
				e.preventDefault();
				$(this).tab('show');
			});
			
			this.availableOutcomesContainer = this.$el.find('#flow_outcome_available_outcomes');
			this.unavailableOutcomesContainer = this.$el.find('#flow_outcome_unavailable_outcomes');
			
			this.someOptionsNote = this.$el.find('#flow_some_options_note');
			this.noOptionsNote = this.$el.find('#flow_no_options_note_container');
			/*
			$(window).resize(_.bind(this.onWindowResize, this));
			this.onWindowResize();
			*/
		},
		/*
		onWindowResize: function() {
			
			if(window.innerWidth < 768) {
				this.modalContent.css('max-height', window.innerHeight).css('overflow-y', 'auto');
			}
			else {
				this.modalContent.css('max-height', '').css('overflow-y', 'visible');
			}
		},
		*/
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
					outcomeTemplate, {
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
					
				(new OutcomeView({ model: outcome, el: '#' + outcomeElId })).render();
				
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
});
