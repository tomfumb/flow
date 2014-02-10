CCIJ.MainView = Backbone.View.extend({
	
	el: '#ccij_main',

	initialize: function() {
		
		this.intro = this.$el.find('#ccij_intro');
		this.focuses = this.$el.find('.main-focus');
		
		this.intro.find('.entry-point').addClass('clickable').click(_.bind(this.onEntryPointClicked, this));
		
		$('#ccij_navbar .nav a').click(function() { 
			if($('#ccij_navbar .navbar-toggle').css('display') !== 'none'){
				$('#ccij_navbar .navbar-toggle').click();
			}
		});
	},
	
	onEntryPointClicked: function(event) {
		
		var jqEl = $(event.target);
		var element = (jqEl.hasClass('entry-point') ? jqEl : jqEl.parents('.entry-point'));
		var clickedId = element.attr('id');
		var navLink = $('#' + clickedId.replace(/entry$/, 'nav'));
		navLink.get(0).click();
	},
	
	changeActiveNavTab: function(id) {
		
		var navbar = $('#ccij_navbar');
		navbar.find('li.active').removeClass('active');
		$('#' + id).parents('li').addClass('active');
	},
	
	onHomeSelected: function(event) {
		
		this.focuses.hide();
		this.intro.show();
		
		this.changeActiveNavTab('ccij_home_nav');
	},
	
	onRemediesSelected: function(event) {
		
		this.focuses.hide();
		this.$el.find('#ccij_outcomes').show();
		
		this.changeActiveNavTab('ccij_remedies_nav');
	},
	
	onAssessSelected: function(event) {
		
		this.focuses.hide();
		
		if(!this.flowShown) {
			this.flowSelected();
			this.flowShown = true;
		}
		
		this.$el.find('#flow').show();
		
		this.changeActiveNavTab('ccij_assess_nav');
	},
	
	flowSelected: function() {
		
		if(!(Flow.config && Flow.config.questions && Flow.config.outcomes)) {
			Flow.Log.error('Reached flow-init script without adequate Flow.config');
			return;
		}
		
		var combinedModel = new Backbone.Model();
		combinedModel.set({
			Outcomes: Flow.OutcomeManager,
			Questions: Flow.QuestionManager
		});
		
		var introView = new Flow.IntroView({model: Flow.QuestionManager, el: '#flow_intro'});
		introView.render();
		
		new Flow.MainView({model: combinedModel, el: '#flow_body'});
		
		Flow.OutcomeManager.reset(Flow.config.outcomes);
		Flow.QuestionManager.reset(Flow.config.questions);
		
		var printView = new Flow.PrintView({model: combinedModel, el: '#flow_print'});
		printView.render();
	}
});
