$(function() {
	
	if(!(Flow.config && Flow.config.questions && Flow.config.outcomes)) {
		Flow.Log.error('Reached flow-init script without adequate Flow.config');
		return;
	}
	
	var combinedModel = new Backbone.Model();
	combinedModel.set({
		Outcomes: Flow.OutcomeManager,
		Questions: Flow.QuestionManager,
		Answers: Flow.AnswerCollection
	});
	
	new Flow.IntroView({model: Flow.QuestionManager, el: '#flow_intro'});
	window.debug = new Flow.MainView({model: combinedModel, el: '#flow_body'});
	new Flow.PrintView({model: combinedModel, el: '#flow_print'});
	
	Flow.OutcomeManager.reset(Flow.config);
	Flow.QuestionManager.reset(Flow.config, Flow.AnswerCollection, Flow.OutcomeManager);
});
