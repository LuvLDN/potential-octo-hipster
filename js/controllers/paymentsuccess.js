ll.controller("PaymentSuccess", ["$scope","safeApply", "twilio",
	function($scope, safeApply, twilioService) {

	
	var success = function() {  
        console.log("successfull twilio api hit"); 
    };



    var error = function(request, textStatus, errorThrown) { 
    	console.log(textStatus);
    	console.log(errorThrown);
    	console.log(request);
    	console.log(request.responseText);
    	console.log(request.status);
    };

	twilioService.message(["+447530606033"], "Payment Success", "e1 0en", success, error);

}]);