HardwareAscender.controller('HomeCtrl', ['$scope', '$rootScope', '$resource', 'UserService', 'Users', '$http', '$mdToast', function($scope, $rootScope, $resource, UserService, Users, $http, $mdToast){

  $scope.userService = UserService;

  console.log("home controller loaded")
  $scope.listings = [];

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

  $scope.showAddedToast = function(listing) {
    $mdToast.show(
      $mdToast.simple()
        .content(listing.title + ' has been added to your watch list!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  $scope.loadListings = function(){
    io.socket.get('/api/listing/', function(data, jwRes){
      $scope.$evalAsync(function(){
        $scope.listings = data
        $scope.listings.forEach(function(listing){
          listing.updatedAt = new Date(listing.updatedAt)
          var time = new Date();
          listing.time = ((time - listing.updatedAt)/1000)
          console.log('listing time:',listing.time)
          if (listing.time > 3600 * 24){
            listing.timestamp = Math.floor(((listing.time/60)/60)/24) + " days ago"
          }else if (listing.time > 3600){
            listing.timestamp = Math.floor((listing.time/60)/60) + " hours ago"
          }else if (listing.time > 60){
            listing.timestamp = Math.floor(listing.time/60) + " minutes ago"
          }else{
            listing.timestamp = "less than a minute ago"
          }
        })
      })
      console.log('data', data)
    })
  }
  $scope.loadListings();

  $scope.addToWatch = function(listing){
    $http.get('/api/user/'+$scope.currentUser.id).success(function(user){
      console.log(user)
      if (user.user.watchList){
        user.user.watchList.push(listing.id)
        $http.put('/api/user/'+$scope.currentUser.id, {watchList: user.user.watchList}).success(function(updated){
          $scope.showAddedToast(listing)
        })
      }else {
        user.user.watchList = [];
        user.user.watchList.push(listing.id)
      }

    })
  }

  io.socket.on('listing', function(msg){
    console.log('Message:',msg);
    if (msg && msg.verb){
      switch(msg.verb){
        case 'created':
          $scope.$evalAsync(function(){
            $scope.listings.push(msg.data)
          })
        break;
        case 'destroyed':
          $scope.$evalAsync(function(){
            for(var i=0; i<$scope.listings.length; i++){
              if($scope.listings[i].id == msg.id){
                $scope.listings.splice(i, 1)
              }
            }
          })
        break;
        case 'updated':
          $scope.$evalAsync(function(){
            for(var i=0; i<$scope.listings.length; i++){
              if($scope.listings[i].id == msg.id){
                for(var key in msg.data){
                  $scope.listings[i][key] == msg.data[key]
                }
                break;
              }
            }
          })
        break;
      }
    }
  })
}]);
