define(['jquery', 'underscore', 'backbone', 'flow/Log', 'text!templates/print/question.html', 'text!templates/print/outcome.html'], function($, _, Backbone, Log, questionTemplate, outcomeTemplate) {

	return Backbone.View.extend({
		
		initialize: function() {
		
			this.questions = this.model.get('Questions');
			this.outcomes = this.model.get('Outcomes');
			
			this.questions.on('change:selectedAnswers', _.bind(this.onAnswersSelected, this));
			this.questions.on('change:available', _.bind(this.onQuestionAvailabilityChanged, this));
			
			this.outcomes.on('change:available', _.bind(this.onOutcomeAvailabilityChanged, this));
		},
		
		render: function() {
			
			var scratch = $('#flow_scratch');
			var questionEl;
			
			_.each(this.questions.models, function(question) {
				
				questionEl = _.template(questionTemplate, {
					questionId: question.get('id'),
					questionElementId: this.getElementIdFromQuestion(question),
					questionText: question.get('content')
				});
				
				scratch.append(questionEl);
			}, this);
			
			this.$el.find('#flow_questions_print').html(scratch.html());
			scratch.html('');
			
			this.onOutcomeAvailabilityChanged();
		},
		
		onAnswersSelected: function(answeredQuestion, answers) {
			
			this.$el.find('#' + this.getElementIdFromQuestion(answeredQuestion) + ' .question-answers').html(
				(answers.length ? answers.join(', ') : '')
			);
		},
		
		onQuestionAvailabilityChanged: function(question) {
			this.$el.find('#' + this.getElementIdFromQuestion(question) + ' .question-availability-flag').html((question.get('available') ? 'available' : 'unavailable'));
		},
		
		onOutcomeAvailabilityChanged: function(outcome) {
			
			this.availableOutcomes = [];
			_.each(this.outcomes.models, function(outcome) {
				
				if(outcome.get('available')) {
					this.availableOutcomes.push(outcome.get('title') + (outcome.get('caveats') ? ' ' + outcome.get('caveats') : ''));
				}
			}, this);
			
			this.$el.find('#flow_outcomes_print').html(_.template(outcomeTemplate, {
				outcomes: this.availableOutcomes
			}));
		},
		
		getElementIdFromQuestion: function(question) {
			return 'flow_question_print_' + question.get('id');
		}
	});
});
