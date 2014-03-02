Flow.Theme.FeedbackView = Backbone.View.extend({

	template: [
		'<div class="modal" id="flow_feedback_modal" tabindex="-1" role="dialog" aria-labelledby="flow_feedback_modal_label" aria-hidden="true">',
		'	<div class="modal-dialog">',
		'		<div class="modal-content">',
		'			<div class="modal-header">',
		'				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'				<h4 class="modal-title" id="flow_feedback_modal_label">Send Feedback</h4>',
		'			</div>',
		'			<div class="modal-body" id="flow_feedback_modal_body">',
		'				<h4>Your Email Address</h4>',
		'				<div class="input-group">',
		'					<span class="input-group-addon">@</span>',
		'					<input id="flow_feedback_from" type="text" class="form-control" placeholder="Your Email Address">',
		'				</div>',
		'				<br />',
		'				<h4>Your Comment</h4>',
		'				<textarea id="flow_feedback_message" class="form-control" rows="5"></textarea>',
		'				<br />',
		'				<button type="button" id="flow_feedback_send" disabled="disabled" class="btn btn-primary">Send</button> <img id="flow_feedback_load" src="images/small-load.gif" width="24px" height="24px" style="display: none;" /><span class="glyphicon glyphicon-ok" id="flow_feedback_success" style="display: none;"><span><span class="glyphicon glyphicon-remove" id="flow_feedback_fail" style="display: none;"><span>',
		'			</div>',
		'			<div class="modal-footer">',
		'				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
		'			</div>',
		'		</div>',
		'	</div>',
		'</div>'
	].join(''),
	
	render: function() {
		
		var scratch = $('#flow_scratch');
		scratch.html(_.template(this.template));
		
		this.content = scratch.find('#flow_feedback_modal');
		scratch.html('');
		
		this.content.find('#flow_feedback_from').addClass('input-attention').on('keyup', _.bind(this.onFromChanged, this));
		this.content.find('#flow_feedback_message').addClass('input-attention').on('keyup', _.bind(this.onMessageChanged, this));
		
		this.content.find('#flow_feedback_send').click(_.bind(this.onSendClicked, this));
		
		this.sendButton = this.content.find('#flow_feedback_send');
		this.from = this.content.find('#flow_feedback_from');
		this.message = this.content.find('#flow_feedback_message');
		this.loadImg = this.content.find('#flow_feedback_load');
		this.successImg = this.content.find('#flow_feedback_success');
		this.failImg = this.content.find('#flow_feedback_fail');
		
		this.content.modal();
	},
	
	onFromChanged: function() {
		
		if(this.fromValid()) {
			this.from.removeClass('input-attention');
			if(this.messageValid()) {
				this.sendButton.removeAttr('disabled');
			}
		}
		else {
			this.sendButton.attr('disabled', 'disabled');
		}
	},
	
	onMessageChanged: function() {
		
		if(this.messageValid()) {
			this.message.removeClass('input-attention');
			if(this.fromValid()) {
				this.sendButton.removeAttr('disabled');
			}
		}
		else {
			this.sendButton.attr('disabled', 'disabled');
		}
	},
	
	fromValid: function() {
		return !!this.from.val().match(/[a-z0-9!#$%&'*+\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i);
	},
	
	messageValid: function() {
		return !!this.message.val().match(/.{10}/i);
	},
	
	onSendClicked: function() {
		
		this.loadImg.show();
		this.successImg.hide();
		this.failImg.hide();
		
		this.sendButton.attr('disabled', 'disabled');
		
		var url = document.location.href;
		var urlLastSlash = url.lastIndexOf('/');
		if(urlLastSlash !== url.length - 1) {
			url = url.substring(0, urlLastSlash);
		}
		
		$.ajax(url + '/feedback/', {
			type: 'POST',
			data: {
				from: this.from.val(),
				message: this.message.val()
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
