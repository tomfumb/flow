Flow.config = {
	questions: [{
		title: 'Select your country',
		content: 'Which country are you from?',
		answers: {
			type: 'ddl',
			options: [{
				text: 'Anywhere except Iraq',
				value: undefined,
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'where would you like to go on holiday?'
				}
			},{
				text: 'Iraq',
				value: 'oh dear...',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'you\'re fucked'
				}
			}]
		}
	},
	{
		title: 'where would you like to go on holiday?',
		content: 'You\'ll be rolling in cash after this case!',
		answers: {
			type: 'box',
			options: [{
				text: 'Morocco',
				value: 'Morocco',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'You\'re going on holiday!'
				}
			},{
				text: 'Chile',
				value: 'Chile',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'You\'re going on holiday!'
				}
			}]
		}
	}],
	outcomes: [{
		title: 'You\'re fucked',
		description: 'No seriously, you\'re fucked...',
		url: 'https://www.google.ca/search?q=you\'re+fucked&oq=you\'re+fucked&aqs=chrome..69i57j69i60l3j69i61j69i59.1430j0j4&sourceid=chrome&ie=UTF-8'
	},{
		title: 'You\'re going on holiday!',
		description: 'WOOOO YEAHHHHH',
		url: 'http://thehypnotherapyteam.files.wordpress.com/2011/08/holiday.jpg'
	}]
}
