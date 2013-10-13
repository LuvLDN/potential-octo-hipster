ll.controller("CharityList", ["$scope", "safeApply", "elasticsearch", "auth",
	function($scope, safeApply, es, auth) {

		$scope.charityList = [];

		es.type("charity").getAll()
			.done(function(d) {
				var data = d.hits.hits;
				data.map(function(obj) { $scope.charityList.push(obj['_source']) });
				console.log($scope.charityList);
				safeApply($scope);
				
			}).fail(function() {
				vex.dialog.alert("Unable to find a charity");
				safeApply($scope);
			})

	}]);