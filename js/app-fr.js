requirejs.config({
	
	baseUrl: 'js',

	paths: {
		'text': './lib/require-text-2.0.10',
		'jquery': './lib/jquery-1.10.2.min',
		'jquery-ui-no-i18n': './lib/jquery-ui.min',
        'jquery-ui': './lib/jquery-ui-i18n-datepicker-fr',
		'jquery-mobile': './lib/jquery.mobile.custom.min',
		'underscore': './lib/underscore-1.5.2-min',
		'backbone': './lib/backbone-1.1.0-min',
		'bootstrap': './lib/bootstrap.min',
		
		'data': './flow/data',
		'ui': './flow/ui',
		'templates': './template/french'
	},

	shim: {
        'jquery-ui-no-i18n': ['jquery'],
        'jquery-ui': ['jquery-ui-no-i18n'],
        'jquery-mobile': {
            exports: '$',
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
        },
        'bootstrap': ['jquery']
    }
});

require(['init']);
