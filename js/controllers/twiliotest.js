ll.controller("Twilio", ["$scope", "twilio", 
	function($scope, twilioService) {

	var success = function() {  
        console.log("successfull twilio api hit"); 
    };

    var error = function(XMLHttpRequest, textStatus, errorThrown) { 
    	console.log(textStatus);
    	console.log(errorThrown);
    };

	twilioService.message(["07853262719"], "hello world", "e1 0en", success, error);

}]);