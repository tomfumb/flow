Flow.Log = {
	
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
			
			currentLogLevelName = 'unknown';
			for(eachLevel in this.logLevels) {
				if(this.logLevels.hasOwnProperty(eachLevel)) {
					if(this.logLevels[eachLevel] === currentLogLevel) {
						currentLogLevelName = eachLevel;
					}
				}
			}
				
			var now = (new Date()).getTime();
			var toLog = '[' + currentLogLevelName + ' ' + now + ']: ' + message;
			
			if(currentLogLevel === this.logLevels.ERROR) {
				console.error(toLog);
			}
			else {
				if(this.lastLogTime && (now - this.lastLogTime) >= this.logGapInterval) {
					console.log('');
				}
				console.log(toLog);
			}
			
			this.lastLogTime = now;
			
			// option to submit message to server log at a later date if logToServer
		}
	}
};
