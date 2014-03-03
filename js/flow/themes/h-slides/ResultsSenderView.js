Flow.Theme.ResultsSenderView = Backbone.View.extend({

	template: [
		'<div class="modal" id="flow_results_sender_modal" tabindex="-1" role="dialog" aria-labelledby="flow_feedback_results_sender_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_feedback_modal_label">Email Results</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_results_sender_modal_body">',
		'				<h4>Your Email Address</h4>',
		'				<div class="input-group">',
		'					<span class="input-group-addon">@</span>',
		'					<input id="flow_results_sender_to" type="text" class="form-control" placeholder="Your Email Address">',
		'				</div>',
		'				<br />',
		'				<button type="button" id="flow_results_sender_send" disabled="disabled" class="btn btn-primary">Send</button> ',
		'				<img id="flow_results_sender_load" src="images/small-load.gif" width="24px" height="24px" style="display: none;" />',
		'				<span class="glyphicon glyphicon-ok" id="flow_results_sender_success" style="display: none;" title="Feedback sent"></span>',
		'				<span class="glyphicon glyphicon-remove" id="flow_results_sender_fail" style="display: none;" title="Send failed"></span>',
		'			</div>',
		'			<div class="modal-footer">',
		'				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''),
	
	render: function(resultsHtml) {
		
		if(!this.content) {
			
			var scratch = $('#flow_scratch');
			scratch.html(_.template(this.template));
			
			this.content = scratch.find('#flow_results_sender_modal');
			
			scratch.html('');
			
			this.sendButton = this.content.find('#flow_results_sender_send').click(_.bind(this.onSendClicked, this));
			this.to = this.content.find('#flow_results_sender_to').addClass('input-attention').on('keyup', _.bind(this.onToChanged, this));
			
			this.loadImg = this.content.find('#flow_results_sender_load');
			this.successImg = this.content.find('#flow_results_sender_success');
			this.failImg = this.content.find('#flow_results_sender_fail');
		}
		
		this.content.modal();
	},
	
	onToChanged: function() {
		
		if(this.toValid()) {
			this.to.removeClass('input-attention');
			this.sendButton.removeAttr('disabled');
		}
		else {
			this.sendButton.attr('disabled', 'disabled');
		}
	},
	
	toValid: function() {
		return !!this.to.val().match(/[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i);
	},
	
	onSendClicked: function() {
		
		this.loadImg.show();
		this.successImg.hide();
		this.failImg.hide();
		
		this.sendButton.attr('disabled', 'disabled');
		
		$.ajax('results/', {
			type: 'POST',
			data: {
				to: this.to.val(),
				message: $('#flow_print').html()
			},
			success: _.bind(this.onSendSuccess, this),
			error: _.bind(this.onSendError, this)
		});
	},
	
	onSendSuccess: function() {
		
		this.loadImg.hide();
		this.successImg.show();
		
		this.sendButton.removeAttr('disabled');
	},
	
	onSendError: function() {
		
		this.loadImg.hide();
		this.failImg.show();
		
		this.sendButton.removeAttr('disabled');
	}
});
