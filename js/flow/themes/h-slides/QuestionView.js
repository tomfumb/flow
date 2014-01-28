Flow.Theme.QuestionView = Backbone.View.extend({
	
	singleAnswerThreshold: 5,
	
	answerDisplayTypes: {
		EL_CLICK: 'el_click',
		LIST_SELECT: 'list_select',
		CHECKBOXES: 'check_button_click',
		SINGLE_DATE: 'single_date'
	},
	
	template_base: [
		'<div class="carousel-caption">',
		'	<div id="question_<%= question.get("id") %>" class="question">',
		'		<h4><%= question.get("title") %></h4>',
		'		<p><%= question.get("content") %></p>',
		'	</div>',
		'	<div id="answers_<%= question.get("id") %>" class="answers">',
	].join(''),
	
	template_single_few: [
		'		<% _.each(answers, function(answer, index) { %>',
		'			<div class="answer clickable" id="answer_<%= index %>">',
		'				<div class="answer-pad"></div>',
		'				<div class="answer-content"><%= answer %></div>',
		'				<div class="clearer"></div>',
		'			</div>',
		'		<% }); %>',
	].join(''),
	
	template_single_many: [
		'		<select class="multi_answer_select">',
		'			<option value="">Please Select...</option>',
		'			<% _.each(answers, function(answer, index) { %>',
		'				<option type="text" value="<%= answer %>"><%= answer %></option>',
		'			<% }); %>',
		'		</select>',
	].join(''),
	
	template_multi: [
		'		<div class="container" style="width: 100%">',
		'			<div class="row">',
		'				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 minor-info">Check all that apply</div>',
		'			</div>',
		'			<div class="row">',
		'				<% _.each(answers, function(answer, index) { %>',
		'					<div class="col-xs-12 col-sm-12 col-md-3 col-lg-2">',
		'						<input type="checkbox" id="q<%= question.get("id") %>_a_<%= index %>" /> <span class="answer-checkbox-text clickable"><%= answer %></span>',
		'					</div>',
		'				<% }); %>',
		'			</div>',
		'			<div class="row spacer-10">',
		'			<button class="continue btn btn-default" type="button">Done</button>',
		'			</div>',
		'		</div>',
	].join(''),
	
	template_single_date: [
		'		<input type="text" class="date-selector" />'
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
		
		var bodyTemplate, answerStyle;
		switch(this.model.get('answerType')) {
			case 'single-select':
				if(this.model.get('answers').length > this.singleAnswerThreshold) {
					bodyTemplate = this.template_single_many;
					answerStyle = this.answerDisplayTypes.LIST_SELECT;
				}
				else {
					bodyTemplate = this.template_single_few;
					answerStyle = this.answerDisplayTypes.EL_CLICK;
				}
				break;
			case 'multi-select':
				bodyTemplate = this.template_multi;
				answerStyle = this.answerDisplayTypes.CHECK_BUTTON_CLICK;
				break;
			case 'single-date':
				bodyTemplate = this.template_single_date;
				answerStyle = this.answerDisplayTypes.SINGLE_DATE;
				break;
			default:
				Flow.Log.error('Unknown answerType provided: ' + this.model.get('answerType'));
				return;
		}
		
		var template = this.template_base + bodyTemplate + this.template_end;
		this.$el.html(_.template(
			template, {
				question: this.model,
				answers: this.model.get('answers')
			}
		));
		
		switch(answerStyle) {
			
			case this.answerDisplayTypes.EL_CLICK:
			
				this.$el.find('#answers_' + this.model.get('id') + ' .answer').click(_.bind(function(event) {
					
					var jqTarget = $(event.target);
					if(!jqTarget.hasClass('answer')) {
						jqTarget = jqTarget.parents('div.answer');
					}

					this.$el.find('div.selected-answer-pad').removeClass('selected-answer-pad');
					jqTarget.addClass('selected-answer-pad');
					
					this.onAnswersSelected([jqTarget.find('div.answer-content').html()]);
					
					window.setTimeout(function(context) {
						return function() {
							context.onQuestionAnswered();
						};
					}(this), 300);
				}, this));
				break;
			case this.answerDisplayTypes.LIST_SELECT:
			
				this.$el.find('#answers_' + this.model.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
					this.onAnswersSelected(event.target.value ? [event.target.value] : []);
					
					window.setTimeout(function(context) {
						return function() {
							context.onQuestionAnswered();
						};
					}(this), 300);
				}, this));
				break;
			case this.answerDisplayTypes.CHECK_BUTTON_CLICK:
			
				this.$el.find('span.answer-checkbox-text').click(function(event) {
					$(this).parent().find('input[type=checkbox]').click();
				});
					
				this.$el.find('div.answers').find('input[type=checkbox]').change(_.bind(function(event) {
					
					var answers = [];
					var checkedAnswers = $(event.target).parents('div.answers').find('input:checked');
					_.each(checkedAnswers, function(checkbox) {
						var answerIndex = checkbox.id.replace(/q(\d+)_a_/, '');
						answers.push(this.model.get('answers')[answerIndex]);
					}, this);
					
					this.onAnswersSelected(answers);
				}, this));

				this.$el.find('#answers_' + this.model.get('id') + ' button.continue').click(_.bind(function(event) {
					this.onQuestionAnswered();
				}, this));
				
				break;
			case this.answerDisplayTypes.SINGLE_DATE:
				
				
				break;
			default:
				Flow.Log.error('Unknown answerStyle provided: ' + answerStyle);
				return;
		}
	},
	
	onAnswersSelected: function(answers) {
		
		Flow.Log.debug('QuestionView.onAnswerSelected(' + answers.join(', ') + ')');
		
		this.model.set('selectedAnswers', answers);
	},
	
	onQuestionAnswered: function() {
		
		Flow.Log.debug('Question answered: ' + this.model.get('id'));
		
		this.model.set('questionAnswered', (new Date()).getTime());
	}
});
