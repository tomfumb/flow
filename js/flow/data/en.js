Flow.config = {
	selectors: {
		outcome1: $('#ccij_outcome_1'),
		outcome2: $('#ccij_outcome_2'),
		outcome3: $('#ccij_outcome_3')
	},
	lists: {
		countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa ', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain ', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland ', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand ', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
		yesnounknown: ['yes', 'no', 'unknown']
	}
};

Flow.config.questions = [{
	id: '1',
	title: 'In what country did the abuse(s) occur?',
	content: 'Select a country from the drop-down menu below.',
	answers: Flow.config.lists.countries,
	answerType: 'single-select'
},
{
	id: '2a',
	title: 'Did people from any other country participate in the abuse(s)?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},
{
	id: '2b',
	title: 'What country were the people from?',
	content: 'Select a country from the drop-down menu below.',
	answers: Flow.config.lists.countries,
	answerType: 'single-select',
	condition: function(questions) {
		return(questions['2a'].hasAnswer('yes'));
	}
},
{
	id: '3',
	title: 'What is the date on which the abuse(s) happened (if the abuses included detention or torture, when did the detention or torture end)?',
	content: 'The following answers will soon be replaced by a calendar to pick a date.',
	answers: ['2001/01/01', '2005/06/30', '2010/12/31'],
	answerType: 'single-select'
},
{
	id: '4',
	title: 'Describe the abuse(s) committed against the victim',
	content: 'Select the abuse(s) from the following options.',
	answers: ['murder', 'beating', 'rape', 'incommunicado', 'detention'],
	answerType: 'multi-select'
},{
	id: '5',
	title: 'Did the abuse(s) take place during a war?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '6',
	title: 'Were these kinds of abuses committed against many other people in the country at that time?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '7',
	title: 'Was the victim targeted because of her/his race, ethnicity, religion or nationality?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '8',
	title: 'Who committed the abuse(s)?',
	content: 'Select the abuser(s) from the following options.',
	answers: ['soldier in government\'s army', 'police officer', 'soldier in rebel army', 'person in plainclothes'],
	answerType: 'multi-select'
},{
	id: '9',
	title: 'Are any of the people responsible for the abuse(s) currently living in Canada?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '10',
	title: 'Do any of the people responsible for the abuse(s) ever visit Canada?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '11',
	title: 'Do any of the people responsible for the abuse(s) ever travel outside the country where the abuse(s) happened?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '12',
	title: 'At the time of the abuse(s), was the victim a citizen of the country where the abuse(s) happened?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '13a',
	title: 'At the time of the abuse(s), was the victim a citizen of any other country?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '13b',
	title: 'Of which other country was the victim a citizen at the time of the abuse(s)?',
	content: 'Select a country from the drop-down menu below.',
	answers: Flow.config.lists.countries,
	answerType: 'single-select',
	condition: function(questions) {
		return(questions['13a'].hasAnswer('yes'));
	}
},{
	id: '14',
	title: 'In the country where the abuse(s) occurred, are the courts fair, independent and impartial, such that justice can be achieved there?',
	content: 'Select an answer below.',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
}];
	
Flow.config.outcomes = [{
	title: Flow.config.selectors.outcome1.find('.outcome-title').html(),
	description: Flow.config.selectors.outcome1.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome1.find('img').attr('src'),
	condition: function(questions) {
		return (questions['2b'].hasAnswer('Canada') || questions['2b'].hasAnswer('United Kingdom'));
	}
},{
	title: Flow.config.selectors.outcome2.find('.outcome-title').html(),
	description: Flow.config.selectors.outcome2.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome2.find('img').attr('src'),
	condition: function(questions) {
		return !questions['1'].hasAnswer('Aruba');
	}
},{
	title: Flow.config.selectors.outcome3.find('.outcome-title').html(),
	description: Flow.config.selectors.outcome3.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome3.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
}];
