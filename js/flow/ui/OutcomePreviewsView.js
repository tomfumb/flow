define(['jquery', 'underscore', 'backbone', 'flow/Log', 'ui/OutcomePreviewView', 'text!templates/outcome-preview.html', 'text!templates/outcome-preview-outcome.html', 'jquery-mobile'], function($, _, Backbone, Log, OutcomePreviewView, previewTemplate, outcomeTemplate) {

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
			
			this.outcomePreviewRow = this.$el.find('#flow_outcome_preview_row');
			this.outcomePreviews = this.$el.find('.available-outcome-preview');
			this.outcomePreviewMoveContainer = this.$el.find('#flow_available_outcome_previews');
			this.originalLeftMovePos = this.getLeftHide();
			this.moveRightPadWidth = this.$el.find('#flow_available_count_side_pad_right').outerWidth();
			this.availableOutcomeCountEl = this.$el.find('#flow_available_count_main');
			
			this.slideLeftCtrl = this.$el.find('#flow_available_outcome_preview_move_left');
			this.slideRightCtrl = this.$el.find('#flow_available_outcome_preview_move_right');
			this.slideLeftCtrl.click(_.bind(this.onMoveRightRequested, this));
			this.slideRightCtrl.click(_.bind(this.onMoveLeftRequested, this));
			this.outcomePreviews.on('swipeleft', _.bind(this.onMoveLeftRequested, this));
			this.outcomePreviews.on('swiperight', _.bind(this.onMoveRightRequested, this));
			
			this.changesEl = this.$el.find('#flow_outcome_recent_changes');
			this.changesContentEl = this.changesEl.find('#flow_outcome_recent_changes_content');
			
			this.historyNavBack = this.$el.find('#flow_outcome_history_back');
			this.historyNavFwd = this.$el.find('#flow_outcome_history_fwd');
			this.handleOutcomeHistoryNav();
			
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
						// this fadeIn is the last thing to happen when the outcomes are updated (it's a fade-out then fade-in whereas other changes are just one or the other)
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

			var firstVisibleIndex = (this.availableOutcomePreviews.length === 0 ? 0 : undefined), totalLeft = this.getLeftHide();
			_.each(this.availableOutcomePreviews, function(preview) {
				if(totalLeft === this.originalLeftMovePos) {
					firstVisibleIndex = this.getPreviewIndex(preview.model);
				}
				totalLeft += preview.$el.width();
			}, this);
			
			if(typeof firstVisibleIndex === 'undefined') {
				Log.error('OutcomePreviewView firstVisibleIndex error');
			}
			else {
				
				var firstId = this.previews[firstVisibleIndex].model.get('id');
				var isFirstRemoved = !_.find(updatedAvailablePreviews, function(preview) {
					return(preview.model.get('id') === firstId);
				});
				
				if(isFirstRemoved) {
					// see if any of the following previews will be shown - if not this means an empty preview row that should be reset to the start
					var followingIsVisible = false;
					if(this.previews.length > (firstVisibleIndex + 1)) {
						_.each(_.rest(this.previews, firstVisibleIndex + 1), function(preview) {
							followingIsVisible = (followingIsVisible || !!_.find(updatedAvailablePreviews, function(updatedPreview) {
								return (preview.model.get('id') === updatedPreview.model.get('id'));
							}));
						});
					}
					
					if(!followingIsVisible) {
						this.resetSlide();
						firstVisibleIndex = 0;
					}
				}
			}
			
			_.each(changedOutcomes.added, function(outcome) {
				
				var previewElement = this.getPreviewElement(outcome);
				previewElement.stop();

				previewElement.hide().fadeIn(fadeSpeed, _.bind(function() {
					this.outcomeAddPending = false;
					this.checkSlideEnabled();
				}, this));
				
				var previewIndex = this.getPreviewIndex(outcome);
				if(previewIndex < firstVisibleIndex) {
					this.adjustLeftHide(-1);
				}
				
				addedLinks.push('<li class="clickable clickable-colour outcome-text-link" id="' + this.getTextLinkIdFromOutcome(outcome) + '">' + outcome.get('title') + '</li>');
				
			}, this);
			
			_.each(changedOutcomes.removed, function(outcome) {
				
				var previewElement = this.getPreviewElement(outcome);
				previewElement.stop();
				
				var previewIndex = this.getPreviewIndex(outcome), updateLeftOnComplete = false;
				if(previewIndex < firstVisibleIndex) {
					updateLeftOnComplete = true;
				}
				
				previewElement.show().fadeOut(fadeSpeed, _.bind(function() {
					this.outcomeRemPending = false;
					if(updateLeftOnComplete) {
						this.adjustLeftHide(1);
					}
					this.checkSlideEnabled();
				}, this));
				
				removedLinks.push('<li class="clickable clickable-colour outcome-text-link" id="' + this.getTextLinkIdFromOutcome(outcome) + '">' + outcome.get('title') + '</li>');
				
			}, this);
			
			var hasAdded = !!addedLinks.length, hasRemoved = !!removedLinks.length;
			var conjunctionText = (hasAdded && hasRemoved ? ' and' : '');
			
			if(!this.changesEl.is(':visible')) {
				
				this.changesEl.stop();
				this.changesEl.slideDown(fadeSpeed);
			}
			
			this.changeHistory.push('Question ' + this.lastAnsweredQuestion.get('id') + (hasAdded ? ' added <ul>' + addedLinks.join('') + '</ul>' : '') + conjunctionText + (hasRemoved ? ' removed <ul>' + removedLinks.join('') + '</ul>' : ''));
			
			this.changeHistoryPosition = (this.changeHistory.length - 1);
			
			this.changesContentEl.html(this.changeHistory[this.changeHistoryPosition]);
			this.changesContentEl.find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
			
			this.checkOutcomeHistoryNav();
			
			this.availableOutcomePreviews = updatedAvailablePreviews;
		},
		
		resetOutcomeHistory: function() {
			
			this.changesEl.stop().hide();
			this.changesContentEl.html('');
			
			this.changeHistory = [];
			this.changeHistoryPosition = -1;
			
			this.checkOutcomeHistoryNav();
		},
		
		resetPreviews: function() {
			this.resetSlide();
			this.checkSlideEnabled();
		},
		
		getPreviewElement: function(outcome) {
			var preview = this.previews[this.getPreviewIndex(outcome)];
			return preview.$el;
		},
		
		getPreviewIndex: function(outcome) {
				
			var previewIndex, outcomeId = outcome.get('id');
			_.each(this.previews, function(preview, idx) {
				if(outcomeId === preview.model.get('id')) {
					previewIndex = idx;
				}
			});
			
			return previewIndex;
		},
		
		getHiddenPreviews: function() {
			
			var availableSpace = this.outcomePreviewRow.innerWidth() - this.originalLeftMovePos - this.moveRightPadWidth;
			
			if(typeof this.outcomePreviewWidth === 'undefined') {
				this.outcomePreviewWidth = this.availableOutcomePreviews[0].width();
			}
			
			var requiredSpace = this.availableOutcomePreviews.length * this.outcomePreviewWidth;
				
			var leftOffset = this.getLeftHide() - this.originalLeftMovePos;
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
					
			this.slideLeftCtrl.css('visibility', (this.slideRightEnabled ? 'visible' : 'hidden'));
			this.slideRightCtrl.css('visibility', (this.slideLeftEnabled ? 'visible' : 'hidden'));
		},
		
		onOutcomeTextLinkClicked: function(event) {
			
			var jqEl = $(event.target);
			var outcome = this.model.findWhere({id: this.getOutcomeIdFromTextLinkId(jqEl.attr('id'))});
			this.onPreviewClicked(outcome);
		},
		
		checkOutcomeHistoryNav: function() {
			
			if(this.changeHistoryPosition > 0 && this.changeHistoryPosition <= (this.changeHistory.length - 1)) {
				this.historyNavBack.css('visibility', 'visible');
			}
			else {
				this.historyNavBack.css('visibility', 'hidden');
			}
			
			if(this.changeHistoryPosition >= 0 && this.changeHistoryPosition < (this.changeHistory.length - 1)) {
				this.historyNavFwd.css('visibility', 'visible');
			}
			else {
				this.historyNavFwd.css('visibility', 'hidden');
			}
		},
		
		handleOutcomeHistoryNav: function() {
			
			this.historyNavBack.click(_.bind(function(event) {
				this.changeHistoryPosition--;
				this.changesContentEl.html(this.changeHistory[this.changeHistoryPosition]).find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
				this.checkOutcomeHistoryNav();
			}, this));
			
			this.historyNavFwd.click(_.bind(function(event) {
				this.changeHistoryPosition++;
				this.changesContentEl.html(this.changeHistory[this.changeHistoryPosition]).find('.outcome-text-link').click(_.bind(this.onOutcomeTextLinkClicked, this));
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
			
			this.outcomePreviewMoveContainer.animate({'left': (this.getLeftHide() - this.outcomePreviewWidth) + 'px'}, 200, _.bind(function() {
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
			
			this.outcomePreviewMoveContainer.animate({'left': (this.getLeftHide() + this.outcomePreviewWidth) + 'px'}, 200, _.bind(function() {
				this.checkSlideEnabled();
			}, this));
		},
		
		getLeftHide: function() {
			return parseInt(this.outcomePreviewMoveContainer.css('left').replace(/px/i, ''), 10);
		},
		
		adjustLeftHide: function(increment) {
			var adjustment = this.outcomePreviewWidth * increment;
			this.outcomePreviewMoveContainer.css('left', (this.getLeftHide() + adjustment) + 'px');
		},
		
		resetSlide: function() {
			this.outcomePreviewMoveContainer.css('left', this.originalLeftMovePos);
		},
		
		onWindowResize: function() {
			this.checkSlideEnabled();
		}
	});
});
