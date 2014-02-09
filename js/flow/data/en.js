Flow.config = {
	selectors: {
		outcome_icc: $('#ccij_outcome_icc'),
		outcome_eccc: $('#ccij_outcome_eccc'),
		outcome_bosnia: $('#ccij_outcome_bosnia'),
		outcome_crim_pro_can: $('#ccij_outcome_crim_pro_can'),
		outcome_civ_law_can: $('#ccij_outcome_civ_law_can'),
		outcome_imm_pen_can: $('#ccij_outcome_imm_pen_can'),
		outcome_un_cat: $('#ccij_outcome_un_cat'),
		outcome_un_hrc: $('#ccij_outcome_un_hrc'),
		outcome_un_cerd: $('#ccij_outcome_un_cerd'),
		outcome_un_cedaw: $('#ccij_outcome_un_cedaw'),
		outcome_un_ced: $('#ccij_outcome_un_ced'),
		outcome_un_cescr: $('#ccij_outcome_un_cescr'),
		outcome_un_crc: $('#ccij_outcome_un_crc'),
		outcome_un_wgeid: $('#ccij_outcome_un_wgeid'),
		outcome_ia_chr: $('#ccij_outcome_ia_chr'),
		outcome_acm_hpr: $('#ccij_outcome_acm_hpr'),
		outcome_act_hpr: $('#ccij_outcome_act_hpr'),
		outcome_ecowas: $('#ccij_outcome_ecowas'),
		outcome_echr: $('#ccij_outcome_echr')
	},
	lists: {
		countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa ', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain ', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland ', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand ', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
		yesnounknown: ['yes', 'no', 'unknown']
	}
};

