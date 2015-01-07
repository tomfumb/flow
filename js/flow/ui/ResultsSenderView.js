define(['jquery', 'underscore', 'backbone', 'flow/Util', 'text!templates/results-sender.html'], function($, _, Backbone, Util, template) {
	
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
			
			var emailAddress = this.sharedData.get('userEmail');
			if(emailAddress) {
				this.to.val(emailAddress);
				this.onToChanged();
			}
			
			this.isShown = true;
		},
		
		onToChanged: function(event) {
			
			if(this.toValid()) {
				
				this.to.removeClass('input-attention');
				this.sendButton.removeAttr('disabled');
				
				if(event && event.which === 13) {
					window.setTimeout(_.bind(this.onSendClicked, this), 0);
				}
			}
			else {
				this.sendButton.attr('disabled', 'disabled');
			}
			
			this.sharedData.set('userEmail', this.to.val());
		},
		
		toValid: function() {
			return Util.emailValid(this.to.val());
		},
		
		onSendClicked: function() {
			
			this.loadImg.show();
			this.successImg.hide();
			this.failImg.hide();
			
			this.sendButton.attr('disabled', 'disabled');

			var content = $('#flow_print').clone();
			content.find('.question-answerer-check-yes-no-radio').remove();

			$.ajax('results/', {
				type: 'POST',
				data: {
					to: this.to.val(),
					message: content.html(),
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
