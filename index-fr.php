<?php
    // Basic authentication approach implemented during testing and refinement, final product will not require authentication
    require_once('auth/gateway.php');
?>

<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="css/src/ccij.css?flow-v=0.9.63" rel="stylesheet" type="text/css" />
	<link href="css/print.css?flow-v=0.9.63" rel="stylesheet" type="text/css" media="print" />
	<title>CCJI - Possibilités de Justice</title>
</head>
<body>
	<!-- Start W&H header -->
	<div class="wise-toolbar">
		<div class="container">
			<div class="row">
				<div class="col-sm-24">
					<ul class="list-inline pull-left">
						<li><a href="http://www.ccij.ca">< Return to CCIJ</a></li>
					</ul>
					<ul class="list-inline pull-right">
						<li><a href="index-en.php">English</a></li>
						<li><a href="mailto:meisenbrandt@ccij.ca">Contact Us</a></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
    <header id="ccij_ofj_header" class="wise-header wise-header-lg">
        <div class="container">
            <div class="row">
                <div class="col-xs-24 col-sm-24 col-md-17 col-lg-17">
                    <h1 class="wise-logo">Canadian Centre for International Justice</h1>
                    <h3 class="wise-subtitle hidden-xs" id="ccij_ofj_subtitle">Possibilités de justice</h3>
                </div>
            </div>
            <div class="row hidden-xs hidden-sm">
                <div class="col-md-24 col-lg-24">
                    <ul class="list-inline pull-right">
                        <li>
                            <a href="https://www.facebook.com/pages/Canadian-Centre-for-International-Justice-CCIJ/27176895148" title="Follow us on Facebook" class="wise-sprite-social wise-sprite-social-facebook">Follow us on Facebook</a>
                        </li>
                        <li>
                            <a href="http://twitter.com/CCIJ_CCJI" title="Follow us on Twitter" class="wise-sprite-social wise-sprite-social-twitter">Follow us on Twitter</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/company/canadian-centre-for-international-justice" title="Follow us on LinkedIn" class="wise-sprite-social wise-sprite-social-linkedin">Follow us on LinkedIn</a>
                        </li>
                        <li>
                            <a href="http://vimeo.com/user18059102" title="Follow us on Vimeo" class="wise-sprite-social wise-sprite-social-vimeo">Follow us on Vimeo</a>
                        </li>
                        <li>
                            <a href="http://ccij.wiseworkbench.com/?feed=rss2" title="Subscribe to our RSS Feed" class="wise-sprite-social wise-sprite-social-rss">Subscribe to our RSS Feed</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
	<div class="container wise-nav-container">
		<div class="row">
			<div class="col-sm-24">
                <nav class="navbar navbar-default navbar-default-override" role="navigation" id="ccij_navbar">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#ccij_navbar_collapse">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class="collapse navbar-collapse" id="ccij_navbar_collapse">
                        <ul class="nav navbar-nav">
                            <li><a href="#" id="ccij_home_nav">Maison</a></li>
                            <li><a href="#assess" id="ccij_assess_nav">Évaluez vos options</a></li>
                            <li><a href="#remedies" id="ccij_remedies_nav">Institutions Judiciaires</a></li>
                        </ul>
                    </div>
                </nav>
			</div>
		</div>
	</div>
	<div class="wise-main">
		<div class="container">
			<div class="row">
				<div class="col-sm-24">
				<!-- End W&H header -->
					<div id="ccij_main">
						<div id="ccij_intro" class="main-focus">
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<h1>POSSIBILITÉS DE JUSTICE</h1>
									<p>Si vous ou votre famille avez subi certaines violations des droits de l’Homme, vous pourriez être en mesure de rechercher la justice d’une façon légale ou autre. Plusieurs procédés existent dans le monde et au Canada pour lutter contre les violations des droits de l’Homme mais cela peut être difficile de connaître les différentes possibilités de justice qui s’offrent à vous. Ce site peut vous aider à en savoir davantage.</p>
								</div>
							</div>
							<div class="row">
								<div id="ccij_assess_entry" class="entry-point app-navigator col-md-11 col-lg-11 clickable">
									<h3>Évaluez Vos Options</h3>
									<p><img src="images/0.png" width="48" height="48" title="Évaluez vos options" class="entry-point-img sprites test" />Notre outil d’évaluation vous guidera à travers une série de questions concernant les actes commis contre vous ou les membres de votre famille et vous suggèrera des options possibles pour votre recherche de justice.</p>
								</div>
								<div id="ccij_remedies_entry" class="entry-point app-navigator col-md-11 col-lg-11 col-md-offset-2 col-lg-offset-2 clickable">
									<h3>Institutions Judiciaires</h3>
									<p><img src="images/0.png" width="48" height="48" title="Institutions Judiciaires" class="entry-point-img sprites gavel" />Découvrez les différents organismes qui surveillent les violations des droits de l’Homme en lisant une brève description des tribunaux internationaux, des Comité des Nations Unies, des commissions régionales des droits de l’homme et sur les processus canadiens.</p>
								</div>
								<!--
								<div id="ccij_stories_entry" class="entry-point col-md-7 col-lg-7 col-md-offset-1 col-lg-offset-1 clickable">
									<h3>Histoires<span class="glyphicon glyphicon-new-window title-supplemental-top" title="External Link"></span></h3>
									<p><img src="images/0.png" width="48" height="48" title="Stories" class="entry-point-img sprites book" />Le CCJI a aidé des survivants et des familles à chercher justice par plusieurs processus différents. Vous pouvez lire, entendre et visionner leurs histoires pour apprendre de leurs expériences, de leurs succès et leurs défis auxquels ils ont eu à faire face.</p>
								</div>
								-->
							</div>
						</div>
						<div id="ccij_outcomes" class="main-focus">
							<h3>International</h3>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_icc" class="ccij-outcome">
										<img src="images/0.png" class="sprites icc" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Cour pénale internationale (CPI)</h4>
										<div class="outcome-abbreviation">CPI</div>
										<div class="outcome-description">
											<p>Située à La Haye en Hollande, la CPI est le premier tribunal pénal international permanent. Elle a été créée pour poursuivre en justice les personnes accusées d’avoir commis des crimes internationaux parmi les plus graves, incluant les crimes de guerre, les crimes contre l’humanité, le génocide et les agressions. En plus de déterminer la culpabilité ou l’innocence, le Cour pénale internationale peut faire des recommandations sur les dédommagements pour les torts causés aux victimes, et peut fournir l’assistance à certaines victimes dans les pays où elle exerce des activités par le Fonds d’affectation spéciale pour les victimes.</p>
											<p>Le Cour pénale internationale est régie par un accord international appelé le <span class="italic">Statut de Rome</span>. Plus de 120 pays ont ratifié l’accord, ce qui signifie qu’ils contribuent au budget de la Cour pénale internationale et acceptent sa juridiction pénale sur leurs ressortissants et sur les actes qui se produisent sur leurs territoires. La CPI peut aussi avoir l’autorité légale pour examiner toute situation lorsqu’elle est autorisée par le Conseil de sécurité des Nations Unies (comme cela s’est passé dans les causes du Soudan et de la Libye qui ne sont pas parties intégrantes du <span class="italic">Statut de Rome</span>). La plupart des pays d’Europe, de l’Amérique latine et de l’Afrique ainsi que le Canada et le Japon se sont joints à la CPI. Les non-membres incluent les États-Unis, la Chine, La Russie, l’Inde et la plupart des pays du Moyen-Orient.</p>
											<p>Le procureur de la Cour pénale internationale peut ouvrir des enquêtes à la demande des États parties, du Conseil de sécurité des Nations Unies ou de sa propre initiative. Par conséquent, les gens peuvent fournir de l’information au procureur concernant de possibles crimes. La Cour pénale internationale a pour objectif d’être un tribunal de dernière instance, ce qui signifie qu’elle n’interviendra pas dans des causes qui font déjà l’objet de véritables procédures judiciaires au niveau international. La Cour pénale internationale est aussi limitée aux crimes qui ont eu lieu après le 1er juillet 2002, le jour où le <span class="italic">Statut de Rome</span> est entré en vigueur. Depuis qu’elle a été créée, la CPI a ouvert des enquêtes concernant des crimes allégués dans huit pays, tous africains.</p>
											<p>La Cour pénale internationale peut aussi avoir l’autorité légale pour enquêter sur toute situation lorsqu’elle est autorisée par le Conseil de sécurité des Nations Unies (comme cela s’est passé dans les causes du Soudan et de la Libye, lesquels ne font pas partie du <span class="italic">Statut de Rome</span>). Les non-membres peuvent aussi demander à ce que la Cour pénale internationale ait juridictions, comme cela s’est produit dans la cause de la Côte d’Ivoire. (À noter : notre questionnaire "Analysez vos options" est dans l’incapacité d’inclure des situations concernant le Conseil de la sécurité des Nations Unies ou la situation où un pays non-membre décide de donner la juridiction à la Cour pénale internationale. Par conséquent, il peut à l’avenir devenir possible pour la CPI de poursuivre des crimes qui ont été commis dans le passé dans les pays, incluant la Syrie et la Palestine entre autres.)</p>
											<p>Pour plus de renseignements sur la CPI et les causes en instance, voir: <a href="http://www.icc-cpi.int/EN_Menus/ICC/Pages/default.aspx" target="_blank">http://www.icc-cpi.int/EN_Menus/ICC/Pages/default.aspx</a> et <a href="http://www.iccnow.org" target="_blank">http://www.iccnow.org</a>.</p>
											<p>Pour des renseignements concernant la présentation d’une plainte au procureur, voir: <a href="http://www.icc-cpi.int/en_menus/icc/structure%20of%20the%20court/office%20of%20the%20prosecutor/siac/Pages/default.aspx" target="_blank">http://www.icc-cpi.int/en_menus/icc/structure%20of%20the%20court/office%20of%20the%20prosecutor/siac/Pages/default.aspx</a>.</p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_cat" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. contre la torture (CCT)</h4>
										<div class="outcome-abbreviation">CCT</div>
										<div class="outcome-description">
											<p>Le CCT est un organisme des Nations Unies qui peut considérer des allégations de violations des droits définis dans la <span class="italic">Convention contre la torture et autres peines ou traitements cruels, inhumains ou dégradants</span>, un accord international qui est entré en vigueur le 20 juin 1987.</p>
											<p>Les plaintes peuvent être déposées par des particuliers ou par des tiers au nom de particuliers, contre 67 pays qui ont ratifié la Convention (depuis avril 2014) et accepté que l’autorité du CCT entende de telles plaintes. Les victimes doivent en premier exercer des recours judiciaires dans le pays présumé être responsable pour la violation des droits de l’homme, bien qu’une exception à cette règle existe où les mesures nationales sont déraisonnablement prolongées ou ayant peu de chances d’apporter un résultat efficace à la victime. Les plaintes des particuliers sont référées au Groupe de travail sur les plaintes, qui est composé de trois ou cinq membres du comité. S’ils décident que la plainte mérite d’être étudiée par le CCT, elle sera ensuite examinée en profondeur lors d’une réunion à huis clos. Le plaignant ainsi qu’un représentant du pays mis en cause peuvent être autorisé à assister aux délibérations et à apporter des précisions à cette étape. Les délibérations se termineront avec le Comité qui fera suivre ses opinions sur la cause, par écrit, aux parties concernées.</p>
											<p>Liens:</p>
											<p><a href="http://www.ohchr.org/en/hrbodies/cat/pages/catindex.aspx" target="_blank">http://www.ohchr.org/en/hrbodies/cat/pages/catindex.aspx</a></p>
											<p><a href="http://www.ohchr.org/Documents/Publications/FactSheet17en.pdf" target="_blank">http://www.ohchr.org/Documents/Publications/FactSheet17en.pdf</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> La Commission des Nations Unies des droits de l’homme contre la torture a un délai de prescription très strict. Si vous avez essayé de déposer une cause dans votre pays sans succès, vous devez déposer votre plainte à la Commission des Nations Unies contre la torture dans un délai raisonnable, à moins que vous puissiez démontrer qu’il n’a pas été possible de déposer la plainte à l’intérieur du délai.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_hrc" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Commission des droits de l’homme des O.N.U.</h4>
										<div class="outcome-description">
											<p>Le CDH est un organisme des Nations Unies créé pour assurer le respect du <span class="italic">Pacte international relatif aux droits civils et politiques</span> (PIRDCP), un accord international qui est entré en vigueur le 23 mars 1976. Le PIRDCP couvre un large éventail de droits civils et politiques et interdit certaines actions de 168 pays qui en font partie (en date d’avril 2014). Ceux-ci comprennent, entre autres, l’interdiction de crimes graves comme les arrestations arbitraires par les forces de l’ordre, le génocide, l’esclavage et la torture.</p>
											<p>Les particuliers peuvent déposer des plaintes contre les États pour avoir violé leurs droits, pourvu que le pays ait ratifié le premier Protocole additionnel du PIRDCP. En date d’avril 2014, le Protocole a été ratifié par 117 pays. Les victimes doivent tout d’abord essayer d’obtenir justice dans le pays où la violation des droits a eu lieu, mais il y a des exceptions à cette règle où un redressement judiciaire dans les tribunaux nationaux n’est pas possible, est ineffectif ou indûment prolongé.</p>
											<p>Les plaintes des particuliers sont initialement évaluées par le président du Groupe de travail des communications. Seules les plaintes qui atteignent les normes d’admissibilité sont transmises au gouvernement accusé de violation afin d’obtenir sa réponse. En second lieu, la plainte est acheminée au Groupe de travail des communications, un comité de cinq experts en droits de l’Homme qui prennent connaissance des requêtes lors de deux sessions annuellement. Le Groupe de travail des communications peut rejeter une plainte, demander plus de renseignements ou faire des recommandations au Groupe de travail sur les situations pour un examen plus approfondi.</p>
											<p>Liens:</p>
											<p>Site officiel du CDH: <a href="http://www.ohchr.org/EN/HRBodies/CCPR/Pages/CCPRIntro.aspx" target="_blank">http://www.ohchr.org/EN/HRBodies/CCPR/Pages/CCPRIntro.aspx</a></p>
											<p>FAQs: <a href="http://www2.ohchr.org/english/bodies/petitions/individual.htm" target="_blank">http://www2.ohchr.org/english/bodies/petitions/individual.htm</a></p>
											<p>Pour un exemple de plainte que le CCJI a aidé à déposer au CDH: <a href="http://www.ccij.ca/programs/cases/index.php?DOC_INST=23" target="_blank">http://www.ccij.ca/programs/cases/index.php?DOC_INST=23</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_cerd" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. pour l’élimination de la discrimination raciale (CEDR)</h4>
										<div class="outcome-abbreviation">CEDR</div>
										<div class="outcome-description">
											<p>Le CEDR est un organisme des Nations Unies créé pour surveiller la mise en œuvre de la <span class="italic">Convention internationale de l’élimination de toutes les formes de discrimination raciale</span>, un accord international qui est entré en vigueur le 4 janvier 1969. Le CEDR peut prendre en considération les plaintes des particuliers ou des groupes de particuliers qui prétendant être victimes de l’un ou de plusieurs droits énoncés dans la Convention. Afin que les plaintes des particuliers soient considérées, le particulier ou le groupe de particuliers doit en premier ester en justice dans le pays où l’abus a eu lieu. Cependant, il y a une exception à cette règle lorsque l’application des mesures nationales est déraisonnablement prolongée ou qu’il est peu probable qu’elles soient en mesure d’apporter un soulagement efficace. La plainte doit être soumise dans les six mois après que toutes les mesures nationales aient été épuisées.</p>
											<p>Liens:</p>
											<p>Site officiel du CEDR <a href="http://www.ohchr.org/en/hrbodies/cerd/pages/cerdindex.aspx" target="_blank">http://www.ohchr.org/en/hrbodies/cerd/pages/cerdindex.aspx</a></p>
											<p>Exemple de formulaire de plainte d’un particulier selon la convention <a href="http://www2.ohchr.org/english/bodies/docs/annex1.pdf" target="_blank">http://www2.ohchr.org/english/bodies/docs/annex1.pdf</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> Le Comité des Nations Unies pour l’élimination de la discrimination raciale a un délai de prescription très strict. Si vous avez essayé de déposer une cause dans votre pays sans succès, vous disposez de six mois seulement pour déposer votre plainte à la Commission des Nations Unies pour l’élimination de la discrimination raciale (excepté pour l’Espagne, qui dispose de trois mois seulement).</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_cedaw" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-women" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. pour l’élimination de la discrimination contre les femmes (CEDCF)</h4>
										<div class="outcome-abbreviation">CEDCF</div>
										<div class="outcome-description">
											<p>Créé en 1982, le CEDCF est un organisme des Nations Unies qui comprend des experts en droit des femmes du monde entier. Il surveille la mise en œuvre de la <span class="italic">Convention pour l’élimination de la discrimination contre les femmes</span>, un accord international qui se penche sur les droits fondamentaux de la femme et qui est entré en vigueur le 3 septembre 1981. En 1999, l’Assemblée générale des Nations Unies a adopté un Protocole optionnel à la Convention qui permet aux particuliers de déposer une plainte au CEDCF. Les plaintes contre les pays qui ont ratifié ce Protocole optionnel doivent être soumises par écrit et ne doivent pas être anonymes. Afin que les plaintes individuelles soient considérées, les particuliers ou des groupes doivent en premier demander justice dans le pays où l’abus a eu lieu, à moins que ce processus soit déraisonnablement prolongé ou qu’il soit peu probable qu’il puisse apporter un dédommagement efficace. Il n’y a pas de prescription pour déposer des plaintes.</p>
											<p>Liens:</p>
											<p>Le Comité des Nations Unies pour l’élimination de la discrimination contre les femmes <a href="http://www.ohchr.org/EN/HRBodies/CEDAW/Pages/Introduction.aspx" target="_blank">http://www.ohchr.org/EN/HRBodies/CEDAW/Pages/Introduction.aspx</a></p>
											<p>Un exemple de formulaire pour la soumission des communications au Comité pour l’élimination de la discrimination contre les femmes: <a href="http://www.un.org/womenwatch/daw/cedaw/opmodelform.html" target="_blank">http://www.un.org/womenwatch/daw/cedaw/opmodelform.html</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_ced" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. pour les disparitions forcées (CDF)</h4>
										<div class="outcome-abbreviation">CDF</div>
										<div class="outcome-description">
											<p>Le CDF est un organisme composé d’experts indépendants qui surveille la mise en œuvre de la <span class="italic">Convention internationale pour la protection de toutes les personnes contre les disparitions forcées</span>, un accord international qui est entré en vigueur le 23 décembre 2010. Le CDF prend en considération les plaintes des particuliers concernant les violations présumées de la Convention, pourvu que le pays prétendument responsable pour ces violations ait reconnu la compétence du CDF pour le faire. En date d’avril 2014, seulement 17 pays avaient accepté l’autorité légale du CDF. Les plaintes doivent être soumises par écrit et doivent faire référence à la disparition qui a eu lieu après l’entrée en vigueur de la Convention. En outre, la victime doit avoir essayé d’obtenir justice dans le pays responsable de la disparition présumée.</p>
											<p>Une fois que le CDF a reçu la plainte qui atteint les critères d’admissibilité, il entrera en contact avec le gouvernement du pays concerné et demandera que ce dernier examine la situation. Toute plainte reçue par le pays concernant l’endroit où se trouve la personne disparue sera communiquée à la personne qui a déposé la plainte. Les causes seront closes une fois que la localisation exacte d’une personne disparue aura été déterminée. À cette étape, la plainte peut être portée devant un autre mécanisme des Nations Unies, si d’autres violations des droits de la personne disparue ont été dévoilées.</p>
											<p>Liens:</p>
											<p>Site officiel du CDF <a href="http://www.ohchr.org/EN/HRBodies/CED/Pages/CEDIndex.aspx" target="_blank">http://www.ohchr.org/EN/HRBodies/CED/Pages/CEDIndex.aspx</a></p>
											<p>Exemple de formulaire de plainte <a href="http://tbinternet.ohchr.org/_layouts/treatybodyexternal/Download.aspx?symbolno=INT%2fCED%2fBRD%2f7147&amp;Lang=en" target="_blank">http://tbinternet.ohchr.org/_layouts/treatybodyexternal/Download.aspx?symbolno=INT%2fCED%2fBRD%2f7147&amp;Lang=en</a></p>
											<p>Feuillet de renseignements <a href="http://www.ohchr.org/Documents/Publications/FactSheet6Rev3.pdf" target="_blank">http://www.ohchr.org/Documents/Publications/FactSheet6Rev3.pdf</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_cescr" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. sur les droits économiques, sociaux et culturels (CEDSC)</h4>
										<div class="outcome-abbreviation">CEDSC</div>
										<div class="outcome-description">
											<p>Le CEDSC peut entendre des plaintes concernant les violations des droits énoncés dans la <span class="italic">Convention internationale sur les droits économiques, sociaux et culturels</span>, un traité international qui est entré en vigueur le 3 janvier 1976. Les plaintes peuvent être déposées par des particuliers, ou des groupes de personnes, ou par un tiers au nom des particuliers, pourvu que le pays en cause ait ratifié le protocole facultatif de cette Convention. Les plaignants doivent avoir en premier intenté un recours judiciaire dans le pays où la présumée violation a eu lieu, et la communication devrait être enregistrée dans l’année suivant la décision finale d’une cour nationale ou d’un tribunal. En examinant les plaintes, le CEDSC prendra en considération les dispositions raisonnables prises par le gouvernement en question pour surveiller les droits énoncés dans la Convention. En agissant ainsi, le CEDSC tiendra compte qu’il y a un éventail de politiques que le gouvernement doit adopter pour mettre en œuvre ces droits.</p>
											<p>Links:</p>
											<p><a href="http://www.ohchr.org/en/hrbodies/cescr/pages/cescrindex.aspx" target="_blank">http://www.ohchr.org/en/hrbodies/cescr/pages/cescrindex.aspx</a></p>
											<p><a href="http://www.ohchr.org/Documents/Publications/FactSheet16rev.1en.pdf" target="_blank">http://www.ohchr.org/Documents/Publications/FactSheet16rev.1en.pdf</a></p>
											<p><a href="http://www.ohchr.org/EN/HRBodies/TBPetitions/Pages/IndividualCommunications.aspx#ICESCR" target="_blank">http://www.ohchr.org/EN/HRBodies/TBPetitions/Pages/IndividualCommunications.aspx#ICESCR</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> Le Comité des Nations Unies sur les droits économiques, sociaux et culturels a un délai de prescription strict. Si vous avez essayé de déposer une plainte dans votre pays sans succès, vous avez seulement une année pour déposer une plainte au Comité des Nations Unies sur l’économie, les droits sociaux et culturles droits économiques, sociaux et culturels, à moins que vous puissiez démontrer qu’il n’a pas été possible de déposer la plainte dans le délai fixé.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_crc" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Comité des O.N.U. pour les droits des Enfants (CDE)</h4>
										<div class="outcome-abbreviation">CDE</div>
										<div class="outcome-description">
											<p>Le CDE est un organisme des Nations Unies composé d’experts qui surveille la mise en œuvre de la <span class="italic">Convention de droits des enfants</span>, un accord international qui est entré en vigueur le 2 septembre 1990. Le CDE surveille aussi la mise en œuvre des deux Protocoles facultatifs de la Convention, l’un d’eux concernant l’implication du conflit des enfants armés et l’autre concernant la vente d’enfants, la prostitution et la pornographie d’enfant. Le Protocole optionnel du CDE concernant les plaintes des particuliers est entré en vigueur le 14 avril 2014. Les enfants de moins de 18 ans peuvent maintenant déposer par écrit des plaintes au Comité des Nations Unies s’ils ont été victimes d’abus ou de mauvais traitement de la part des pays qui ont ratifié ce Protocole. Les plaintes des particuliers peuvent seulement être déposées après une demande qui aurait échoué dans l’obtention de réparation de la part du gouvernement responsable. Les particuliers doivent déposer leur plainte dans l’année qui suit une décision d’un tribunal national. Si le CDE décide qu’il va considérer la plainte, le gouvernement responsable aura la responsabilité de répondre aux allégations. Le CDE émettra par la suite ses opinions et ses recommandations.</p>
											<p>Liens:</p>
											<p><a href="http://www.ohchr.org/EN/HRBodies/CRC/Pages/CRCIntro.aspx" target="_blank">http://www.ohchr.org/EN/HRBodies/CRC/Pages/CRCIntro.aspx</a></p>
											<p><a href="https://treaties.un.org/doc/source/signature/2012/CTC_4-11d.pdf" target="_blank">https://treaties.un.org/doc/source/signature/2012/CTC_4-11d.pdf</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> Le Comité des Nations Unies pour les droits des enfants a un délai strict de prescription. Si vous avez essayé de déposer une plainte dans votre pays sans succès, vous disposez seulement d’un an pour déposer une plainte aux Comité des Nations Unis pour les droits des enfants, à moins que vous puissiez démontrer qu’il n’a pas été possible de déposer une plainte dans le délai fixé.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_un_wgeid" class="ccij-outcome">
										<img src="images/0.png" class="sprites un-hr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Le Groupe de travail sur les disparitions involontaires ou forcées (GTDIF)</h4>
										<div class="outcome-abbreviation">GTDIF</div>
										<div class="outcome-description">
											<p>Le GTDIF des Nations Unies a été créé le 29 février 1980 ayant comme mandat d’ " [e]xaminer les questions concernant les disparitions forcées ou involontaires de personnes." Le GTDIF peut examiner des plaintes à savoir si le gouvernement qui est supposément responsable a ratifié un accord particulier, et peut même envisager d’examiner les causes où aucune cause nationale n’a été entreprise. Afin d’être examiné par le GTDIF, un rapport de disparition doit être soumis par écrit. Les cas de disparitions peuvent être soumis par des parents des disparus, ou par des organisations agissant en leur nom (avec un consentement préalable de parents).</p>
											<p>Le GTDIF a aussi le pouvoir de prendre certaines actions dans des circonstances précises, comme lorsque des personnes ont été récemment arrêtées ou détenues et l’on croit qu’il y a un risque de disparition. En pareil cas, le ministère des Affaires étrangères du pays concerné est contacté par le GTDIF par le moyen le plus rapide disponible.</p>
											<p>Liens:</p>
											<p>Site officiel <a href="http://www.ohchr.org/EN/Issues/Disappearances/Pages/DisappearancesIndex.aspx" target="_blank">http://www.ohchr.org/EN/Issues/Disappearances/Pages/DisappearancesIndex.aspx</a></p>
											<p>Comment utiliser le GTDIF <a href="http://www.ohchr.org/Documents/Issues/Disappearances/how_to_use_the_WGEID.pdf" target="_blank">http://www.ohchr.org/Documents/Issues/Disappearances/how_to_use_the_WGEID.pdf</a></p>
											<p>Le formulaire pour soumettre une communication d’une victime de disparition forcée <a href="http://www.ohchr.org/Documents/issues/Disappearances/Communication_form_E.doc" target="_blank">http://www.ohchr.org/Documents/issues/Disappearances/Communication_form_E.doc</a></p>
										</div>
									</div>
								</div>
							</div>
							<hr />
							<h3>Régional</h3>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_ia_chr" class="ccij-outcome">
										<img src="images/0.png" class="sprites oas" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Commission interaméricaine des droits de l’Homme</h4>
										<div class="outcome-abbreviation">CIDH</div>
										<div class="outcome-description">
											<p>Toute personne, ou groupe de personne ou organisation peut porter plainte à la Commission interaméricaine des droits de l’Homme pour les violations de <span class="italic">La Convention interaméricaine des droits de l’Homme et la Déclaration interaméricaine des droits et des devoirs de l’Homme</span>, ainsi que d’autres Conventions interaméricaines des droits de l’Homme. Les violations alléguées doivent avoir été commises par un gouvernement qui a ratifié la convention concernée, et tous les États membres de l’Organisation des États Américains (OÉA) sont responsables de faire respecter les droits de la Déclaration interaméricaine des droits et des devoirs de l’Homme.</p>
											<p>Les plaintes déposées à la Commission sont appelées "requêtes". Lorsqu’une requête est reçue, une évaluation préliminaire est effectuée. Cette évaluation se termine par un de trois résultats : soit une décision pour ouvrir le traitement de la requête, une décision de demander des informations supplémentaires ou enfin une décision de ne pas traiter. Si une requête est acceptée pour être traitée, la Commission analyse les allégations des parties et rédige un rapport. Le rapport peut inclure les recommandations à un gouvernement de rétablir les droits qui ont été violés, dans le but d’empêcher que les mêmes violations se reproduisent ou d’assurer la réparation des torts causés aux victimes. La Commission interaméricaine des droits de l’Homme peut aussi demander au gouvernement de prendre des mesures de précaution pour prévenir un dommage irréparable à un individu ou à un groupe des personnes. Si l’État ne parvient pas à se conformer aux recommandations de la Commission, celle-ci peut référer la cause à la Cour interaméricaine des droits de l’Homme, un organisme distinct qui peut rendre juridiquement des décisions exécutoires.</p>
											<p>Liens:</p>
											<p>Le site de la Commission: <a href="http://www.oas.org/en/iachr/" target="_blank">http://www.oas.org/en/iachr/</a></p>
											<p>Livret d’information pour la présentation de plaintes: <a href="http://www.oas.org/en/iachr/docs/pdf/HowTo.pdf" target="_blank">http://www.oas.org/en/iachr/docs/pdf/HowTo.pdf</a></p>
											<p>Renseignements sur le système interaméricain des droits de l’Homme de la part du Centre des Ressources de la justice internationale: <a href="http://www.ijrcenter.org/regional/inter-american-system/" target="_blank">http://www.ijrcenter.org/regional/inter-american-system/</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> La Commission interaméricaine des droits de l’Homme a un délai très strict de prescription. Si vous avez essayé de déposer une cause dans votre pays sans succès, vous disposez seulement de six mois pour déposer une requête à la Commission interaméricaine des droits de l’Homme.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_acm_hpr" class="ccij-outcome">
										<img src="images/0.png" class="sprites achpr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">La Commission africaine des droits de l’Homme et des peuples</h4>
										<div class="outcome-description">
											<p>Les individus et les ONG peuvent porter plaintes auprès de la CADHP pour des allégations de violations des droits énoncés dans <span class="italic">la Charte africaine des droits de l’homme et des peuples</span>, une convention internationale qui est entrée en vigueur le 21 octobre 1986. Tous les pays africains ont ratifié la Charte excepté le Soudan du Sud. Les communications alléguant la violation des droits de l’Homme sont adressées au secrétariat de la CADHP, situé au Banjul, Gambie, où elle est enregistrée. Une majorité de commissaires décident si la CADHP devrait officiellement évaluer la plainte. La CADHP déterminera si les victimes ont déjà tenté d’obtenir réparation d’une cour nationale ou un tribunal et si elle a été déposée dans un délai raisonnable.</p>
											<p>Si la plainte est acceptée par le CADHP, une réponse écrite de la part du gouvernement concerné sera demandée. Dans de rares cas, le plaignant et le gouvernement responsable devront présenter des arguments oraux. Lorsqu’elle aura porté son jugement, la CADHP émettra ses recommandations, qui détermineront les mesures à prendre par le gouvernement pour remédier à la violation.</p>
											<p>Les recommandations ne sont pas en elles-mêmes juridiquement contraignantes. Toutefois, elles sont soumises à l’Assemblée des Chefs d’État et de Gouvernement de l’Union Africaine. Si elles sont adoptées, elles auront force de loi. Malgré que la Charte ne prévoie pas spécifiquement un mandat à la CADHP pour accorder une réparation, la CADHP a assumé ce pouvoir. Auparavant, elle a accordé des jugements déclaratifs (affirmant qu’un droit a été violé), incluant des dommages pécuniaires et autres formes de réparation non pécuniaires (comme les amendements proposés dans les lois des droits transgressés).</p>
											<p>Le site de la CADHP: <a href="http://www.achpr.org/" target="_blank">http://www.achpr.org/</a></p>
											<p>La procédure des communications: <a href="http://www.achpr.org/communications/procedure/" target="_blank">http://www.achpr.org/communications/procedure/</a></p>
											<p>Informations sur le Système régional africain des droits de l’Homme par le Centre des ressources de la Justice internationale: <a href="http://www.ijrcenter.org/regional/african/" target="_blank">http://www.ijrcenter.org/regional/african/</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> La Commission africaine a un délai strict de prescription. Si vous avez essayé de déposer une plainte dans votre pays sans succès, vous devez déposer une plainte à la Commission africaine dans un "délai raisonnable", à moins que vous puissiez démontrer qu’il n’a pas été possible de déposer la plainte dans un délai fixé.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_echr" class="ccij-outcome">
										<img src="images/0.png" class="sprites echr" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">La Cour européenne des droits de l’Homme</h4>
										<div class="outcome-abbreviation">CEDH</div>
										<div class="outcome-description">
											<p>La CEDH est une Cour permanente internationale située à Strasbourg, en France. Elle statue sur les plaintes venant de particuliers et de gouvernements concernant les violations présumées des droits civils et politiques énoncées dans la <span class="italic">Convention Européenne des Droits de l’Homme</span>, qui est entrée en vigueur le 3 septembre 1953. Il n’est pas nécessaire que les victimes soient citoyennes d’un pays qui a ratifié la Convention. Plutôt, la violation alléguée doit avoir été commise par un pays ayant ratifié la Convention. Les particuliers peuvent déposer les plaintes à la CEDH après avoir intenté des recours dans leur pays d’origine. Les plaintes doivent être enregistrées six mois après une décision finale d’un tribunal national. En outre, les plaintes qui sont incompatibles avec la Convention ou son Protocole ne peuvent être entendues.</p>
											<p>Le processus est fait par écrit. À la première étape, il n’est pas nécessaire que la victime soit représentée par un avocat (mais un avocat est nécessaire une fois que le gouvernement accusé de violation a été informé). Une demande peut être prise par un seul juge, un Comité (3 juges) ou une Chambre (5 juges). Les décisions d’une Chambre peuvent être à nouveau référées à une Grande Chambre (17 juges). Les jugements de la CEDH sont exécutoires et appliqués par le Comité des Ministres du Conseil de l’Europe, et peuvent mener des gouvernements à modifier leur législation et leurs pratiques administratives, ainsi qu’à verser une indemnité dans de nombreuses circonstances. Il y a eu un total de 93 397 en compensations accordées en 2013.</p>
											<p>Liens:</p>
											<p><a href="http://www.echr.coe.int/Pages/home.aspx?p=home" target="_blank">http://www.echr.coe.int/Pages/home.aspx?p=home</a></p>
											<p><a href="http://www.echr.coe.int/Pages/home.aspx?p=applicants&amp;c" target="_blank">http://www.echr.coe.int/Pages/home.aspx?p=applicants&amp;c</a></p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> La Cour européenne des droits de l’homme a un délai très strict de prescription. Si vous avez essayé de déposer une plainte dans votre pays sans succès, vous avez seulement six mois pour déposer une cause à la Cour européenne des droits de l’Homme.</div>
									</div>
								</div>
							</div>
							<hr />
							<h3>National ou canadien</h3>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_eccc" class="ccij-outcome">
										<img src="images/0.png" class="sprites eccc" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">La Chambre extraordinaire des tribunaux cambodgiens (CETC)</h4>
										<div class="outcome-abbreviation">CETC</div>
										<div class="outcome-description">
											<p>Les CETC, aussi connu comme le tribunal des Khmers Rouge, est une initiative du gouvernement Cambodgien et des Nations Unies. Les CETC ont un mandat légal de poursuivre les hauts dirigeants et ceux qui sont principalement responsables des atrocités commises durant le régime des Khmers Rouge entre le 17 avril 1975 et le 7 janvier 1979. À ce jour, la CETC a complété le procès de Kaing Guek Eav (alias Duch) et le procès de Nuon Chea et Khieu Samphan. Un second procès de Nuon Chea et Khieu Samphan est en cours. Bien qu’ils aient des plans pour poursuivre les deux autres causes, les identités des accusés dans ces situations n’ont pas été rendues publiques, et il y a certaines questions à savoir si les causes seront jugées. Les CETC acceptent actuellement les appels des victimes pour participer à ces deux dernières causes.</p>
											<p>Les CETC ont un nouveau mandat pour la participation d’une victime, en permettant aux particuliers d’enregistrer des plaintes devant les CETC, ainsi que demander de participer comme parties civiles dans les procédures. Comme il n’y a pas de mandat pour les particuliers, les parties civiles peuvent demander réparations collectives et morales dans le cas où le défendeur est déclaré coupable. Celles-ci incluent des excuses publiques et des programmes d’éducation.</p>
											<p>Pour des informations sur le CETC, veuillez consulter le site du Tribunal (<a href="http://www.eccc.gov.kh/en/" target="_blank">http://www.eccc.gov.kh/en/</a>) et l’Observateur du tribunal Cambodgien (<a href="http://www.cambodiatribunal.org" target="_blank">http://www.cambodiatribunal.org</a>).</p>
											<p>Pour de plus amples information concernant la participation de victime à la CETC, voir: <a href="http://www.eccc.gov.kh/en/victims-support" target="_blank">http://www.eccc.gov.kh/en/victims-support</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_bosnia" class="ccij-outcome">
										<img src="images/0.png" class="sprites bosnia" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">La Chambre des crimes de guerre de la Bosnie-Herzégovine</h4>
										<div class="outcome-description">
											<p>La Chambre des crimes de guerre de la Bosnie-Herzégovine a été créée en 2002 et a débuté ses opérations le 9 mars 2005. La CCG a été créée dans le cadre d’une initiative pour transférer les causes du Tribunal pénal international de l’ex-Yougoslavie (TPIY) à la juridiction nationale et ainsi réduire le retard des causes au TPIY, tout en aidant à reconstruire un système juridique en Bosnie Herzégovine et en faisant la promotion de la réconciliation en imposant la responsabilité des crimes de guerre. Contrairement au TPIY, la CCG n’est pas un tribunal international ad hoc et n’a pas une existence limitée. Elle opère conformément au Code criminel et au Code de procédure pénale de la Bosnie Herzégovine.</p>
											<p>La CCG tient actuellement des procès de suspects de niveau faible à intermédiaire de crimes de guerre commis sur le territoire de l’ex-Yougoslavie depuis 1991. Les cas peuvent être initiés par le TPIY puis transférés à la CCH ou bien passer directement par une investigation entamée par le Procureur général de la Bosnie Herzégovine.</p>
											<p>Liens:</p>
											<p><a href="http://www.sudbih.gov.ba/?jezik=e" target="_blank">http://www.sudbih.gov.ba/?jezik=e</a></p>
											<p><a href="http://www.trial-ch.org/en/resources/tribunals/hybrid-tribunals/war-crimes-chamber-in-bosnia-herzegovina.html" target="_blank">http://www.trial-ch.org/en/resources/tribunals/hybrid-tribunals/war-crimes-chamber-in-bosnia-herzegovina.html</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_crim_pro_can" class="ccij-outcome">
										<img src="images/0.png" class="sprites canada-flag" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Poursuites criminelles au Canada</h4>
										<div class="outcome-description">
											<p>Les personnes présentes au Canada qui sont présumées avoir commis des crimes internationaux peuvent être poursuivies devant les tribunaux canadiens. Les poursuites criminelles sont entamées par le ministère de la Justice du Canada, qui a un programme canadien spécialisé dans le domaine des crimes de guerre. Les crimes internationaux, comprennent le génocide, les crimes contre l’humanité et les crimes de guerres qui sont tous des crimes au Canada peu importe où ils ont été commis. Les poursuites des crimes internationaux sont rares au Canada. Seules deux poursuites ont été entreprises sous la <span class="italic">Loi sur les crimes contre l’humanité et les crimes de guerre</span> depuis son entrée en vigueur en 2000. Dans les deux cas, c’était pour des personnes accusées pour une implication en 1994 dans le génocide au Rwanda. Désiré Munyaneza a été condamné pour génocide, pour crimes de guerre et pour crimes contre l’humanité, et Jacques Mungwarere a été acquitté de charges contre lui pour génocide et crimes contre l’humanité.</p>
											<p>Programme sur les crimes de guerre: <a href="http://justice.gc.ca/eng/cj-jp/wc-cdg/succ-real.html" target="_blank">http://justice.gc.ca/eng/cj-jp/wc-cdg/succ-real.html</a></p>
											<p>Pour plus d’informations sur les Crimes contre l’humanité et les Crimes de guerre: <a href="http://www.international.gc.ca/court-cour/war-crimes-guerres.aspx?lang=eng" target="_blank">http://www.international.gc.ca/court-cour/war-crimes-guerres.aspx?lang=eng</a></p>
											<p>Pour des informations concernant la poursuite criminelle de Jacques Mungwarere, voir: <a href="http://www.ccij.ca/programs/index.php?DOC_INST=2" target="_blank">http://www.ccij.ca/programs/index.php?DOC_INST=2</a></p>
											<p>Pour des informations concernant la poursuite criminelle de Désiré Munyaneza, voir: <a href="http://www.ccij.ca/programs/cases/index.php?WEBYEP_DI=12" target="_blank">http://www.ccij.ca/programs/cases/index.php?WEBYEP_DI=12</a></p>
										</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_civ_law_can" class="ccij-outcome">
										<img src="images/0.png" class="sprites canada-flag" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Poursuites civiles au Canada</h4>
										<div class="outcome-description">
											<p>Les particuliers peuvent être en mesure de poursuivre au civil devant un tribunal canadien dans certaines circonstances. Les poursuites civiles sont différentes des procédures criminelles. Une poursuite civile porte sur un différend entre deux parties privées, alors que dans un procès criminel le gouvernement agit comme procureur pour obliger une personne ou un organisme à respecter la loi. Dan une poursuite civile, il n’y a pas de possibilité de sentence criminelle. Une poursuite civile est généralement déposée pour demander une compensation financière pour méfait. La victime peut poursuivre une personne, le gouvernement ou une entreprise si elle croit qu’elle ou lui est responsable pour un dommage. Si la victime gagne la cause, il se peut que l’on demande à la partie perdante de payer des dommages financiers pour dédommager la victime pour perte de revenus ou de propriété, pour tenir compte de la souffrance qui lui a été infligée, ou agir à titre de peine punitive pour décourager une telle conduite à l’avenir.</p>
											<p>Pour présenter une poursuite civile, une personne dont les droits ont été violés doit soumettre une plainte à un tribunal canadien qui a une autorité légale pour régler le différend avec la personne ou l’organisation accusée d’avoir causé un préjudice. Il y a des restrictions sur qui peut bénéficier d’une capacité juridique en tant que plaignant, et des limites sur qui peut être poursuivi. Il n’y a eu que très peu de poursuites civiles au Canada ayant trait à la torture, aux crimes de guerre et les autres violations de droits internationaux. Une des raisons est parce que les gouvernements étrangers et leurs fonctionnaires ont habituellement une immunité légale devant les tribunaux canadiens et ainsi les poursuites civiles contre eux sont souvent écartées. À moins que la Cour suprême du Canada ne change cette situation dans une décision à venir, ou le Parlement ne change la loi, l’option d’une poursuite civile peut seulement être disponible contre les individus qui n’ont pas de lien avec le gouvernement ou contre des sociétés.</p>
											<p>Pour des informations de base sur les poursuites criminelles ou civiles au Canada, voir <a href="http://www.justice.gc.ca/eng/csj-sjc/just/08.html" target="_blank">http://www.justice.gc.ca/eng/csj-sjc/just/08.html</a>.</p>
											<p>Pour des exemples de poursuites civiles où le CCJI a été impliqué, voir les poursuites contre le gouvernement de l’Iran au nom de <a href="http://www.ccij.ca/programs/cases/index.php?WEBYEP_DI=10" target="_blank">Zahra Kazemi</a> et <a href="http://www.ccij.ca/programs/cases/index.php?WEBYEP_DI=5" target="_blank">Houshang Bouzari</a>, et celle de <a href="http://www.ccij.ca/programs/cases/index.php?WEBYEP_DI=14" target="_blank">Anvil Mining on behalf of the Canadian Association against Impunity</a>.</p>
										</div>
										<div class="outcome-caveat"><span class="caveat">*</span> There is usually a limitations period for filing a civil lawsuit in Canada. Some cases must be filed within two years of when the abuse(s) occurred though sometimes this period is longer.</div>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-24 col-xs-24 col-sm-24 col-md-24 col-lg-24">
									<div id="ccij_outcome_imm_pen_can" class="ccij-outcome">
										<img src="images/0.png" class="sprites canada-flag" width="75" height="75" alt="logo image" />
										<h4 class="outcome-title">Les sanctions en matière d’immigration au Canada</h4>
										<div class="outcome-description">
											<p>Dans certains cas, les personnes soupçonnées ou reconnues coupables d’avoir commis de graves violations des droits de la personne peuvent être empêchées d’entrer au Canada et peuvent être forcées que quitter le pays. Là où le gouvernement canadien a des motifs raisonnables de croire qu’une personne a commis ou a été complice de crimes de guerre, de crimes contre l’humanité, ou de génocide, il peut interdire l’entrée de la personne au Canada ou forcer son départ. Ces personnes peuvent perdre leur citoyenneté canadienne, être expulsées du Canada, être extradées vers un État étranger ou être remises à un tribunal international pour faire face à un procès au criminel. Elles peuvent aussi se voir refuser la protection de réfugié. L’Agence canadienne des services frontaliers (ACSF), quelquefois assistée du ministère de la citoyenneté et de l’immigration mène des enquêtes sur les suspects, et réfère des causes à la Commission de l'immigration et du statut de réfugié pour se prononcer à savoir si une personne doit être autorisée à entrer ou demeurer au Canada.</p>
											<p>Liens:</p>
											<p><a href="http://www.justice.gc.ca/eng/cj-jp/wc-cdg/part.html" target="_blank">http://www.justice.gc.ca/eng/cj-jp/wc-cdg/part.html</a></p>
											<p>Pour plus d’informations sur ces questions et sur l’immigration et la Loi sur la protection des réfugiés, voir <a href="http://cbsa.gc.ca/security-securite/wc-cg/wc-cg2011-eng.html" target="_blank">http://cbsa.gc.ca/security-securite/wc-cg/wc-cg2011-eng.html</a></p>
											<p>Pour un exemple de cause où le CCJI a été impliqué avec dans le but d’exclure la protection de réfugié, voir: <a href="http://www.ccij.ca/programs/cases/index.php?DOC_INST=9" target="_blank">http://www.ccij.ca/programs/cases/index.php?DOC_INST=9</a></p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="flow" class="main-focus">
							<div id="flow_intro"></div>
							<div id="flow_body">
								<div id="flow_content"></div>
							</div>
							<div id="flow_questions">
								<div id="flow_question_1">
									<div class="question-content">Dans quel pays ces mauvais traitements ont-ils eu lieu?</div>
									<div class="question-explanation">La plupart des institutions judiciaires ont juridiction sur des abus qui ont lieu dans certains pays mais pas dans d’autres. Par exemple, le Comité des Nations Unies contre la torture peut seulement examiner des cas possibles de torture lorsque le pays responsable a accepté que le Comité puisse examiner les cas qui ont sont en lien avec ce pays.</div>
								</div>
								<div id="flow_question_2a">
									<div class="question-content">Est-ce que des gens qui sont citoyens de tout autre pays ont participé dans les évènements ayant mené aux mauvais traitements?</div>
									<div class="question-explanation">Certaines institutions juridiques ont seulement autorité concernant les abus qui sont commis par des gens qui sont citoyens de certains pays. Par exemple, les citoyens des pays qui ont accepté le traité de la Cour pénale internationale peuvent être poursuivis par la Cour, même si les crimes ont été commis dans un pays différent.</div>
									<div class="question-explanation">Une réponse 'inconnu' à cette question suppose qu’il n’y a pas de citoyens d’un autre pays qui auraient pris part à ces abus. Autrement dit, pour cette question une réponse 'inconnu' aura le même résultat qu’un 'non'.</div>
								</div>
								<div id="flow_question_2b">
									<div class="question-content">Quelle autre citoyenneté avaient-ils?</div>
								</div>
								<div id="flow_question_3">
									<div class="question-content"><p>À quelle date le ou les abus se sont-ils produits? (Si la violence s’est poursuivie pendant plus d’une journée, choisissez la date la plus récente à laquelle cet abus s’est produit.)</p><p>Choisir une date en utilisant le calendrier ci-dessous.</p></div>
									<div class="question-explanation">L’autorité de certaines institutions judiciaires est limitée aux abus commis avant et après certaines dates. Souvent, il s’agit de la date à laquelle un pays accepte un accord particulier. Par exemple, la Cour pénale internationale enquête sur les abus commis après le l<sup>er</sup> juillet 2002, lorsque l’accord de la Cour est entré en vigueur. Il y a aussi des instances où certaines institutions judiciaires demandent aux survivants ou à leurs familles de porter plainte à l’intérieur d’un certain délai après que l’abus ait été commis. Ce concept est plus communément connu sous le terme "prescription" ou "délai de prescription".</div>
								</div>
								<div id="flow_question_4">
									<div class="question-content">Au moment des abus, quelle citoyenneté avait la victime?</div>
									<div class="question-explanation">Cette question est souvent importante dans les procédures criminelles, et quelques juridictions nationales ont l’autorité d’entendre des causes impliquant des crimes commis contre leurs citoyens à l’étranger. Par exemple, le gouvernement du Canada a le pouvoir de poursuivre au criminel des personnes qui commettent des crimes contre des citoyens canadiens même  si ceux-ci sont commis à l’extérieur du Canada.</div>
								</div>
								<div id="flow_question_5a">
									<div class="question-content">Au moment où les abus ont été subis, est-ce que la victime était citoyenne d’un autre pays?</div>
								</div>
								<div id="flow_question_5b">
									<div class="question-content">De quel autre pays la victime était-elle citoyenne au moment des évènements?</div>
								</div>
								<div id="flow_question_6">
									<div class="question-content">
										<div class="question-answerer-check-yes-no-radio">
											<form>
												<p>
													Was the abuse committed against a woman?
													<input type="radio" id="q6_woman_yes" name="Abuse against a woman" value="yes" /><label for="q6_woman_yes">Oui</label>
													<input type="radio" id="q6_woman_no" name="Abuse against a woman" value="no" checked="checked" /><label for="q6_woman_no">Non</label>
												</p>
											</form>
										</div>
										<div class="question-answerer-check-yes-no-radio">
											<form>
												<p>
													Was the abuse committed against a child under the age of 18?
													<input type="radio" id="q6_child_yes" name="Abuse against a child under the age of 18" value="yes" /><label for="q6_child_yes">Oui</label>
													<input type="radio" id="q6_child_no" name="Abuse against a child under the age of 18" value="no" checked="checked" /><label for="q6_child_no">Non</label>
												</p>
											</form>
										</div>
										<p>Décrivez les mauvais traitements commis contre la victime. Parmi les options suivantes, choisissez celle(s) qui s’appliquent à la situation.</p>
									</div>
									<div class="question-explanation">Différentes institutions judiciaires ont l’autorité sur différentes sortes de violations des droits de la personne. À titre d’exemple, le Comité des droits de l’Homme des Nations Unies peut prendre en considération un grand nombre de mauvais traitements. Le choix d’actions pertinentes sur cette liste communiquera l’information nécessaire pour déterminer quels mauvais traitements peuvent avoir été commis et de ce fait quels tribunaux et quels processus judiciaires peuvent être disponibles.</div>
								</div>
								<div id="flow_question_7">
									<div class="question-content">Est-ce que les mauvais traitements ont été commis pendant une guerre?</div>
									<div class="question-explanation">Certains tribunaux ont l’autorité sur des crimes commis dans le cadre d’une guerre internationale ou civile. Ces crimes sont appelés "crimes de guerre". D’autre institutions judiciaires ont l’autorité sur des crimes qui n’ont pas été commis pendant une guerre. Par exemple, la Cour pénale internationale peut être capable de poursuivre le meurtre ou l’assassinat de civils comme "crime de guerre" si les soldats ont commis ces actes pendant une guerre.</div>
								</div>
								<div id="flow_question_8">
									<div class="question-content">Est-ce que ces abus ont été commis contre plusieurs autres personnes à ce moment-là?</div>
									<div class="question-explanation">Certaines institutions judiciaires ont l’autorité sur des crimes qui sont généralisés ou de nature systémique. Ces crimes sont appelés « Crimes contre l’humanité ». Par exemple, la Cour pénale internationale peut poursuivre pour meurtre comme « Crime contre l’humanité » si ce crime faisait partie d’une violence généralisée contre des civils.</div>
								</div>
								<div id="flow_question_9">
									<div class="question-content">Est-ce que la victime était ciblée en raison de sa race, son ethnicité, sa religion ou sa nationalité?</div>
									<div class="question-explanation">Certaines institutions judiciaires ont l’autorité sur le génocide, ce qui fait référence à certains actes qui sont commis avec l’intention de détruire un groupe particulier. Par exemple, la Cour pénale internationale peut être en mesure de poursuivre le meurtre ou le déplacement forcé des personnes d’une religion ou d’une race particulière.</div>
								</div>
								<div id="flow_question_10">
									<div class="question-content">
										<p>Qui a commis ces abus?</p>
										<p>Sélectionnez tout ce qui s'applique parmi les options suivantes.</p>
									</div>
									<div class="question-explanation">L’autorité de certaines institutions judiciaires est limitée aux actes commis par les représentants gouvernementaux et ne s’étend pas aux crimes commis par des civils. Par exemple, "la torture" est un abus des droits de l’Homme qui nécessite habituellement l’implication du gouvernement. Si quelqu’un est battu mais qu’il n’y a pas d’implication gouvernementale, ce n’est pas considéré comme de "la torture" et tombe à l’extérieur de la juridiction des processus de justice internationale.</div>
									<div class="question-explanation">Veuillez s’il vous plaît répondre "Inconnu" si vous n’êtes entièrement certain de savoir qui est responsable de ces abus. Une réponse "Inconnu" à cette question n’éliminera pas l’une des options judiciaires.</div>
								</div>
								<div id="flow_question_11">
									<div class="question-content">Est-ce que l’une ou l’autre de ces personnes responsables de ces abus vit actuellement au Canada?</div>
									<div class="question-explanation">Certaines procédures juridiques au Canada sont possibles lorsque la personne responsable des abus demeure au Canada. Par exemple, le gouvernement canadien peut être en mesure de poursuivre criminellement, déporter ou retirer la citoyenneté de quelqu’un qui demeure au Canada et qui pourrait avoir été impliqué dans des violations des droits de l’Homme.</div>
									<div class="question-explanation">Une réponse "inconnu" à cette question suppose qu’aucune des personnes responsables pour ces violations n’habite au Canada. En d’autres termes, pour cette question une réponse "inconnu" donnera le même effet qu’un "non".</div>
								</div>
								<div id="flow_question_12">
									<div class="question-content">Est-ce que l’une ou l’autre de ces personnes responsables de ces abus a déjà visité le Canada ou compte le faire prochainement?</div>
									<div class="question-explanation">Le Canada a l’autorité de demander justice contre les personnes qui ont commis certains abus dans d’autres pays. Lorsqu’une telle personne visite le Canada ou essaye d’entrer au Canada, il peut être possible pour le gouvernement canadien de prendre action, fort probablement par des sanctions par le systèmes d’immigration comme la déportation ou le refus d’accorder un visa.</div>
									<div class="question-explanation">Une réponse "inconnu" à cette question suppose qu’aucune des personnes responsables pour ces violations n’a visité le Canada. En d’autres termes, pour cette question une réponse "inconnu" donnera le même résultat qu’un "non".</div>
								</div>
								<div id="flow_question_13">
									<div class="question-content">Est-ce que l’une ou l’autre des personnes responsables de(s) abus a déjà voyagé à l’extérieur du pays où ces abus ont été commis?</div>
									<div class="question-explanation">Plusieurs pays à travers le monde ont l’autorité de poursuivre les personnes présentes sur leur territoire qui commettent certains abus, peu importe où l’abus a été commis. Malgré le fait que l’analyse de cette option dépasse la portée de ce site Web, la réponse à cette question pourrait être utile au CCJI si vous décidez de nous contacter concernant des solutions judiciaires.</div>
									<div class="question-explanation">Une réponse "inconnu" à cette question suppose qu’aucune des personnes responsables pour ces violations ne voyage à l’extérieur du pays. En d’autres termes, pour cette question une réponse "inconnu" donnera le même résultat qu’un "Non".</div>
								</div>
								<div id="flow_question_14a">
									<div class="question-content">À votre avis, dans le pays où les abus ont été commis, est-ce que les tribunaux sont équitables et indépendant, de manière à ce que  justice puisse y être rendue?</div>
									<div class="question-explanation">Plusieurs institutions judiciaires supposent que le gouvernement a comme responsabilité première de pénaliser les abus au lieu où ils ont été commis. Par conséquent, leur autorité peut être limitée à des situations auxquelles le gouvernement responsable est réticent ou incapable de prendre des mesures ou les tribunaux ne sont pas équitables ou indépendants.</div>
									<div class="question-explanation">Une réponse "Inconnu" à cette question suppose que les tribunaux ne sont pas équitables et indépendants. En d’autres termes, pour cette question une réponse "inconnu" aura le même résultat qu’un "Non".</div>
								</div>
								<div id="flow_question_14b">
									<div class="question-content">Est-ce que la victime ou la famille de la victime a essayé d’entamer des procédures ou une plainte devant les tribunaux, la police ou devant d’autres autorités dans le pays où les abus ont été commis?</div>
									<div class="question-explanation">Si le survivant ou la famille de la victime a essayé d’engager des procédures dans le pays où les abus ont été commis, mais la cause a échoué pour certaines raisons, ceci peut augmenter la possibilité qu’une institution judiciaire internationale puisse se pencher sur la cause.</div>
									<div class="question-explanation">Une réponse "inconnu" à cette question suppose que la victime ou la famille de la victime n’a pas tenté de déposer une plainte ou d’entamer des procédures judiciaires. En d’autres termes, pour cette question une réponse "inconnu" aura le même résultat qu’un "Non".</div>
								</div>
								<div id="flow_question_14c">
									<div class="question-content">Quel en était le résultat?</div>
									<div class="question-explanation">Si le survivant ou la famille de la victime a essayé de porter la cause dans le pays où les abus ont été commis mais que la cause a échoué pour certaines raisons, ceci peut augmenter la possibilité qu’une institution judiciaire internationale puisse se pencher sur le dossier.</div>
								</div>
								<div id="flow_question_15">
									<div class="question-content">Est-ce que la victime ou la famille de la victime a déposé une plainte à une autre Cour ou à un organisme international?</div>
									<div class="question-explanation">Quelques institutions judiciaires désirent éviter de dédoubler le travail des autres institutions. Ainsi, plusieurs vont refuser d’accepter une cause si un autre tribunal ou organisme international a déjà révisé la cause.</div>
									<div class="question-explanation">Une réponse "inconnu" à cette question suppose que la victime ou la famille de la victime n’a déposé de plainte à aucune Cour internationale ou organisme. En d’autres termes, pour cette question une réponse "inconnu" aura le même résultat qu’un "non".</div>
								</div>
							</div>
						</div>
						<div id="flow_restart_confirm" title="Confirm restart">
							<p>Êtes-vous sûr de vouloir recommencer?</p>
						</div>
					</div>
					<div id="flow_print">
						<h3>CCIJ - Opportunities for Justice</h3>
						<p>
							Please note that this site provides only information, not legal advice. A legal case cannot be based on the results of this questionnaire, as every case and every legal process is extremely unique and complex. This website is designed to help you understand what options might be available and is not designed to make a final conclusion about your case.
						</p>
						<div id="flow_questions_print"><p>You have not yet answered any questions</p></div>
						<div id="flow_outcomes_print"></div>
					</div>
					<div id="flow_scratch"></div>

					<!-- breakpoint check adapted from http://stackoverflow.com/a/22885503/519575 -->
					<div id="flow_size_check">
						<div id="flow_size_xs" class="size-check device-xs visible-xs"></div>
						<div id="flow_size_sm" class="size-check device-sm visible-sm"></div>
						<div id="flow_size_md" class="size-check device-md visible-md"></div>
						<div id="flow_size_lg" class="size-check device-lg visible-lg"></div>
					</div>
				<!-- Start W&H footer -->
				</div>
			</div>
		</div>
	</div>
	<footer class="wise-footer">
		<div class="container">
			<div class="row">
				<div class="col-sm-8">
					<h3>The Canadian Centre for International Justice</h3>
					<ul class="list-unstyled">
						<li>Ottawa Office: 613-744-7667</li>
						<li>Vancouver Office: 613-744-7667</li>
						<li>Fax: 613-744-7667</li>
					</ul>
					<p>
						Inquiries: <a href="mailto:info@ccij.ca">info@ccij.ca</a>
					</p>
				</div>
				<div class="col-sm-8">
					<h3>Support the Centre</h3>
					<p>
						The Canadian Centre for International Justice needs your support.
					</p>
					<p>
						<a href="#" class="btn btn-primary btn-lg">Donate Now</a>
					</p>
				</div>
				<div class="col-sm-8">
					<ul class="list-inline">
						<li>
							<a href="https://www.facebook.com/pages/Canadian-Centre-for-International-Justice-CCIJ/27176895148" title="Follow us on Facebook" class="wise-sprite-social wise-sprite-social-facebook">Follow us on Facebook</a>
						</li>
						<li>
							<a href="http://twitter.com/CCIJ_CCJI" title="Follow us on Twitter" class="wise-sprite-social wise-sprite-social-twitter">Follow us on Twitter</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/company/canadian-centre-for-international-justice" title="Follow us on LinkedIn" class="wise-sprite-social wise-sprite-social-linkedin">Follow us on LinkedIn</a>
						</li>
						<li>
							<a href="http://vimeo.com/user18059102" title="Follow us on Vimeo" class="wise-sprite-social wise-sprite-social-vimeo">Follow us on Vimeo</a>
						</li>
						<li>
							<a href="http://ccij.wiseworkbench.com/?feed=rss2" title="Subscribe to our RSS Feed" class="wise-sprite-social wise-sprite-social-rss">Subscribe to our RSS Feed</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
	<div class="wise-foot">
		<ul class="list-inline">
			<li><a href="#">Accessibility</a></li>
			<li><a href="#">Terms &amp; Conditions</a></li>
		</ul>
		<p>
			Charitable Registration Number: 87346 1040 RR0001
		</p>
		<small>
			All Material Copyright © 2014 Canadian Centre for International Justice
		</small>
	</div>
	<!-- End W&H footer -->
	<script type="text/javascript">
	    var requirejs = { urlArgs: 'flow-v=0.9.63' };
	    window.CCIJ = { language: 'french' };
	</script>
	<script type="text/javascript" data-main="js/app-fr" src="js/lib/require-2.1.11.js"></script>
</body>
</html>