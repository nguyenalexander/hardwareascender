HardwareAscender.controller('messageCtrl', ['$scope', '$mdDialog', '$routeParams', 'Listings', 'UserService', '$http', function($scope, $mdDialog, $routeParams, Listings, UserService, $http) {
  console.log('message controller loaded')

  Listings.get({id: $routeParams.id}, function(data){
    $scope.listing = data;
    $scope.listingUser = data.user;
    console.log($scope.listing, $scope.listingUser)
  })

  $scope.sendQuestion = function(){
    console.log($scope.messageBody)
    // var title = "Question on \'" + $scope.listing.title + '\'!';
    io.socket.post('/user/'+$scope.listing.user.id+'/messages', {title:'New question on '+$scope.listing.title+'!', body:$scope.messageBody, type:'question', listing: $scope.listing.id}, function(data){
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
    io.socket.post('/user/'+$scope.listing.user.id+'/messages', {title:$scope.listing.title, body:$scope.messageBody, type:'offer', offer:$scope.offer, listing: $scope.listing.id}, function(data){
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

  $scope.sendBuy = function(price){
    // var title = "Question on \'" + $scope.listing.title + '\'!';
    io.socket.post('/user/'+$scope.listing.user.id+'/messages', {title:$scope.listing.title, body:$scope.messageBody, type:'buy', offer:$scope.offer, listing: $scope.listing.id}, function(data){
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
}])
.controller('replyCtrl', ['$scope', '$rootScope', '$mdDialog', '$routeParams', 'Listings', 'UserService', '$http', function($scope, $rootScope, $mdDialog, $routeParams, Listings, UserService, $http) {
  $scope.sendReply = function(type, offer){
    offer = offer || 0;
    if (type == 'question'){
    if ($rootScope.msg.messageTitle.indexOf('re:') == -1) {
      var title = 're: ' + $rootScope.msg.messageTitle
    }else{
      var title = $rootScope.msg.messageTitle
    }
    io.socket.post('/user/'+$rootScope.msg.sender.id+'/messages', {title:title, body:$scope.messageBody, type:'question', listing: $rootScope.msg.listing.id}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('reply sent',data)
          $rootScope.toggleMessage('nav-messages');
        }else{
          console.log('error!', data)
          $rootScope.toggleMessage('nav-messages');
        }
      })
    })
    }else if (type == 'offer reply'){
    console.log($rootScope.msg)
    io.socket.post('/user/'+$rootScope.msg.sender.id+'/messages', {title:$rootScope.msg.messageTitle, body:$scope.messageBody, type:'offer reply', offer:offer, id:$rootScope.msg.id, listing: $rootScope.msg.listing.id}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('offer sent',data)
          $rootScope.toggleMessage('nav-messages');
        }else{
          console.log('error!', data)
          $rootScope.toggleMessage('nav-messages');
        }
      })
    })
    }else if (type == 'offer decline'){
    io.socket.post('/user/'+$rootScope.msg.sender.id+'/messages', {title:$rootScope.msg.messageTitle, body:$scope.messageBody, type:'offer decline', offer:offer, id:$rootScope.msg.id, listing: $rootScope.msg.listing.id}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('offer decline sent',data)
          $rootScope.toggleMessage('nav-messages');
        }else{
          console.log('error!', data)
          $rootScope.toggleMessage('nav-messages');
        }
      })
    })
    }else if (type == 'offer accept'){
    io.socket.post('/user/'+$rootScope.msg.sender.id+'/messages', {title:$rootScope.msg.messageTitle, body:$scope.messageBody, type:'offer accept', offer:offer, id:$rootScope.msg.id, listing: $rootScope.msg.listing.id}, function(data){
      $scope.$evalAsync(function(){
      if (data){
          console.log('offer accept sent',data)
          $rootScope.toggleMessage('nav-messages');
        }else{
          console.log('error!', data)
          $rootScope.toggleMessage('nav-messages');
        }
      })
    })
    }
  }
}])