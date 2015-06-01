HardwareAscender.controller('loginModalCtrl', ['$scope', '$mdDialog', 'UserService', function($scope, $mdDialog, UserService) {
  console.log('login modal loaded')
  $scope.login = function(){
    console.log('you want to log in with ' + $scope.email + ' and ' + $scope.password)
    UserService.login($scope.email, $scope.password, function(err, data){
      if (err){
        console.log(err);
      }else if (data && data.result){
        console.log(data, data.result)
        $mdDialog.hide();
      }else{
        console.log('user not logged in.')
      }
    })
  };

  $scope.cancel = function(){
    $mdDialog.cancel();
  };
}]);