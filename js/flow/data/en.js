define(['jquery', 'data/ac-hpr', 'data/civil-canada', 'data/crim-canada', 'data/eccc', 'data/echr', 'data/ecowas', 'data/ia-chr', 'data/icc', 'data/imm-canada', 'data/un-cat', 'data/un-ced', 'data/un-cedaw', 'data/un-cerd', 'data/un-cescr', 'data/un-crc', 'data/un-hrc', 'data/un-wgeid', 'data/wcc-bosnia'], function($, ac_hpr, civil_canada, crim_canada, eccc, echr, ecowas, ia_chr, icc, imm_canada, un_cat, un_ced, un_cedaw, un_cerd, un_cescr, un_crc, un_hrc, un_wgeid, wcc_bosnia) {
	
	config = {
		lists: {
			countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea-Bissau', 'Guinea', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Sahrawi Arab Democratic Republic (Western Sahara)', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
			yesnounknown: ['Yes', 'No', 'Unknown'],
		}
	};

	config.questions = [{
		id: '1',
		content: 'In what country did the abuse(s) occur?',
		explanations: ['Territorial jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction because it happened on a state party\'s territory or on the territory of a country covered by the mechanism.'],
		answers: config.lists.countries,
		answerType: 'single-select'
	},
	{
		id: '2a',
		content: 'Did people from any other country participate in the abuse(s)?',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},
	{
		id: '2b',
		content: 'What country were the people from?',
		explanations: ['Territorial jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction because it was committed by the citizen of a state party or by a citizen of a country covered by the mechanism.'],
		answers: config.lists.countries,
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['2a'].hasAnswer('Yes'));
		}
	},
	{
		id: '3',
		content: 'What is the date on which the abuse(s) happened (if the abuses included detention or torture, when did the detention or torture end)?',
		explanations: ['Temporal jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction – i.e. either when the particular country signed on to the treaty/acceded to the mechanisms or when the treaty/mechanism came into force.'],
		answerType: 'single-date'
	},{
		id: '4',
		content: 'At the time of the abuse(s), what country was the victim a citizen of?',
		answers: config.lists.countries,
		answerType: 'single-select'
	},{
		id: '5a',
		content: 'At the time of the abuse(s), was the victim a citizen of any other country?',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '5b',
		content: 'Of which other country was the victim a citizen at the time of the abuse(s)?',
		answers: config.lists.countries,
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['5a'].hasAnswer('Yes'));
		}
	},
	{
		id: '6',
		content: 'Describe the abuse(s) committed against the victim',
		explanations: ['Subject matter jurisdiction/admissibility. To determine whether the victim\'s abuse constitutes a crime/violation that comes within the mechanism\'s subject matter jurisdiction.'],
		
		answers: ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'],
		answerType: 'multi-select'
	},{
		id: '7',
		content: 'Did the abuse(s) take place during a war?',
		explanations: ['Subject matter jurisdiction over War Crimes. To determine whether the victim\'s abuse constitutes a war crime such that it comes within the mechanism\'s subject matter jurisdiction.'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '8',
		content: 'Were these kinds of abuses committed against many other people in the country at that time?',
		explanations: ['Subject matter jurisdiction over Crimes Against Humanity. To determine whether the victim\'s abuse constitutes a crime against humanity such that it comes within the mechanism\'s subject matter jurisdiction.'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '9',
		content: 'Was the victim targeted because of her/his race, ethnicity, religion or nationality?',
		explanations: ['Subject matter jurisdiction over Genocide. To determine whether the victim\'s abuse constitutes genocide such that it comes within the mechanism\'s subject matter jurisdiction.'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '10',
		content: 'Who committed the abuse(s)?',
		explanations: ['Subject matter jurisdiction over Torture. To determine whether the victim\'s abuse constitutes torture such that it comes within the mechanism\'s subject matter jurisdiction;', 'Immunity. To determine if the abuse was committed by a government actor such that there would be immunity in Canadian courts;', 'Territorial jurisdiction. To determine if the country  where the abuse happened is responsible because the perpetrator was a government actor or not responsible because the abuse was committed by a non-government actor (e.g. a rebel group).'],
		answers: ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes', 'Company or corporation', 'Unknown'],
		answerType: 'multi-select'
	},{
		id: '11',
		content: 'Are any of the people responsible for the abuse(s) currently living in Canada?',
		explanations: ['Territorial jurisdiction for action in Canada. To determine if a criminal UJ case or immigration penalty might be possible in Canada.'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '12',
		content: 'Do any of the people responsible for the abuse(s) ever visit Canada?',
		explanations: ['Territorial jurisdiction for action in Canada. To determine if a criminal UJ case or immigration penalty might be possible in Canada'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '13',
		content: 'Do any of the people responsible for the abuse(s) ever travel outside the country where the abuse(s) happened?',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14a',
		content: 'In your opinion, in the country where the abuse(s) occurred, are the courts fair, independent and impartial, such that justice can be achieved there?',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14b',
		content: 'Did the victim or the victim\'s family try to bring a case or a complaint before the courts, the police or other authorities in the country where the abuses occurred?',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14c',
		content: 'What was the result?',
		explanations: ['Admissibility re exhaustion of domestic remedies. To determine whether the mechanism would reject the case based availability of remedies in country where the abuses happened.'],
		answers: ['Investigation or prosecution still ongoing', 'No investigation', 'Inadequate investigation', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'],
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['14b'].hasAnswer('Yes'));
		}
	},{
		id: '15',
		content: 'Has the victim or the victim\'s family submitted a complaint to any other international court or body?',
		explanations: ['Admissibility re deference to other bodies. To determine whether the mechanism would reject the case based a complaint before another international body.'],
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	}];
	
	// order here determines the order of display beneath questions - should match ordering of the remedies / options tab
	config.outcomes = [icc, un_cat, un_hrc, un_cerd, un_cedaw, un_ced, un_cescr, un_crc, un_wgeid, ia_chr, ac_hpr, ecowas, echr, eccc, wcc_bosnia, crim_canada, civil_canada, imm_canada];

	return config;
});
