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
	
	new Flow.IntroView({model: Flow.QuestionManager, el: '#flow_intro'});
	new Flow.MainView({model: combinedModel, el: '#flow_body'});
	
	Flow.OutcomeManager.reset(Flow.config);
	Flow.QuestionManager.reset(Flow.config, Flow.AnswerCollection, Flow.OutcomeManager);
});
