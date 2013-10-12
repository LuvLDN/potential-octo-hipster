ll.factory("twilio", ["$rootScope",
	function($scope) {

		return {

			"message": function(numbers, message, postcode, successCallback, errorCallback) {
				console.log("sending message");
				for (var i = 0; i < numbers.length; i++) {
					var number = numbers[i];

					$.ajax({
						url: "http://luvldn.com/~dyn/twilio.php", 
						type:"POST", 
						
						data: {
							"to":number, "from":"+15005555006", "message": message
						},
						success: successCallback,
		                error: errorCallback

					});
					
				}

			}

		}
	
	}]);