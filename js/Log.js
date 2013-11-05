Flow.Log = {
	
	logLevels: {
		ERROR: 1,
		WARNING: 2,
		INFO: 3,
		DEBUG: 4
	},
	
	logLevel: undefined,
	
	defaultLogLevel: 4,
	
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
				
			var toLog = '[' + currentLogLevelName + ' ' + (new Date()).getTime() + ']: ' + message;
			if(currentLogLevel === this.logLevels.ERROR) {
				console.error(toLog);
			}
			else {
				console.log(toLog);
			}
			
			// option to submit message to server log at a later date if logToServer
		}
	}
};
