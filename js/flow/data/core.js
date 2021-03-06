define(['jquery', 'data/ac-hpr', 'data/civil-canada', 'data/crim-canada', 'data/eccc', 'data/echr', 'data/ia-chr', 'data/icc', 'data/imm-canada', 'data/un-cat', 'data/un-ced', 'data/un-cedaw', 'data/un-cerd', 'data/un-cescr', 'data/un-crc', 'data/un-hrc', 'data/un-wgeid', 'data/wcc-bosnia'], function($, ac_hpr, civil_canada, crim_canada, eccc, echr, ia_chr, icc, imm_canada, un_cat, un_ced, un_cedaw, un_cerd, un_cescr, un_crc, un_hrc, un_wgeid, wcc_bosnia) {
	
	config = {
		lists: {
			countries: [
				{english: "Afghanistan", french: "Afghanistan"},
				{english: "Albania", french: "Albanie"},
				{english: "Algeria", french: "Algérie"},
				{english: "Andorra", french: "Andorre"},
				{english: "Angola", french: "Angola"},
				{english: "Antigua and Barbuda", french: "Antigua-et-Barbuda"},
				{english: "Argentina", french: "Argentine"},
				{english: "Armenia", french: "Arménie"},
				{english: "Aruba", french: "Aruba"},
				{english: "Australia", french: "Australie"},
				{english: "Austria", french: "Autriche"},
				{english: "Azerbaijan", french: "Azerbaïdjan"},
				{english: "Bahamas, The", french: "Bahamas"},
				{english: "Bahrain", french: "Bahreïn"},
				{english: "Bangladesh", french: "Bangladesh"},
				{english: "Barbados", french: "Barbade"},
				{english: "Belarus", french: "Biélorussie"},
				{english: "Belgium", french: "Belgique"},
				{english: "Belize", french: "Belize"},
				{english: "Benin", french: "Bénin"},
				{english: "Bhutan", french: "Bhoutan"},
				{english: "Bolivia", french: "Bolivie"},
				{english: "Bosnia and Herzegovina", french: "Bosnie-Herzégovine"},
				{english: "Botswana", french: "Botswana"},
				{english: "Brazil", french: "Brésil"},
				{english: "Brunei", french: "Brunéi"},
				{english: "Bulgaria", french: "Bulgarie"},
				{english: "Burkina Faso", french: "Burkina Faso"},
				{english: "Burma", french: "Birmanie"},
				{english: "Burundi", french: "Burundi"},
				{english: "Cambodia", french: "Cambodge"},
				{english: "Cameroon", french: "Cameroun"},
				{english: "Canada", french: "Canada"},
				{english: "Cape Verde", french: "Cap-Vert"},
				{english: "Central African Republic", french: "République centrafricaine"},
				{english: "Chad", french: "Tchad"},
				{english: "Chile", french: "Chili"},
				{english: "China", french: "Chine"},
				{english: "Colombia", french: "Colombie"},
				{english: "Comoros", french: "Comores"},
				{english: "Congo, Democratic Republic of the", french: "Congo, République démocratique"},
				{english: "Congo, Republic of the", french: "Congo, République"},
				{english: "Cook Islands", french: "Îles Cook"},
				{english: "Costa Rica", french: "Costa Rica"},
				{english: "Cote d'Ivoire", french: "Côte d'Ivoire"},
				{english: "Croatia", french: "Croatie"},
				{english: "Cuba", french: "Cuba"},
				{english: "Curacao", french: "Curaçao"},
				{english: "Cyprus", french: "Chypre"},
				{english: "Czech Republic", french: "République tchèque"},
				{english: "Denmark", french: "Danemark"},
				{english: "Djibouti", french: "Djibouti"},
				{english: "Dominica", french: "Dominique"},
				{english: "Dominican Republic", french: "République dominicaine"},
				{english: "East Timor", french: "Timor oriental"},
				{english: "Ecuador", french: "Équateur"},
				{english: "Egypt", french: "Égypte"},
				{english: "El Salvador", french: "El Salvador"},
				{english: "Equatorial Guinea", french: "Guinée équatoriale"},
				{english: "Eritrea", french: "Érythrée"},
				{english: "Estonia", french: "Estonie"},
				{english: "Ethiopia", french: "Éthiopie"},
				{english: "Fiji", french: "Fidji"},
				{english: "Finland", french: "Finlande"},
				{english: "France", french: "France"},
				{english: "Gabon", french: "Gabon"},
				{english: "Gambia, The", french: "Gambie"},
				{english: "Georgia", french: "Géorgie"},
				{english: "Germany", french: "Allemagne"},
				{english: "Ghana", french: "Ghana"},
				{english: "Greece", french: "Grèce"},
				{english: "Grenada", french: "Grenade"},
				{english: "Guatemala", french: "Guatemala"},
				{english: "Guinea-Bissau", french: "Guinée-Bissau"},
				{english: "Guinea", french: "Guinée"},
				{english: "Guyana", french: "Guyane"},
				{english: "Haiti", french: "Haïti"},
				{english: "Holy See", french: "Vatican (Saint-Siège)"},
				{english: "Honduras", french: "Honduras"},
				{english: "Hong Kong", french: "Hong-Kong"},
				{english: "Hungary", french: "Hongrie"},
				{english: "Iceland", french: "Islande"},
				{english: "India", french: "Inde"},
				{english: "Indonesia", french: "Indonésie"},
				{english: "Iran", french: "Iran"},
				{english: "Iraq", french: "Irak"},
				{english: "Ireland", french: "Irlande"},
				{english: "Israel", french: "Israël"},
				{english: "Italy", french: "Italie"},
				{english: "Jamaica", french: "Jamaïque"},
				{english: "Japan", french: "Japon"},
				{english: "Jordan", french: "Jordanie"},
				{english: "Kazakhstan", french: "Kazakhstan"},
				{english: "Kenya", french: "Kenya"},
				{english: "Kiribati", french: "Kiribati"},
				{english: "Korea, North", french: "Corée du Nord"},
				{english: "Korea, South", french: "Corée du Sud"},
				{english: "Kosovo", french: "Kosovo"},
				{english: "Kuwait", french: "Koweït"},
				{english: "Kyrgyzstan", french: "Kirghizstan"},
				{english: "Laos", french: "Laos"},
				{english: "Latvia", french: "Lettonie"},
				{english: "Lebanon", french: "Liban"},
				{english: "Lesotho", french: "Lesotho"},
				{english: "Liberia", french: "Libéria"},
				{english: "Libya", french: "Libye"},
				{english: "Liechtenstein", french: "Liechtenstein"},
				{english: "Lithuania", french: "Lituanie"},
				{english: "Luxembourg", french: "Luxembourg"},
				{english: "Macau", french: "Macao"},
				{english: "Macedonia", french: "Macédoine"},
				{english: "Madagascar", french: "Madagascar"},
				{english: "Malawi", french: "Malawi"},
				{english: "Malaysia", french: "Malaisie"},
				{english: "Maldives", french: "Maldives"},
				{english: "Mali", french: "Mali"},
				{english: "Malta", french: "Malte"},
				{english: "Marshall Islands", french: "Îles Marshall"},
				{english: "Mauritania", french: "Mauritanie"},
				{english: "Mauritius", french: "Île Maurice"},
				{english: "Mexico", french: "Mexique"},
				{english: "Micronesia", french: "Micronésie"},
				{english: "Moldova", french: "Moldavie"},
				{english: "Monaco", french: "Monaco"},
				{english: "Mongolia", french: "Mongolie"},
				{english: "Montenegro", french: "Monténégro"},
				{english: "Morocco", french: "Maroc"},
				{english: "Mozambique", french: "Mozambique"},
				{english: "Namibia", french: "Namibie"},
				{english: "Nauru", french: "Nauru"},
				{english: "Nepal", french: "Népal"},
				{english: "Netherlands", french: "Pays-Bas"},
				{english: "Netherlands Antilles", french: "Antilles néerlandaises"},
				{english: "New Zealand", french: "Nouvelle-Zélande"},
				{english: "Nicaragua", french: "Nicaragua"},
				{english: "Niger", french: "Niger"},
				{english: "Nigeria", french: "Nigéria"},
				{english: "Norway", french: "Norvège"},
				{english: "Oman", french: "Oman"},
				{english: "Pakistan", french: "Pakistan"},
				{english: "Palau", french: "Palau"},
				{english: "Palestinian Territories", french: "Territoires palestiniens"},
				{english: "Panama", french: "Panama"},
				{english: "Papua New Guinea", french: "Papouasie-Nouvelle-Guinée"},
				{english: "Paraguay", french: "Paraguay"},
				{english: "Peru", french: "Pérou"},
				{english: "Philippines", french: "Philippines"},
				{english: "Poland", french: "Pologne"},
				{english: "Portugal", french: "Portugal"},
				{english: "Qatar", french: "Qatar"},
				{english: "Romania", french: "Roumanie"},
				{english: "Russia", french: "Russie"},
				{english: "Rwanda", french: "Rwanda"},
				{english: "Saint Kitts and Nevis", french: "Saint-Christophe-et-Niévès"},
				{english: "Saint Lucia", french: "Sainte-Lucie"},
				{english: "Saint Vincent and the Grenadines", french: "Saint-Vincent-et-les-Grenadines"},
				{english: "Sahrawi Arab Democratic Republic (Western Sahara)", french: "République arabe sahraouie démocratique (Sahara Occidental)"},
				{english: "Samoa", french: "Samoa"},
				{english: "San Marino", french: "Saint-Marin"},
				{english: "Sao Tome and Principe", french: "Sao Tomé et Principe"},
				{english: "Saudi Arabia", french: "Arabie Saoudite"},
				{english: "Senegal", french: "Sénégal"},
				{english: "Serbia", french: "Serbie"},
				{english: "Seychelles", french: "Seychelles"},
				{english: "Sierra Leone", french: "Sierra Leone"},
				{english: "Singapore", french: "Singapour"},
				{english: "Sint Maarten", french: "Sint Maarten"},
				{english: "Slovakia", french: "Slovaquie"},
				{english: "Slovenia", french: "Slovénie"},
				{english: "Solomon Islands", french: "Îles Salomon"},
				{english: "Somalia", french: "Somalie"},
				{english: "South Africa", french: "Afrique du Sud"},
				{english: "South Sudan", french: "Soudan du Sud"},
				{english: "Spain", french: "Espagne"},
				{english: "Sri Lanka", french: "Sri Lanka"},
				{english: "Sudan", french: "Soudan"},
				{english: "Suriname", french: "Suriname"},
				{english: "Swaziland", french: "Swaziland"},
				{english: "Sweden", french: "Suède"},
				{english: "Switzerland", french: "Suisse"},
				{english: "Syria", french: "Syrie"},
				{english: "Taiwan", french: "Taiwan"},
				{english: "Tajikistan", french: "Tadjikistan"},
				{english: "Tanzania", french: "Tanzanie"},
				{english: "Thailand", french: "Thaïlande"},
				{english: "Togo", french: "Togo"},
				{english: "Tonga", french: "Tonga"},
				{english: "Trinidad and Tobago", french: "Trinité-et-Tobago"},
				{english: "Tunisia", french: "Tunisie"},
				{english: "Turkey", french: "Turquie"},
				{english: "Turkmenistan", french: "Turkménistan"},
				{english: "Tuvalu", french: "Tuvalu"},
				{english: "Uganda", french: "Ouganda"},
				{english: "Ukraine", french: "Ukraine"},
				{english: "United Arab Emirates", french: "Émirats arabes unis"},
				{english: "United Kingdom", french: "Royaume-Uni"},
				{english: "United States of America", french: "États-Unis"},
				{english: "Uruguay", french: "Uruguay"},
				{english: "Uzbekistan", french: "Ouzbékistan"},
				{english: "Vanuatu", french: "Vanuatu"},
				{english: "Venezuela", french: "Venezuela"},
				{english: "Vietnam", french: "Viêt-Nam"},
				{english: "Yemen", french: "Yémen"},
				{english: "Zambia", french: "Zambie"},
				{english: "Zimbabwe", french: "Zimbabwe"}
			],
			yesnounknown: [
				{english: "Yes", french: "Oui"},
				{english: "No", french: "Non"},
				{english: "Unknown", french: "Inconnu"}
			],
			yesno: [
				{english: "Yes", french: "Oui"},
				{english: "No", french: "Non"}
			]
		}
	};
	
	config.lists.yesnounknown.preventSort = true;
	config.lists.yesno.preventSort = true;

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
		answers: config.lists.yesno,
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
		answers: [
			{ english: "Abuse against a child under the age of 18", french: "Mauvais traitements contre un enfant âgé de moins de 18 ans"},
			{ english: "Abuse against a woman", french: "Mauvais traitements contre les femmes" },
			{ english: "Beating", french: "Tabassage" },
			{ english: "Bodily mutilation", french: "Mutilation corporelle" },
			{ english: "Burning", french: "Brûlure" },
			{ english: "Burning of houses", french: "Maisons incendiées" },
			{ english: "Death threats", french: "Menaces de mort" },
			{ english: "Denial of fair trial", french: "Déni de procès équitable" },
			{ english: "Deprivation of medical care", french: "Privation de soins médicaux" },
			{ english: "Destruction or serious damage to property", french: "Destruction ou des dommages graves à la propriété" },
			{ english: "Disappearance", french: "Disparition" },
			{ english: "Electric shock", french: "Choc électrique" },
			{ english: "Enslavement", french: "Asservissement" },
			{ english: "Forced abortion", french: "Avortement forcé" },
			{ english: "Forced displacement", french: "Déplacement forcé" },
			{ english: "Forced nudity", french: "Nudité forcée" },
			{ english: "Forced sterilization", french: "Stérilisation forcée" },
			{ english: "Forced stress positions", french: "Situations de stress forcées" },
			{ english: "Forced to watch abuse of other prisoners", french: "Obligation de regarder la violence subie par d’autres prisonniers" },
			{ english: "Forcing a prisoner to perform military service", french: "Obliger un prisonnier à accomplir un service militaire" },
			{ english: "Incommunicado detention", french: "Détention tenue secrète" },
			{ english: "Kicking", french: "Frappé avec des coups de pieds" },
			{ english: "Kidnapping", french: "Enlèvement " },
			{ english: "Killing", french: "Assassinat" },
			{ english: "Mock execution", french: "Simulation d’exécution" },
			{ english: "Persecution on political, racial, or religious grounds", french: "Persécution pour des motifs politiques, raciaux ou religieux" },
			{ english: "Poisoning of water or food supplies", french: "Empoisonnement de l’approvisionnement alimentaire ou de l’eau" },
			{ english: "Prolonged exposure to extreme cold or heat", french: "Exposition prolongée à des températures extrêmes (froid ou chaud)" },
			{ english: "Prolonged food/water deprivation", french: "Privation prolongée de nourriture et/ou d’eau" },
			{ english: "Prolonged sleep deprivation", french: "Privation prolongée de sommeil" },
			{ english: "Punching", french: "Coups de poing" },
			{ english: "Rape or other sexual assault", french: "Viol et/ou autres formes d’agression sexuelle" },
			{ english: "Severe mental suffering", french: "Souffrance mentale grave" },
			{ english: "Solitary confinement", french: "Isolement" },
			{ english: "Stealing children", french: "Enlèvement/ vol d’enfants" },
			{ english: "Suffocation", french: "Suffocation" },
			{ english: "Waterboarding", french: "Bains forcés (waterboarding)" }
		],
		answerType: 'multi-select'
	},{
		id: '7',
		answers: config.lists.yesno,
		answerType: 'single-select'
	},{
		id: '8',
		answers: config.lists.yesno,
		answerType: 'single-select'
	},{
		id: '9',
		answers: config.lists.yesno,
		answerType: 'single-select'
	},{
		id: '10',
		answers: function() {
			
			var answers = [
				{ english: "Soldier in government's army", french: "Soldat de l’armée du gouvernement" },
				{ english: "Police officer", french: "Officier de police" },
				{ english: "Other government official", french: "Autre représentant du gouvernement" },
				{ english: "Company or corporation", french: "Compagnie ou société" },
				{ english: "Soldier in rebel army", french: "Soldat dans l'armée rebelle" },
				{ english: "None of the above", french: "Aucune de ces réponses" },
				{ english: "Unknown", french: "Inconnu"}
			];
			
			answers.preventSort = true;
			answers.preventMultipleCols = true;
			return answers;
		}(),
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
		answers: function() {
			var answers = [
				{ english: "Investigation or prosecution still ongoing", french: "Enquête ou poursuites toujours en cours" },
				{ english: "No investigation", french: "Aucune enquête" },
				{ english: "Inadequate investigation", french: "Enquête inappropriée" },
				{ english: "A court held someone responsible", french: "Un tribunal a tenu quelqu’un responsable" },
				{ english: "Someone was put on trial but was found not guilty", french: "Quelqu'un a été traduit en justice, mais il a été reconnu innocent" }
			];
			
			answers.preventSort = true;
			return answers;
		}(),
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
	config.outcomes = [icc, un_cat, un_hrc, un_cerd, un_cedaw, un_ced, un_cescr, un_crc, un_wgeid, ia_chr, ac_hpr, echr, eccc, wcc_bosnia, crim_canada, civil_canada, imm_canada];
	
	config.url = {
		stories: 'http://www.ccij.ca/stories/'
	};

	return config;
});
