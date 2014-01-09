Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	
	template: [
		'<div class="container">',
		'	<div class="row">',
		'		<div id="flow_question_summary" class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-12">Questions:</div>',
		'	</div>',
		'</div>',
		'<div id="flow_carousel" class="carousel slide" data-ride="carousel">',
		'	<div id="flow_carousel_navigation">',
		'		<div id="flow_carousel_navigation_back" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-left"></span></div>',
		'		<div id="flow_carousel_navigation_forward" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-right"></span></div>',
		'	</div>',
		'	<div id="flow_content_items" class="carousel-inner"></div>',
		'</div>',
		'<div id="flow_outcomes" class="container"></div>',
		'<div id="flow_scratch"></div>'
	].join(''),
		
	
	questions: [],
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append(this.template);
		
		this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
		this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
	},
	
	addQuestions: function(questions) {
		
		Flow.Log.debug('ContentView.addQuestions');
		
		var scratch = this.$el.find('#flow_scratch');
		var summary = this.$el.find('#flow_question_summary');
		
		_.each(questions, function(question) {
		
			var questionId = question.get('id');
			
			Flow.Log.debug('ContentView.addQuestion (' + questionId + '), first: ' + (this.hadFirst ? 'false' : 'true'));
			
			var questionElId = this.getQuestionContainerId(questionId);
			var questionEl = $('<div id="' + questionElId + '" class="question-container"></div>');
			
			scratch.append(questionEl);
			
			var summaryClass = (question.get('available') ? 'clickable' : 'summary-unavailable');
			var summaryQuestionElId = this.getSummaryQuestionId(questionId);
			var summaryQuestionEl = $('<span id="' + summaryQuestionElId + '" class="summary-question summary-unanswered ' + summaryClass + (this.hadFirst ? ' ' : ' summary-current') + '">' + questionId + '</span>');
			
			summary.append(summaryQuestionEl);
			summaryQuestionEl.click(_.bind(this.onSummaryQuestionClicked, this));
			
			question.on('change:available', _.bind(this.onQuestionAvailabilityChanged, this));
			question.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
			
			var questionView = new Flow.Theme.QuestionView({el: '#' + questionElId, model: question});
			questionView.render(!this.hadFirst);
			this.questions.push({id: questionId, view: questionView, active: !this.hadFirst});
			
			if(!this.hadFirst) {
				this.hadFirst = true;
			}
		}, this);
		
		this.$el.find('#flow_content_items').append(scratch.find('div.question-container'));
	},
	
	showFirstQuestion: function() {
		
		Flow.Log.debug('ContentView.showFirstQuestion');
		
		// first question is actually already shown by this point but it does not yet have the ability to move to the next question. Carousel initialisation is required for that
		this.$carouselEl = this.$el.find('#flow_carousel').carousel({
			pause: true,
			interval: false
		});
		
		// ensure navigation buttons aren't available during carousel movement
		this.$carouselEl.on('slide.bs.carousel', _.bind(this.onSlideStart, this));
		this.$carouselEl.on('slid.bs.carousel', _.bind(this.onSlideStop, this));
		
		this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'visible');
	},
	
	showNextQuestion: function() {
		
		Flow.Log.debug('ContentView.showNextQuestion');
			
		var nextIndex = this.getIndexOfNextAvailableQuestion();
		
		if(nextIndex > -1) {
			
			Flow.Log.debug('Advancing to ' + nextIndex);
			
			_.each(this.questions, function(entry, index) {
				entry.active = (index === nextIndex);
			}, this);
			
			this.$carouselEl.carousel(nextIndex);
			
			this.checkNavigationOptions();
		}
		else {
			
			Flow.Log.debug('No more questions available');
			
			var unansweredQuestions = this.$el.find('.summary-unanswered').not('.summary-unavailable').length;
			
			// how to notify rest of the application that the end of all the questions has been reached?
			// just not do anything?
			
			// force display of available / unavailable outcomes now that the user has completed all questions
			if(this.outcomeManager) {
				this.outcomeManager.showOutcomesInModal(unansweredQuestions);
			}
		}
	},
	
	showPreviousQuestion: function() {
		
		Flow.Log.debug('ContentView.showPreviousQuestion');
			
		var prevIndex = this.getIndexOfPreviousAvailableQuestion();
		
		if(prevIndex > -1) {
			
			Flow.Log.debug('Reverting to ' + prevIndex);
			
			_.each(this.questions, function(entry, index) {
				entry.active = (index === prevIndex);
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
			this.$el.find('#flow_carousel_navigation_back').css('visibility', 'hidden');
		}
		else {
			this.$el.find('#flow_carousel_navigation_back').css('visibility', 'visible');
		}
		
		if(this.getIndexOfNextAvailableQuestion() === -1) {
			this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'hidden');
		}
		else {
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
		
		this.$el.find('.summary-question').removeClass('summary-current');
		summaryEl.addClass('summary-current');
		
		this.$el.find('div.flow-carousel-navigation').prop('disabled', false);
	},
	
	onQuestionAvailabilityChanged: function(question) {
		
		var summaryEl = this.$el.find('#' + this.getSummaryQuestionId(question.get('id')));
		var available = question.get('available');
		
		if(available) {
			summaryEl.removeClass('summary-unavailable').addClass('clickable').addClass('clickable');
		}
		else {
			summaryEl.removeClass('clickable').removeClass('clickable').addClass('summary-unavailable');
		}
	},
	
	onSummaryQuestionClicked: function(event) {
		
		var summaryQuestionEl = $(event.target);
		if(!summaryQuestionEl.hasClass('summary-unavailable')) {
			
			var questionId = this.getQuestionIdFromSummaryElementId(summaryQuestionEl.attr('id'));
			
			var requestedIndex = -1;
			_.each(this.questions, function(entry, index) {
				if(entry.id == questionId) {
					requestedIndex = index;
					entry.active = true;
				}
				else {
					entry.active = false;
				}
			});
			
			if(requestedIndex > -1) {
				this.$carouselEl.carousel(requestedIndex);
				this.checkNavigationOptions();
			}
		}
	},
	
	onAnswersSelected: function(answeredQuestion, answers) {
		
		var summaryEl = this.$el.find('#' + this.getSummaryQuestionId(answeredQuestion.get('id')));
		var answered = (answeredQuestion.get('selectedAnswers').length > 0);
		
		if(answered) {
			summaryEl.removeClass('summary-unanswered').addClass('summary-answered');
		}
		else {
			summaryEl.removeClass('summary-answered').addClass('summary-unanswered');
		}
	},
	
	addOutcomes: function(outcomes) {
		
		Flow.Log.debug('ContentView.addOutcomes');
		
		this.outcomeManager = new Flow.Theme.OutcomeManagerView({model: outcomes});
		this.outcomeManager.render();
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
	}
});
