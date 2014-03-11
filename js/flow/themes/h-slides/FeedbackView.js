define(['jquery', 'underscore', 'backbone', 'text!template/flow/themes/h-slides/feedback.html'], function($, _, Backbone, template) {
	
	return Backbone.View.extend({

		template: [

		].join(''),
		
		render: function() {
			
			if(!this.content) {
				
				var scratch = $('#flow_scratch');
				scratch.html(_.template(template));
				
				this.content = scratch.find('#flow_feedback_modal');
				
				scratch.html('');
				
				this.sendButton = this.content.find('#flow_feedback_send').click(_.bind(this.onSendClicked, this));
				this.from = this.content.find('#flow_feedback_from').addClass('input-attention').on('keyup', _.bind(this.onFromChanged, this));
				this.message = this.content.find('#flow_feedback_message').addClass('input-attention').on('keyup', _.bind(this.onMessageChanged, this));
				
				this.loadImg = this.content.find('#flow_feedback_load');
				this.successImg = this.content.find('#flow_feedback_success');
				this.failImg = this.content.find('#flow_feedback_fail');
			}
			
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
			
			$.ajax('feedback/', {
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
});
