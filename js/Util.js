Flow.Util = {

	getIdFromText: function(text) {
		return text.toLowerCase().replace(/[^a-z]+/g, '_');
	},
	
	// using http://stackoverflow.com/a/2117523/519575
	generateId: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	},
	
	idAlreadyExists: function(id, collection) {
	
		var found = _.find(collection, function(value, key) {
			return (key == id);
		});
		
		return !!found;
	}
};
