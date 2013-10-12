ll.controller("HomeTour", ["$scope",
	function($scope) {
	
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
	}
	
}]);