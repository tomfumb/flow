define(['jquery', 'underscore', 'backbone', 'MainView', 'Workspace'], function($, _, Backbone, MainView, Workspace) {
	
	$(function() {
		new Workspace(new MainView());
		Backbone.history.start();
	});
});
