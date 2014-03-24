define(['jquery'], function($) {
	
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
	
	config.outcomes = [{
		/* International Criminal Court */
		selector: $('#ccij_outcome_icc'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee against Torture (CAT) */
		selector: $('#ccij_outcome_un_cat'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = ['Algeria', 'Andorra', 'Argentina', 'Australia', 'Austria', 'Azerbaijan', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria', 'Burundi', 'Cameroon', 'Canada', 'Chile', 'Costa Rica', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Ecuador', 'Finland', 'France', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Guinea-Bissau', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kazakhstan', 'Liechtenstein', 'Luxembourg', 'Malta', 'Mexico', 'Monaco', 'Montenegro', 'Morocco', 'Netherlands', 'New Zealand', 'Norway', 'Paraguay', 'Peru', 'Poland', 'Portugal', 'Qatar', 'South Korea', 'Moldova', 'Russia', 'Senegal', 'Serbia', 'Seychelles', 'Slovakia', 'Slovenia', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Togo', 'Tunisia', 'Turkey', 'Ukraine', 'Uruguay', 'Venezuela'];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			// check relevant country(ies) selected
			var condition1 = false;
			if(q1.isNotAnswered() || q1.hasOneOfAnswers(relevantCountries)) {
				condition1 = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasOneOfAnswers(relevantCountries))) {
				condition1 = true;
			}
			
			// exit if no relevant country(ies)
			if(!condition1) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			var condition2 = false;
			if (q3.isNotAnswered() || (
				((q1.hasAnswer('Algeria') || q2b.hasAnswer('Algeria')) && q3.isAfterOrOnDate('1989/09/12')) || 
				((q1.hasAnswer('Andorra') || q2b.hasAnswer('Andorra')) && q3.isAfterOrOnDate('2006/09/22')) || 
				((q1.hasAnswer('Argentina') || q2b.hasAnswer('Argentina')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Australia') || q2b.hasAnswer('Australia')) && q3.isAfterOrOnDate('1989/08/08')) || 
				((q1.hasAnswer('Austria') || q2b.hasAnswer('Austria')) && q3.isAfterOrOnDate('1987/07/29')) || 
				((q1.hasAnswer('Azerbaijan') || q2b.hasAnswer('Azerbaijan')) && q3.isAfterOrOnDate('1996/08/16')) || 
				((q1.hasAnswer('Belgium') || q2b.hasAnswer('Belgium')) && q3.isAfterOrOnDate('1999/06/25')) || 
				((q1.hasAnswer('Bolivia') || q2b.hasAnswer('Bolivia')) && q3.isAfterOrOnDate('1999/04/12')) || 
				((q1.hasAnswer('Bosnia and Herzegovina') || q2b.hasAnswer('Bosnia and Herzegovina')) && q3.isAfterOrOnDate('1993/09/01')) || 
				((q1.hasAnswer('Brazil') || q2b.hasAnswer('Brazil')) && q3.isAfterOrOnDate('1989/09/28')) || 
				((q1.hasAnswer('Bulgaria') || q2b.hasAnswer('Bulgaria')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Burundi') || q2b.hasAnswer('Burundi')) && q3.isAfterOrOnDate('1993/02/18')) || 
				((q1.hasAnswer('Cameroon') || q2b.hasAnswer('Cameroon')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Canada') || q2b.hasAnswer('Canada')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Chile') || q2b.hasAnswer('Chile')) && q3.isAfterOrOnDate('1988/09/30')) || 
				((q1.hasAnswer('Costa Rica') || q2b.hasAnswer('Costa Rica')) && q3.isAfterOrOnDate('1993/11/11')) || 
				((q1.hasAnswer('Croatia') || q2b.hasAnswer('Croatia')) && q3.isAfterOrOnDate('1992/10/12')) || 
				((q1.hasAnswer('Cyprus') || q2b.hasAnswer('Cyprus')) && q3.isAfterOrOnDate('1991/07/18')) || 
				((q1.hasAnswer('Czech Republic') || q2b.hasAnswer('Czech Republic')) && q3.isAfterOrOnDate('1993/02/22')) || 
				((q1.hasAnswer('Denmark') || q2b.hasAnswer('Denmark')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Ecuador') || q2b.hasAnswer('Ecuador')) && q3.isAfterOrOnDate('1988/03/30')) || 
				((q1.hasAnswer('Finland') || q2b.hasAnswer('Finland')) && q3.isAfterOrOnDate('1989/08/30')) || 
				((q1.hasAnswer('France') || q2b.hasAnswer('France')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Georgia') || q2b.hasAnswer('Georgia')) && q3.isAfterOrOnDate('1994/10/26')) || 
				((q1.hasAnswer('Germany') || q2b.hasAnswer('Germany')) && q3.isAfterOrOnDate('1990/10/01')) || 
				((q1.hasAnswer('Ghana') || q2b.hasAnswer('Ghana')) && q3.isAfterOrOnDate('2000/09/07')) || 
				((q1.hasAnswer('Greece') || q2b.hasAnswer('Greece')) && q3.isAfterOrOnDate('1988/10/06')) || 
				((q1.hasAnswer('Guatemala') || q2b.hasAnswer('Guatemala')) && q3.isAfterOrOnDate('1990/01/05')) || 
				((q1.hasAnswer('Guinea-Bissau') || q2b.hasAnswer('Guinea-Bissau')) && q3.isAfterOrOnDate('2013/09/24')) || 
				((q1.hasAnswer('Hungary') || q2b.hasAnswer('Hungary')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Iceland') || q2b.hasAnswer('Iceland')) && q3.isAfterOrOnDate('1996/10/23')) ||	
				((q1.hasAnswer('Ireland') || q2b.hasAnswer('Ireland')) && q3.isAfterOrOnDate('2002/04/11')) || 
				((q1.hasAnswer('Italy') || q2b.hasAnswer('Italy')) && q3.isAfterOrOnDate('1989/01/12')) || 
				((q1.hasAnswer('Kazakhstan') || q2b.hasAnswer('Kazakhstan')) && q3.isAfterOrOnDate('1998/08/26')) || 
				((q1.hasAnswer('Liechtenstein') || q2b.hasAnswer('Liechtenstein')) && q3.isAfterOrOnDate('1990/09/02')) || 
				((q1.hasAnswer('Luxembourg') || q2b.hasAnswer('Luxembourg')) && q3.isAfterOrOnDate('1987/09/29')) || 
				((q1.hasAnswer('Malta') || q2b.hasAnswer('Malta')) && q3.isAfterOrOnDate('1990/09/13')) || 
				((q1.hasAnswer('Mexico') || q2b.hasAnswer('Mexico')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Monaco') || q2b.hasAnswer('Monaco')) && q3.isAfterOrOnDate('1991/12/06')) || 
				((q1.hasAnswer('Montenegro') || q2b.hasAnswer('Montenegro')) && q3.isAfterOrOnDate('2006/10/23')) || 
				((q1.hasAnswer('Morocco') || q2b.hasAnswer('Morocco')) && q3.isAfterOrOnDate('1993/06/21')) || 
				((q1.hasAnswer('Netherlands') || q2b.hasAnswer('Netherlands')) && q3.isAfterOrOnDate('1988/12/21')) || 
				((q1.hasAnswer('New Zealand') || q2b.hasAnswer('New Zealand')) && q3.isAfterOrOnDate('1989/12/10')) || 
				((q1.hasAnswer('Norway') || q2b.hasAnswer('Norway')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Paraguay') || q2b.hasAnswer('Paraguay')) && q3.isAfterOrOnDate('1990/03/12')) || 
				((q1.hasAnswer('Peru') || q2b.hasAnswer('Peru')) && q3.isAfterOrOnDate('1988/07/07')) || 
				((q1.hasAnswer('Poland') || q2b.hasAnswer('Poland')) && q3.isAfterOrOnDate('1989/06/26')) || 
				((q1.hasAnswer('Portugal') || q2b.hasAnswer('Portugal')) && q3.isAfterOrOnDate('1989/02/09')) || 
				((q1.hasAnswer('Qatar') || q2b.hasAnswer('Qatar')) && q3.isAfterOrOnDate('2012/03/14')) || 
				((q1.hasAnswer('South Korea') || q2b.hasAnswer('South Korea')) && q3.isAfterOrOnDate('1995/01/09')) || 
				((q1.hasAnswer('Moldova') || q2b.hasAnswer('Moldova')) && q3.isAfterOrOnDate('1995/11/28')) || 
				((q1.hasAnswer('Russia') || q2b.hasAnswer('Russia')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Senegal') || q2b.hasAnswer('Senegal')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Serbia') || q2b.hasAnswer('Serbia')) && q3.isAfterOrOnDate('2001/03/12')) || 
				((q1.hasAnswer('Seychelles') || q2b.hasAnswer('Seychelles')) && q3.isAfterOrOnDate('1992/05/05')) || 
				((q1.hasAnswer('Slovakia') || q2b.hasAnswer('Slovakia')) && q3.isAfterOrOnDate('1993/05/28')) || 
				((q1.hasAnswer('Slovenia') || q2b.hasAnswer('Slovenia')) && q3.isAfterOrOnDate('1993/07/16')) || 
				((q1.hasAnswer('South Africa') || q2b.hasAnswer('South Africa')) && q3.isAfterOrOnDate('1998/12/10')) || 
				((q1.hasAnswer('Spain') || q2b.hasAnswer('Spain')) && q3.isAfterOrOnDate('1987/10/21')) || 
				((q1.hasAnswer('Sweden') || q2b.hasAnswer('Sweden')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Switzerland') || q2b.hasAnswer('Switzerland')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Togo') || q2b.hasAnswer('Togo')) && q3.isAfterOrOnDate('1987/11/18')) || 
				((q1.hasAnswer('Tunisia') || q2b.hasAnswer('Tunisia')) && q3.isAfterOrOnDate('1988/09/23')) || 
				((q1.hasAnswer('Turkey') || q2b.hasAnswer('Turkey')) && q3.isAfterOrOnDate('1988/08/02')) || 
				((q1.hasAnswer('Ukraine') || q2b.hasAnswer('Ukraine')) && q3.isAfterOrOnDate('2003/09/12')) || 
				((q1.hasAnswer('Uruguay') || q2b.hasAnswer('Uruguay')) && q3.isAfterOrOnDate('1987/06/26')) || 
				((q1.hasAnswer('Venezuela') || q2b.hasAnswer('Venezuela')) && q3.isAfterOrOnDate('1991/07/29'))
			)) {
				condition2 = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!condition2) {
				return false;
			} 
			
			// check for covered abuses
			var condition3 = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!condition3) {
				return false;
			}

			// check for covered abusers
			var condition4 = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!condition4) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			var condition5 = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				condition5 = true;
			}
			// exit if domestic remedy reached a particular outcome	
			if(!condition5) {
				return false;
			}
			
			// check whether other international remedies sought
			var condition6 = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!condition6) {
				return false;
			}
			
			// check against statute of limitations
			var condition7 = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(10)) {
				condition7 = true;
			}
			// exit if abuse too long ago
			if(!condition7) {
				return false;
			}
				
			return true;
		}
	},{
		/* U.N. Human Rights Committee */
		selector: $('#ccij_outcome_un_hrc'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee on the Elimination of Racial Discrimination (CERD) */
		selector: $('#ccij_outcome_un_cerd'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee on Elimination of Discrimination against Women (CEDAW) */
		selector: $('#ccij_outcome_un_cedaw'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee on Enforced Disappearances (CED) */
		selector: $('#ccij_outcome_un_ced'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee on Economic, Social and Cultural Rights (CESCR) */
		selector: $('#ccij_outcome_un_cescr'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Committee on the Rights of the Child (CRC) */
		selector: $('#ccij_outcome_un_crc'),
		condition: function(q1) {
			return true;
		}
	},{
		/* U.N. Working Group on Enforced Disappearances (WGEID) */
		selector: $('#ccij_outcome_un_wgeid'),
		condition: function(q1) {
			return true;
		}
	},{
		/* Inter-American Commission of Human Rights */
		selector: $('#ccij_outcome_ia_chr'),
		condition: function(q1) {
			return true;
		}
	},{
		/* African Commission on Human and Peoples' Rights */
		selector: $('#ccij_outcome_acm_hpr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Central African Republic', 'Cape Verde', 'Chad', "Cote d'Ivoire", 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia, The', 'Ghana', 'Guinea-Bissau', 'Guinea', 'Kenya', 'Libya', 'Lesotho', 'Liberia', 'Madagascar', 'Mali', 'Malawi', 'Mozambique', 'Mauritania', 'Mauritius', 'Namibia', 'Nigeria', 'Niger', 'Rwanda', 'South Africa', 'Sahrawi Arab Democratic Republic (Western Sahara)', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'Sao Tome and Principe', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];

			// check relevant country(ies) selected
			var condition1 = false;
			if(q1.isNotAnswered() || q1.hasOneOfAnswers(relevantCountries)) {
				condition1 = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasOneOfAnswers(relevantCountries))) {
				condition1 = true;
			}
			
			// exit if no relevant country(ies)
			if(!condition1) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			var condition2 = false;
			if (q3.isNotAnswered() || (
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
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!condition2) {
				return false;
			}
			
			// check for covered abuses
			var condition3 = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!condition3) {
				return false;
			}

			// check for covered abusers
			var condition4 = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!condition4) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			var condition5 = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				condition5 = true;
			}
			// exit if domestic remedy reached a particular outcome
			if(!condition5) {
				return false;
			}
			
			// check whether other international remedies sought
			var condition6 = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!condition6) {
				return false;
			}
			
			// check against statute of limitations
			var condition7 = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(10)) {
				condition7 = true;
			}
			// exit if abuse too long ago
			if(!condition7) {
				return false;
			}

			return true;
		}
	},{
		/* Economic Community Of West African States (ECOWAS) */
		selector: $('#ccij_outcome_ecowas'),
		condition: function(q1) {
			return true;
		}
	},{
		/* European Court of Human Rights */
		selector: $('#ccij_outcome_echr'),
		condition: function(q1, q2a, q2b, q3, q6, q10, q14a, q14b, q14c, q15) {
			
			var relevantCountries = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belgium', 'Bosnia and Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Enslavement', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ['Other government official', 'Police officer', "Soldier in government's army"];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			// check relevant country(ies) selected
			var condition1 = false;
			if(q1.isNotAnswered() || q1.hasOneOfAnswers(relevantCountries)) {
				condition1 = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasOneOfAnswers(relevantCountries))) {
				condition1 = true;
			}
			
			// exit if no relevant country(ies)
			if(!condition1) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			var condition2 = false;
			if (q3.isNotAnswered() || (
				((q1.hasAnswer('Albania') || q2b.hasAnswer('Albania')) && q3.isAfterOrOnDate('1996/10/02')) || 
				((q1.hasAnswer('Andorra') || q2b.hasAnswer('Andorra')) && q3.isAfterOrOnDate('1996/07/22')) || 
				((q1.hasAnswer('Armenia') || q2b.hasAnswer('Armenia')) && q3.isAfterOrOnDate('1996/04/26')) || 
				((q1.hasAnswer('Austria') || q2b.hasAnswer('Austria')) && q3.isAfterOrOnDate('1958/09/03')) || 
				((q1.hasAnswer('Azerbaijan') || q2b.hasAnswer('Azerbaijan')) && q3.isAfterOrOnDate('2002/04/15')) || 
				((q1.hasAnswer('Belgium') || q2b.hasAnswer('Belgium')) && q3.isAfterOrOnDate('1956/06/14')) || 
				((q1.hasAnswer('Bosnia and Herzegovina') || q2b.hasAnswer('Bosnia and Herzegovina')) && q3.isAfterOrOnDate('2002/07/12')) || 
				((q1.hasAnswer('Bulgaria') || q2b.hasAnswer('Bulgaria')) && q3.isAfterOrOnDate('1992/09/07')) || 
				((q1.hasAnswer('Croatia') || q2b.hasAnswer('Croatia')) && q3.isAfterOrOnDate('1997/11/05')) || 
				((q1.hasAnswer('Cyprus') || q2b.hasAnswer('Cyprus')) && q3.isAfterOrOnDate('1962/10/06')) || 
				((q1.hasAnswer('Czech Republic') || q2b.hasAnswer('Czech Republic')) && q3.isAfterOrOnDate('1992/03/18')) || 
				((q1.hasAnswer('Denmark') || q2b.hasAnswer('Denmark')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Estonia') || q2b.hasAnswer('Estonia')) && q3.isAfterOrOnDate('1996/04/16')) ||
				((q1.hasAnswer('Finland') || q2b.hasAnswer('Finland')) && q3.isAfterOrOnDate('1990/05/10')) ||
				((q1.hasAnswer('France') || q2b.hasAnswer('France')) && q3.isAfterOrOnDate('1974/05/03')) ||
				((q1.hasAnswer('Georgia') || q2b.hasAnswer('Georgia')) && q3.isAfterOrOnDate('1999/05/20')) ||
				((q1.hasAnswer('Germany') || q2b.hasAnswer('Germany')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Greece') || q2b.hasAnswer('Greece')) && q3.isAfterOrOnDate('1974/11/28')) ||
				((q1.hasAnswer('Hungary') || q2b.hasAnswer('Hungary ')) && q3.isAfterOrOnDate('1992/11/05')) ||
				((q1.hasAnswer('Iceland') || q2b.hasAnswer('Iceland')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Ireland') || q2b.hasAnswer('Ireland')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Italy') || q2b.hasAnswer('Italy')) && q3.isAfterOrOnDate('1955/10/26')) ||
				((q1.hasAnswer('Latvia') || q2b.hasAnswer('Latvia')) && q3.isAfterOrOnDate('1997/06/27')) ||
				((q1.hasAnswer('Liechtenstein') || q2b.hasAnswer('Liechtenstein')) && q3.isAfterOrOnDate('1992/09/08')) ||
				((q1.hasAnswer('Lithuania') || q2b.hasAnswer('Lithuania')) && q3.isAfterOrOnDate('1995/06/20')) ||
				((q1.hasAnswer('Luxembourg') || q2b.hasAnswer('Luxembourg ')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Macedonia') || q2b.hasAnswer('Macedonia')) && q3.isAfterOrOnDate('1997/04/10')) ||
				((q1.hasAnswer('Malta') || q2b.hasAnswer('Malta')) && q3.isAfterOrOnDate('1967/01/23')) ||
				((q1.hasAnswer('Moldova') || q2b.hasAnswer('Moldova')) && q3.isAfterOrOnDate('1997/09/12')) ||
				((q1.hasAnswer('Monaco') || q2b.hasAnswer('Monaco')) && q3.isAfterOrOnDate('2005/11/30')) ||
				((q1.hasAnswer('Montenegro') || q2b.hasAnswer('Montenegro')) && q3.isAfterOrOnDate('2006/06/06')) ||
				((q1.hasAnswer('Netherlands') || q2b.hasAnswer('Netherlands')) && q3.isAfterOrOnDate('1954/08/31')) ||
				((q1.hasAnswer('Norway') || q2b.hasAnswer('Norway ')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Poland') || q2b.hasAnswer('Poland')) && q3.isAfterOrOnDate('1993/01/19')) ||
				((q1.hasAnswer('Portugal') || q2b.hasAnswer('Portugal')) && q3.isAfterOrOnDate('1978/11/09')) ||
				((q1.hasAnswer('Romania') || q2b.hasAnswer('Romania')) && q3.isAfterOrOnDate('1994/06/20')) ||
				((q1.hasAnswer('Russia') || q2b.hasAnswer('Russia')) && q3.isAfterOrOnDate('1998/05/05')) ||
				((q1.hasAnswer('San Marino') || q2b.hasAnswer('San Marino')) && q3.isAfterOrOnDate('1989/03/22')) ||
				((q1.hasAnswer('Serbia') || q2b.hasAnswer('Serbia')) && q3.isAfterOrOnDate('2004/03/03')) ||
				((q1.hasAnswer('Slovakia') || q2b.hasAnswer('Slovakia')) && q3.isAfterOrOnDate('1993/01/01')) ||
				((q1.hasAnswer('Slovenia') || q2b.hasAnswer('Slovenia')) && q3.isAfterOrOnDate('1994/06/28')) ||
				((q1.hasAnswer('Spain') || q2b.hasAnswer('Spain')) && q3.isAfterOrOnDate('1979/10/04')) ||
				((q1.hasAnswer('Sweden') || q2b.hasAnswer('Sweden')) && q3.isAfterOrOnDate('1953/09/03')) ||
				((q1.hasAnswer('Switzerland') || q2b.hasAnswer('Switzerland')) && q3.isAfterOrOnDate('1974/11/28')) ||
				((q1.hasAnswer('Turkey') || q2b.hasAnswer('Turkey')) && q3.isAfterOrOnDate('1954/05/18')) ||
				((q1.hasAnswer('Ukraine') || q2b.hasAnswer('Ukraine')) && q3.isAfterOrOnDate('1997/09/11')) ||
				((q1.hasAnswer('United Kingdom') || q2b.hasAnswer('United Kingdom')) && q3.isAfterOrOnDate('1953/09/03'))
			)) {
				condition2 = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!condition2) {
				return false;
			} 
			
			// check for covered abuses
			var condition3 = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!condition3) {
				return false;
			}

			// check for covered abusers
			var condition4 = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!condition4) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			var condition5 = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				condition5 = true;
			}
			// exit if domestic remedy reached a particular outcome	
			if(!condition5) {
				return false;
			}
			
			// check whether other international remedies sought
			var condition6 = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!condition6) {
				return false;
			}
			
			return true;
		}
	},{
		/* Extraordinary Chambers for Cambodia */
		selector: $('#ccij_outcome_eccc'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10) {
			
			var relevantCountries = ['Cambodia'];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes', 'Unknown'];

			// check relevant country(ies) selected
			var condition1 = false;
			if(q1.isNotAnswered() || q1.hasOneOfAnswers(relevantCountries)) {
				condition1 = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasOneOfAnswers(relevantCountries))) {
				condition1 = true;
			}
			
			// exit if no relevant country(ies)
			if(!condition1) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			var condition2 = false;
			if (q3.isNotAnswered() || (
				(q1.hasAnswer('Cambodia') || q2b.hasAnswer('Cambodia')) && q3.isBetweenDates('1975/04/17', '1979/01/06'))) {
				condition2 = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!condition2) {
				return false;
			}
			
			// check for covered abuses
			var condition3 = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!condition3) {
				return false;
			}
			
			// check scenario in which abuse occurred. Only a no in 7, 8, or 9 will rule out ECCC. Unanswered, yes, or unknown will keep it in
			var condition4 = true;
			if(q7.hasAnswer('No') && q8.hasAnswer('No') && q9.hasAnswer('No')) {
				condition4 = false;
			}
			// exit if no relevant scenario
			if(!condition4) {
				return false;
			}
			
			// check for covered abusers
			var condition5 = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!condition5) {
				return false;
			}
			
			// check against statute of limitations
			var condition6 = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(40)) {
				condition6 = true;
			}
			// exit if abuse too long ago
			if(!condition6) {
				return false;
			}

			return true;
		}
	},{
		/* War Crimes Chamber of the Court of Bosnia and Herzegovina */
		selector: $('#ccij_outcome_bosnia'),
		condition: function(q1) {
			return true;
		}
	},{
		/* Criminal Prosecution in Canada */
		selector: $('#ccij_outcome_crim_pro_can'),
		condition: function(q1) {
			return true;
		}
	},{
		/* Civil lawsuit in Canada */
		selector: $('#ccij_outcome_civ_law_can'),
		condition: function(q1) {
			return true;
		}
	},{
		/* Immigration penalties in Canada */
		selector: $('#ccij_outcome_imm_pen_can'),
		condition: function(q1) {
			return true;
		}
	}];

	return config;
});
