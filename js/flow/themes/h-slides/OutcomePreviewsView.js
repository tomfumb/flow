define(['jquery', 'underscore', 'backbone', 'flow/Log', 'theme/OutcomePreviewView', 'text!template/flow/themes/h-slides/outcome-preview.html', 'text!template/flow/themes/h-slides/outcome-preview-outcome.html'], function($, _, Backbone, Log, OutcomePreviewView, previewTemplate, outcomeTemplate) {

	return Backbone.View.extend({
		
		el: '#flow_outcome_previews',
		
		changeHistory: [],
		changeHistoryPosition: -1,
		
		previews: [],
		availableOutcomePreviews: [],
		
		slideLeftEnabled: false,
		slideRightEnabled: false,
		
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
			
			_.each(this.previews, function(preview) {
				preview.refreshEl(this.$el);
				if(preview.isShown()) {
					this.availableOutcomePreviews.push(preview);
				}
			}, this);
			
			this.$el.find('#flow_available_count_main_container,#flow_options_preview_title').click(_.bind(this.onAvailableCountClicked, this));
			this.handlePreviewClicks();
			
			this.slideLeftCtrl = this.$el.find('#flow_available_outcome_preview_move_left');
			this.slideRightCtrl = this.$el.find('#flow_available_outcome_preview_move_right');
			this.slideLeftCtrl.click(_.bind(this.onMoveLeftRequested, this));
			this.slideRightCtrl.click(_.bind(this.onMoveRightRequested, this));
			
			this.outcomePreviewRow = this.$el.find('#flow_outcome_preview_row');
			this.outcomePreviewMoveContainer = this.$el.find('#flow_available_outcome_previews');
			this.originalLeftMovePos = parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10);
			this.moveRightPadWidth = this.$el.find('#flow_available_count_side_pad_right').outerWidth();
			
			this.availableOutcomeCountEl = this.$el.find('#flow_available_count_main');
			
			$(window).resize(_.bind(this.onWindowResize, this));
		},
		
		onShow: function() {
			this.checkSlideEnabled();
		},
		
		getAvailablePreviewsHtml: function() {
		
			var scratch = $('#flow_scratch'), view, outcomeElId;
			_.each(this.model.models, function(outcome) {
					
				outcomeElId = this.getPreviewContainerIdFromOutcome(outcome);
				scratch.append(_.template(outcomeTemplate, {
					outcomeElId: outcomeElId,
					displayStyle: (outcome.get('available') ? '' : ' style="display: none;"')
				}));
				
				this.previews.push((new OutcomePreviewView({el: '#' + outcomeElId, model: outcome})).render());
				
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
			
			var updatedAvailablePreviews = _.filter(this.previews, function(preview) {
				return preview.isShown();
			});

			var fadeSpeed = 300;
			
			this.availableOutcomeCountEl.stop();
			this.availableOutcomeCountEl.fadeOut(fadeSpeed, _.bind(function() {
				this.availableOutcomeCountEl.html(updatedAvailablePreviews.length);
				this.availableOutcomeCountEl.fadeIn(100, function() {
					if(typeof updatedCallback === 'function') {
						// this fadeIn is the last thing to happen when the outcomes are updated
						updatedCallback();
					}
				});
			}, this));
			
			var addedLinks = [], removedLinks = [];
			
			this.outcomeAddPending = !!changedOutcomes.added.length;
			this.outcomeRemPending = !!changedOutcomes.removed.length;
			
			this.slideLeftEnabled = false;
			this.slideRightEnabled = false;
			this.$el.find('.outcome-preview-slider').css('visibility', 'hidden');

			// new approach for positioning:
			//   get idx of first visible preview
			//	 for each added preview with index < first visible decrement left
			// 	 for each removed preview with index < first visible increment left
			//	 by this point any left value beyond the original means there will be (/79) previews there. if all currently visible are going to be removed and there is something left then decrement left


			// get index of first currently visible outcome preview
			var firstVisible = _.find(this.availableOutcomePreviews, function(preview) {
				
				// below approach needs to account for the idx of the preview, otherwise it will always calculate the same value
				
				
				return((parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10) + preview.$el.width()) - this.originalLeftMovePos > 0);
			}, this);
			var firstVisibleId = firstVisible.model.get('id');
			var firstVisibleIndex = 0;
			_.each(this.previews, function(preview, idx) {
				if(firstVisibleId === preview.model.get('id')) {
					firstVisibleIndex = idx;
				}
			});
			
			var getPreviewIndex = _.bind(function(outcome) {
				
				var previewIndex, outcomeId = outcome.get('id');
				_.each(this.previews, function(preview, idx) {
					if(outcomeId === preview.model.get('id')) {
						previewIndex = idx;
					}
				});
				
				return previewIndex;
			}, this);
			
			_.each(changedOutcomes.added, function(outcome) {
				
				var previewElement = this.getPreviewElement(outcome);
				previewElement.stop();

				previewElement.fadeIn(fadeSpeed, _.bind(function() {
					this.outcomeAddPending = false;
					this.checkSlideEnabled();
				}, this));
				
				var previewIndex = getPreviewIndex(outcome);
				if(previewIndex < firstVisibleIndex) {
					this.adjustLeftHide(-1);
				}
				
				addedLinks.push('<li class="clickable clickable-colour outcome-text-link" id="' + this.getTextLinkIdFromOutcome(outcome) + '">' + outcome.get('title') + '</li>');
				
			}, this);
			
			_.each(changedOutcomes.removed, function(outcome) {
				
				var previewElement = this.getPreviewElement(outcome);
				previewElement.stop();
				
				var previewIndex = getPreviewIndex(outcome), updateLeftOnComplete = false;
				if(previewIndex < firstVisibleIndex) {
					updateLeftOnComplete = true;
				}
				
				previewElement.fadeOut(fadeSpeed, _.bind(function() {
					this.outcomeRemPending = false;
					if(updateLeftOnComplete) {
						this.adjustLeftHide(1);
					}
					this.checkSlideEnabled();
				}, this));
				
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
			
			this.availableOutcomePreviews = updatedAvailablePreviews;
		},
		
		getPreviewElement: function(outcome) {
			
			var previewElement, outcomeId = outcome.get('id');
			_.each(this.previews, function(preview) {
				if(outcomeId === preview.model.get('id')) {
					previewElement = preview;
				}
			});
			
			return previewElement.$el;
		},
		
		getHiddenPreviews: function() {
			
			var availableSpace = this.outcomePreviewRow.innerWidth() - this.originalLeftMovePos - this.moveRightPadWidth;
			
			if(typeof this.outcomePreviewWidth === 'undefined') {
				this.outcomePreviewWidth = this.availableOutcomePreviews[0].width();
			}
			
			var requiredSpace = this.availableOutcomePreviews.length * this.outcomePreviewWidth;
				
			var leftOffset = parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10) - this.originalLeftMovePos;
			if(leftOffset < 0) {
				leftOffset *= -1;
			}
			
			var rightOverflow = (availableSpace - (requiredSpace - leftOffset)) * -1;
			
			var hiddenLeft = (leftOffset === 0 ? 0 : leftOffset / this.outcomePreviewWidth);
			var hiddenRight = Math.ceil(rightOverflow <= 0 ? 0 : rightOverflow / this.outcomePreviewWidth);
			
			var hiddenLeftPreviews = this.availableOutcomePreviews.slice(0, hiddenLeft);
			var hiddenRightPreviews = this.availableOutcomePreviews.slice(this.availableOutcomePreviews.length - hiddenRight, this.availableOutcomePreviews.length);
			
			return {left: hiddenLeftPreviews, right: hiddenRightPreviews};
		},
	
		isPreviewHidden: function(side, outcome) {
				
			var hiddenPreviews = this.getHiddenPreviews();
				
			var checkSide;
			switch(side) {
				case 'left':
					checkSide = hiddenPreviews.left;
					break;
				case 'right':
					checkSide = hiddenPreviews.right;
					break;
				default:
					Log.error('unknown preview hide side: ' + side);
					return;
			}
			
			var isHidden = false, outcomeId = outcome.get('id');
			_.each(checkSide, function(preview) {
				isHidden = (isHidden || preview.model.get('id') === outcomeId);
			});
			
			return isHidden;
		},
		
		checkSlideEnabled: function() {
			
			if(this.outcomeAddPending || this.outcomeRemPending) {
				Log.debug('not yet checking slide enabled');
				return;
			}
			
			if(!this.availableOutcomePreviews.length) {
				this.resetSlide();
			}
				
			var hiddenPreviews = this.getHiddenPreviews();
				
			this.slideLeftEnabled = hiddenPreviews.right.length > 0;
			this.slideRightEnabled = hiddenPreviews.left.length > 0;
					
			this.slideLeftCtrl.css('visibility', (this.slideLeftEnabled ? 'visible' : 'hidden'));
			this.slideRightCtrl.css('visibility', (this.slideRightEnabled ? 'visible' : 'hidden'));
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
		},
		
		onMoveLeftRequested: function() {
			
			if(!this.slideLeftEnabled) {
				return;
			}
			
			var availablePreviews = _.filter(this.previews, function(preview) {
				return preview.isShown();
			});
			
			if(!availablePreviews.length) {
				Log.error('Outcome preview move requested but none visible');
				return;
			}
			
			this.slideLeftEnabled = false;
			this.slideRightEnabled = false;
			
			this.outcomePreviewMoveContainer.animate({'left': (parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10) - this.outcomePreviewWidth) + 'px'}, 200, _.bind(function() {
				this.checkSlideEnabled();
			}, this));
		},
		
		onMoveRightRequested: function() {
			
			if(!this.slideRightEnabled) {
				return;
			}
			
			var availablePreviews = _.filter(this.previews, function(preview) {
				return preview.isShown();
			});
			
			if(!availablePreviews.length) {
				Log.error('Outcome preview move requested but none visible');
				return;
			}
			
			this.slideLeftEnabled = false;
			this.slideRightEnabled = false;
			
			this.outcomePreviewMoveContainer.animate({'left': (parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10) + this.outcomePreviewWidth) + 'px'}, 200, _.bind(function() {
				this.checkSlideEnabled();
			}, this));
		},
		
		adjustLeftHide: function(increment) {
			
			var currentLeft = parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10);
			var adjustment = this.outcomePreviewWidth * increment;
			this.outcomePreviewMoveContainer.css('left', (currentLeft + adjustment) + 'px');
		},
		
		resetSlide: function() {
			this.outcomePreviewMoveContainer.css('left', this.originalLeftMovePos);
		},
		
		onWindowResize: function() {
			this.checkSlideEnabled();
		}
	});
});
