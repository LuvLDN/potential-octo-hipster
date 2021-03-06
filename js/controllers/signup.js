ll.controller("Signup", ["$scope", "safeApply", "users", "cacookie", "auth",
	function($scope, safeApply, users, cookie, auth) {

	$scope.loading = false;

	$scope.doSignup = function(type) {
		if (auth.current()) {
			return;
		}
		$scope.loading = true;
		users.getByUsername($scope.username, function(data) {
			if (!data.length) {
				users.create($scope.username, $scope.email, $scope.phone, type, function(id) {
					if (id) {
						// Succeeded in creating the user so sign them in
						auth.login($scope.username, function() {
							// Done completely
							$scope.loading = false;
							safeApply($scope);
							vex.dialog.alert({
								"message": "Welcome on board! You're signed up and logged in.",
								"callback": function() {
									if (type == "customer") {
										window.location.href = "customer.html";
									} else if (type == "merchant") {
										window.location.href = "merchant.html";
									}
								}
							});
						});
					} else {
						$scope.loading = false;
						safeApply($scope);
						vex.dialog.alert("Unable to sign you up :-( Please try again.")
					}
				});
			} else {
				$scope.loading = false;
				vex.dialog.alert("Your username has already been taken. Please choose another.")
				safeApply($scope);
			}
		});
	}

}]);