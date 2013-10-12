ll.directive("auth", [function () {
	return {
		restrict: "E",
		template: '<div ng-show="loading" style="margin-top: 3px; margin-right: 10px;"><i class="icon-spin icon-spinner"></i></div><button class="btn btn-link" ng-click="doLogin()" ng-hide="current() || loading">Login</button><div ng-show="current() && !loading">Hi, {{current()._source.name}} <button class="btn btn-link" ng-click="doLogout()">Logout</button></div>',
		controller: ["$scope", "safeApply", "auth",
			function($scope, safeApply, auth) {

			$scope.current = auth.current;

			$scope.loading = true;

			$scope.$on("auth", function() {
				$scope.loading = false;
				safeApply($scope);
			});

			$scope.doLogin = function() {
				vex.dialog.open({
					"message": "Log in to LuvLDN",
					"input": '<input name="username" type="text" placeholder="Username" required /><input type="password" name="password" placeholder="Password" />',
					"buttons": [
						$.extend({}, vex.dialog.buttons.YES, { text: 'Login' }),
						$.extend({}, vex.dialog.buttons.NO, { text: 'Cancel' })
					],
					"callback": function(data) {
						$scope.loading = true;
						safeApply($scope);
						auth.login(data.username, function(res) {
							$scope.loading = false;
							safeApply($scope);
							if (!res) {
								vex.dialog.confirm({
									"message": "Invalid credentials. Try again?",
									"callback": function(res) {
										if (res) {
											$scope.doLogin();
										}
									}
								});
							}
						});
					}
				});
			}

			$scope.doLogout = function() {
				auth.logout();
			}

		}]
	};
}]);