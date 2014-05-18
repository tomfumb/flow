define(['flow/Util'], function(Util) {
	
	return {
	
		logLevels: {
			ERROR: 1,
			WARNING: 2,
			INFO: 3,
			DEBUG: 4
		},
		
		logLevel: undefined,
		lastLogTime: undefined,
		
		defaultLogLevel: 4,
		logGapInterval: 200,
		
		init: function() {
			
			window.console = (window.console || {log: function() {}, error: function() {}});
			
			return this;	
		},
		
		debug: function(message) {
			this.log(this.logLevels.DEBUG, message, false);
		},
		
		info: function(message) {
			this.log(this.logLevels.INFO, message, false);
		},
		
		warning: function(message) {
			this.log(this.logLevels.WARNING, message, false);
		},
		
		error: function(message) {
			this.log(this.logLevels.ERROR, message, true);
		},
		
		log: function(level, message, logToServer) {
			
			var currentLogLevel, currentLogLevelName, eachLevel;
			
			logToServer = (typeof logToServer === 'undefined' ? false : true);
		
			currentLogLevel = (typeof this.logLevel === 'undefined' ? this.defaultLogLevel : this.logLevel);
			
			if(currentLogLevel >= level) {
				
				logLevelName = 'unknown';
				for(eachLevel in this.logLevels) {
					if(this.logLevels.hasOwnProperty(eachLevel)) {
						if(this.logLevels[eachLevel] === level) {
							levelName = eachLevel;
						}
					}
				}
					
				var now = new Date();
				var nowTime = now.getTime();
				var toLog = '[' + levelName + ' ' + Util.padZeros(now.getHours(), 2) + ':' + Util.padZeros(now.getMinutes(), 2) + ':' + Util.padZeros(now.getSeconds(), 2) + '.' + now.getMilliseconds() + ']: ' + message;
				
				if(level === this.logLevels.ERROR) {
					console.error(toLog);
				}
				else {
					if(this.lastLogTime && (nowTime - this.lastLogTime) >= this.logGapInterval) {
						console.log('');
					}
					console.log(toLog);
				}
				
				this.lastLogTime = nowTime;
				
				// option to submit message to server log at a later date if logToServer
			}
		}
	}.init();
});
