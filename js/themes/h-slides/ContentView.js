Flow.ContentView = Backbone.View.extend({

	el: '#flow_content',
	
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
		'		<% _.each(answers, function(answer) { %>',
		'			<option type="text" value="<%= answer.get("id") %>"><%= answer.get("text") %></option>',
		'		<% }); %>',
		'	</select>',
		'</div>'
	].join(''),
	
	showQuestion: function(question) {
		
		Flow.Log.debug('ContentView.showQuestion (' + question.get('id') + ')');
		
		var template = this.template_base + (question.get('answers').length > this.answerThreshold ? this.template_many : this.template_few);
		
		this.$el.html(
			_.template(
				template,
				{
					question: question,
					answers: question.get('answers')
				}
			)
		);
		
		this.$el.find('#answers_' + question.get('id') + ' .answer').click(_.bind(function(event) {
			this.onAnswerSelected(event);
		}, this));
		
		this.$el.find('#answers_' + question.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
			this.onAnswerSelected(event);
		}, this));
	},
	
	onAnswerSelected: function(event) {
		
		// not sure what to do here
		// event could come from two different handlers that could be div or child click (requiring parent find) or select list
		// might make sense to have two functions here, or
		// maybe handler functions should trigger jquery events with the answer's ID already determined
		
		debugger;
	}
});
