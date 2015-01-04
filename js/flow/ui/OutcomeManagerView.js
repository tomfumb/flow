define(['jquery', 'underscore', 'backbone', 'flow/Util', 'ui/OutcomeView', 'ui/ResultsSenderView', 'ui/FeedbackView', 'text!templates/outcome-manager.html', 'text!templates/outcome-manager-outcome.html', 'text!templates/outcome-manager-unanswered-count.html'], function($, _, Backbone, Util, OutcomeView, ResultsSenderView, FeedbackView, managerTemplate, outcomeTemplate, unansweredTemplate) {
	
	return Backbone.View.extend({
	
		el: '#flow_content_right',
				
		render: function(fullContentContainer) {
			
			this.fullContentContainer = fullContentContainer;
			
			this.$el.html(_.template(managerTemplate));
			
			this.availableOutcomesContainer = this.$el.find('#flow_outcome_available_outcomes');
			this.unavailableOutcomesContainer = this.$el.find('#flow_outcome_unavailable_outcomes');
			
			this.someAvailableNote = this.$el.find('#flow_available_options_note');
			this.noAvailableNote = this.$el.find('#flow_no_available_options_note_container');
		
			this.detailsModal = $('#flow_outcome_details_modal');
			this.detailsModalBody = this.detailsModal.find('#flow_outcome_details_modal_body');
			
			this.detailsModal.on('hidden.bs.modal', _.bind(function () {
				setTimeout(_.bind(function() {
					this.detailsModal.isShown = false;
				}, this), 0);
			}, this));
			
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
			
			this.email = this.$el.find('#mce-EMAIL').on('keyup', _.bind(this.onIdentityChanged, this));
			this.emailNews = this.$el.find('#flow_identity_news');
			this.emailNews.parent().find('.clickable').on('click', _.bind(function() {this.emailNews.get(0).click();}, this));
			this.emailSend = this.$el.find('#flow_identity_send').on('click', _.bind(this.onSendIdentityClicked, this));
			this.emailThanks = this.$el.find('#flow_identity_thanks');

			this.mailChimpForm = this.$el.find('#mc-embedded-subscribe-form');
			
			this.sharedData.on('change:userEmail', this.onSharedEmailChanged, this);
		},
		
		onEscapePressed: function() {
			
			if(
				!this.detailsModal.isShown &&
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
		
		showOutcomes: function() {
			
			this.renderOutcomes();
			this.$el.find('#flow_outcome_available_link a').tab('show');
			
			this.show();
		},
		
		showOutcome: function(outcome) {
			this.detailsModalBody.html(outcome.get('selector').html());
			this.detailsModal.show().modal();
			this.detailsModal.isShown = true;
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
			
			this.$el.find('.outcome-manager-outcome-container').click(_.bind(function(event) {
				var jqEl = $(event.target);
				var element = (jqEl.hasClass('outcome-manager-outcome-container') ? jqEl : jqEl.parents('.outcome-manager-outcome-container'));
				var outcomeElementId = element.attr('id');
				var outcome = this.model.findWhere({id: this.getOutcomeIdFromContainerId(outcomeElementId)});
				this.showOutcome(outcome);
			}, this));
			
			if(this.unansweredQuestions > 0) {

                this.$el.find('#flow_outcome_unanswered_count').show().html(_.template(unansweredTemplate, {
                    count: this.unansweredQuestions
                }));
			}
			else {
				this.$el.find('#flow_outcome_unanswered_count').hide();
			}
		},
		
		onSendResultsClicked: function() {
			
			if(!this.resultsSenderView) {
				this.resultsSenderView = new ResultsSenderView();
				this.resultsSenderView.sharedData = this.sharedData;
			}
			
			this.resultsSenderView.render();
		},
		
		onFeedbackClicked: function() {
			
			if(!this.feedbackView) {
				this.feedbackView = new FeedbackView();
				this.feedbackView.sharedData = this.sharedData;
			}
			
			this.feedbackView.render();
		},

		onSharedEmailChanged: function() {
		    this.email.val(this.sharedData.get('userEmail'));
		    this.onIdentityChanged(true);
        },
		
		onIdentityChanged: function (indirect) {

		    indirect = (typeof indirect === 'undefined' ? false : !!indirect);
						
			if(this.identityValid()) {
				this.email.removeClass('input-attention');
				this.emailSend.removeAttr('disabled');
			}
			else {
				this.emailSend.attr('disabled', 'disabled');
			}
			
			this.emailThanks.hide();

			if (!indirect) {
			    this.sharedData.set('userEmail', this.email.val());
			}
		},
		
		onSendIdentityClicked: function () {
		    this.mailChimpForm.submit();
		    this.emailThanks.show();
			this.emailSend.attr('disabled', 'disabled');
		},
		
		identityValid: function() {
			return Util.emailValid(this.email.val());
		},
		
		getContainerIdFromOutcome: function(outcome) {
			return 'o_' + outcome.get('id');
		},
		
		getOutcomeIdFromContainerId: function(elId) {
			return elId.replace(/o_/, '');
		}
	});
});
