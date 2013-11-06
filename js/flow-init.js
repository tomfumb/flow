$(function() {
	
	if(!(Flow.config && Flow.config.questions && Flow.config.outcomes)) {
		low.Log.log(low.Log.logLevels.ERROR, 'Reached flow-init script without adequate Flow.config', true);
		return;
	}
	
	var combinedModel = new Backbone.Model();
	combinedModel.set({
		Outcomes: Flow.OutcomeManager,
		Questions: Flow.QuestionManager,
		Answers: Flow.AnswerCollection
	});
	
	new Flow.MainView({model: combinedModel});
	// now need to register for change event on combinedModel's QuestoinManager collection. How to do this?
	// once this is registered its firing will indicate that the app is loaded and ready. However as no ajax calls are involved we could just explicitly fire an event at the bottom of this function - all the same. Event may need to be fired from combinedModel in order for mainView to pick it up
	
	Flow.OutcomeManager.reset(Flow.config);
	Flow.QuestionManager.reset(Flow.config, Flow.AnswerCollection, Flow.OutcomeManager);
});
