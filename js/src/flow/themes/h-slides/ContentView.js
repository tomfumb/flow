Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	
	template: [
		'<div class="container">',
		'	<div class="row">',
		'		<div class="col-24 col-sm-24 col-md-24 col-lg-24">',
		'			<h4>Questions</h4>',
		'			<span id="flow_feedback_icon" class="glyphicon glyphicon-send clickable"></span>',
		'			<span id="flow_send_results_icon" class="glyphicon glyphicon-envelope clickable"></span>',
		'		</div>',
		'	</div>',
		'	<div id="flow_question_summary"></div>',
		'</div>',
		'<div class="spacer-5"></div>',
		'<div class="container">',
		'	<div class="row">',
		'		<div id="flow_carousel" class="carousel slide col-xs-24 col-sm-24 col-md-24 col-lg-24 col-24" data-ride="carousel">',
		'			<div id="flow_carousel_navigation">',
		'				<div id="flow_carousel_navigation_back" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-left"></span></div>',
		'				<div id="flow_carousel_navigation_forward" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-right"></span></div>',
		'			</div>',
		'			<div id="flow_content_items" class="carousel-inner"></div>',
		'		</div>',
		'	</div>',
		'</div>',
		'<div id="flow_outcome_previews" class="container"></div>',
		'<div id="flow_outcomes" class="container"></div>'
	].join(''),
		
	summary_template: [
		'<button type="button" id="<%= summaryQuestionElId %>" class="btn <%= summaryClass %>"><%= questionId %></button>'
	].join(''),
	
	questions: [],
	
	backPermitted: false,
	fwdPermitted: false,
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append(this.template);
		
		this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
		this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
		
		this.$el.find('#flow_feedback_icon').click(_.bind(this.onFeedbackIconClicked, this));
		this.$el.find('#flow_send_results_icon').click(_.bind(this.onSendResultsIconClicked, this));
		
		$(window).resize(_.bind(this.onWindowResize, this));
	},
	
	addQuestions: function(questions) {
		
		if(this.addQuestionsCalled) {
			// possible that somehow this function is called twice in error condition
			Flow.Log.error('ContentView.addQuestions called twice');
			return;
		}
		
		this.addQuestionsCalled = true;
		
		Flow.Log.debug('ContentView.addQuestions');
		
		var scratch = $('#flow_scratch');
		var summary = this.$el.find('#flow_question_summary');
		
		var availableCount = 0;
		
		_.each(questions, function(question) {
		
			var questionId = question.get('id');
			
			Flow.Log.debug('ContentView.addQuestion (' + questionId + '), first: ' + (this.hadFirst ? 'false' : 'true'));
			
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
				this.summary_template, {
					summaryQuestionElId: summaryQuestionElId,
					summaryClass: summaryClass,
					questionId: questionId
				}
			));
			
			summary.append(summaryQuestionEl);
			summaryQuestionEl.click(_.bind(this.onSummaryQuestionClicked, this));
			
			question.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
			question.on('change:available', _.bind(this.onQuestionAvailabilityChanged, this));
			
			var questionView = new Flow.Theme.QuestionView({el: '#' + questionElId, model: question});
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
	},
	
	showFirstQuestion: function() {
		
		Flow.Log.debug('ContentView.showFirstQuestion');
		
		// first question is actually already shown by this point but it does not yet have the ability to move to the next question. Carousel initialisation is required for that
		this.$carouselEl = this.$el.find('#flow_carousel').carousel({
			pause: true,
			interval: false
		});
		
		this.resizeQuestionContainers(false);
		
		// ensure navigation buttons aren't available during carousel movement
		this.$carouselEl.on('slide.bs.carousel', _.bind(this.onSlideStart, this));
		this.$carouselEl.on('slid.bs.carousel', _.bind(this.onSlideStop, this));
			
		this.checkNavigationOptions();
		
		this.questions[0].view.onBeforeShow();
	},
	
	showNextQuestion: function() {
		
		Flow.Log.debug('ContentView.showNextQuestion');
			
		var nextIndex = this.getIndexOfNextAvailableQuestion();
		
		if(nextIndex > -1) {
			
			Flow.Log.debug('Advancing to ' + nextIndex);
			
			_.each(this.questions, function(entry, index) {
				if(index === nextIndex) {
					entry.active = true;
					entry.view.onBeforeShow();
				}
				else {
					entry.active = false;
				}
			}, this);
			
			this.$carouselEl.carousel(nextIndex);
			
			this.checkNavigationOptions();
		}
		else {
			
			Flow.Log.debug('No more questions available');
			
			// how to notify rest of the application that the end of all the questions has been reached?
			// just not do anything?
			
			// force display of available / unavailable outcomes now that the user has completed all questions
			if(this.outcomeManager) {
				this.outcomeManager.showOutcomesInModal();
			}
		}
	},
	
	showPreviousQuestion: function() {
		
		Flow.Log.debug('ContentView.showPreviousQuestion');
			
		var prevIndex = this.getIndexOfPreviousAvailableQuestion();
		
		if(prevIndex > -1) {
			
			Flow.Log.debug('Reverting to ' + prevIndex);
			
			_.each(this.questions, function(entry, index) {
				if(index === prevIndex) {
					entry.active = true;
					entry.view.onBeforeShow();
				}
				else {
					entry.active = false;
				}
			}, this);
			
			this.$carouselEl.carousel(prevIndex);
			
			this.checkNavigationOptions();
		}
		else {
			Flow.Log.debug('No previous questions available');
		}
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
		
		Flow.Log.debug('ContentView.getIndexOfNextAvailableQuestion');
		
		var nextIndex = -1, activeIndex = -1;
		_.each(this.questions, function(entry, index) {
			if(entry.active) {
				activeIndex = index;
			}
		}, this);
		
		if(activeIndex < 0) {
			Flow.Log.error('Unable to find currently active view index');
			return nextIndex;
		}
		
		Flow.Log.debug('ActiveIndex: ' + activeIndex);
		
		if(activeIndex === (this.questions.length - 1)) {
			Flow.Log.info('Reached end of available questions (index: ' + activeIndex + ')');
			return nextIndex;
		}
		
		_.each(this.questions, function(entry, index) {
			
			// only pay attention to questions after the current and only accept the index of the first following available question
			if(index > activeIndex && nextIndex === -1) {
				
				var model = entry.view.model, id;
				id = model.get('id');
				if(model.get('available')) {
					
					Flow.Log.debug('Next available question: ' + id);
					nextIndex = index;
				}
				else {
					Flow.Log.debug('Next question not available (' + id + ')');
				}
			}
		}, this);
		
		return nextIndex;
	},
	
	getIndexOfPreviousAvailableQuestion: function() {
		
		Flow.Log.debug('ContentView.getIndexOfPreviousAvailableQuestion');
		
		var prevIndex = -1, activeIndex = -1;
		_.each(this.questions, function(entry, index) {
			if(entry.active) {
				activeIndex = index;
			}
		}, this);
		
		if(activeIndex < 0) {
			Flow.Log.error('Unable to find currently active view index');
			return prevIndex;
		}
		
		Flow.Log.debug('ActiveIndex: ' + activeIndex);
		
		if(activeIndex === 0) {
			Flow.Log.info('Reached beginning of available questions (index: ' + activeIndex + ')');
			return prevIndex;
		}
		
		var index;
		for(index = (this.questions.length - 1); index >= 0; index--) {
		
			// only pay attention to questions before the current and only accept the index of the first preceding available question
			if(index < activeIndex && prevIndex === -1) {
				
				var model = this.questions[index].view.model;
				var id = model.get('id');
				if(model.get('available')) {
					
					Flow.Log.debug('Previous available question: ' + id);
					prevIndex = index;
				}
				else {
					Flow.Log.debug('Previous question not available (' + id + ')');
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
		Flow.Log.debug('question availability changed: ' + questionId);
		
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
					entry.active = true;
					requestedView = entry.view;
				}
				else {
					entry.active = false;
				}
			});
			
			if(requestedIndex > -1) {
				requestedView.onBeforeShow();
				this.$carouselEl.carousel(requestedIndex);
				this.checkNavigationOptions();
			}
		}
	},
	
	onAnswersSelected: function(answeredQuestion, answers) {
		
		Flow.Log.debug('ContentView.onAnswersSelected');
		
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
		
		Flow.Log.debug('ContentView.addOutcomes');
		
		this.outcomePreviews = new Flow.Theme.OutcomePreviewsView({model: outcomes});
		this.outcomeManager = new Flow.Theme.OutcomeManagerView({model: outcomes});
		this.outcomeManager.render();
		this.outcomePreviews.render(_.bind(this.outcomeShowRequested, this));
	},
	
	outcomeShowRequested: function(outcome) {
		if(outcome) {
			this.outcomeManager.showOutcomeInModal(outcome);
		}
		else {
			this.outcomeManager.showOutcomesInModal();
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
	},
	
	onChildContentResize: function() {
		this.resizeQuestionContainers(true, 100);
	},
	
	onOutcomesChanged: function(changedOutcomes) {
		this.outcomePreviews.onOutcomesChanged(changedOutcomes);
	},
	
	onFeedbackIconClicked: function() {
		
		if(!this.feedbackView) {
			this.feedbackView = new Flow.Theme.FeedbackView();
		}
		
		this.feedbackView.render();
	},
	
	onSendResultsIconClicked: function() {
		
		if(!this.resultsSenderView) {
			this.resultsSenderView = new Flow.Theme.ResultsSenderView();
		}
		
		this.resultsSenderView.render();
	}
});
