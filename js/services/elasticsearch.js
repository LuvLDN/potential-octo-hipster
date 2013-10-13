ll.factory("elasticsearch", ["config",
	function(config) {
	
	var getEndpoint = function(path) {
		return config.es_host + "/" + config.es_index + path;
	}

	var objToParams = function(params, existPrefix) {
		var p = "";
		if (params) {
			var append = [];
			for (var k in params) {
				if (params.hasOwnProperty(k)) { // Check param is valid
					if (params[k]) { // Skip if its undefined or falsey
						if (!(params[k] instanceof Array)) { // Convert to array in case there is only one
							params[k] = [params[k]]
						}
						params[k].map(function(p) {
							append.push(k + "=" + p); // Push each one on to the list
						})
					}
				}
			}
			if (append.length) {
				p += (existPrefix ? existPrefix : "") + append.join("&");
			}
		}
		return p;
	}

	var doAjax = function(method, path, parameters) {
		var config = {
			"type": method,
			"dataType": "json"
		}
		if (method == "GET") {
			path += objToParams(parameters, "?");
		} else {
			config.contentType = parameters ? "application/json" : undefined;
			config.data = parameters ? JSON.stringify(parameters) : undefined;
		}
		return $.ajax(getEndpoint(path), config);
	}

	return {
		"type": function(type) {
			return {
				"get": function(id) {
					return doAjax("GET", "/" + type + "/" + id);
				},
				"create": function(data) {
					return doAjax("POST", "/" + type + "/", data);
				},
				"lookup": function(field, value) {
					return doAjax("GET", "/" + type + "/_search", { "q": field + ":" + value});
				},
				"delete": function(id) {
					return doAjax("DELETE", "/" + type + "/" + id);
				},
				"getAll": function() {
					return doAjax("GET", "/" + type + "/_search");
				},
				"patch": function(id, key, value) {
					return doAjax("POST", "/" + type + "/" + id + "/_update", {
						"script": 'ctx._source.' + key + ' = "' + value + '"'
					});
				},
				"geoDistance": function(property,lat,lng) {
					return doAjax("POST", "/" + type + "/_search", {
						"filtered": {
							"query": {
								"match_all": {}
							},
							"filter": {
								"geo_distance":{
									"distance": "20km", 
									property: {
										"lat":lat,
										"lng":lng
									}
								}
							}
						}
					});
				}
			}
		}
	}

}]);