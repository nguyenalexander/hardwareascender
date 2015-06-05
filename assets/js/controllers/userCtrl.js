HardwareAscender.controller('UserCtrl', ['$scope', '$resource', 'Users', 'UserService', '$location', '$routeParams', '$http', function($scope, $resource, Users, UserService, $location, $routeParams, $http){
  console.log('user controller loaded')
  // $scope.UserService = UserService;

  // $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = $scope.UserService.currentUser;
  // })


  $http.get('/api/user/'+$routeParams.id).success(function(data){
    $scope.user = data;
    console.log('user',$scope.user)
    $scope.listings = $scope.user.listings
    console.log($scope.listings)
  })
}]);