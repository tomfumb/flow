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
			
			var relevantCountries = [
				{country: "Algeria", date: "1989/09/12"},
				{country: "Andorra", date: "2006/09/22"},
				{country: "Argentina", date: "1987/06/26"},
				{country: "Australia", date: "1989/08/08"},
				{country: "Austria", date: "1987/07/29"},
				{country: "Azerbaijan", date: "1996/08/16"},
				{country: "Belgium", date: "1999/06/25"},
				{country: "Bolivia", date: "1999/04/12"},
				{country: "Bosnia and Herzegovina", date: "1993/09/01"},
				{country: "Brazil", date: "1989/09/28"},
				{country: "Bulgaria", date: "1987/06/26"},
				{country: "Burundi", date: "1993/02/18"},
				{country: "Cameroon", date: "1987/06/26"},
				{country: "Canada", date: "1987/06/26"},
				{country: "Chile", date: "1988/09/30"},
				{country: "Costa Rica", date: "1993/11/11"},
				{country: "Croatia", date: "1992/10/12"},
				{country: "Cyprus", date: "1991/07/18"},
				{country: "Czech Republic", date: "1993/02/22"},
				{country: "Denmark", date: "1987/06/26"},
				{country: "Ecuador", date: "1988/03/30"},
				{country: "Finland", date: "1989/08/30"},
				{country: "France", date: "1987/06/26"},
				{country: "Georgia", date: "1994/10/26"},
				{country: "Germany", date: "1990/10/01"},
				{country: "Ghana", date: "2000/09/07"},
				{country: "Greece", date: "1988/10/06"},
				{country: "Guatemala", date: "1990/01/05"},
				{country: "Guinea-Bissau", date: "2013/09/24"},
				{country: "Hungary", date: "1987/06/26"},
				{country: "Iceland", date: "1996/10/23"},
				{country: "Ireland", date: "2002/04/11"},
				{country: "Italy", date: "1989/01/12"},
				{country: "Kazakhstan", date: "1998/08/26"},
				{country: "Liechtenstein", date: "1990/11/02"},
				{country: "Luxembourg", date: "1987/09/29"},
				{country: "Malta", date: "1990/09/13"},
				{country: "Mexico", date: "1987/06/26"},
				{country: "Monaco", date: "1991/12/06"},
				{country: "Montenegro", date: "2006/10/23"},
				{country: "Morocco", date: "1993/06/21"},
				{country: "Netherlands", date: "1988/12/21"},
				{country: "New Zealand", date: "1989/12/10"},
				{country: "Norway", date: "1987/06/26"},
				{country: "Paraguay", date: "1990/03/12"},
				{country: "Peru", date: "1988/07/07"},
				{country: "Poland", date: "1989/07/26"},
				{country: "Portugal", date: "1989/02/09"},
				{country: "Qatar", date: "2012/03/14"},
				{country: "South Korea", date: "1995/01/09"},
				{country: "Moldova", date: "1995/11/28"},
				{country: "Russia", date: "1987/06/26"},
				{country: "Senegal", date: "1987/06/26"},
				{country: "Serbia", date: "2001/03/12"},
				{country: "Seychelles", date: "1992/05/05"},
				{country: "Slovakia", date: "1993/05/28"},
				{country: "Slovenia", date: "1993/07/16"},
				{country: "South Africa", date: "1998/12/10"},
				{country: "Spain", date: "1987/10/21"},
				{country: "Sweden", date: "1987/06/26"},
				{country: "Switzerland", date: "1987/06/26"},
				{country: "Togo", date: "1987/11/18"},
				{country: "Tunisia", date: "1988/09/23"},
				{country: "Turkey", date: "1988/08/02"},
				{country: "Ukraine", date: "2003/09/12"},
				{country: "Uruguay", date: "1987/06/26"},
				{country: "Venezuela", date: "1991/07/29"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			var proceed;
			
			// check relevant country(ies) selected
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			
			// exit if no relevant country(ies)
			if(!proceed) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			proceed = false;
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				q3.isNotAnswered() ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			} 
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			proceed = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				proceed = true;
			}
			// exit if domestic remedy reached a particular outcome	
			if(!proceed) {
				return false;
			}
			
			// check whether other international remedies sought
			proceed = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!proceed) {
				return false;
			}
			
			// check against statute of limitations
			proceed = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(10)) {
				proceed = true;
			}
			// exit if abuse too long ago
			if(!proceed) {
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
			
			var relevantCountries = [
				{country: "Algeria", date: "1987/03/01"},
				{country: "Angola", date: "1990/03/02"},
				{country: "Benin", date: "1986/01/20"},
				{country: "Botswana", date: "1986/07/17"},
				{country: "Burkina Faso", date: "1984/07/06"},
				{country: "Burundi", date: "1989/07/28"},
				{country: "Cameroon", date: "1989/06/20"},
				{country: "Central African Republic", date: "1986/04/26"},
				{country: "Cape Verde", date: "1987/06/02"},
				{country: "Chad", date: "1986/10/09"},
				{country: "Cote d'Ivoire", date: "1992/01/06"},
				{country: "Comoros", date: "1986/06/01"},
				{country: "Congo, Republic of the", date: "1982/12/09"},
				{country: "Djibouti", date: "1991/11/11"},
				{country: "Congo, Democratic Republic of the", date: "1987/07/20"},
				{country: "Egypt", date: "1984/03/20"},
				{country: "Equatorial Guinea", date: "1986/04/07"},
				{country: "Eritrea", date: "1999/01/14"},
				{country: "Ethiopia", date: "1998/06/15"},
				{country: "Gabon", date: "1986/02/20"},
				{country: "Gambia, The", date: "1983/06/08"},
				{country: "Ghana", date: "1989/01/24"},
				{country: "Guinea-Bissau", date: "1985/12/04"},
				{country: "Guinea", date: "1982/02/16"},
				{country: "Kenya", date: "1992/01/23"},
				{country: "Libya", date: "1986/07/19"},
				{country: "Lesotho", date: "1992/02/10"},
				{country: "Liberia", date: "1982/08/04"},
				{country: "Madagascar", date: "1992/03/09"},
				{country: "Mali", date: "1981/12/21"},
				{country: "Malawi", date: "1989/11/17"},
				{country: "Mozambique", date: "1989/02/22"},
				{country: "Mauritania", date: "1986/06/14"},
				{country: "Mauritius", date: "1992/06/19"},
				{country: "Namibia", date: "1992/07/30"},
				{country: "Nigeria", date: "1983/06/22"},
				{country: "Niger", date: "1986/07/15"},
				{country: "Rwanda", date: "1983/07/15"},
				{country: "South Africa", date: "1996/07/09"},
				{country: "Sahrawi Arab Democratic Republic (Western Sahara)", date: "1986/05/02"},
				{country: "Senegal", date: "1982/08/13"},
				{country: "Seychelles", date: "1992/04/13"},
				{country: "Sierra Leone", date: "1983/09/21"},
				{country: "Somalia", date: "1985/07/31"},
				{country: "Sao Tome and Principe", date: "1986/05/23"},
				{country: "Sudan", date: "1986/02/18"},
				{country: "Swaziland", date: "1995/09/15"},
				{country: "Tanzania", date: "1984/02/18"},
				{country: "Togo", date: "1982/11/05"},
				{country: "Tunisia", date: "1983/03/16"},
				{country: "Uganda", date: "1986/05/10"},
				{country: "Zambia", date: "1984/01/10"},
				{country: "Zimbabwe", date: "1986/05/30"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official'];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			var proceed;

			// check relevant country(ies) selected
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			
			// exit if no relevant country(ies)
			if(!proceed) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			proceed = false;
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				q3.isNotAnswered() ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			}
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			proceed = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				proceed = true;
			}
			// exit if domestic remedy reached a particular outcome
			if(!proceed) {
				return false;
			}
			
			// check whether other international remedies sought
			proceed = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!proceed) {
				return false;
			}
			
			// check against statute of limitations
			proceed = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(10)) {
				proceed = true;
			}
			// exit if abuse too long ago
			if(!proceed) {
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
			
			var relevantCountries = [
				{country: "Albania", date: "1996/10/02"},
				{country: "Andorra", date: "1996/07/22"},
				{country: "Armenia", date: "1996/04/26"},
				{country: "Austria", date: "1958/09/03"},
				{country: "Azerbaijan", date: "2002/04/15"},
				{country: "Belgium", date: "1956/06/14"},
				{country: "Bosnia and Herzegovina", date: "2002/07/12"},
				{country: "Bulgaria", date: "1992/09/07"},
				{country: "Croatia", date: "1997/11/05"},
				{country: "Cyprus", date: "1962/10/06"},
				{country: "Czech Republic", date: "1992/03/18"},
				{country: "Denmark", date: "1953/09/03"},
				{country: "Estonia", date: "1996/04/16"},
				{country: "Finland", date: "1990/05/10"},
				{country: "France", date: "1974/05/03"},
				{country: "Georgia", date: "1999/05/20"},
				{country: "Germany", date: "1953/09/03"},
				{country: "Greece", date: "1974/11/28"},
				{country: "Hungary", date: "1992/11/05"},
				{country: "Iceland", date: "1953/09/03"},
				{country: "Ireland", date: "1953/09/03"},
				{country: "Italy", date: "1955/10/26"},
				{country: "Latvia", date: "1997/06/27"},
				{country: "Liechtenstein", date: "1992/09/08"},
				{country: "Lithuania", date: "1995/06/20"},
				{country: "Luxembourg", date: "1953/09/03"},
				{country: "Macedonia", date: "1997/04/10"},
				{country: "Malta", date: "1967/01/23"},
				{country: "Moldova", date: "1997/09/12"},
				{country: "Monaco", date: "2005/11/30"},
				{country: "Montenegro", date: "2006/06/06"},
				{country: "Netherlands", date: "1954/08/31"},
				{country: "Norway", date: "1953/09/03"},
				{country: "Poland", date: "1993/01/19"},
				{country: "Portugal", date: "1978/11/09"},
				{country: "Romania", date: "1994/06/20"},
				{country: "Russia", date: "1998/05/05"},
				{country: "San Marino", date: "1989/03/22"},
				{country: "Serbia", date: "2004/03/03"},
				{country: "Slovakia", date: "1993/01/01"},
				{country: "Slovenia", date: "1994/06/28"},
				{country: "Spain", date: "1979/10/04"},
				{country: "Sweden", date: "1953/09/03"},
				{country: "Switzerland", date: "1974/11/28"},
				{country: "Turkey", date: "1954/05/18"},
				{country: "Ukraine", date: "1997/09/11"},
				{country: "United Kingdom", date: "1953/09/03"}
			];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Death threats', 'Deprivation of medical care', 'Electric shock', 'Enslavement', 'Forced stress positions', 'Forced nudity', 'Forced to watch abuse of other prisoners', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Severe mental suffering', 'Solitary confinement', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ['Other government official', 'Police officer', "Soldier in government's army"];
			
			var relevantActionOutcomes = ['Investigation or prosecution still ongoing', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'];
			
			var proceed;
			
			// check relevant country(ies) selected
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			
			// exit if no relevant country(ies)
			if(!proceed) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			proceed = false;
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				q3.isNotAnswered() ||
				(q1.isAnswered() && q1Dates && q3.isAfterOrOnDate(q1Dates)) ||
				(q2b.isAnswered() && q2bDates && q3.isAfterOrOnDate(q2bDates))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			} 
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}

			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check whether domestic remedies exhausted
			proceed = false;
			if(
				(q14a.isUnknownOrNotAnswered() || q14a.hasAnswer('No')) ||
				(q14a.hasAnswer('Yes') && q14b.isUnknownOrNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.isNotAnswered()) ||
				(q14a.hasAnswer('Yes') && q14b.hasAnswer('Yes') && q14c.doesNotHaveOneOfAnswers(relevantActionOutcomes))) {
				proceed = true;
			}
			// exit if domestic remedy reached a particular outcome	
			if(!proceed) {
				return false;
			}
			
			// check whether other international remedies sought
			proceed = q15.doesNotHaveAnswer('Yes');
			// exit if another remedy sought
			if(!proceed) {
				return false;
			}
			
			return true;
		}
	},{
		/* Extraordinary Chambers for Cambodia */
		selector: $('#ccij_outcome_eccc'),
		condition: function(q1, q2a, q2b, q3, q6, q7, q8, q9, q10) {
			
			var relevantCountries = [{country: "Cambodia", date: ["1975/04/17", "1979/01/06"]}];
			
			var relevantAbuses = ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'];
			
			var relevantAbusers = ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes', 'Unknown'];

			var proceed;

			// check relevant country(ies) selected
			proceed = false;
			if(q1.isNotAnswered() || q1.hasCountry(relevantCountries)) {
				proceed = true;
			}
			if(q2a.hasAnswer('Yes') && (q2b.hasCountry(relevantCountries))) {
				proceed = true;
			}
			
			// exit if no relevant country(ies)
			if(!proceed) {
				return false;
			}
			
			// check abuse date / end date against selected country(ies)
			proceed = false;
			var q1Dates = q1.relevantDatesForSelectedCountry(relevantCountries), q2bDates = q2b.relevantDatesForSelectedCountry(relevantCountries);
			if (
				q3.isNotAnswered() ||
				(q1.isAnswered() && q1Dates && q3.isBetweenDates(q1Dates, q1Dates, 0, 1)) ||
				(q2b.isAnswered() && q2bDates && q3.isBetweenDates(q2bDates, q2bDates, 0, 1))) {
				proceed = true;
			}
			
			// exit if country(ies) not covered by mechanism on the entered date
			if(!proceed) {
				return false;
			}
			
			// check for covered abuses
			proceed = (q6.isNotAnswered() || q6.hasOneOfAnswers(relevantAbuses));
			// exit if no relevant abuses
			if(!proceed) {
				return false;
			}
			
			// check scenario in which abuse occurred. Only a no in 7, 8, or 9 will rule out ECCC. Unanswered, yes, or unknown will keep it in
			proceed = true;
			if(q7.hasAnswer('No') && q8.hasAnswer('No') && q9.hasAnswer('No')) {
				proceed = false;
			}
			// exit if no relevant scenario
			if(!proceed) {
				return false;
			}
			
			// check for covered abusers
			proceed = (q10.isUnknownOrNotAnswered() || q10.hasOneOfAnswers(relevantAbusers));
			// exit if no relevant abusers
			if(!proceed) {
				return false;
			}
			
			// check against statute of limitations
			proceed = false;
			if(q3.isNotAnswered() || q3.isWithinYearsAgo(40)) {
				proceed = true;
			}
			// exit if abuse too long ago
			if(!proceed) {
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
