define(['jquery', 'underscore', 'backbone', 'flow/Util', 'flow/Log', 'text!templates/question-explanation.html'], function($, _, Backbone, Util, Log, template) {
	
	return Backbone.View.extend({
		
		render: function() {
			
			if(typeof this.content !== 'undefined') {
				this.content.modal();
			}
			else {
				Log.error('Attempt to show question explanation without first calling setContent');
			}
		},
		
		setContent: function(content) {
			
			var scratch = $('#flow_scratch');
			scratch.html(_.template(
				template, {
					explanations: content
				}
			));
			
			this.content = scratch.find('#flow_question_explanation_modal').clone();
			scratch.html('');
		}
	});
});