Flow.config.questions = [{
	id: '1',
	content: 'In what country did the abuse(s) occur?',
	explanations: ['Territorial jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction because it happened on a state party\'s territory or on the territory of a country covered by the mechanism.'],
	answers: Flow.config.lists.countries,
	answerType: 'single-select'
},
{
	id: '2a',
	content: 'Did people from any other country participate in the abuse(s)?',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},
{
	id: '2b',
	content: 'What country were the people from?',
	explanations: ['Territorial jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction because it was committed by the citizen of a state party or by a citizen of a country covered by the mechanism.'],
	answers: Flow.config.lists.countries,
	answerType: 'single-select',
	condition: function(questions) {
		return(questions['2a'].hasAnswer('yes'));
	}
},
{
	id: '3',
	content: 'What is the date on which the abuse(s) happened (if the abuses included detention or torture, when did the detention or torture end)?',
	explanations: ['Temporal jurisdiction/admissibility. To determine whether the victim\'s abuse would come within the mechanism\'s jurisdiction – i.e. either when the particular country signed on to the treaty/acceded to the mechanisms or when the treaty/mechanism came into force.'],
	answerType: 'single-date'
},
{
	id: '4',
	content: 'Describe the abuse(s) committed against the victim',
	explanations: ['Subject matter jurisdiction/admissibility. To determine whether the victim\'s abuse constitutes a crime/violation that comes within the mechanism\'s subject matter jurisdiction.'],
	answers: ['beating', 'bodily mutilation', 'burning', 'death threats', 'deprivation of medical care', 'electric shock', 'forced  stress positions', 'forced nudity', 'forced to watch abuse of other prisoners', 'incomunicado detention', 'kicking', 'kidnapping/disappearance', 'killing', 'mock execution', 'prolonged exposure to extreme cold or heat', 'prolonged food/water deprivation', 'prolonged sleep deprivation', 'punching', 'rape or other sexual assault', 'severe mental suffering', 'solitary confinement', 'suffocation', 'waterboarding'],
	answerType: 'multi-select'
},{
	id: '5',
	content: 'Did the abuse(s) take place during a war?',
	explanations: ['Subject matter jurisdiction over War Crimes. To determine whether the victim\'s abuse constitutes a war crime such that it comes within the mechanism\'s subject matter jurisdiction.'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '6',
	content: 'Were these kinds of abuses committed against many other people in the country at that time?',
	explanations: ['Subject matter jurisdiction over Crimes Against Humanity. To determine whether the victim\'s abuse constitutes a crime against humanity such that it comes within the mechanism\'s subject matter jurisdiction.'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '7',
	content: 'Was the victim targeted because of her/his race, ethnicity, religion or nationality?',
	explanations: ['Subject matter jurisdiction over Genocide. To determine whether the victim\'s abuse constitutes genocide such that it comes within the mechanism\'s subject matter jurisdiction.'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '8',
	content: 'Who committed the abuse(s)?',
	explanations: ['Subject matter jurisdiction over Torture. To determine whether the victim\'s abuse constitutes torture such that it comes within the mechanism\'s subject matter jurisdiction;', 'Immunity. To determine if the abuse was committed by a government actor such that there would be immunity in Canadian courts;', 'Territorial jurisdiction. To determine if the country  where the abuse happened is responsible because the perpetrator was a government actor or not responsible because the abuse was committed by a non-government actor (e.g. a rebel group).'],
	answers: ['soldier in government\'s army', 'police officer', 'other government official', 'soldier in rebel army', 'person in plainclothes'],
	answerType: 'multi-select'
},{
	id: '9',
	content: 'Are any of the people responsible for the abuse(s) currently living in Canada?',
	explanations: ['Territorial jurisdiction for action in Canada. To determine if a criminal UJ case or immigration penalty might be possible in Canada.'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '10',
	content: 'Do any of the people responsible for the abuse(s) ever visit Canada?',
	explanations: ['Territorial jurisdiction for action in Canada. To determine if a criminal UJ case or immigration penalty might be possible in Canada'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '11',
	content: 'Do any of the people responsible for the abuse(s) ever travel outside the country where the abuse(s) happened?',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '12',
	content: 'At the time of the abuse(s), what country was the victim a citizen of?',
	answers: Flow.config.lists.countries,
	answerType: 'single-select'
},{
	id: '13a',
	content: 'At the time of the abuse(s), was the victim a citizen of any other country?',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '13b',
	content: 'Of which other country was the victim a citizen at the time of the abuse(s)?',
	answers: Flow.config.lists.countries,
	answerType: 'single-select',
	condition: function(questions) {
		return(questions['13a'].hasAnswer('yes'));
	}
},{
	id: '14a',
	content: 'In your opinion, in the country where the abuse(s) occurred, are the courts fair, independent and impartial, such that justice can be achieved there?',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '14b',
	content: 'Did the victim or the victim\'s family try to bring a case or a complaint before the courts, the police or other authorities in the country where the abuses occurred?',
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
},{
	id: '14c',
	content: 'What was the result?',
	explanations: ['Admissibility re exhaustion of domestic remedies. To determine whether the mechanism would reject the case based availability of remedies in country where the abuses happened.'],
	answers: ['Investigation or prosecution still ongoing', 'No investigation', 'Inadequate investigation', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'],
	answerType: 'single-select',
	condition: function(questions) {
		return(questions['14b'].hasAnswer('yes'));
	}
},{
	id: '15',
	content: 'Has the victim or the victim\'s family submitted a complaint to any other international court or body?',
	explanations: ['Admissibility re deference to other bodies. To determine whether the mechanism would reject the case based a complaint before another international body.'],
	answers: Flow.config.lists.yesnounknown,
	answerType: 'single-select'
}];
	
Flow.config.outcomes = [{
	/* International Criminal Court */
	title: Flow.config.selectors.outcome_icc.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_icc.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_icc.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_icc.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_icc.find('img').attr('src'),
	condition: function(questions) {
		return (questions['2b'].hasAnswer('Canada') || questions['2b'].hasAnswer('United Kingdom'));
	}
},{
	/* Extraordinary Chambers for Cambodia */
	title: Flow.config.selectors.outcome_eccc.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_eccc.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_eccc.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_eccc.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_eccc.find('img').attr('src'),
	condition: function(questions) {
		return !questions['1'].hasAnswer('Aruba');
	}
},{
	/* War Crimes Chamber of the Court of Bosnia and Herzegovina */
	title: Flow.config.selectors.outcome_bosnia.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_bosnia.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_bosnia.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_bosnia.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_bosnia.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* Criminal Prosecution in Canada */
	title: Flow.config.selectors.outcome_crim_pro_can.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_crim_pro_can.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_crim_pro_can.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_crim_pro_can.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_crim_pro_can.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* Civil lawsuit in Canada */
	title: Flow.config.selectors.outcome_civ_law_can.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_civ_law_can.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_civ_law_can.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_civ_law_can.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_civ_law_can.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* Immigration penalties in Canada */
	title: Flow.config.selectors.outcome_imm_pen_can.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_imm_pen_can.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_imm_pen_can.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_imm_pen_can.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_imm_pen_can.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee against Torture (CAT) */
	title: Flow.config.selectors.outcome_un_cat.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_cat.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_cat.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_cat.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_cat.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Human Rights Committee */
	title: Flow.config.selectors.outcome_un_hrc.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_hrc.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_hrc.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_hrc.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_hrc.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on the Elimination of Racial Discrimination (CERD) */
	title: Flow.config.selectors.outcome_un_cerd.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_cerd.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_cerd.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_cerd.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_cerd.find('img').attr('src'),
	condition: function(questions) {
		return !questions['3'].isBeforeDate('2005/01/05');
	}
},{
	/* U.N. Committee on Elimination of Discrimination against Women (CEDAW) */
	title: Flow.config.selectors.outcome_un_cedaw.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_cedaw.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_cedaw.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_cedaw.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_cedaw.find('img').attr('src'),
	image: Flow.config.selectors.outcome_un_cedaw.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on Enforced Disappearances (CED) */
	title: Flow.config.selectors.outcome_un_ced.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_ced.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_ced.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_ced.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_ced.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on Economic, Social and Cultural Rights (CESCR) */
	title: Flow.config.selectors.outcome_un_cescr.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_cescr.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_cescr.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_cescr.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_cescr.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on the Rights of the Child (CRC) */
	title: Flow.config.selectors.outcome_un_crc.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_crc.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_crc.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_crc.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_crc.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Working Group on Enforced Disappearances (WGEID) */
	title: Flow.config.selectors.outcome_un_wgeid.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_un_wgeid.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_un_wgeid.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_un_wgeid.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_un_wgeid.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* Inter-American Commission/Court of Human Rights */
	title: Flow.config.selectors.outcome_ia_chr.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_ia_chr.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_ia_chr.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_ia_chr.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_ia_chr.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* African Commission on Human and Peoples' Rights */
	title: Flow.config.selectors.outcome_acm_hpr.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_acm_hpr.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_acm_hpr.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_acm_hpr.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_acm_hpr.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* African Court on Human and Peoples' Rights */
	title: Flow.config.selectors.outcome_act_hpr.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_act_hpr.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_act_hpr.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_act_hpr.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_act_hpr.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* Economic Community Of West African States (ECOWAS) */
	title: Flow.config.selectors.outcome_ecowas.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_ecowas.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_ecowas.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_ecowas.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_ecowas.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
},{
	/* European Court of Human Rights */
	title: Flow.config.selectors.outcome_echr.find('.outcome-title').html(),
	abbrebiation: Flow.config.selectors.outcome_echr.find('.outcome-abbreviation').html(),
	url: Flow.config.selectors.outcome_echr.find('.outcome-url').html(),
	description: Flow.config.selectors.outcome_echr.find('.outcome-description').html(),
	image: Flow.config.selectors.outcome_echr.find('img').attr('src'),
	condition: function(questions) {
		return true;
	}
}];
