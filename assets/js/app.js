var HardwareAscender = angular.module('HardwareAscender', ['ngRoute','ngResource', 'ngMaterial', 'ngMessages']);

HardwareAscender.run(['$rootScope', 'UserService',function($rootScope, UserService) {
  console.log('hardware ascender is running')

  UserService.check(function(err, data){
  console.log(err, data);
  console.log('Current User',UserService.currentUser)
  });
}])

HardwareAscender.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
  .when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/api/listing/new', {
    templateUrl: '/views/listing/new.html',
    controller: 'ListingCtrl'
  })
  .when('/api/listing/:id', {
    templateUrl: '/views/listing/show.html',
    controller: 'ListingCtrl'
  })
  .otherwise({
    templateUrl:'/views/404.html'
  })
}])