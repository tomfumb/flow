define(
	['jquery', 'underscore', 'backbone', 'data/core', 'flow/Util', 'flow/Log', 'flow/IntroView', 'flow/MainView', 'flow/PrintView', 'flow/QuestionManager', 'flow/OutcomeManager'],
	function($, _, Backbone, config, Util, Log, IntroView, MainView, PrintView, QuestionManager, OutcomeManager) { 
	
	return Backbone.View.extend({
	
		el: '#ccij_main',

		initialize: function() {
			
			this.intro = this.$el.find('#ccij_intro');
			this.focuses = this.$el.find('.main-focus');
			
			this.intro.find('.app-navigator').on('click', _.bind(this.onAppNavigatorClicked, this));
			
			$('#ccij_navbar .nav a').click(function() { 
				if($('#ccij_navbar .navbar-toggle').is(':visible') && $('#ccij_navbar .navbar-collapse').is(':visible')) {
					$('#ccij_navbar .navbar-toggle').click();
				}
			});

			$(window).resize(_.bind(this.onWindowResize, this));
			$(document).ready(_.bind(function () {
			    this.adjustHeaderForSize();
			}, this));
			
			//$('#ccij_stories_entry,#ccij_stories_nav').click(function() {
			//	window.open(config.url.stories, '_blank');
			//	return false;
			//});
		},
		
		onAppNavigatorClicked: function(event) {
			
			var jqEl = $(event.target);
			var element = (jqEl.hasClass('app-navigator') ? jqEl : jqEl.parents('.app-navigator'));
			var clickedId = element.attr('id');
			
			var navLink = $('#' + clickedId.replace(/entry$/, 'nav'));
			var url = navLink.attr('href');
				
			document.location.href = url;
		},
		
		changeActiveNavTab: function(id) {
			
			var navbar = $('#ccij_navbar');
			navbar.find('li.active').removeClass('active');
			$('#' + id).parents('li').addClass('active');
		},
		
		onHomeSelected: function() {
			
			this.focuses.hide();
			this.intro.show();
			
			this.changeActiveNavTab('ccij_home_nav');
		},
		
		onRemediesSelected: function() {
			
			this.focuses.hide();
			this.$el.find('#ccij_outcomes').show();
			
			this.changeActiveNavTab('ccij_remedies_nav');
		},
		
		onAssessSelected: function() {
			
			this.focuses.hide();
			
			if(!this.flowShown) {
				this.flowSelected();
			}
			
			this.$el.find('#flow').show();
			this.flowShown = true;
			
			this.changeActiveNavTab('ccij_assess_nav');
		},
		
		flowSelected: function() {
			
			if(!(config && config.questions && config.outcomes)) {
				Log.error('Reached init script without adequate config');
				return;
			}
			
			var combinedModel = new Backbone.Model();
			combinedModel.set({
				Outcomes: OutcomeManager,
				Questions: QuestionManager
			});
			
			var introView = new IntroView({model: QuestionManager, el: '#flow_intro'});
			introView.render();
			
			// setTimeout of 0 - give the intro view a chance to draw before potentially cpu-intensive question management
			setTimeout(_.bind(function() {
				
				new MainView({model: combinedModel, el: '#flow_body'});
				
				OutcomeManager.reset(config.outcomes);
				QuestionManager.reset(config.questions);
				
				var printView = new PrintView({model: combinedModel, el: '#flow_print'});
				printView.render();
			}, this), 0);
		},

		onWindowResize: function () {
		    this.adjustHeaderForSize();
		},

		adjustHeaderForSize: function () {

		    if (typeof this.headerEl === 'undefined') {
		        this.headerEl = $('#ccij_ofj_header');
		    }

		    var className = 'wise-header-lg';

		    var previousSize = this.currentSize;
		    this.currentSize = Util.getCurrentSizeBreak();

		    switch (this.currentSize) {
		        case 'xs':
		        case 'sm':
		            if (this.headerEl.hasClass(className)) {
		                this.headerEl.removeClass(className);
		            }
		            break;
		        case 'md':
		        case 'lg':
		            if (!this.headerEl.hasClass(className)) {
		                this.headerEl.addClass(className);
		            }
		            break;
		    }
		}
	});
});
