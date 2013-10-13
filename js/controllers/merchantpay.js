ll.controller("MerchantPay", ["$scope", "safeApply", "elasticsearch", "auth",
	function($scope, safeApply, es, auth) {

	$scope.loading = false;

	$scope.pendingID = false;

	$scope.transaction = false;

	$scope.code = false;

	var num = function() {
		return Math.round(Math.random()*8);
	}

	$scope.getColour = function(num) {
		switch(parseInt(num)) {
			case 0:
				return "red";
				break;
			case 1:
				return "yellow";
				break;
			case 2:
				return "orange";
				break;
			case 3:
				return "pink";
				break;
			case 4:
				return "purple";
				break;
			case 5:
				return "blue";
				break;
			case 6:
				return "green";
				break;
			case 7:
				return "black";
				break;
			case 8:
				return "grey";
				break;
		}
	}

	$scope.failfn = function() {
		vex.dialog.alert({
			"message": "Error with transaction, reloading so you can try again",
			"callback": function() {
				window.location.reload();
			}
		});
		$scope.loading = false;
		safeApply($scope);
	};

	// Begin the transaction
	$scope.begin = function() {
		$scope.loading = true;

		$scope.code = "" + num() + num() + num() + num();

		es.type("transaction").create({
			"status": "OPEN",
			"payee": auth.current()._source.email,
			"amount": $scope.amount,
			"code": $scope.code
		}).done(function(data) {
			$scope.pendingID = data._id;
			$scope.transaction = data;
			$scope.loading = false;
			safeApply($scope);
		}).fail($scope.failfn);
	}

	// Cancels
	$scope.cancel = function() {
		if (!$scope.pendingID) {
			return;
		}
		$scope.loading = true;
		es.type("transaction").delete($scope.pendingID)
		.done(function() {
			$scope.loading = false;
			vex.dialog.alert({
				"message": "Deleted",
				"callback": function() {
					window.location.href = "/merchant.html";
				}
			});
		}).fail($scope.failfn);
	}

	$scope.checkingStatus = false;

	$scope.check = function() {
		if (!$scope.pendingID) {
			return;
		}
		$scope.checkingStatus = true;
		es.type("transaction").get($scope.pendingID)
		.done(function(data) {
			$scope.transaction = data;
			$scope.checkingStatus = false;
			safeApply($scope);
		}).fail(function() {
			$scope.checkingStatus = false;
			safeApply($scope);
		});
	}

}]);