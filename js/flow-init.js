$(function() {
	
	if(!(Flow.config && Flow.config.questions && Flow.config.outcomes)) {
		low.Log.log(low.Log.logLevels.ERROR, 'Reached flow-init script without adequate Flow.config', true);
		return;
	}
	
	var mainView = new Flow.MainView({
		model: new Flow.CombinedModel(Flow.OutcomeManager, Flow.QuestionManager, Flow.AnswerCollection)
	});
	
	Flow.OutcomeManager.reset(Flow.config);
	Flow.QuestionManager.reset(Flow.config, Flow.AnswerCollection, Flow.OutcomeManager);
	
	debugger;
});
