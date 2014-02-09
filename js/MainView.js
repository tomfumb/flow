CCIJ.MainView = Backbone.View.extend({
	
	el: '#ccij_main',

	initialize: function() {
		
		this.intro = this.$el.find('#ccij_intro');
		this.focuses = this.$el.find('.main-focus');
		
		$('#ccij_remedies_entry,#ccij_remedies_nav').click(_.bind(this.onRemediesSelected, this));
		$('#ccij_assess_entry,#ccij_assess_nav').click(_.bind(this.onAssessSelected, this));
		$('#ccij_home_nav').click(_.bind(this.onHomeSelected, this));
		
		this.intro.find('.entry-point').addClass('clickable');
		
		// will be replaced when Backbone router has been setup
		this.changeActiveNavTab('ccij_home_nav');
	},
	
	changeActiveNavTab: function(id) {
		
		var navbar = $('#ccij_navbar');
		navbar.find('li.active').removeClass('active');
		$('#' + id).parents('li').addClass('active');
	},
	
	onHomeSelected: function(event) {
			
		event.preventDefault();
		
		this.focuses.hide();
		this.intro.show();
		
		this.changeActiveNavTab('ccij_home_nav');
	},
	
	onRemediesSelected: function(event) {
	
		event.preventDefault();
		
		this.focuses.hide();
		this.$el.find('#ccij_outcomes').show();
		
		this.changeActiveNavTab('ccij_remedies_nav');
	},
	
	onAssessSelected: function(event) {
		
		event.preventDefault();
		
		this.focuses.hide();
		this.flowSelected();
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
