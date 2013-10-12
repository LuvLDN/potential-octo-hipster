

//https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages\

// -X POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages\
// -d "To=+14159352345" \ 
// -d "From=+14158141829" \ 
// -d "Body=Hello world!" \
// -d "MediaUrl=http://www.images.com/flower.png" \
// -u '{AccountSid}:{AuthToken}'


ll.factory("twilio", ["$rootScope",
	function($scope) {


		var accountSid = "ACfdd6fa4773779374df46bac975a5ebc7";
		var authToken = "21ad90beb98e7b7dbac44276d6f83317";
		return {

			"message": function(numbers, message, postcode, successCallback, errorCallback) {
				console.log("sending message");
				for (var i = 0; i < numbers.length; i++) {
					var number = numbers[i];

					console.log(number);
					var makeBaseAuth = function(user, password) {
						var tok = user + ':' + password;
						var hash = btoa(tok);
						return "Basic " + hash;
					}


					$.ajax({
						url: "http://loveldn.com/~dyn/twilio.php", 
						type:"POST", 
						
						data: {
							"to":number, "from":"+14158141829", "message": message
						},
						success: successCallback,
		                error: errorCallback

					});
					
				}

			}

		}
	
	}]);