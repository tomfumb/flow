define(['jquery', 'underscore', 'backbone', 'flow/Log', 'text!templates/question-base.html', 'text!templates/question-single-few.html', 'text!templates/question-single-many.html', 'text!templates/question-multi.html', 'text!templates/question-date.html', 'jquery-ui'], function($, _, Backbone, Log, questionTemplate, singleFewTemplate, singleManyTemplate, multiTemplate, dateTemplate) {
	
	return Backbone.View.extend({
	
		singleAnswerThreshold: 5,
		
		answerDisplayTypes: {
			EL_CLICK: 'el_click',
			LIST_SELECT: 'list_select',
			CHECKBOXES: 'check_button_click',
			SINGLE_DATE: 'single_date'
		},
		
		render: function(isActive, container, majorQuestionCount) {
			
			isActive = (typeof isActive === 'undefined' ? false : !!isActive);
			this.container = container;
			
			this.$el.addClass('item');
			if(isActive) {
				this.$el.addClass('active');
			}
			
			var bodyTemplate, answerStyle;
			switch(this.model.get('answerType')) {
				case 'single-select':
					if(this.model.get('answers').length > this.singleAnswerThreshold) {
						bodyTemplate = singleManyTemplate;
						answerStyle = this.answerDisplayTypes.LIST_SELECT;
					}
					else {
						bodyTemplate = singleFewTemplate;
						answerStyle = this.answerDisplayTypes.EL_CLICK;
					}
					break;
				case 'multi-select':
					bodyTemplate = multiTemplate;
					answerStyle = this.answerDisplayTypes.CHECK_BUTTON_CLICK;
					break;
				case 'single-date':
					bodyTemplate = dateTemplate;
					answerStyle = this.answerDisplayTypes.SINGLE_DATE;
					break;
				default:
					Log.error('Unknown answerType provided: ' + this.model.get('answerType'));
					return;
			}
			
			this.$el.html(_.template(
				questionTemplate, {
					question: this.model,
					explanations: this.model.get('explanations'),
					questionBody: _.template(
						bodyTemplate, {
							question: this.model,
							answers: this.model.get('answers')
						}
					)
				}
			));
			
			this.$el.find('div.question-explanation-header').click(_.bind(this.onQuestionExplanationHeaderClick, this));
			
			switch(answerStyle) {
				
				case this.answerDisplayTypes.EL_CLICK:
				
					this.$el.find('#answers_' + this.model.get('id') + ' .answer').click(_.bind(function(event) {
						
						var jqTarget = $(event.target);
						if(!jqTarget.hasClass('answer')) {
							jqTarget = jqTarget.parents('div.answer');
						}

						this.$el.find('img.tick').removeClass('tick').removeClass('sprites');
						jqTarget.find('img').addClass('tick').addClass('sprites');
						
						this.onAnswersSelected([jqTarget.find('div.answer-value').html()]);
						
						window.setTimeout(_.bind(this.onQuestionAnswered, this), 300);
					}, this));
					break;
				case this.answerDisplayTypes.LIST_SELECT:
				
					this.$el.find('#answers_' + this.model.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
						this.onAnswersSelected(event.target.value ? [event.target.value] : []);
						
						window.setTimeout(_.bind(this.onQuestionAnswered, this), 300);
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
							answers.push(checkbox.value);
						}, this);
						
						this.onAnswersSelected(answers);
					}, this));

					this.$el.find('#answers_' + this.model.get('id') + ' button.continue').click(_.bind(function(event) {
						this.onQuestionAnswered();
					}, this));
					
					break;
				case this.answerDisplayTypes.SINGLE_DATE:
				
					this.$el.find('#answers_' + this.model.get('id') + ' input.date-selector').on('change', _.bind(function(event) {
						if(event.target.value !== '') {
							this.onAnswersSelected([event.target.value]);
						}
						else {
							this.onAnswersSelected([]);
						}
						window.setTimeout(_.bind(this.onQuestionAnswered, this), 300);
					}, this)).on('focus', function() {
						if($(this).hasClass('hint-text')) {
							$(this).val('').removeClass('hint-text');
						}
					});
					break;
				default:
					Log.error('Unknown answerStyle provided: ' + answerStyle);
					return;
			}
			
			this.$el.find('.questions-progress-report-count').html(majorQuestionCount);
		},
		
		onAnswersSelected: function(answers) {
			this.model.set('selectedAnswers', answers);
		},
		
		onQuestionAnswered: function() {
			this.model.set('questionAnswered', (new Date()).getTime());
		},
		
		onQuestionExplanationHeaderClick: function() {
			
			this.$el.find('div.question-explanation-content').slideToggle(100, _.bind(function() {
				if(this.container && typeof this.container.onChildContentResize === 'function') {
					this.container.onChildContentResize.apply(this.container, []);
				}
			}, this));
		},
		
		onBeforeShow: function() {
			
			if(!this.hadFirstShow) {
				
				var select = this.$el.find('select.multi_answer_select');
				if(select.length && !select.hasClass('form-control')) {
					select.addClass('form-control');
				}
				
				var datePicker = this.$el.find('input.date-selector');
				if(datePicker.length) {
					datePicker.datepicker({
						showOn: 'both',
						dateFormat: 'yy/mm/dd',
						changeMonth: true,
						changeYear: true,
						yearRange: '1950:' + (new Date()).getFullYear(),
						// http://stackoverflow.com/a/1180538/519575
						/*beforeShow: function(input, inst) {
							inst.dpDiv.css({marginTop: -input.offsetHeight + 'px', marginLeft: input.offsetWidth + 'px'});
						}*/
					});
				}
				
				this.hadFirstShow = true;
			}
		}
	});
});
