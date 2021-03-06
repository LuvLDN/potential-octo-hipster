ll.factory("users", ["elasticsearch",
	function(es) {
	
	return {
		"getById": function(id, cb) {
			es.type("user").get(id)
			.done(function(data) {
				cb(data);
			}).fail(function() {
				cb(false);
			});
		},
		"getByUsername": function(username, cb) {
			es.type("user").lookup("name", username)
			.done(function(data) {
				cb(data.hits.hits);
			}).fail(function() {
				cb(false);
			});
		},
		"create": function(username, email, phone, type, cb) {
			es.type("user").create({
				"name": username,
				"email": email,
				"type": type,
				"phone": phone
			}).done(function(data) {
				cb(data._id);
			}).fail(function() {
				cb(false);
			})
		},
		"delete": function(id, cb) {
			es.type("user").delete(id)
			.done(function(data) {
				cb(true);
			}).fail(function() {
				cb(false);
			});
		}
	}

}]);