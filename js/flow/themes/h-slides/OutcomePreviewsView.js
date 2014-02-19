Flow.Theme.OutcomePreviewsView = Backbone.View.extend({
	
	el: '#flow_outcome_previews',
	
	template: [
		'<div class="row">',
		'	<div class="col-24 col-sm-24 col-md-24 col-lg-24">',
		'		<hr />',
		'		<h4 id="flow_options_preview_title" class="clickable clickable-colour">Your Options</h4>',
		'	</div>',
		'</div>',
		'<div class="row">',
		'	<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">',
				/* really don't want to use a table for layout but in this case cannot see any way to achieve the required effect in CSS without recalculating fixed width or having fluid layout overflow */
		'		<table cellpadding="0">',
		'			<tr>',
		'				<td>',
		'					<div id="flow_available_count_main_container" class="clickable">',
		'						<span id="flow_available_count_main"><%= availableCount %></span>',
		'					</div>',
		'				</td>',
		'				<td style="overflow: hidden;">',
		'					<div id="flow_available_outcome_previews" class="available-outcome-preview-container"><%= previewHtml %></div>',
		'					<div class="clearer"></div>',
		'				</td>',
		'			</tr>',
		'		</table>',
		'	</div>',
		'</div>',
		'<div class="spacer-10"></div>',
		'<div class="row">',
		'	<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">',
		'		<div id="flow_outcome_recent_changes" class="alert alert-info"></div>',
		'	</div>',
		'</div>'
	].join(''),
	
	outcome_preview_template: [
		'<div id="<%= outcomeElId %>"<%= displayStyle %> class="available-outcome-preview-container available-outcome-preview"></div>'
	].join(''),
	
	render: function(previewClickHandler) {
		
		this.onPreviewClicked = previewClickHandler;
		
		var availableCount = 0;
		_.each(this.model.models, function(outcome) {
		
			if(outcome.get('available')) {
				availableCount++;
			}	
		});
		
		this.$el.html(_.template(
		
			this.template, {
				availableCount: availableCount,
				previewHtml: this.getAvailablePreviewsHtml()
			}
		));
		
		this.model.on('change:available', _.bind(this.onOutcomesUpdated, this));
		
		this.$el.find('#flow_available_count_main_container,#flow_options_preview_title').click(_.bind(this.onAvailableCountClicked, this));
		this.handlePreviewClicks();
	},
	
	getAvailablePreviewsHtml: function() {
	
		var scratch = $('#flow_scratch'), view, outcomeElId;
		_.each(this.model.models, function(outcome) {
				
			outcomeElId = this.getPreviewContainerIdFromOutcome(outcome);
			scratch.append(_.template(this.outcome_preview_template, {
				outcomeElId: outcomeElId,
				displayStyle: (outcome.get('available') ? '' : ' style="display: none;"')
			}));
			
			view = new Flow.Theme.OutcomePreviewView({el: '#' + outcomeElId, model: outcome});
			view.render();
			
		}, this);
		
		var html = scratch.html();
		scratch.html('');
		
		return html;
	},
	
	getPreviewContainerIdFromOutcome: function(outcome) {
		return 'op_' + outcome.get('id');
	},
	
	getOutcomeIdFromPreviewContainerId: function(elId) {
		return elId.replace(/op_/, '');
	},
	
	onOutcomesUpdated: function(changedOutcome) {
		
		var availableCount = 0, fadeSpeed = 300;
		_.each(this.model.models, function(outcome) {
		
			if(outcome.get('available')) {
				availableCount++;
			}	
		});
		
		var countEl = this.$el.find('#flow_available_count_main');
		
		countEl.stop();
		countEl.fadeOut(fadeSpeed, _.bind(function() {
			countEl.html(availableCount);
			countEl.fadeIn(100);
		}, this));
		
		var changedPreviewEl = this.$el.find('#' + this.getPreviewContainerIdFromOutcome(changedOutcome));
		changedPreviewEl.stop();
		if(changedOutcome.get('available')) {
			changedPreviewEl.fadeIn(fadeSpeed);
		}
		else {
			changedPreviewEl.fadeOut(fadeSpeed);
		}
		
		/*
		var changesEl = this.$el.find('#flow_outcome_recent_changes');
		
		changesEl.fadeIn(fadeSpeed);
		changesEl.html('Question ' + this.lastAnsweredQuestion.get('id') + );
		*/
	},
	
	handlePreviewClicks: function() {
		
		this.$el.find('#flow_available_outcome_previews .available-outcome-preview').click(_.bind(function(event) {
			var jqEl = $(event.target);
			var element = (jqEl.hasClass('available-outcome-preview') ? jqEl : jqEl.parents('.available-outcome-preview'));
			var outcomeElementId = element.attr('id');
			var outcome = this.model.findWhere({id: this.getOutcomeIdFromPreviewContainerId(outcomeElementId)});
			this.onPreviewClicked(outcome);
		}, this));
	},
	
	onAvailableCountClicked: function() {
		this.onPreviewClicked();
	},
	
	onPreviewClicked: function(outcome) {
		Flow.Log.error('OutcomePreviewView.onPreviewClicked has not been overridden. Nothing is going to happen when a preview is clicked');
	},
	
	onQuestionAnswered: function(question) {
		this.lastAnsweredQuestion = question;
	}
});
