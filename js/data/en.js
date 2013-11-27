Flow.config = {
	questions: [{
		title: 'Question 1',
		content: 'Body of question 1. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 1.1',
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'Question 2.1'
				}
			},{
				text: 'Answer 1.2',
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'Question 2.2'
				}
			},{
				text: 'Answer 1.3',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 1'
				}
			}]
		}
	},
	{
		title: 'Question 2.1',
		content: 'Body of question 2.1. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 2.1.1',
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'Question 3.1'
				}
			},{
				text: 'Answer 2.1.2',
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'Question 3.2'
				}
			}]
		}
	},
	{
		title: 'Question 2.2',
		content: 'Body of question 2.2. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 2.2.1',
				next: {
					nextType: 'question',
					identifierType: 'title',
					identifier: 'Question 3.3'
				}
			},{
				text: 'Answer 2.2.2',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 2'
				}
			}]
		}
	},
	{
		title: 'Question 3.1',
		content: 'Body of question 3.1. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 3.1.1',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 3'
				}
			},{
				text: 'Answer 3.1.2',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 4'
				}
			}]
		}
	},
	{
		title: 'Question 3.2',
		content: 'Body of question 3.2. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 3.2.1',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 5'
				}
			},{
				text: 'Answer 3.2.2',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 6'
				}
			}]
		}
	},
	{
		title: 'Question 3.3',
		content: 'Body of question 3.3. This is where the question\'s description will show.',
		answers: {
			options: [{
				text: 'Answer 3.3.1',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 1'
				}
			},{
				text: 'Answer 3.3.2',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 2'
				}
			},{
				text: 'Answer 3.3.3',
				next: {
					nextType: 'outcome',
					identifierType: 'title',
					identifier: 'Outcome 2'
				}
			}]
		}
	}],
	outcomes: [{
		title: 'Outcome 1',
		description: 'This is the first outcome. A full description of the option will be shown here.'
	},{
		title: 'Outcome 2',
		description: 'This is the second outcome. A full description of the option will be shown here.'
	},{
		title: 'Outcome 3',
		description: 'This is the third outcome. A full description of the option will be shown here.'
	},{
		title: 'Outcome 4',
		description: 'This is the fourth outcome. A full description of the option will be shown here.'
	},{
		title: 'Outcome 5',
		description: 'This is the fifth outcome. A full description of the option will be shown here.'
	},{
		title: 'Outcome 6',
		description: 'This is the sixth outcome. A full description of the option will be shown here.'
	}]
}
