define(['jquery', 'underscore', 'backbone', 'flow/Util', 'flow/Log', 'flow/Shared', 'ui/ContentView'], function($, _, Backbone, Util, Log, sharedData, contentView) {

	return Backbone.View.extend({
	
		initialize: function() {
			
			this.questions = this.model.get('Questions');
			this.outcomes = this.model.get('Outcomes');
			
			this.questions.listenToOnce(this.questions, 'modelReady', _.bind(this.onQuestionsReady, this));
			this.questions.listenToOnce(this.questions, 'userReady', _.bind(this.onUserReady, this));
			this.questions.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
			this.questions.on('change:questionAnswered', _.bind(this.onQuestionAnswered, this));
		},
		
		render: function () {

            this.currentSize = Util.getCurrentSizeBreak();
			
			this.content = new contentView();
			this.content.sharedData = new sharedData();
			this.content.render(this.currentSize);
			
			this.content.addOutcomes(this.outcomes);

			$(window).resize(_.bind(this.onWindowResize, this));
		},
		
		onQuestionsReady: function() {
			
			this.render();
			this.content.addQuestions(this.questions.models);
		},
		
		onUserReady: function() {
			this.$el.show();
			this.content.onShow();
		},
		
		onAnswersSelected: function(answeredQuestion, answers) {
			
			// execute any condition functions that determine if questions are now available or unavailable
			var changedQuestions = this.questions.checkAvailableQuestions();
			changedQuestions.push(answeredQuestion);
			
			// execute any condition functions that determine if outcomes are not available or unavailable
			var changedOutcomes = this.outcomes.checkAvailableOutcomes(this.questions, changedQuestions);
			if(changedOutcomes.added.concat(changedOutcomes.removed).length) {
				// there have been changes to which outcomes are available - the user must be notified
				this.content.onOutcomesChanged(changedOutcomes);
			}
		},
		
		onQuestionAnswered: function(answeredQuestion) {
			this.content.showNextQuestion();
		},

		onWindowResize: function () {
			
			var previousSize = this.currentSize;
			this.currentSize = Util.getCurrentSizeBreak();

			if (previousSize !== this.currentSize) {
				this.content.sizeChanged(this.currentSize);
			}
		},
	});
});
