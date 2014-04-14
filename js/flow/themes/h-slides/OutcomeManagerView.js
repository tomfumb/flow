define(['jquery', 'underscore', 'backbone', 'theme/OutcomeView', 'theme/ResultsSenderView', 'theme/FeedbackView', 'text!templates/flow/themes/h-slides/outcome-manager.html', 'text!templates/flow/themes/h-slides/outcome-manager-outcome.html'], function($, _, Backbone, OutcomeView, ResultsSenderView, FeedbackView, managerTemplate, outcomeTemplate) {
	
	return Backbone.View.extend({
	
		el: '#flow_content_right',
				
		render: function(fullContentContainer) {
			
			this.fullContentContainer = fullContentContainer;
			
			this.$el.html(_.template(managerTemplate));
			
			this.availableOutcomesContainer = this.$el.find('#flow_outcome_available_outcomes');
			this.unavailableOutcomesContainer = this.$el.find('#flow_outcome_unavailable_outcomes');
			
			this.someAvailableNote = this.$el.find('#flow_available_options_note');
			this.noAvailableNote = this.$el.find('#flow_no_available_options_note_container');
			
			this.someUnavailableNote = this.$el.find('#flow_unavailable_options_note');
			this.noUnavailableNote = this.$el.find('#flow_no_unavailable_options_note_container');
			
			this.$el.find('.results-send-link').click(_.bind(function() {
				this.onSendResultsClicked();
			}, this));
			
			this.$el.find('.feedback-send-link').click(_.bind(function() {
				this.onFeedbackClicked();
			}, this));
			
			this.$el.find('.results-print-link').click(function() {
				window.print();
			});
			
			this.$el.find('.outcomes-hide').click(_.bind(function() {
				this.hideClicked();
			}, this));
			
			$(document).keyup(_.bind(function(e) {
				if(e.keyCode === 27) {
					this.onEscapePressed();
				}
			}, this));
		},
		
		onEscapePressed: function() {
			if(
				(!this.resultsSenderView || (this.resultsSenderView && !this.resultsSenderView.isShown)) &&
				(!this.feedbackView || (this.feedbackView && !this.feedbackView.isShown))) {
				this.hideClicked();
			}
		},
		
		show: function() {
			
			var height = this.fullContentContainer.height();
			var width = this.fullContentContainer.width();
			
			this.$el.height(height).css('left', width).show();
			
			this.fullContentContainer.height(height).find('.content-piece').hide();
			
			this.$el.stop().animate({left: 0}, 200, _.bind(function() {
				this.$el.height('auto');
				this.fullContentContainer.height('auto');
				this.isShown = true;
			}, this));
		},
		
		hide: function() {
			
			var height = this.fullContentContainer.height();
			var width = this.fullContentContainer.width();
			
			this.isShown = false;
			
			this.fullContentContainer.height(height);
			
			this.$el.stop().animate({left: width}, 200, _.bind(function() {
				this.$el.hide();
				this.fullContentContainer.height('auto').find('.content-piece').show();
			}, this));
		},
		
		hideClicked: function() {
			if(this.isShown) {
				this.hide();
			}
		},
		
		showOutcomes: function(fromEnd) {
			
			fromEnd = (typeof fromEnd === 'undefined' ? false : !!fromEnd);
			
			this.renderOutcomes();
			if(fromEnd) {
				this.$el.find('#flow_outcome_what_now_link a').tab('show');
			}
			else {
				this.$el.find('#flow_outcome_available_link a').tab('show');
			}
			
			this.show();
		},
		
		showOutcome: function(outcome, internal) {
			
			internal = (typeof internal === 'undefined' ? false : !!internal);
			
			if(!internal) {
				this.renderOutcomes();
			}
			
			this.$el.find('#flow_outcome_detail_link').show().find('>a').html(outcome.get('abbreviation')).tab('show');
			this.$el.find('#flow_outcome_detail').html(outcome.get('selector').html());
			
			if(!internal) {
				this.show();
			}
		},
		
		renderOutcomes: function() {
				
			this.availableOutcomesContainer.html('');
			this.unavailableOutcomesContainer.html('');
				
			var outcomeElId, outcomeEl, availableCount = 0, unavailableCount = 0;
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
					unavailableCount++;
					this.unavailableOutcomesContainer.append(outcomeEl);
				}
					
				(new OutcomeView({ model: outcome, el: '#' + outcomeElId })).render();
				
			}, this);
			
			if(availableCount === 0) {
				this.someAvailableNote.hide();
				this.noAvailableNote.show();
			}
			else {
				this.someAvailableNote.show();
				this.noAvailableNote.hide();
			}
			
			if(unavailableCount === 0) {
				this.someUnavailableNote.hide();
				this.noUnavailableNote.show();
			}
			else {
				this.someUnavailableNote.show();
				this.noUnavailableNote.hide();
			}
			
			this.$el.find('.outcome-manager-outcome-container').click(_.bind(function(event) {
				var jqEl = $(event.target);
				var element = (jqEl.hasClass('outcome-manager-outcome-container') ? jqEl : jqEl.parents('.outcome-manager-outcome-container'));
				var outcomeElementId = element.attr('id');
				var outcome = this.model.findWhere({id: this.getOutcomeIdFromContainerId(outcomeElementId)});
				this.showOutcome(outcome, true);
			}, this));
			
			if(this.unansweredQuestions > 0) {
				
				var questionPluralPart = (this.unansweredQuestions > 1 ? 's are' : ' is');
				
				this.$el.find('#flow_outcome_unanswered_count').show().html(this.unansweredQuestions + ' question' + questionPluralPart + ' unanswered.');
			}
			else {
				this.$el.find('#flow_outcome_unanswered_count').hide();
			}
		},
		
		onSendResultsClicked: function() {
			
			if(!this.resultsSenderView) {
				this.resultsSenderView = new ResultsSenderView();
			}
			
			this.resultsSenderView.render();
		},
		
		onFeedbackClicked: function() {
			
			if(!this.feedbackView) {
				this.feedbackView = new FeedbackView();
			}
			
			this.feedbackView.render();
		},
		
		getContainerIdFromOutcome: function(outcome) {
			return 'o_' + outcome.get('id');
		},
		
		getOutcomeIdFromContainerId: function(elId) {
			return elId.replace(/o_/, '');
		}
	});
});
