Flow.config = {
	questions: [{
		id: '1',
		title: 'Question 1',
		content: 'Body of question 1. This is where the question\'s description will show.',
		answers: ['answer 1', 'answer 2', 'answer 3', 'answer 4', 'answer 5', 'answer 6'],
		answerType: 'multi-select'
	},
	{
		id: '2a',
		title: 'Question 2a',
		content: 'Body of question 2a This is where the question\'s description will show.',
		answers: ['answer 1', 'answer 2', 'answer 3'],
		answerType: 'single-select'
	},
	{
		id: '2b',
		title: 'Question 2b',
		content: 'Body of question 2b This is where the question\'s description will show.',
		answers: ['answer 1', 'answer 2', 'answer 3', 'answer 4', 'answer 5', 'answer 6', 'answer 7', 'answer 8'],
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['2a'].hasAnswer('answer 1'));
		}
	},
	{
		id: '3',
		title: 'Question 3',
		content: 'Body of question 3. This is where the question\'s description will show.',
		answers: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
		answerType: 'multi-select'
	}],
	outcomes: [{
		title: 'Outcome 1',
		description: 'This is the first outcome. A full description of the option will be shown here.',
		image: 'images/crazy-scales.jpg',
		condition: function(questions) {
			return (questions['2b'].hasAnswer('answer 3') || questions['2b'].hasAnswer('answer 4'));
		}
	},{
		title: 'Outcome 2',
		description: 'This is the second outcome. A full description of the option will be shown here.',
		image: 'images/icca.jpg',
		condition: function(questions) {
			return !questions['1'].hasAnswer('answer 6');
		}
	},{
		title: 'Outcome 3',
		description: 'This is the third outcome. A full description of the option will be shown here.',
		image: 'images/leaves.jpg',
		condition: function(questions) {
			return true;
		}
	}]
}
