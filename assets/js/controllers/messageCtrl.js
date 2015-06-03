HardwareAscender.controller('messageCtrl', ['$scope', '$mdDialog', '$routeParams', 'Listings', 'UserService', '$http', function($scope, $mdDialog, $routeParams, Listings, UserService, $http) {
  console.log('message modal loaded')

  Listings.get({id: $routeParams.id}, function(data){
    $scope.listing = data;
  })

  $scope.sendQuestion = function(){
    // var title = "Question on \'" + $scope.listing.title + '\'!';
    io.socket.post('/api/user/'+$scope.listing.user.id+'/messages', {title:$scope.listing.title, body:$scope.messageBody, type:'question'}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('question sent',data)
          $mdDialog.hide();
        }else{
          console.log('error!', data)
          $mdDialog.hide();
        }
      })

      })
  };

  $scope.sendOffer = function(){
    // var title = "Question on \'" + $scope.listing.title + '\'!';
    io.socket.post('/api/user/'+$scope.listing.user.id+'/messages', {title:$scope.listing.title, body:$scope.messageBody, type:'offer', offer:$scope.offer}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('offer sent',data)
          $mdDialog.hide();
        }else{
          console.log('error!', data)
          $mdDialog.hide();
        }
      })

      })
  };


  $scope.cancel = function(){
    $mdDialog.cancel();
  };
}]);