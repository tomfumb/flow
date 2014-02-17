Flow.config = {
	lists: {
		countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Costa Rica', 'Cote d\'Ivoire', 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea-Bissau', 'Guinea', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Sahrawi Arab Democratic Republic (Western Sahara)', 'Samoa ', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain ', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand ', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
		yesnounknown: ['yes', 'no', 'unknown'],
		acmhrp: {countries: [
			'Algeria',
			'Angola',
			'Benin',
			'Botswana',
			'Burkina Faso',
			'Burundi',
			'Cameroon',
			'Central African Republic',
			'Cape Verde',
			'Chad',
			'Cote d\'Ivoire',
			'Comoros', 
			'Congo, Republic of the',
			'Djibouti',
			'Congo, Democratic Republic of the',
			'Egypt',
			'Equatorial Guinea',
			'Eritrea',
			'Ethiopia',
			'Gabon',
			'Gambia, The',
			'Ghana',
			'Guinea-Bissau',
			'Guinea',
			'Kenya',
			'Libya',
			'Lesotho',
			'Liberia',
			'Madagascar',
			'Mali',
			'Malawi',
			'Mozambique',
			'Mauritania',
			'Mauritius',
			'Namibia',
			'Nigeria',
			'Niger',
			'Rwanda',
			'South Africa',
			'Sahrawi Arab Democratic Republic (Western Sahara)',
			'Senegal',
			'Seychelles',
			'Sierra Leone',
			'Somalia',
			'Sao Tome and Principe',
			'Sudan',
			'Swaziland',
			'Tanzania',
			'Togo',
			'Tunisia',
			'Uganda',
			'Zambia',
			'Zimbabwe'
		]}
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
	answers: ['beating', 'bodily mutilation', 'burning', 'death threats', 'deprivation of medical care', 'electric shock', 'forced stress positions', 'forced nudity', 'forced to watch abuse of other prisoners', 'incomunicado detention', 'kicking', 'kidnapping/disappearance', 'killing', 'mock execution', 'prolonged exposure to extreme cold or heat', 'prolonged food/water deprivation', 'prolonged sleep deprivation', 'punching', 'rape or other sexual assault', 'severe mental suffering', 'solitary confinement', 'suffocation', 'waterboarding'],
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
	selector: $('#ccij_outcome_icc'),
	condition: function(questions) {
		return true;
	}
},{
	/* Extraordinary Chambers for Cambodia */
	selector: $('#ccij_outcome_eccc'),
	condition: function(questions) {
		return true;
	}
},{
	/* War Crimes Chamber of the Court of Bosnia and Herzegovina */
	selector: $('#ccij_outcome_bosnia'),
	condition: function(questions) {
		return true;
	}
},{
	/* Criminal Prosecution in Canada */
	selector: $('#ccij_outcome_crim_pro_can'),
	condition: function(questions) {
		return true;
	}
},{
	/* Civil lawsuit in Canada */
	selector: $('#ccij_outcome_civ_law_can'),
	condition: function(questions) {
		return true;
	}
},{
	/* Immigration penalties in Canada */
	selector: $('#ccij_outcome_imm_pen_can'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee against Torture (CAT) */
	selector: $('#ccij_outcome_un_cat'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Human Rights Committee */
	selector: $('#ccij_outcome_un_hrc'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on the Elimination of Racial Discrimination (CERD) */
	selector: $('#ccij_outcome_un_cerd'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on Elimination of Discrimination against Women (CEDAW) */
	selector: $('#ccij_outcome_un_cedaw'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on Enforced Disappearances (CED) */
	selector: $('#ccij_outcome_un_ced'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on Economic, Social and Cultural Rights (CESCR) */
	selector: $('#ccij_outcome_un_cescr'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Committee on the Rights of the Child (CRC) */
	selector: $('#ccij_outcome_un_crc'),
	condition: function(questions) {
		return true;
	}
},{
	/* U.N. Working Group on Enforced Disappearances (WGEID) */
	selector: $('#ccij_outcome_un_wgeid'),
	condition: function(questions) {
		return true;
	}
},{
	/* Inter-American Commission/Court of Human Rights */
	selector: $('#ccij_outcome_ia_chr'),
	condition: function(questions) {
		return true;
	}
},{
	/* African Commission on Human and Peoples' Rights */
	selector: $('#ccij_outcome_acm_hpr'),
	depends: ['1', '2a', '2b', '3', '4', '8', '14a', '14b', '14c'],
	condition: function(q1, q2a, q2b, q3, q4, q8, q14a, q14b, q14c) {

		// condition 1 - check that a relevant country is selected
		var condition1 = false
		if(!q1.isAnswered() || q1.hasOneOfAnswers(Flow.config.lists.acmhrp.countries)) {
			condition1 = true;
		}
		if(q2a.hasAnswer('yes') && (!q2b.isAnswered() || q2b.hasOneOfAnswers(Flow.config.lists.acmhrp.countries))) {
			condition1 = true;
		}
		
		if(!condition1) {
			return false;
		}
		
		// condition 2 - check abuse date / end date against selected country/ies
		var condition2 = false;
		if (!q3.isAnswered() || (
			((q1.hasAnswer('Algeria') || q2b.hasAnswer('Algeria')) && q3.isAfterOrOnDate('1987/03/01')) ||
			((q1.hasAnswer('Angola') || q2b.hasAnswer('Angola')) && q3.isAfterOrOnDate('1990/03/02')) ||
			((q1.hasAnswer('Benin') || q2b.hasAnswer('Benin')) && q3.isAfterOrOnDate('1986/01/20')) ||
			((q1.hasAnswer('Botswana') || q2b.hasAnswer('Botswana')) && q3.isAfterOrOnDate('1986/07/17')) ||
			((q1.hasAnswer('Burkina Faso') || q2b.hasAnswer('Burkina Faso')) && q3.isAfterOrOnDate('1984/07/06')) ||
			((q1.hasAnswer('Burundi') || q2b.hasAnswer('Burundi')) && q3.isAfterOrOnDate('1989/07/28')) ||
			((q1.hasAnswer('Cameroon') || q2b.hasAnswer('Cameroon')) && q3.isAfterOrOnDate('1989/06/20')) ||
			((q1.hasAnswer('Central African Republic') || q2b.hasAnswer('Central African Republic')) && q3.isAfterOrOnDate('1986/04/26')) ||
			((q1.hasAnswer('Cape Verde') || q2b.hasAnswer('Cape Verde')) && q3.isAfterOrOnDate('1987/06/02')) ||
			((q1.hasAnswer('Chad') || q2b.hasAnswer('Chad')) && q3.isAfterOrOnDate('1986/10/09')) ||
			((q1.hasAnswer('Cote d\'Ivoire') || q2b.hasAnswer('Cote d\'Ivoire')) && q3.isAfterOrOnDate('1992/01/06')) ||
			((q1.hasAnswer('Comoros') || q2b.hasAnswer('Comoros')) && q3.isAfterOrOnDate('1986/06/01')) ||
			((q1.hasAnswer('Congo, Republic of the') || q2b.hasAnswer('Congo, Republic of the')) && q3.isAfterOrOnDate('1982/12/09')) ||
			((q1.hasAnswer('Djibouti') || q2b.hasAnswer('Djibouti')) && q3.isAfterOrOnDate('1991/11/11')) ||
			((q1.hasAnswer('Congo, Democratic Republic of the') || q2b.hasAnswer('Congo, Democratic Republic of the')) && q3.isAfterOrOnDate('1987/07/20')) ||
			((q1.hasAnswer('Egypt') || q2b.hasAnswer('Egypt')) && q3.isAfterOrOnDate('1984/03/20')) ||
			((q1.hasAnswer('Equatorial Guinea') || q2b.hasAnswer('Equatorial Guinea')) && q3.isAfterOrOnDate('1986/04/07')) ||
			((q1.hasAnswer('Eritrea') || q2b.hasAnswer('Eritrea')) && q3.isAfterOrOnDate('1999/01/14')) ||
			((q1.hasAnswer('Ethiopia') || q2b.hasAnswer('Ethiopia')) && q3.isAfterOrOnDate('1998/06/15')) ||
			((q1.hasAnswer('Gabon') || q2b.hasAnswer('Gabon')) && q3.isAfterOrOnDate('1986/02/20')) ||
			((q1.hasAnswer('Gambia, The') || q2b.hasAnswer('Gambia, The')) && q3.isAfterOrOnDate('1983/06/08')) ||
			((q1.hasAnswer('Ghana') || q2b.hasAnswer('Ghana')) && q3.isAfterOrOnDate('1989/01/24')) ||
			((q1.hasAnswer('Guinea-Bissau') || q2b.hasAnswer('Guinea-Bissau')) && q3.isAfterOrOnDate('1985/12/04')) ||
			((q1.hasAnswer('Guinea') || q2b.hasAnswer('Guinea')) && q3.isAfterOrOnDate('1982/02/16')) ||
			((q1.hasAnswer('Kenya') || q2b.hasAnswer('Kenya')) && q3.isAfterOrOnDate('1992/01/23')) ||
			((q1.hasAnswer('Libya') || q2b.hasAnswer('Libya')) && q3.isAfterOrOnDate('1986/07/19')) ||
			((q1.hasAnswer('Lesotho') || q2b.hasAnswer('Lesotho')) && q3.isAfterOrOnDate('1992/02/10')) ||
			((q1.hasAnswer('Liberia') || q2b.hasAnswer('Liberia')) && q3.isAfterOrOnDate('1982/08/04')) ||
			((q1.hasAnswer('Madagascar') || q2b.hasAnswer('Madagascar')) && q3.isAfterOrOnDate('1992/03/09')) ||
			((q1.hasAnswer('Mali') || q2b.hasAnswer('Mali')) && q3.isAfterOrOnDate('1981/12/21')) ||
			((q1.hasAnswer('Malawi') || q2b.hasAnswer('Malawi')) && q3.isAfterOrOnDate('1989/11/17')) ||
			((q1.hasAnswer('Mozambique') || q2b.hasAnswer('Mozambique')) && q3.isAfterOrOnDate('1989/02/22')) ||
			((q1.hasAnswer('Mauritania') || q2b.hasAnswer('Mauritania')) && q3.isAfterOrOnDate('1986/06/14')) ||
			((q1.hasAnswer('Mauritius') || q2b.hasAnswer('Mauritius')) && q3.isAfterOrOnDate('1992/06/19')) ||
			((q1.hasAnswer('Namibia') || q2b.hasAnswer('Namibia')) && q3.isAfterOrOnDate('1992/07/30')) ||
			((q1.hasAnswer('Nigeria') || q2b.hasAnswer('Nigeria')) && q3.isAfterOrOnDate('1983/06/22')) ||
			((q1.hasAnswer('Niger') || q2b.hasAnswer('Niger')) && q3.isAfterOrOnDate('1986/07/15')) ||
			((q1.hasAnswer('Rwanda') || q2b.hasAnswer('Rwanda')) && q3.isAfterOrOnDate('1983/07/15')) ||
			((q1.hasAnswer('South Africa') || q2b.hasAnswer('South Africa')) && q3.isAfterOrOnDate('1996-07-09')) ||
			((q1.hasAnswer('Sahrawi Arab Democratic Republic (Western Sahara)') || q2b.hasAnswer('Sahrawi Arab Democratic Republic (Western Sahara)')) && q3.isAfterOrOnDate('1986/05/02')) ||
			((q1.hasAnswer('Senegal') || q2b.hasAnswer('Senegal')) && q3.isAfterOrOnDate('1982/08/13')) ||
			((q1.hasAnswer('Seychelles') || q2b.hasAnswer('Seychelles')) && q3.isAfterOrOnDate('1992-04-13')) ||
			((q1.hasAnswer('Sierra Leone') || q2b.hasAnswer('Sierra Leone')) && q3.isAfterOrOnDate('1983/09/21')) ||
			((q1.hasAnswer('Somalia') || q2b.hasAnswer('Somalia')) && q3.isAfterOrOnDate('1985/07/31')) ||
			((q1.hasAnswer('Sao Tome and Principe') || q2b.hasAnswer('Sao Tome and Principe')) && q3.isAfterOrOnDate('1986/05/23')) ||
			((q1.hasAnswer('Sudan') || q2b.hasAnswer('Sudan')) && q3.isAfterOrOnDate('1986/02/18')) ||
			((q1.hasAnswer('Swaziland') || q2b.hasAnswer('Swaziland')) && q3.isAfterOrOnDate('1995/09/15')) ||
			((q1.hasAnswer('Tanzania') || q2b.hasAnswer('Tanzania')) && q3.isAfterOrOnDate('1984/02/18')) ||
			((q1.hasAnswer('Togo') || q2b.hasAnswer('Togo')) && q3.isAfterOrOnDate('1982/11/05')) ||
			((q1.hasAnswer('Tunisia') || q2b.hasAnswer('Tunisia')) && q3.isAfterOrOnDate('1983/03/16')) ||
			((q1.hasAnswer('Uganda') || q2b.hasAnswer('Uganda')) && q3.isAfterOrOnDate('1986/05/10')) ||
			((q1.hasAnswer('Zambia') || q2b.hasAnswer('Zambia')) && q3.isAfterOrOnDate('1984/01/10')) ||
			((q1.hasAnswer('Zimbabwe') || q2b.hasAnswer('Zimbabwe')) && q3.isAfterOrOnDate('1986/05/30'))
		)) {
			condition2 = true;
		}
		
		if(!condition2) {
			return false;
		}
		
		// condition 3 - check types of abuses committed
		var condition3 = (!q4.isAnswered() || q4.hasOneOfAnswers(['beating', 'bodily mutilation', 'burning', 'death threats', 'deprivation of medical care', 'electric shock', 'forced stress positions', 'forced nudity', 'forced to watch abuse of other prisoners', 'incomunicado detention', 'kicking', 'kidnapping/disappearance', 'killing', 'mock execution', 'prolonged exposure to extreme cold or heat', 'prolonged food/water deprivation', 'prolonged sleep deprivation', 'punching', 'rape or other sexual assault', 'severe mental suffering', 'solitary confinement', 'suffocation', 'waterboarding']));
		
		if(!condition3) {
			return false;
		}

		// condition 4 - check abuser for state actors
		var condition4 = (!q8.isAnswered() || q8.hasOneOfAnswers(['soldier in government\'s army', 'police officer', 'other government official']));

		if(!condition4) {
			return false;
		}
		
		// condition 5 - exhausting domestic remedies
		var condition5 = false;
		if(	(!q14a.isAnswered() || !q14a.hasAnswer('yes')) || 
			(q14a.hasAnswer('yes') && (!q14b.isAnswered() || (q14b.hasAnswer('yes') && (!q14c.isAnswered() || q14c.hasOneOfAnswers(['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'])))))
		) {
			condition5 = true;
		}
		
		if(!condition5) {
			return false;
		}

		// by this point all conditions must have passed
		return true;
	}
},{
	/* African Court on Human and Peoples' Rights */
	selector: $('#ccij_outcome_act_hpr'),
	condition: function(questions) {
		return true;
	}
},{
	/* Economic Community Of West African States (ECOWAS) */
	selector: $('#ccij_outcome_ecowas'),
	condition: function(questions) {
		return true;
	}
},{
	/* European Court of Human Rights */
	selector: $('#ccij_outcome_echr'),
	condition: function(questions) {
		return true;
	}
}];
