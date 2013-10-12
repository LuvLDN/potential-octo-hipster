ll.factory("auth", ["$rootScope", "cacookie", "users",
	function($scope, cookie, users) {

	var currentUser = false;

	var checkCookie = function() {
		var res = cookie.read("luvldn");
		if (res && !currentUser) {
			// There is a cookie but no current user, so log in
			users.getById(res, function(data) {
				currentUser = data;
				$scope.$broadcast("auth");
			});
		} else if (!res && currentUser) {
			// There is a user but no cookie, so log out
			currentUser = false;
			$scope.$broadcast("auth");
		} else {
			$scope.$broadcast("auth");
		}
	}
	setInterval(checkCookie, 500);

	return {
		"login": function(username, cb) {
			users.getByUsername(username, function(data) {
				if (!data.length) {
					cb(false);
				} else {
					cookie.create("luvldn", data[0]._id);
					currentUser = data[0];
					$scope.$broadcast("auth");
					cb(true);
				}
			});
		},
		"current": function() {
			return currentUser;
		},
		"logout": function() {
			cookie.erase("luvldn");
			currentUser = false;
			window.location.href = "/";
		}
	}

}]);