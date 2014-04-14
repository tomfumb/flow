define(
	['jquery', 'underscore', 'backbone', 'data/core', 'flow/Log', 'flow/IntroView', 'flow/MainView', 'flow/PrintView', 'flow/QuestionManager', 'flow/OutcomeManager'],
	function($, _, Backbone, config, Log, IntroView, MainView, PrintView, QuestionManager, OutcomeManager) { 
	
	return Backbone.View.extend({
	
		el: '#ccij_main',

		initialize: function() {
			
			this.intro = this.$el.find('#ccij_intro');
			this.focuses = this.$el.find('.main-focus');
			
			this.intro.find('.entry-point').addClass('clickable').on('click', _.bind(this.onEntryPointClicked, this));
			
			$('#ccij_navbar .nav a').click(function() { 
				if($('#ccij_navbar .navbar-toggle').is(':visible') && $('#ccij_navbar .navbar-collapse').is(':visible')) {
					$('#ccij_navbar .navbar-toggle').click();
				}
			});
		},
		
		onEntryPointClicked: function(event) {
			
			var jqEl = $(event.target);
			var element = (jqEl.hasClass('entry-point') ? jqEl : jqEl.parents('.entry-point'));
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
		}
	});
});
