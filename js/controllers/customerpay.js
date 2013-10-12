ll.controller("CustomerPay", ["$scope", "safeApply", "elasticsearch", "auth",
	function($scope, safeApply, es, auth) {

	$scope.colLoading = false;

	$scope.colours = "";

	$scope.transaction = false;

	$scope.addColour = function(col) {
		$scope.colours += "" + col;
	}

	$scope.$watch("colours", function(nV) {
		if (nV.length >= 4) {
			$scope.colLoading = true;

			es.type("transaction").lookup("code", $scope.colours)
			.done(function(d) {
				var data = d.hits.hits;
				if (data.length != 1) {
					vex.dialog.alert("Transaction hash clash, please try the transaction again.");
					$scope.colLoading = false;
					$scope.colours = "";
					$scope.transaction = false;
					safeApply($scope);
				} else {
					// Found the transaction
					$scope.transaction = data[0];
					$scope.colLoading = false;
					safeApply($scope);
				}
			}).fail(function() {
				vex.dialog.alert("Unable to find a matching transaction. Please try again");
				$scope.colLoading = false;
				$scope.colours = "";
				$scope.transaction = false;
				safeApply($scope);
			})
		}
	});

}]);