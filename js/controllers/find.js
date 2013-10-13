ll.controller("Find", ["$scope", "elasticsearch", "safeApply",
	function($scope, es, safeApply) {

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
		center: [51.5072, 0.1275]
	});

	$scope.map.addListener("displayready", function() {
		$scope.mapLoaded = true;
	});
	$scope.outlets = [];

	$scope.getLocal = function(lat,lng) {
		es.type("datatest").geoDistance(lat,lng)
			.done(function(d) {
				var data = d.hits.hits;
				data.map(function(obj) { $scope.outlets.push(obj['_source']) });
				$scope.outlets.map(function(outlet) {
					var marker = new nokia.maps.map.StandardMarker([outlet.location.lat, outlet.location.lng], {
						text: outlet.name,
						draggable: false
					});

					$scope.map.objects.add(marker);
				});
				safeApply($scope);
			}).fail(function() {
				vex.dialog.alert("Unable to get data from search, maybe the server has barfed again?");
				safeApply($scope);
			})
	}

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
						$scope.getLocal(coords.latitude,coords.longitude);
					},
					// Handle errors (display message):
					function (error) {
						var userMsg = "We couldn't find you :-( Please reload";
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