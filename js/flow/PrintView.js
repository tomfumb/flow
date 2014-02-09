Flow.PrintView = Backbone.View.extend({
	
	question_template: [
		'<div id="<%= questionElementId %>" class="print-question">',
		'	<p>Question <%= questionId %> (<span class="question-availability-flag"><%= questionAvailability %></span>): <%= questionText %></p>',
		'	<p>Answer(s): <span class="question-answers">(none)</span>',
		'</div>'
	].join(''),
	
	outcomes_template: [
		'<h5>The following mechanisms may be available, based on the answers you have provided.</h5>',
		'<ul>',
		'	<% _.each(outcomes, function(outcome) { %>',
		'		<li><%= outcome %></li>',
		'	<% }); %>',
		'</ul>'
	].join(''),
	
	availableOutcomes: [],
	
	initialize: function() {
			
		Flow.Log.debug('Initialising PrintView');
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
			
			questionEl = _.template(this.question_template, {
				questionId: question.get('id'),
				questionAvailability: (question.get('available') ? 'available' : 'unavailable'),
				questionElementId: this.getElementIdFromQuestion(question),
				questionText: question.get('content')
			});
			
			scratch.append(questionEl);
		}, this);
		
		this.$el.find('#flow_questions_print').html(scratch.html());
		scratch.html('');
		
		_.each(this.outcomes.models, function(outcome) {
			
			if(outcome.get('available')) {
				this.availableOutcomes.push(outcome.get('title'));
			}
		}, this);
		
		this.$el.append(_.template(this.outcomes_template, {
			outcomes: this.availableOutcomes
		}));
	},
	
	onAnswersSelected: function(answeredQuestion, answers) {
		
		this.$el.find('#' + this.getElementIdFromQuestion(answeredQuestion) + ' .question-answers').html(
			(answers.length ? answers.join(', ') : '(none)')
		);
	},
	
	onQuestionAvailabilityChanged: function(question) {
		
		this.$el.find('#' + this.getElementIdFromQuestion(question) + ' .question-availability-flag').html((question.get('available') ? 'available' : 'unavailable'));
	},
	
	onOutcomeAvailabilityChanged: function(outcome) {
		
		this.availableOutcomes = [];
		_.each(this.outcomes.models, function(outcome) {
			
			if(outcome.get('available')) {
				this.availableOutcomes.push(outcome.get('title'));
			}
		}, this);
		
		this.$el.find('#flow_outcomes_print').html(_.template(this.outcomes_template, {
			outcomes: this.availableOutcomes
		}));
	},
	
	getElementIdFromQuestion: function(question) {
		return 'flow_question_print_' + question.get('id');
	}
});
