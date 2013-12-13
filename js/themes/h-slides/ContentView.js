Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	
	questions: [],
	outcomes: [],
	outcomePreviews: [],
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append([
			'<div id="flow_carousel" class="carousel slide" data-ride="carousel">',
			'	<div id="flow_content_items" class="carousel-inner"></div>',
			'</div>',
			'<div id="flow_outcomes"></div>',
			'<div id="flow_carousel_navigation">',
			'	<div id="flow_carousel_navigation_back" class="flow-carousel-navigation"><span class="glyphicon glyphicon-chevron-left"></span></div>',
			'	<div id="flow_carousel_navigation_forward" class="flow-carousel-navigation"><span class="glyphicon glyphicon-chevron-right"></span></div>',
			'</div>',
			'<div class="container">',
			'	<div class="row" id="flow_outcome_previews"></div>',
			'</div>',
			'<div id="flow_scratch"></div>'
			].join('')
		);
		
		
		// logic required to check if the next question to the left or right is available before
		// visibility of left / right buttons can be updated
		
		this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
		this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
	},
	
	addQuestions: function(questions) {
		
		Flow.Log.debug('ContentView.addQuestions');
		
		var scratch = this.$el.find('#flow_scratch');
		
		_.each(questions, function(question) {
			
			question.on('change:selectedAnswers', this.onAnswersSelected, this);
		
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
		
		this.$el.find('#flow_content_items').append(scratch.html());
		scratch.html('');
	},
	
	showFirstQuestion: function() {
		
		Flow.Log.debug('ContentView.showFirstQuestion');
		
		// first question is actually already shown by this point but it does not yet have the ability to move to the next question. Carousel initialisation is required for that
		this.$carouselEl = this.$el.find('#flow_carousel').carousel({
			pause: true,
			interval: false
		});
	},
	
	onAnswersSelected: function(a, b, c) {
		var d = 0;
	},
	
	addOutcomes: function(outcomes) {
		
		
		// add to display and listend to change:available 
		
	},
	
	getQuestionContainerId: function(questionId) {
		return 'question_container_' + questionId;
	},
	
	showQuestion_old: function(questionId) {
		
		Flow.Log.debug('ContentView.showQuestion (' + questionId + ')');
		
		var viewIndex = -1;
		
		_.each(this.questions, function(entry, index) {
			if(entry.id === questionId) {
				viewIndex = index;
				entry.active = true;
			}
			else {
				entry.active = false;
			}
		});
		
		if(viewIndex > -1) {
			this.$carouselEl.carousel(viewIndex);
		}
		else {
			Flow.Log.error('Unable to find question ' + questionId + ' to show in Flow.ContentView');
			return;
		}
		
		if(viewIndex > 0) {
			this.$el.find('#flow_carousel_navigation_back').css('visibility', 'visible');
		}
		else {
			this.$el.find('#flow_carousel_navigation_back').css('visibility', 'hidden');
		}
		
		if(viewIndex !== (this.questions.length - 1)) {
			this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'visible');
		}
		else {
			this.$el.find('#flow_carousel_navigation_forward').css('visibility', 'hidden');
		}
	},
	
	onBackSelected: function(event) {
		
	},
	
	onForwardSelected: function(event) {
		
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
	},
	
	showAvailableOutcomes: function(outcomes) {
		
		var classesToUse;
		switch(true) {
			case (outcomes.length <= 3):
				classesToUse = 'col-4 col-xs-4 col-sm-4 col-md-4 col-lg-4';
				break;
			case (outcomes.length <= 6):
				classesToUse = 'col-2 col-xs-2 col-sm-2 col-md-2 col-lg-2';
				break;
			default:
				classesToUse = 'col-1 col-xs-1 col-sm-1 col-md-1 col-lg-1';
				break;
		}
		
		Flow.Log.debug('ContentView.showAvailableOutcomes');
		
		var containerEl = $('#flow_outcome_previews')
		
		var outcomeId, outcomePreviewView, outcomePreviewContainerId, outcomePreviewContainerEl;
		
		if(!this.outcomePreviews.length) {
			_.each(outcomes, function(outcome) {
				
				outcomeId = outcome.get('id');
				
				outcomePreviewContainerId = 'outcome_preview_container_' + outcomeId;
				outcomePreviewContainerEl = $('<div id="' + outcomePreviewContainerId + '" class="' + classesToUse + '"></div>');
				containerEl.append(outcomePreviewContainerEl);
				
				outcomePreviewView = new Flow.Theme.OutcomePreviewView({el: '#' + outcomePreviewContainerId, model: outcome});
				outcomePreviewView.render();
				this.outcomePreviews.push({id: outcomeId, view: outcomePreviewView, available: false});
			}, this);
		}
		
		
		//
		// available property should be watched by views so that their class can change in response to this
		// is this possible? will the views' models keep up with the outcome object?
		// testing required
		//
		
		
	}
});
