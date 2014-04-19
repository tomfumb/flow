define(['jquery', 'underscore', 'backbone', 'text!templates/results-sender.html'], function($, _, Backbone, template) {
	
	return Backbone.View.extend({
		
		render: function(resultsHtml) {
			
			var isFirst = !this.content;
			if(isFirst) {
				
				var scratch = $('#flow_scratch');
				scratch.html(_.template(template));
				
				this.content = scratch.find('#flow_results_sender_modal').clone();
				scratch.html('');
				
				this.sendButton = this.content.find('#flow_results_sender_send').click(_.bind(this.onSendClicked, this));
				this.to = this.content.find('#flow_results_sender_to').addClass('input-attention').on('keyup', _.bind(this.onToChanged, this));
				this.cc = this.content.find('#flow_results_cc_ccij');
				
				this.loadImg = this.content.find('#flow_results_sender_load');
				this.successImg = this.content.find('#flow_results_sender_success');
				this.failImg = this.content.find('#flow_results_sender_fail');
			}
			
			this.content.modal();
			
			if(isFirst) {
				
				this.content.on('hidden.bs.modal', _.bind(function () {
					setTimeout(_.bind(function() {
						this.isShown = false;
					}, this), 0);
				}, this));
			}
			
			this.to.focus();
			
			this.isShown = true;
		},
		
		onToChanged: function(event) {
			
			if(this.toValid()) {
				
				this.to.removeClass('input-attention');
				this.sendButton.removeAttr('disabled');
				
				if(event.which === 13) {
					window.setTimeout(_.bind(this.onSendClicked, this), 0);
				}
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
					message: $('#flow_print').html(),
					cc: this.cc.is(':checked')
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
