define(
	['jquery', 'underscore', 'backbone', 'theme/QuestionView', 'theme/OutcomePreviewsView', 'theme/OutcomePreviewView', 'theme/OutcomeManagerView', 'theme/OutcomeView', 'theme/FeedbackView', 'theme/ResultsSenderView', 'flow/Log', 'text!template/flow/themes/h-slides/content.html', 'text!template/flow/themes/h-slides/summary.html', 'bootstrap', 'jquery-mobile'],
	function($, _, Backbone, QuestionView, OutcomePreviewsView, OutcomePreviewView, OutcomeManagerView, OutcomeView, FeedbackView, ResultsSenderView, Log, contentTemplate, summaryTemplate) {
	
	return Backbone.View.extend({

		el: '#flow_content',
		
		questions: [],
		
		backPermitted: false,
		fwdPermitted: false,
		
		postOutcomeUpdateActions: [],
		
		render: function() {
			
			this.$el.append(contentTemplate);
			
			this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
			this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
			
			this.$el.find('#flow_feedback_icon').click(_.bind(this.onFeedbackIconClicked, this));
			this.$el.find('#flow_send_results_icon').click(_.bind(this.onSendResultsIconClicked, this));
			
			this.questionSummaryContainer = this.$el.find('#flow_question_summary_container');
			this.questionSummaryRow = this.$el.find('#flow_question_summary');
			this.questionSummaryRowLeftPad = this.$el.find('#flow_question_summary_side_pad_left');
			this.questionSummaryRowRightPad = this.$el.find('#flow_question_summary_side_pad_right');
			
			this.questionSummaryContainer.on('swipeleft', _.bind(this.onSummarySlideLeftRequested, this));
			this.questionSummaryContainer.on('swiperight', _.bind(this.onSummarySlideRightRequested, this));
			
			$(window).resize(_.bind(this.onWindowResize, this));
		},
		
		addQuestions: function(questions) {
			
			this.addQuestionsCalled = true;
			
			var scratch = $('#flow_scratch');
			
			var availableCount = 0;
			
			_.each(questions, function(question) {
			
				var questionId = question.get('id');
				
				Log.debug('ContentView.addQuestion (' + questionId + '), first: ' + (this.hadFirst ? 'false' : 'true'));
				
				var questionElId = this.getQuestionContainerId(questionId);
				var questionEl = $('<div id="' + questionElId + '" class="question-container"></div>');
				
				scratch.append(questionEl);
				
				var summaryClass;
				if(question.get('available')) {
					if(this.hadFirst) {
						summaryClass = 'btn-default';
					}
					else {
						summaryClass = 'btn-primary';
					}
				}
				else {
					summaryClass = 'btn-unavailable';
				}
				
				var summaryQuestionElId = this.getSummaryQuestionId(questionId);
				
				var summaryQuestionEl = $(_.template(
					summaryTemplate, {
						summaryQuestionElId: summaryQuestionElId,
						summaryClass: summaryClass,
						questionId: questionId
					}
				));
				
				this.questionSummaryRow.append(summaryQuestionEl);
				summaryQuestionEl.click(_.bind(this.onSummaryQuestionClicked, this));
				
				question.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
				question.on('change:available', _.bind(this.onQuestionAvailabilityChanged, this));
				
				var questionView = new QuestionView({el: '#' + questionElId, model: question});
				questionView.render(!this.hadFirst, this);
				this.questions.push({id: questionId, view: questionView, active: !this.hadFirst});
				
				if(question.get('available')) {
					availableCount++;
				}
				
				if(!this.hadFirst) {
					this.hadFirst = true;
				}
			}, this);
			
			this.$el.find('#flow_content_items').append(scratch.find('div.question-container'));
			
			this.$el.find('#flow_carousel').on('swipeleft', _.bind(this.onSwipeLeft, this)).on('swiperight', _.bind(this.onSwipeRight, this));		
			
			// update modal with all questions unanswered / unavailable
			this.outcomeManager.unansweredQuestions = availableCount;
			
			this.questionSummaryRowEntries = [];
			this.questionSummaryRow.find('.question-summary-container').each(_.bind(function(idx, el) {
				this.questionSummaryRowEntries.push($(el));
			}, this));
			this.summarySwipeEnabled = true;
			
			this.prepareDisplay();
		},
		
		prepareDisplay: function() {
			
			// first question is actually already shown by this point but it does not yet have the ability to move to the next question. Carousel initialisation is required for that
			this.$carouselEl = this.$el.find('#flow_carousel').carousel({
				pause: true,
				interval: false
			});
			
			// ensure navigation buttons aren't available during carousel movement
			this.$carouselEl.on('slide.bs.carousel', _.bind(this.onSlideStart, this));
			this.$carouselEl.on('slid.bs.carousel', _.bind(this.onSlideStop, this));
				
			this.checkNavigationOptions();
			
			this.questions[0].view.onBeforeShow();
			$(this.questionSummaryRowEntries[0]).prop('active', true);
		},
		
		onShow: function() {
			this.resizeQuestionContainers(false);
			this.outcomePreviews.onShow();
		},
		
		showNextQuestion: function() {
				
			var nextIndex = this.getIndexOfNextAvailableQuestion();
			
			if(nextIndex > -1) {
				
				this.$carouselEl.carousel(nextIndex);
				
				this.updateActiveQuestion(nextIndex);
				
				this.showActiveQuestionSummary();
				
				this.checkNavigationOptions();
			}
			else {
				
				// force display of available / unavailable outcomes now that the user has completed all questions, but only show after outcome display has been updated
				if(this.outcomeDisplayUpdating) {
					this.postOutcomeUpdateActions.push(_.bind(function() {
						this.outcomeManager.showOutcomes(true);
					}, this));
				}
				else {
					this.outcomeManager.showOutcomes(true);
				}
			}
		},
		
		showPreviousQuestion: function() {
				
			var prevIndex = this.getIndexOfPreviousAvailableQuestion();
			
			if(prevIndex > -1) {
				
				this.$carouselEl.carousel(prevIndex);
				
				this.updateActiveQuestion(prevIndex);
				
				this.showActiveQuestionSummary();
				
				this.checkNavigationOptions();
			}
			else {
				Log.debug('No previous questions available');
			}
		},
		
		updateActiveQuestion: function(newIndex) {
				
			_.each(this.questions, function(entry, index) {
				if(index === newIndex) {
					entry.active = true;
					entry.view.onBeforeShow();
				}
				else {
					entry.active = false;
				}
			}, this);
			
			_.each(this.questionSummaryRowEntries, function(entry, index) {
				if(index === newIndex) {
					entry.prop('active', true);
				}
				else {
					entry.prop('active', false);
				}
			});
		},
		
		checkNavigationOptions: function() {
			
			if(this.getIndexOfPreviousAvailableQuestion() === -1) {
				this.backPermitted = false;
				this.$el.find('#flow_carousel_navigation_back').css('visibility', 'hidden');
			}
			else {
				this.backPermitted = true;
				this.$el.find('#flow_carousel_navigation_back').css('visibility', 'visible');
			}
			
			if(this.getIndexOfNextAvailableQuestion() === -1) {
				this.fwdPermitted = false;
				this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'hidden');
			}
			else {
				this.fwdPermitted = true;
				this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'visible');
			}
		},
		
		getIndexOfNextAvailableQuestion: function() {
			
			Log.debug('ContentView.getIndexOfNextAvailableQuestion');
			
			var nextIndex = -1, activeIndex = -1;
			_.each(this.questions, function(entry, index) {
				if(entry.active) {
					activeIndex = index;
				}
			}, this);
			
			if(activeIndex < 0) {
				Log.error('Unable to find currently active view index');
				return nextIndex;
			}
			
			Log.debug('ActiveIndex: ' + activeIndex);
			
			if(activeIndex === (this.questions.length - 1)) {
				Log.info('Reached end of available questions (index: ' + activeIndex + ')');
				return nextIndex;
			}
			
			_.each(this.questions, function(entry, index) {
				
				// only pay attention to questions after the current and only accept the index of the first following available question
				if(index > activeIndex && nextIndex === -1) {
					
					var model = entry.view.model, id;
					id = model.get('id');
					if(model.get('available')) {
						
						Log.debug('Next available question: ' + id);
						nextIndex = index;
					}
					else {
						Log.debug('Next question not available (' + id + ')');
					}
				}
			}, this);
			
			return nextIndex;
		},
		
		getIndexOfPreviousAvailableQuestion: function() {
			
			Log.debug('ContentView.getIndexOfPreviousAvailableQuestion');
			
			var prevIndex = -1, activeIndex = -1;
			_.each(this.questions, function(entry, index) {
				if(entry.active) {
					activeIndex = index;
				}
			}, this);
			
			if(activeIndex < 0) {
				Log.error('Unable to find currently active view index');
				return prevIndex;
			}
			
			Log.debug('ActiveIndex: ' + activeIndex);
			
			if(activeIndex === 0) {
				Log.info('Reached beginning of available questions (index: ' + activeIndex + ')');
				return prevIndex;
			}
			
			var index;
			for(index = (this.questions.length - 1); index >= 0; index--) {
			
				// only pay attention to questions before the current and only accept the index of the first preceding available question
				if(index < activeIndex && prevIndex === -1) {
					
					var model = this.questions[index].view.model;
					var id = model.get('id');
					if(model.get('available')) {
						
						Log.debug('Previous available question: ' + id);
						prevIndex = index;
					}
					else {
						Log.debug('Previous question not available (' + id + ')');
					}
				}
			}
			
			return prevIndex;
		},
		
		onSlideStart: function() {
			this.$el.find('div.flow-carousel-navigation').prop('disabled', true);
		},
		
		onSlideStop: function(event) {
			
			var activeQuestionElId = $(event.target).find('.active').attr('id');
			var questionId = this.getQuestionIdFromContainerId(activeQuestionElId);
			var summaryEl = this.$el.find('#' + this.getSummaryQuestionId(questionId));
			
			var previousPrimary = this.$el.find('button.btn-primary');
			if(previousPrimary) {
				previousPrimary.removeClass('btn-primary');
				if(previousPrimary.data('answered')) {
					previousPrimary.addClass('btn-success');
				}
				else {
					previousPrimary.addClass('btn-default');
				}
			}
			
			summaryEl.removeClass('btn-default btn-success').addClass('btn-primary');
			
			this.$el.find('div.flow-carousel-navigation').prop('disabled', false);
			
			this.resizeQuestionContainers(true);
		},
		
		onQuestionAvailabilityChanged: function(question) {
			
			var questionId = question.get('id');
			Log.debug('question availability changed: ' + questionId);
			
			var summaryEl = this.$el.find('#' + this.getSummaryQuestionId(questionId));
			var available = question.get('available');
			
			if(available) {
				summaryEl.removeClass('btn-unavailable');
				if(summaryEl.data('answered')) {
					summaryEl.addClass('btn-success');
				}
				else {
					summaryEl.addClass('btn-default');
				}
			}
			else {
				summaryEl.removeClass('btn-default btn-success').addClass('btn-unavailable');
			}
			
			// update modal with list of remaining questions
			this.outcomeManager.unansweredQuestions = this.countUnansweredQuestions(question.collection.models);
		},
		
		onSummaryQuestionClicked: function(event) {
			
			var summaryQuestionEl = $(event.target);
			if(!summaryQuestionEl.hasClass('btn-unavailable')) {
				
				var questionId = this.getQuestionIdFromSummaryElementId(summaryQuestionEl.attr('id'));
				
				var requestedIndex = -1, requestedView;
				_.each(this.questions, function(entry, index) {
					if(entry.id == questionId) {
						requestedIndex = index;
						requestedView = entry.view;
					}
				});
				
				if(requestedIndex > -1) {
					this.updateActiveQuestion(requestedIndex);
					requestedView.onBeforeShow();
					this.showActiveQuestionSummary();
					this.$carouselEl.carousel(requestedIndex);
					this.checkNavigationOptions();
				}
			}
		},
		
		onAnswersSelected: function(answeredQuestion, answers) {
			
			Log.debug('ContentView.onAnswersSelected');
			
			var summaryEl = this.$el.find('#' + this.getSummaryQuestionId(answeredQuestion.get('id')));
			var answered = (answeredQuestion.get('selectedAnswers').length > 0);
			
			if(answered) {
				summaryEl.data('answered', true);
			}
			else {
				summaryEl.data('answered', false);
			}
			
			// update modal with list of remaining questions
			this.outcomeManager.unansweredQuestions = this.countUnansweredQuestions(answeredQuestion.collection.models);
			
			// update outcome preview manager wiht which question was just answered so it can report changes based on those answers
			this.outcomePreviews.onQuestionAnswered(answeredQuestion);
		},
		
		countUnansweredQuestions: function(questions) {

			var unansweredCount = 0;
			_.each(questions, function(question) {
				if(question.get('available')) {
					var selectedAnswers = question.get('selectedAnswers');
					if(!(selectedAnswers && selectedAnswers.length)) {
						unansweredCount++;
					}
				}
			});
			
			return unansweredCount;
		},
		
		addOutcomes: function(outcomes) {
			
			this.outcomePreviews = new OutcomePreviewsView({model: outcomes});
			this.outcomeManager = new OutcomeManagerView({model: outcomes});
			this.outcomeManager.render(this.$el.find('#flow_content_container_row'));
			this.outcomePreviews.render(_.bind(this.outcomeShowRequested, this));
		},
		
		outcomeShowRequested: function(outcome) {
			if(outcome) {
				this.outcomeManager.showOutcome(outcome);
			}
			else {
				this.outcomeManager.showOutcomes();
			}
		},
		
		getQuestionContainerId: function(questionId) {
			return 'question_container_' + questionId;
		},
		
		getQuestionIdFromContainerId: function(containerId) {
			return containerId.replace(/question_container_/, '');
		},
		
		getSummaryQuestionId: function(questionId) {
			return 'summary_question_' + questionId;
		},
		
		getQuestionIdFromSummaryElementId: function(summaryElementId) {
			return summaryElementId.replace(/summary_question_/, '');
		},
		
		onBackSelected: function(event) {
			this.showPreviousQuestion();
		},
		
		onForwardSelected: function(event) {
			this.showNextQuestion();
		},
		
		onSwipeLeft: function() {
			if(this.fwdPermitted) {
				this.showNextQuestion();
			}
		},
		
		onSwipeRight: function() {
			if(this.backPermitted) {
				this.showPreviousQuestion();
			}
		},
		
		resizeQuestionContainers: function(animate, animateSpeed) {
			
			var activeEl, inactiveEls = [];
			_.each(this.questions, function(entry) {
				if(entry.active) {
					activeEl = entry.view.$el;
				}
				else {
					inactiveEls.push(entry.view.$el);
				}
			});
			
			var navigationEls = this.$el.find('.flow-carousel-navigation');
			
			activeEl.stop(true);
			navigationEls.stop(true);
			
			var elHeight = activeEl.find('.carousel-caption').height();
			
			if(elHeight === 0) {
				// then another slide is already in progress, don't collapse to 0
				return;
			}
			
			if(elHeight % 2 !== 0) {
				elHeight += 1;
			}
			
			var elHeightProperty = (elHeight + 20) + 'px';
			var navPaddingProperty = (elHeight > 0 ? Math.round(elHeight / 2) : 0) + 'px';
			
			if(animate) {
				animateSpeed = (isNaN(animateSpeed) ? 180 : animateSpeed);
				activeEl.animate({'height': elHeightProperty}, animateSpeed);
				navigationEls.animate({'padding-top': navPaddingProperty, 'padding-bottom': navPaddingProperty}, animateSpeed);
			}
			else {
				activeEl.height(elHeightProperty);
				navigationEls.css('padding-top', navPaddingProperty).css('padding-bottom', navPaddingProperty);
			}
			
			_.each(inactiveEls, function(inactiveEl) {
				inactiveEl.height(elHeightProperty);
			});
		},
		
		onWindowResize: function(event) {
			this.resizeQuestionContainers(false);
			this.showActiveQuestionSummary();
		},
		
		onChildContentResize: function() {
			this.resizeQuestionContainers(true, 100);
		},
		
		onOutcomesChanged: function(changedOutcomes) {
			this.outcomeDisplayUpdating = true;
			this.outcomePreviews.onOutcomesChanged(changedOutcomes, _.bind(this.onOutcomeDisplayUpdated, this));
		},
		
		onOutcomeDisplayUpdated: function() {
			
			this.outcomeDisplayUpdating = false;
			if(this.postOutcomeUpdateActions && this.postOutcomeUpdateActions.length) {
				_.each(this.postOutcomeUpdateActions, function(fn) {
					fn();
				});
			}
			
			this.postOutcomeUpdateActions = [];
		},
		
		onFeedbackIconClicked: function() {
			
			if(!this.feedbackView) {
				this.feedbackView = new FeedbackView();
			}
			
			this.feedbackView.render();
		},
		
		onSendResultsIconClicked: function() {
			
			if(!this.resultsSenderView) {
				this.resultsSenderView = new ResultsSenderView();
			}
			
			this.resultsSenderView.render();
		},

		getSummaryAvailableSpace: function() {
			
			return this.questionSummaryContainer.innerWidth() - 8; // 8 is the 15px width of the gradient - its -7 offset
		},
		
		getSummaryRowWidth: function() {
			
			var width = 0;
			_.each(this.questionSummaryRowEntries, function(entry) {
				width += entry.outerWidth();
			});
			
			return width;
		},

		getSummaryHide: function() {
			
			var left = parseInt(this.questionSummaryRow.css('left').replace(/px/i, ''), 10);
			if(left < 0) {
				left *= -1;
			}
			
			var right = this.getSummaryRowWidth() - this.getSummaryAvailableSpace() - left;
			
			return {left: left, right: right};
		},
		
		showActiveQuestionSummary: function() {
			
			this.summarySwipeEnabled = false;
			
			var summaryRowWidth = this.getSummaryRowWidth();
			var summaryAvailableSpace = this.getSummaryAvailableSpace();
			var currentLeft = this.getSummaryHide().left;
			
			if(summaryAvailableSpace < summaryRowWidth) {
				
				var preceedingWidth = 0, followingWidth = 0;
				var summary, summaryIdx = -1;
				_.each(this.questionSummaryRowEntries, function(entry, idx) {
					
					if(entry.prop('active') === true) {
						summary = entry;
						summaryIdx = idx;
					}
					
					if(summaryIdx !== idx) {
						if(summaryIdx > -1) {
							followingWidth += entry.outerWidth();
						}
						else {
							preceedingWidth += entry.outerWidth();
						}
					}
				});
				
				var requiredPadForCentre = (summaryAvailableSpace - summary.outerWidth()) / 2;
				
				var newLeft;
				if(preceedingWidth < requiredPadForCentre) {
					newLeft = 0;
				}
				else {
					if(followingWidth < requiredPadForCentre) {
						newLeft = (summaryRowWidth - summaryAvailableSpace) * -1;
					}
					else {
						newLeft = (preceedingWidth - requiredPadForCentre);
						if(newLeft !== 0) {
							newLeft *= -1;
						}
					}
				}
				
				if(newLeft !== currentLeft) {
					this.questionSummaryRow.stop().animate({'left': newLeft + 'px'}, 200, _.bind(function() {
						this.summarySwipeEnabled = true;
					}, this));
				}
			}
			else {
				if(currentLeft !== 0) {
					this.questionSummaryRow.stop().css('left', '0px');
					this.summarySwipeEnabled = true;
				}
			}
		},
		
		onSummarySlideLeftRequested: function() {
			
			if(this.summarySwipeEnabled) {
				
				this.summarySwipeEnabled = false;
				
				var hidden = this.getSummaryHide();
				var moveBy = Math.min(hidden.right, (this.getSummaryAvailableSpace() - 50));
				this.questionSummaryRow.stop().animate({'left': ((hidden.left + moveBy) * -1) + 'px'}, 200, _.bind(function() {
					this.summarySwipeEnabled = true;
				}, this));
			}
		},
		
		onSummarySlideRightRequested: function() {
			
			if(this.summarySwipeEnabled) {
				
				this.summarySwipeEnabled = false;
				
				var hidden = this.getSummaryHide();
				var moveBy = Math.min(hidden.left, (this.getSummaryAvailableSpace() - 50));
				this.questionSummaryRow.stop().animate({'left': ((hidden.left * -1) + moveBy) + 'px'}, 200, _.bind(function() {
					this.summarySwipeEnabled = true;
				}, this));
			}
		}
	});
});
