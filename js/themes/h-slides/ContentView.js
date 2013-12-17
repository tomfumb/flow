Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	
	questions: [],
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append([
			'<div id="flow_carousel" class="carousel slide" data-ride="carousel">',
			'	<div id="flow_carousel_navigation">',
			'		<div id="flow_carousel_navigation_back" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-left"></span></div>',
			'		<div id="flow_carousel_navigation_forward" class="flow-carousel-navigation clickable"><span class="glyphicon glyphicon-chevron-right"></span></div>',
			'	</div>',
			'	<div id="flow_content_items" class="carousel-inner"></div>',
			'</div>',
			'<div id="flow_outcomes"></div>',
			'<div class="container">',
			'	<div class="row" id="flow_outcome_previews"></div>',
			'</div>',
			'<div id="flow_scratch"></div>'
			].join('')
		);
		
		this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
		this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
	},
	
	addQuestions: function(questions) {
		
		Flow.Log.debug('ContentView.addQuestions');
		
		var scratch = this.$el.find('#flow_scratch');
		
		_.each(questions, function(question) {
		
			var questionId = question.get('id');
			
			Flow.Log.debug('ContentView.addQuestion (' + questionId + '), first: ' + (this.hadFirst ? 'false' : 'true'));
			
			var questionElId = this.getQuestionContainerId(questionId);
			var questionEl = $('<div id="' + questionElId + '" class="question-container"></div>');
			
			scratch.append(questionEl);
			
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
			
			if(this.getIndexOfNextAvailableQuestion() === -1) {
				this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'hidden');
			}
			
			this.$el.find('#flow_carousel_navigation_back').css('visibility', 'visible');
		}
		else {
			
			Flow.Log.debug('No more questions available');
			
			// how to notify rest of the application that the end of all the questions has been reached?
			// just not do anything?
			
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
			
			if(this.getIndexOfPreviousAvailableQuestion() === -1) {
				this.$el.find('#flow_carousel_navigation_back').css('visibility', 'hidden');
			}
			
			this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'visible');
		}
		else {
			Flow.Log.debug('No previous questions available');
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
	
	onSlideStop: function() {
		this.$el.find('div.flow-carousel-navigation').prop('disabled', false);
	},
	
	addOutcomes: function(outcomes) {
		
		Flow.Log.debug('ContentView.addOutcomes');
		
		this.outcomeManager = new Flow.Theme.OutcomeManagerView({model: outcomes});
		this.outcomeManager.render();
	},
	
	getQuestionContainerId: function(questionId) {
		return 'question_container_' + questionId;
	},
	
	onBackSelected: function(event) {
		this.showPreviousQuestion();
	},
	
	onForwardSelected: function(event) {
		this.showNextQuestion();
	},
	
	showOutcomes: function(outcomes) {
		
		Flow.Log.debug('ContentView.showOutcomes');
		
		if(outcomes.length > 1) {
			Flow.Log.error('Multiple outcomes not yet imlemented');
			return;
		}
		
		this.outcomes = [];
		_.each(outcomes, function(outcome) {
		
			var outcomeElId = 'outcome_container_' + outcome.get('id');
			var outcomeEl = $('<div id="' + outcomeElId + '"></div>');
		
			this.$el.find('#flow_outcomes').html(outcomeEl);
			
			this.outcomes.push(new Flow.Theme.OutcomeView({el: '#' + outcomeElId, model: outcome}));
		}, this);
		
		_.each(this.outcomes, function(outcomeView) {
			outcomeView.render();
		}, this);
		
		_.each(this.questions, function(entry) {
			entry.active = false;
		});
	}
});
