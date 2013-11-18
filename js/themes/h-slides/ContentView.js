Flow.ContentView = Backbone.View.extend({

	el: '#flow_content',
	model: undefined,	// all this view's data is passed by main view. This is a skin component only and doesn't interact with the rest of the app
	
	answerDisplayTypes: {
		SELECT: 'select',
		DIV: 'div'
	},
	
	answerThreshold: 5,
	
	template_base: [
		'<div id="question_<%= question.get("id") %>">',
		'	<h4><%= question.get("title") %></h4>',
		'	<p><%= question.get("content") %></p>',
		'</div>'
	].join(''),
	
	template_few: [
		'<div id="answers_<%= question.get("id") %>">',
		'	<% _.each(answers, function(answer) { %>',
		'		<div class="answer" id="answer_<%= answer.get("id") %>">',
		'			<h5><%= answer.get("text") %></h5>',
		'			<p><%= answer.get("value") %></p>',
		'		</div>',
		'	<% }); %>',
		'</div>'
	].join(''),
	
	template_many: [
		'<div id="answers_<%= question.get("id") %>">',
		'	<select class="multi_answer_select">',
		'		<option value="">Please Select...</option>',
		'		<% _.each(answers, function(answer) { %>',
		'			<option type="text" value="<%= answer.get("id") %>"><%= answer.get("text") %></option>',
		'		<% }); %>',
		'	</select>',
		'</div>'
	].join(''),
	
	showQuestion: function(question) {
		
		Flow.Log.debug('ContentView.showQuestion (' + question.get('id') + ')');
		
		var selectListAnswers = question.get('answers').length > this.answerThreshold;
		
		var template = this.template_base + (selectListAnswers ? this.template_many : this.template_few);
		this.$el.html(_.template(
			template, {
				question: question,
				answers: question.get('answers')
			}
		));
		
		if(selectListAnswers) {
			this.$el.find('#answers_' + question.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
				this.onAnswerSelected(this.getIdFromEvent(event, this.answerDisplayTypes.SELECT));
			}, this));
		}
		else {
			this.$el.find('#answers_' + question.get('id') + ' .answer').click(_.bind(function(event) {
				this.onAnswerSelected(this.getIdFromEvent(event, this.answerDisplayTypes.DIV));
			}, this));
		}
	},
	
	getIdFromEvent: function(event, answerDisplayType) {

		var jqTarget;
		switch(answerDisplayType) {
			
			case this.answerDisplayTypes.SELECT:
				return event.target.value;
			case this.answerDisplayTypes.DIV:
				jqTarget = $(event.target);
				if(!jqTarget.hasClass('answer')) {
					jqTarget = jqTarget.parents('div.answer');
				}
				return jqTarget.attr('id').replace(/^answer_/, '');
			default:
				Flow.Log.error('Unknown answer display type from selected answer: ' + answerDisplayType);
				return;
		}
	},
	
	onAnswerSelected: function(id) {
		// this function will be overwritten when this view is instantiated by MainView, in order to keep it as dumb and simple as possible - it won't listen for events
		Flow.Log.error('ContentView.onAnswerSelected has not been overwritten by MainView');
	},
	
	showOutcome: function(outcome) {
		
	}
});
