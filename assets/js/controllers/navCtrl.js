HardwareAscender.controller('NavCtrl',['$scope','$rootScope', '$mdDialog', 'UserService', function($scope,$rootScope,$mdDialog, UserService){
  console.log('nav controller loaded.');

  $scope.UserService = UserService;


  $scope.showLogin = function(event) {
    $mdDialog.show({
      controller: 'loginModalCtrl',
      templateUrl: 'templates/loginModalTmpl.html',
      targetEvent: event,
    })
  };

  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
  })

  $scope.logout = function(){
    UserService.logout(function(err, data){
      console.log('user logged out', err, data)
    });
  }

  $scope.showSignup = function(event) {
    $mdDialog.show({
      controller: 'signupModalCtrl',
      templateUrl: 'templates/signupModalTmpl.html',
      targetEvent: event,
    })
  };

  // $scope.UserService = UserService;

// ,'AlertService','UserService'
// ,$modal,AlertService,UserService

  // $scope.showLogin = function() {
  //   $modal.open({
  //     templateUrl:'/views/auth/loginModal.html',
  //     controller:'AuthLoginModalCtrl'
  //   });
  // };

  // $scope.logout = function() {
  //   UserService.logout(function(err, data){
  //     //doing nothing...
  //   });
  // }

  // $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = UserService.currentUser;
  // });

}]);