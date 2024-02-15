  angular.module('weatherApp', [
    'ngRoute',
    'weatherApp.view1',
    'weatherApp.view2',
    
  ]).
  config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
  
    $routeProvider.otherwise({redirectTo: '/'});
  }]);