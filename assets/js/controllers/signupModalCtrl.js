HardwareAscender.controller('signupModalCtrl', ['$scope', '$mdDialog', 'SignupService', function($scope, $mdDialog, SignupService) {
  console.log('login modal loaded')

  $scope.signup = function(){
    console.log('you want to sign up with ' + $scope.email + ' and ' + $scope.password + ' and ' + $scope.username)
    SignupService.signup($scope.email, $scope.password, $scope.username, function(err, data){
      if (err){
        console.log(err);
      }else if (data && data.username && data.password && data.email){
        console.log(data)
        $mdDialog.hide();
      }else{
        console.log("user couldn't be created")
      }
    })
  };

  $scope.cancel = function(){
    $mdDialog.cancel();
  };
}]);