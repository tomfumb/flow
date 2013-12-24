CCIJ.MainView = Backbone.View.extend({
	
	el: '#ccij_main',

	initialize: function() {
		
		this.intro = this.$el.find('#ccij_intro');
		this.focuses = this.$el.find('.main-focus');
		
		$('#ccij_remedies_entry,#ccij_remedies_nav').click(_.bind(this.onRemediesSelected, this));
		$('#ccij_assess_entry,#ccij_assess_nav').click(_.bind(this.onAssessSelected, this));
		$('#ccij_home_nav').click(_.bind(this.onHomeSelected, this));
		
		this.intro.find('.entry-point').addClass('clickable');
	},
	
	onHomeSelected: function(event) {
			
		event.preventDefault();
		
		this.focuses.hide();
		this.intro.show();
	},
	
	onRemediesSelected: function(event) {
	
		event.preventDefault();
		
		this.focuses.hide();
		this.$el.find('#ccij_outcomes').show();
	},
	
	onAssessSelected: function(event) {
		
		event.preventDefault();
		
		this.focuses.hide();
		this.flowSelected();
		this.$el.find('#flow').show();
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
		new Flow.PrintView({model: combinedModel, el: '#flow_print'});
		
		Flow.OutcomeManager.reset(Flow.config.outcomes);
		Flow.QuestionManager.reset(Flow.config.questions);
	}
});
