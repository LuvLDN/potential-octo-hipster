ll.controller("Find", ["$scope",
	function($scope) {

	// Whether the map has loaded or not
	$scope.mapLoaded = false;

	// Build ze map
	$scope.map = new nokia.maps.map.Display($("#map")[0], {
		components: [
			new nokia.maps.map.component.Behavior(),
			new nokia.maps.map.component.ZoomBar(),
			new nokia.maps.map.component.ScaleBar(),
			new nokia.maps.map.component.InfoBubbles()
		],
		zoomLevel: 10,
		center: [52.51, 13.4]
	});

	$scope.map.addListener("displayready", function() {
		$scope.mapLoaded = true;
	});

	$scope.$watch("mapLoaded", function(nV) {
		if (!nV) { return; }
		setTimeout(function() {
			if (nokia.maps.positioning.Manager) {
				var positioning = new nokia.maps.positioning.Manager();

				positioning.getCurrentPosition(
					function (position) {
						var coords = position.coords;
						var marker =
							new nokia.maps.map.StandardMarker(coords);
						var accuracyCircle =
							new nokia.maps.map.Circle(coords, coords.accuracy);
						$scope.map.objects.addAll([accuracyCircle, marker]);
						$scope.map.zoomTo(accuracyCircle.getBoundingBox(), false, "default");
					},
					// Handle errors (display message):
					function (error) {
						var userMsg = "We couldn't find you :-(";
						var errorMsg = "";

						// Determine what caused the error and show error message:
						if (error.code == 1)
							errorMsg += "PERMISSION_DENIED";
						else if (error.code == 2)
							errorMsg += "POSITION_UNAVAILABLE";
						else if (error.code == 3)
							errorMsg += "TIMEOUT";
						else errorMsg += "UNKNOWN_ERROR";

						console.error(errorMsg);
						vex.dialog.alert(userMsg);
					}
				);
			}
		}, 400);
	});

	$scope.goBack = function() {
		window.history.go(-1);
	}

}]);