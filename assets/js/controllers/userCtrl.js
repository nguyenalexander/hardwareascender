HardwareAscender.controller('UserCtrl', ['$scope', '$resource', 'Users', 'UserService', '$location', '$routeParams', function($scope, $resource, Users, UserService, $location, $routeParams){
  console.log('user controller loaded')
  // $scope.UserService = UserService;

  // $scope.$watchCollection('UserService',function(){
  //   $scope.currentUser = $scope.UserService.currentUser;
  // })


  Users.get({id: $routeParams.id}, function(data){
    $scope.user = data;
    $scope.listings = $scope.user.listings
  })
}]);