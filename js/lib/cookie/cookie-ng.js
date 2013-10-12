var ngCookie = angular.module("cookie", []);

ngCookie.factory("cacookie", ['$rootScope', function($scope) {
  return cookie;
}]);