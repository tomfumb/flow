Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	model: undefined,	// all this view's data is passed by main view. This is a skin component only and doesn't interact with the rest of the app
	
	questions: [],
	outcomes: [],
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append([
			'<div id="flow_carousel" class="carousel slide" data-ride="carousel">',
			'	<div id="flow_content_items" class="carousel-inner"></div>',
			'</div>',
			'<div id="flow_carousel_navigation">',
			'	<div id="flow_carousel_navigation_back" class="flow-carousel-navigation">&lt;</div>',
			'	<div id="flow_carousel_navigation_forward" class="flow-carousel-navigation">&gt;</div>',
			'</div>'
			].join('')
		);
		
		this.$el.find('#flow_carousel_navigation_back').click(_.bind(this.onBackSelected, this));
		this.$el.find('#flow_carousel_navigation_forward').click(_.bind(this.onForwardSelected, this));
	},
	
	addQuestion: function(question) {
		
		var questionId = question.get('id');
		
		Flow.Log.debug('ContentView.addQuestion (' + questionId + '), first: ' + (this.hadFirst ? 'false' : 'true'));
		
		var questionElId = 'question_container_' + questionId;
		var questionEl = $('<div id="' + questionElId + '" style="border: 1px solid green;"></div>');
		
		this.$el.find('#flow_content_items').append(questionEl);
		
		var questionView = new Flow.Theme.QuestionView({el: '#' + questionElId, model: question, });
		questionView.render(!this.hadFirst);
		this.questions.push({id: questionId, view: questionView, active: !this.hadFirst});
		
		if(!this.hadFirst) {
			this.hadFirst = true;
			this.$carouselEl = this.$el.find('#flow_carousel').carousel({
				pause: true,
				interval: false
			});
		}
		
		this.showQuestion(questionId);
	},
	
	showQuestion: function(questionId) {
		
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
		
		Flow.Log.debug('ContentView.onBackSelected');
		
		if(event && event.preventDefault) {
			event.preventDefault();
		}
		
		var currentIndex = -1;
		_.each(this.questions, function(entry, index) {
			if(entry.active) {
				currentIndex = index;
			}
		});
		
		if(currentIndex > 0) {
			this.showQuestion(this.questions[currentIndex - 1].id);
		}
		
		if(currentIndex < 0) {
			// this means no questions are showing. Interpret as meaning an outcome is shown
			this.showQuestion(this.questions[this.questions.length - 1].id);
		}
	},
	
	onForwardSelected: function(event) {
		
		Flow.Log.debug('ContentView.onForwardSelected');
		
		if(event && event.preventDefault) {
			event.preventDefault();
		}
		
		var currentIndex = -1;
		_.each(this.questions, function(entry, index) {
			if(entry.active) {
				currentIndex = index;
			}
		});
		
		if(currentIndex > -1 && currentIndex < (this.questions.length - 1)) {
			this.showQuestion(this.questions[currentIndex + 1].id);
		}
	},
	
	answerChanged: function(question) {
		
		var questionId = question.get('id');
		
		Flow.Log.debug('ContentView.answerChanged (' + questionId + ')');
		
		this.outcomes = [];
		var changedIndex = -1;
		
		_.each(this.questions, function(entry, index) {
		
			if(entry.id === questionId) {
				changedIndex = index;
			}
		});
		
		if(changedIndex > -1 && changedIndex < (this.questions.length - 1)) {
			this.questions = this.questions.slice(0, changedIndex + 1);
		}
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
			var outcomeEl = $('<div id="' + outcomeElId + '" style="border: 1px solid blue"></div>');
		
			this.$el.find('#flow_content_items').append(outcomeEl);
			
			this.outcomes.push(new Flow.Theme.OutcomeView({el: '#' + outcomeElId, model: outcome}));
		}, this);
		
		_.each(this.outcomes, function(outcomeView) {
			outcomeView.render();
			this.$carouselEl.carousel('next');
		}, this);
		
		_.each(this.questions, function(entry) {
			entry.active = false;
		});
	}
});
