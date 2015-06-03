HardwareAscender.controller('NavCtrl',['$scope','$rootScope', '$mdDialog', 'UserService', '$mdToast', '$animate','$mdSidenav','$mdUtil','$log', function($scope,$rootScope,$mdDialog,UserService, $mdToast, $animate, $mdSidenav, $mdUtil, $log){
  console.log('nav controller loaded.');

    $scope.toggleInbox = buildToggler('nav-inbox');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },300);
      return debounceFn;
    }

  $scope.UserService = UserService;

  $scope.toastPosition = {
    bottom: true,
    top: false,
    left: false,
    right: true
  };
  $scope.getToastPosition = function() {
    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  $scope.showSentToast = function(type) {
    $mdToast.show(
      $mdToast.simple()
        .content('Your '+type+' has been sent!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  $scope.showReceivedToast = function(type) {
    $mdToast.show(
      $mdToast.simple()
        .content('You just got a new '+type+'!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  $scope.showAcceptedToast = function(title) {
    $mdToast.show(
      $mdToast.simple()
        .content(title+' has just been sold! Woohoo!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  $scope.showLogin = function(event) {
    $mdDialog.show({
      controller: 'loginModalCtrl',
      templateUrl: 'templates/loginModalTmpl.html',
      targetEvent: event,
    })
  };

  $scope.$watchCollection('UserService', function(){
    $scope.currentUser = UserService.currentUser;
    $scope.loadReceived();
    $scope.loadMessages();
  })

  // $scope.$watchCollection()

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

  $scope.loadReceived = function(){
    if ($scope.currentUser){
      io.socket.get('/api/user/'+$scope.currentUser.id+'/received', function(data, jwRes){
        $scope.$evalAsync(function(){
          $rootScope.received = data
          console.log('received',$rootScope.received)
          $rootScope.receivedCount = $rootScope.received.length
        })
      })
    }else{
      $rootScope.received = [];
      $rootScope.receivedCount = false;
    }
  }

  $scope.loadMessages = function(){
    if ($scope.currentUser){
      io.socket.get('/api/user/'+$scope.currentUser.id+'/messages', function(data, jwRes){
        console.log('message data', data)
        $scope.$evalAsync(function(){
          $rootScope.messages = data
          console.log('messages',$rootScope.messages)
          $rootScope.messagesCount = $rootScope.messages.length
        })
      })
    }else{
      $rootScope.messages = [];
      $rootScope.messagesCount = false;
    }
  }


  io.socket.on('message', function(data){
    console.log('message:',data);
    if (data && data.sender && data.recipient){
      if (data.sender == $scope.currentUser.id){
        console.log('you are the sender', $scope.currentUser.username)
        $scope.$evalAsync(function(){
          $rootScope.messages.push(data)
          $rootScope.messagesCount +=1
          if (data.type == 'question') {
            $scope.showSentToast('question');
          }else if (data.type == 'offer') {
            $scope.showSentToast('offer');
          }else if (data.type == 'offer reply') {
            $scope.showSentToast('reply');
          }else if (data.type == 'offer decline') {
            $scope.showSentToast('offer');
          }else if (data.type == 'offer accept') {
            $scope.showSentToast('offer');
          }else {
            $scope.showSentToast('offer');
          }
        })
      }else if (data.recipient == $scope.currentUser.id){
        console.log('you are the receiver', $scope.currentUser.username)
        $scope.$evalAsync(function(){
          $rootScope.received.push(data)
          $rootScope.receivedCount += 1
          if (data.type == 'question') {
            $scope.showReceivedToast('question');
          }else if (data.type == 'offer') {
            $scope.showReceivedToast('offer');
          }else if (data.type == 'offer reply') {
            $scope.showReceivedToast('reply on your offer');
          }else if (data.type == 'offer decline') {
            $scope.showReceivedToast('offer');
          }else if (data.type == 'offer accept') {
            $scope.showReceivedToast('offer');
          }else {
            $scope.showReceivedToast('offer');
          }
        })
      }
    }
  })

  io.socket.on('accept', function(data){
    if (data && data.status && data.user){
      if (data.user == $scope.currentUser.id){
        console.log('you are the sender', $scope.currentUser.username)
        $scope.$evalAsync(function(){
          $scope.showAcceptedToast(data.title);
        })
      }
    }
    console.log('accepted!!!!!',data)
  });


}])
  .controller('InboxNavCtrl',['$scope', '$rootScope', '$mdDialog', 'UserService', '$mdToast', '$animate','$mdSidenav','$mdUtil','$log', 'Messages', function($scope, $rootScope, $mdDialog,UserService, $mdToast, $animate, $mdSidenav, $mdUtil, $log, Messages){
    console.log('inbox nav ctrl loaded')
    $rootScope.toggleMessage = buildToggler('nav-messages');

    // $scope.$on('$viewContentLoaded', function(){
    //   console.log('fully loaded')
    //   $rootScope.loaded = true;
    // })

    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function(){
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      },300);
      return debounceFn;
    }

    $scope.navMessage = function(messageId){
      $scope.toggleMessage();
      console.log(messageId)
      Messages.get({id: messageId}, function(data){
        console.log(data)
        $rootScope.msg = data
      })
    }
  }])