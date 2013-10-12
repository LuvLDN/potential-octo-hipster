ll.controller("Twilio", ["$scope", "twilio", 
	function($scope, twilioService) {

	$scope.messageSent = false;

	var success = function() {  
        console.log("successfull twilio api hit"); 
        $scope.messageSent = "A text receipt will be sent to your phone shortly";
    };



    var error = function(request, textStatus, errorThrown) { 
    	console.log(textStatus);
    	console.log(errorThrown);
    	console.log(request);
    	console.log(request.responseText);
    	console.log(request.status);
    };

	twilioService.message(["07853262719"], "hello world", "e1 0en", success, error);

}]);