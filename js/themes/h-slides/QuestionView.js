Flow.Theme.QuestionView = Backbone.View.extend({
	
	answerThreshold: 5,
	
	answerDisplayTypes: {
		SELECT: 'select',
		DIV: 'div'
	},
	
	template_base: [
		'<div style="height: 400px; width: 100%; background-color: green;">&nbsp;</div>',
		'<div class="container">',
		'	<div class="carousel-caption">',
		'		<div id="question_<%= question.get("id") %>">',
		'			<h4><%= question.get("title") %></h4>',
		'			<p><%= question.get("content") %></p>',
		'		</div>'
	].join(''),
	
	template_few: [
		'		<div id="answers_<%= question.get("id") %>">',
		'			<% _.each(answers, function(answer) { %>',
		'				<div class="answer" id="answer_<%= answer.get("id") %>">',
		'					<h5><%= answer.get("text") %></h5>',
		'					<p><%= answer.get("value") %></p>',
		'				</div>',
		'			<% }); %>',
		'		</div>'
	].join(''),
	
	template_many: [
		'		<div id="answers_<%= question.get("id") %>">',
		'			<select class="multi_answer_select">',
		'				<option value="">Please Select...</option>',
		'				<% _.each(answers, function(answer) { %>',
		'					<option type="text" value="<%= answer.get("id") %>"><%= answer.get("text") %></option>',
		'				<% }); %>',
		'			</select>',
		'		</div>'
	].join(''),
	
	template_end: [
		'	</div>',
		'</div>'
	].join(''),
	
	render: function(isActive) {
		
		Flow.Log.debug('QuestionView.render');
		
		isActive = (typeof isActive === 'undefined' ? false : !!isActive);
		
		this.$el.addClass('item');
		if(isActive) {
			this.$el.addClass('active');
		}
		
		var selectListAnswers = this.model.get('answers').length > this.answerThreshold;
		
		var template = this.template_base + (selectListAnswers ? this.template_many : this.template_few) + this.template_end;
		this.$el.html(_.template(
			template, {
				question: this.model,
				answers: this.model.get('answers')
			}
		));
		
		if(selectListAnswers) {
			this.$el.find('#answers_' + this.model.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
				this.onAnswerSelected(this.getIdFromEvent(event, this.answerDisplayTypes.SELECT));
			}, this));
		}
		else {
			this.$el.find('#answers_' + this.model.get('id') + ' .answer').click(_.bind(function(event) {
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
		
		Flow.Log.debug('QuestionView.onAnswerSelected(' + id + ')');
		
		var answers = this.model.get('answers');
		var answer = _.find(answers, function(answer) {
			return (answer.get('id') === id);
		}, this);
		
		if(answer) {
			answer.setSelected();
		}
	}
});
