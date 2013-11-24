Flow.Theme.ContentView = Backbone.View.extend({

	el: '#flow_content',
	model: undefined,	// all this view's data is passed by main view. This is a skin component only and doesn't interact with the rest of the app
	
	questions: [],
	outcomes: [],
	
	render: function() {
		
		Flow.Log.debug('ContentView.render');
		this.$el.append([
			'<div id="flow_carousel" class="carousel slide" data-ride="carousel">',
			'	<div id="flow_content_questions" class="carousel-inner"></div>',
			'</div>'
			].join('')
		);
	},
	
	addQuestion: function(question) {
		
		Flow.Log.debug('ContentView.showQuestion (' + question.get('id') + '), first: ' + (this.hadFirst ? 'false' : 'true'));
		
		var questionElId = 'question_container_' + question.get('id');
		var questionEl = $('<div id="' + questionElId + '" style="border: 1px solid green;"></div>');
		
		this.$el.find('#flow_content_questions').append(questionEl);
		
		var questionView = new Flow.Theme.QuestionView({el: '#' + questionElId, model: question, });
		questionView.render(!this.hadFirst);
		this.questions.push(questionView);
		
		if(!this.hadFirst) {
			this.hadFirst = true;
			this.$carouselEl = this.$el.find('#flow_carousel').carousel({
				pause: true,
				interval: false
			});
		}
		else {
			this.$carouselEl.carousel('next');
		}
	},
	
	showOutcomes: function(outcomes) {
		
		Flow.Log.debug('ContentView.showOutcomes');
		
		this.$el.html('');
		
		this.outcomes = [];
		_.each(outcomes, function(outcome) {
		
			var outcomeElId = 'outcome_container_' + outcome.get('id');
			var outcomeEl = $('<div id="' + outcomeElId + '"/>');
		
			this.$el.append(outcomeEl);
			
			this.outcomes.push(new Flow.Theme.OutcomeView({el: '#' + outcomeElId, model: outcome}));
		}, this);
		
		_.each(this.outcomes, function(outcomeView) {
			outcomeView.render();
		});
	}
});
