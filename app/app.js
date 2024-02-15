'use strict';

  angular.module('weatherApp', ['weatherAppModule'])
  .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
  
    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController',
        controllerAs: 'main'
    }).otherwise({redirectTo: '/'});

  }]);