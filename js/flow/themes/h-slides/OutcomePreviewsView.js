define(['jquery', 'underscore', 'backbone', 'flow/Log', 'theme/OutcomePreviewView', 'text!template/flow/themes/h-slides/outcome-preview.html', 'text!template/flow/themes/h-slides/outcome-preview-outcome.html'], function($, _, Backbone, Log, OutcomePreviewView, previewTemplate, outcomeTemplate) {

	return Backbone.View.extend({
		
		el: '#flow_outcome_previews',
		
		changeHistory: [],
		changeHistoryPosition: -1,
		
		render: function(previewClickHandler) {
			
			this.onPreviewClicked = previewClickHandler;
			
			var availableCount = 0;
			_.each(this.model.models, function(outcome) {
			
				if(outcome.get('available')) {
					availableCount++;
				}	
			});
			
			this.$el.html(_.template(
			
				previewTemplate, {
					availableCount: availableCount,
					previewHtml: this.getAvailablePreviewsHtml()
				}
			));
			
			this.$el.find('#flow_available_count_main_container,#flow_options_preview_title').click(_.bind(this.onAvailableCountClicked, this));
			this.handlePreviewClicks();
		},
		
		getAvailablePreviewsHtml: function() {
		
			var scratch = $('#flow_scratch'), view, outcomeElId;
			_.each(this.model.models, function(outcome) {
					
				outcomeElId = this.getPreviewContainerIdFromOutcome(outcome);
				scratch.append(_.template(outcomeTemplate, {
					outcomeElId: outcomeElId,
					displayStyle: (outcome.get('available') ? '' : ' style="display: none;"')
				}));
				
				view = new OutcomePreviewView({el: '#' + outcomeElId, model: outcome});
				view.render();
				
			}, this);
			
			var html = scratch.html();
			scratch.html('');
			
			return html;
		},
		
		getPreviewContainerIdFromOutcome: function(outcome) {
			return 'op_' + outcome.get('id');
		},
		
		getOutcomeIdFromPreviewContainerId: function(elId) {
			return elId.replace(/op_/, '');
		},
		
		getTextLinkIdFromOutcome: function(outcome) {
			return 'optl_' + (new Date()).getTime() + '_' + outcome.get('id');
		},
		
		getOutcomeIdFromTextLinkId: function(elId) {
			return elId.replace(/optl_\d+_/, '');
		},
		
		handlePreviewClicks: function() {
			
			this.$el.find('#flow_available_outcome_previews .available-outcome-preview').click(_.bind(function(event) {
				var jqEl = $(event.target);
				var element = (jqEl.hasClass('available-outcome-preview') ? jqEl : jqEl.parents('.available-outcome-preview'));
				var outcomeElementId = element.attr('id');
				var outcome = this.model.findWhere({id: this.getOutcomeIdFromPreviewContainerId(outcomeElementId)});
				this.onPreviewClicked(outcome);
			}, this));
		},
		
		onAvailableCountClicked: function() {
			this.onPreviewClicked();
		},
		
		onPreviewClicked: function(outcome) {
			Log.error('OutcomePreviewView.onPreviewClicked has not been overridden. Nothing is going to happen when a preview is clicked');
		},
		
		onQuestionAnswered: function(question) {
			this.lastAnsweredQuestion = question;
		},
		
		onOutcomesChanged: function(changedOutcomes, updatedCallback) {

			var availableCount = 0, fadeSpeed = 300;
			_.each(this.model.models, function(outcome) {
			
				if(outcome.get('available')) {
					availableCount++;
				}	
			});
			
			var countEl = this.$el.find('#flow_available_count_main');
			
			countEl.stop();
			countEl.fadeOut(fadeSpeed, _.bind(function() {
				countEl.html(availableCount);
				countEl.fadeIn(100, function() {
					if(typeof updatedCallback === 'function') {
						// this fadeIn is the last thing to happen when the outcomes are updated
						updatedCallback();
					}
				});
			}, this));
			
			var addedLinks = [], removedLinks = [];
			
			_.each(changedOutcomes.added, function(outcome) {
				
				var changedPreviewEl = this.$el.find('#' + this.getPreviewContainerIdFromOutcome(outcome));
				changedPreviewEl.stop();
				changedPreviewEl.fadeIn(fadeSpeed);
				
				addedLinks.push('<li class="clickable clickable-colour outcome-text-link" id="' + this.getTextLinkIdFromOutcome(outcome) + '">' + outcome.get('title') + '</li>');
			}, this);
			
			_.each(changedOutcomes.removed, function(outcome) {
				var changedPreviewEl = this.$el.find('#' + this.getPreviewContainerIdFromOutcome(outcome));
				changedPreviewEl.stop();
				changedPreviewEl.fadeOut(fadeSpeed);
				
				removedLinks.push('<li class="clickable clickable-colour outcome-text-link" id="' + this.getTextLinkIdFromOutcome(outcome) + '">' + outcome.get('title') + '</li>');
			}, this);
			
			var changesEl = this.$el.find('#flow_outcome_recent_changes');
			var changesContentEl = changesEl.find('#flow_outcome_recent_changes_content');
			
			var hasAdded = !!addedLinks.length, hasRemoved = !!removedLinks.length;
			var conjunctionText = (hasAdded && hasRemoved ? ' and' : '');
			
			if(!changesEl.is(':visible')) {
				
				changesEl.stop();
				changesEl.slideDown(fadeSpeed);
			}
			
			this.changeHistory.push('Question ' + this.lastAnsweredQuestion.get('id') + (hasAdded ? ' added <ul>' + addedLinks.join('') + '</ul>' : '') + conjunctionText + (hasRemoved ? ' removed <ul>' + removedLinks.join('') + '</ul>' : ''));
			
			this.changeHistoryPosition = (this.changeHistory.length - 1);
			
			changesContentEl.html(this.changeHistory[this.changeHistoryPosition]);
			changesContentEl.find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
			
			this.checkOutcomeHistoryNav();
		},
		
		onOutcomeTextLinkClicked: function(event) {
			
			var jqEl = $(event.target);
			var outcome = this.model.findWhere({id: this.getOutcomeIdFromTextLinkId(jqEl.attr('id'))});
			this.onPreviewClicked(outcome);
		},
		
		checkOutcomeHistoryNav: function() {
			
			var navBack = this.$el.find('#flow_outcome_history_back');
			var navFwd = this.$el.find('#flow_outcome_history_fwd');
			
			if(this.changeHistoryPosition > 0 && this.changeHistoryPosition <= (this.changeHistory.length - 1)) {
				navBack.css('visibility', 'visible');
			}
			else {
				navBack.css('visibility', 'hidden');
			}
			
			if(this.changeHistoryPosition >= 0 && this.changeHistoryPosition < (this.changeHistory.length - 1)) {
				navFwd.css('visibility', 'visible');
			}
			else {
				navFwd.css('visibility', 'hidden');
			}
			
			if(this.changeHistory.length === 1) {
				// this is the first time any navigation controls have been shown, attach click handlers
				this.handleOutcomeHistoryNav(navBack, navFwd);
			}
		},
		
		handleOutcomeHistoryNav: function(navBack, navFwd) {
			
			var changesContentEl = this.$el.find('#flow_outcome_recent_changes_content');
			
			navBack.click(_.bind(function(event) {
				this.changeHistoryPosition--;
				changesContentEl.html(this.changeHistory[this.changeHistoryPosition]).find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
				this.checkOutcomeHistoryNav();
			}, this));
			
			navFwd.click(_.bind(function(event) {
				this.changeHistoryPosition++;
				changesContentEl.html(this.changeHistory[this.changeHistoryPosition]).find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
				this.checkOutcomeHistoryNav();
			}, this));
		}
	});
});
