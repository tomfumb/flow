CCIJ.Workspace = Backbone.Router.extend({

	initialize: function(mainView) {
		this.mainView = mainView;
	},

	routes: {
		'': 'home',
		'stories': 'stories',
		'remedies': 'remedies',
		'assess': 'assess'
	},
	
	home: function() {
		this.mainView.onHomeSelected();
	},
	
	stories: function() {
		Flow.Log.warning('Stories not yet implemented');
	},

	remedies: function() {
		this.mainView.onRemediesSelected();
	},

	assess: function() {
		this.mainView.onAssessSelected();
	}
});
