ll.controller("PaymentSuccess", ["$scope","safeApply", "twilio", 
	function($scope, safeApply, twilioService) {

	$scope.messageSent = false;

	var success = function() {  
        console.log("successfull twilio api hit"); 
        $scope.messageSent = "A text receipt will be sent to your phone shortly";
        safeApply($scope);
    };



    var error = function(request, textStatus, errorThrown) { 
    	console.log(textStatus);
    	console.log(errorThrown);
    	console.log(request);
    	console.log(request.responseText);
    	console.log(request.status);
    };

    
	twilioService.message(["07853262719"], "Your payment has failed", "e1 0en", success, error);

}]);