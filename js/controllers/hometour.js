ll.controller("HomeTour", ["$scope", "auth",
	function($scope, auth) {
	
	$scope.current = auth.current;

	$scope.view = "home";
	
	$scope.tours = {
		"consumer": ["con1", "con2", "con3"],
		"merchant": ["mer1", "mer2", "mer3"]
	}
	
	$scope.currentTour = false;
	
	// Starts a specific tour
	$scope.startTour = function(type) {
		if (!$scope.tours.hasOwnProperty(type)) {
			return;
		}
		
		$scope.view = $scope.tours[type][0];
		$scope.currentTour = type;
	}

	// Jump to next tour step
	$scope.nextTour = function() {
		if (!$scope.currentTour) {
			return;
		}
		for (var i = 0; i < $scope.tours[$scope.currentTour].length; i++) {
			if ($scope.tours[$scope.currentTour][i] == $scope.view) {
				if (i == $scope.tours[$scope.currentTour].length - 1) {
					// If its the last one, then we need to go to signup
					$scope.signup();
				} else {
					// Otherwise, go to the next one
					$scope.view = $scope.tours[$scope.currentTour][i+1];
				}
				break;
			}
		}
	}

	// Jump to previous tour step
	$scope.prevTour = function() {
		if (!$scope.currentTour) {
			return;
		}
		for (var i = 0; i < $scope.tours[$scope.currentTour].length; i++) {
			if ($scope.tours[$scope.currentTour][i] == $scope.view) {
				if (i == 0) {
					// If its the last one, then we need to go to signup
					$scope.goHome();
				} else {
					// Otherwise, go to the next one
					$scope.view = $scope.tours[$scope.currentTour][i-1];
				}
				break;
			}
		}
	}

	// Goes home
	$scope.goHome = function() {
		$scope.view = "home";
		$scope.currentTour = false;
	}

	// Go to signup
	$scope.signup = function() {
		$scope.view = "signup";
		$scope.currentTour = false;
	}

	// Go to the user's home
	$scope.goToHome = function() {
		if (!$scope.current()) {
			return;
		}

		switch ($scope.current()._source.type) {
			case "customer":
				window.location.href = "/customer.html";
				break;
			case "merchant":
				window.location.href = "/merchant.html";
				break;
		}
	}
	
}]);