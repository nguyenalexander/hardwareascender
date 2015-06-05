HardwareAscender.controller('UserCtrl', ['$scope', '$resource', 'Users', 'UserService', '$location', '$routeParams', '$http', function($scope, $resource, Users, UserService, $location, $routeParams, $http){
  console.log('user controller loaded')
  // $scope.UserService = UserService;

  // $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = $scope.UserService.currentUser;
  // })


  $http.get('/user/'+$routeParams.id).success(function(data){
    // $scope.user = data[0];
    console.log('user',data)
  })
}]);