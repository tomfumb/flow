define(['jquery', 'underscore', 'backbone', 'flow/Log', 'flow/ui/QuestionExplanationView', 'text!templates/question-base.html', 'text!templates/question-single-few.html', 'text!templates/question-single-many.html', 'text!templates/question-multi.html', 'text!templates/question-date.html', 'jquery-ui'], function ($, _, Backbone, Log, explanationView, questionTemplate, singleFewTemplate, singleManyTemplate, multiTemplate, dateTemplate) {
	
	return Backbone.View.extend({
	
		singleAnswerThreshold: 5,
		permitAnswers: true,
		answerDelay: 1000,
		
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
			
			var answers = this.model.get('answers');
			if(answers && !answers.preventSort) {
                answers.sort(function (a, b) {
                    return a.display.toLowerCase().localeCompare(b.display.toLowerCase());
                });
			}
			
			var bodyTemplate, answerStyle, answerTriggers = null;
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
							answers: answers
						}
					)
				}
			));
			
			this.$el.find('div.question-explanation-header').click(_.bind(this.onQuestionExplanationHeaderClick, this));
			this.activityIndicator = this.$el.find('.question-activity-indicator');
			
			this.startAgainButton = this.$el.find('button.start-again-button');
			this.startAgainButton.on('click', _.bind(this.resetRequested, this));
			
			switch(answerStyle) {
				
				case this.answerDisplayTypes.EL_CLICK:
				
					this.$el.find('#answers_' + this.model.get('id') + ' .answer').click(_.bind(function(event) {
						
						if(this.permitAnswers) {
						
							// prevent multiple answering through multiple clicks before this.onQuestionAnswered. this.onQuestionAnswered re-enables answering
							this.permitAnswers = false;
						
							var jqTarget = $(event.target);
							if(!jqTarget.hasClass('answer')) {
								jqTarget = jqTarget.parents('div.answer');
							}

							this.$el.find('img.tick').removeClass('tick').removeClass('sprites');
							jqTarget.find('img').addClass('tick').addClass('sprites');
							
							this.onAnswersSelected([jqTarget.find('div.answer-value').html()]);
							
							window.setTimeout(_.bind(this.onQuestionAnswered, this), this.answerDelay);
							this.showActivityIndicator();
						}
						else {
							Log.info('Not permitting additional answer');
						}
					}, this));
					break;
				case this.answerDisplayTypes.LIST_SELECT:
				
					this.$el.find('#answers_' + this.model.get('id') + ' .multi_answer_select').change(_.bind(function(event) {
						
						if(this.permitAnswers) {
						
							this.onAnswersSelected(event.target.value ? [event.target.value] : []);
							
							window.setTimeout(_.bind(this.onQuestionAnswered, this), this.answerDelay);
							this.showActivityIndicator();
						}
						else {
							Log.info('Not permitting additional answer');
						}
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
						window.setTimeout(_.bind(this.onQuestionAnswered, this), this.answerDelay);
						this.showActivityIndicator();
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
			this.answerStyle = answerStyle;
		},
		
		onAnswersSelected: function(answers) {
			this.model.set('selectedAnswers', answers);
		},
		
		onQuestionAnswered: function() {
			
			this.permitAnswers = true;
			this.model.set('questionAnswered', (new Date()).getTime());
		},
		
		resetQuestion: function() {
			
			this.onAnswersSelected([]);
			switch(this.answerStyle) {
				
				case this.answerDisplayTypes.EL_CLICK:
					this.$el.find('.answer img.tick').removeClass('tick').removeClass('sprites');
					break;
				case this.answerDisplayTypes.LIST_SELECT:
					this.$el.find('.multi_answer_select').val('');
					break;
				case this.answerDisplayTypes.CHECK_BUTTON_CLICK:
					this.$el.find('.answers').find('input[type=checkbox]').each(function() {
						if(this.checked) {
							this.checked = false;
						}
					});
					break;
				case this.answerDisplayTypes.SINGLE_DATE:
					this.$el.find('input.date-selector').val('');
					break;
				default:
					Log.error('Unknown answerStyle provided: ' + answerStyle);
					return;
			}
		},
		
		onQuestionExplanationHeaderClick: function() {
			
			if(!this.questionExplanationView) {
				this.questionExplanationView = new explanationView();
				this.questionExplanationView.setContent(this.model.get('explanations'));
			}
			
			this.questionExplanationView.render();
		},
		
		showActivityIndicator: function() {
		
            var hideClass = 'question-activity-indicator-hidden';
            if (this.activityIndicator.hasClass(hideClass)) {
                this.activityIndicator.removeClass(hideClass);
            }

            if(typeof this.activityIndicatorTimeout !== 'undefined') {
                window.clearTimeout(this.activityIndicatorTimeout);
				this.activityIndicatorTimeout = undefined;
			}
			
			this.activityIndicatorTimeout = window.setTimeout(_.bind(function () {
                if (!this.activityIndicator.hasClass(hideClass)) {
                    this.activityIndicator.addClass(hideClass);
                }
			}, this), this.answerDelay);
		},
		
		resetRequested: function() {
			this.trigger('restartRequested');
		},
		
		onBeforeShow: function() {
			
			if(!this.hadFirstShow) {
				
				this.prepareSelects();
				this.prepareDatePickers();
				this.prepareQuestionAnswerers();
			
				this.hadFirstShow = true;
			}
		},

		prepareSelects: function () {

			var select = this.$el.find('select.multi_answer_select');
			if (select.length && !select.hasClass('form-control')) {
				select.addClass('form-control');
			}
		},

		prepareDatePickers: function () {

			var datePicker = this.$el.find('input.date-selector');
			if (datePicker.length) {

                if ($.datepicker.regional && $.datepicker.regional[window.CCIJ.language]) {
                    $.datepicker.setDefaults($.datepicker.regional[window.CCIJ.language]);
                }

				datePicker.datepicker({
					showOn: 'both',
					dateFormat: 'yy/mm/dd',
					changeMonth: true,
					changeYear: true,
					yearRange: '1900:' + (new Date()).getFullYear(),
					showAnim: ''
				});
			}
		},

		prepareQuestionAnswerers: function () {

			this.questionAnswererPairs = [];
			var radioAnswerers = this.$el.find('.question-answerer-check-yes-no-radio input[type="radio"]');

			if (radioAnswerers.length) {

				_.each(radioAnswerers, function (answerer) {

					var answerPart = this.$el.find('.answers input[value="' + answerer.name + '"]');
					if(answerPart) {
						this.questionAnswererPairs.push({
							type: 'yesnoradio',
							name: answerer.name,
							questionPart: answerer,
							answerPart: answerPart
						});
					}
				}, this);
			}

			_.each(this.questionAnswererPairs, function (pair) {

				switch (pair.type) {

					case 'yesnoradio':

						$(pair.questionPart).on('change', _.bind(function () {
							if (pair.questionPart.checked) {
								pair.answerPart.prop('checked', (pair.questionPart.value === 'yes')).trigger('change');
							}
						}, this));

						pair.answerPart.on('click', function () {
							if (pair.answerPart.prop('checked')) {
								if (pair.questionPart.value === 'yes') {
									pair.questionPart.checked = true;
								}
							}
							else {
								if (pair.questionPart.value === 'no') {
									pair.questionPart.checked = true;
								}
							}
						}).parents('.checkbox-text-wrapper').hide();

						break;
				}
			}, this);
		}
	});
});
