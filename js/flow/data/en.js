define(['jquery', 'data/ac-hpr', 'data/civil-canada', 'data/crim-canada', 'data/eccc', 'data/echr', 'data/ecowas', 'data/ia-chr', 'data/icc', 'data/imm-canada', 'data/un-cat', 'data/un-ced', 'data/un-cedaw', 'data/un-cerd', 'data/un-cescr', 'data/un-crc', 'data/un-hrc', 'data/un-wgeid', 'data/wcc-bosnia'], function($, ac_hpr, civil_canada, crim_canada, eccc, echr, ecowas, ia_chr, icc, imm_canada, un_cat, un_ced, un_cedaw, un_cerd, un_cescr, un_crc, un_hrc, un_wgeid, wcc_bosnia) {
	
	config = {
		lists: {
			countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas, The', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei ', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Cook Islands', 'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Curacao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia, The', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea-Bissau', 'Guinea', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territories', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Sahrawi Arab Democratic Republic (Western Sahara)', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'],
			yesnounknown: ['Yes', 'No', 'Unknown'],
		}
	};

	config.questions = [{
		id: '1',
		answers: config.lists.countries,
		answerType: 'single-select'
	},
	{
		id: '2a',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},
	{
		id: '2b',
		answers: config.lists.countries,
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['2a'].hasAnswer('Yes'));
		}
	},
	{
		id: '3',
		answerType: 'single-date'
	},{
		id: '4',
		answers: config.lists.countries,
		answerType: 'single-select'
	},{
		id: '5a',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '5b',
		answers: config.lists.countries,
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['5a'].hasAnswer('Yes'));
		}
	},
	{
		id: '6',
		answers: ['Beating', 'Bodily mutilation', 'Burning', 'Burning of houses', 'Death threats', 'Denial of fair trial', 'Deprivation of medical care', 'Destruction or serious damage to property', 'Electric shock', 'Enslavement', 'Forced abortion', 'Forced displacement', 'Forced nudity', 'Forced sterilization', 'Forced stress positions', 'Forced to watch abuse of other prisoners', 'Forcing a prisoner to perform military service', 'Incommunicado detention', 'Kicking', 'Kidnapping/disappearance', 'Killing', 'Mock execution', 'Persecutions on political, racial, or religious grounds', 'Poisoning of water or food supplies', 'Prolonged exposure to extreme cold or heat', 'Prolonged food/water deprivation', 'Prolonged sleep deprivation', 'Punching', 'Rape or other sexual assault', 'Religious persecution', 'Serious mental harm to a person based on race, ethnicity, religion or nationality', 'Severe mental suffering', 'Solitary confinement', 'Stealing children', 'Suffocation', 'Waterboarding'],
		answerType: 'multi-select'
	},{
		id: '7',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '8',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '9',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '10',
		answers: ["Soldier in government's army", 'Police officer', 'Other government official', 'Soldier in rebel army', 'Person in plainclothes', 'Company or corporation', 'Unknown'],
		answerType: 'multi-select'
	},{
		id: '11',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '12',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '13',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14a',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14b',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	},{
		id: '14c',
		answers: ['Investigation or prosecution still ongoing', 'No investigation', 'Inadequate investigation', 'A court held someone responsible', 'Someone was put on trial but was found not guilty'],
		answerType: 'single-select',
		condition: function(questions) {
			return(questions['14b'].hasAnswer('Yes'));
		}
	},{
		id: '15',
		answers: config.lists.yesnounknown,
		answerType: 'single-select'
	}];
	
	// order here determines the order of display beneath questions - should match ordering of the remedies / options tab
	config.outcomes = [icc, un_cat, un_hrc, un_cerd, un_cedaw, un_ced, un_cescr, un_crc, un_wgeid, ia_chr, ac_hpr, ecowas, echr, eccc, wcc_bosnia, crim_canada, civil_canada, imm_canada];

	return config;
});
