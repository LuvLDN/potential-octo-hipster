ll.controller("Signup", ["$scope", "users", "cacookie", "auth",
	function($scope, users, cookie, auth) {

	$scope.doSignup = function() {
		if (auth.current()) {
			return;
		}
		users.getByUsername($scope.username, function(data) {
			if (!data.length) {
				users.create($scope.username, "herp@derp.com", "customer", function(id) {
					if (id) {
						// Succeeded in creating the user so sign them in
						auth.login($scope.username, function() {
							// Done completely
						});
					}
				});
			}
		});
	}

}]);