HardwareAscender.controller('UserCtrl', ['$scope', '$resource', 'Users', 'UserService', '$location', '$routeParams', '$http', '$stateParams', function($scope, $resource, Users, UserService, $location, $routeParams, $http, $stateParams){
  console.log('user controller loaded', $stateParams, $routeParams)



  if (!$stateParams.id) {
    $http.get('/api/user/'+$routeParams.id).success(function(data){
      console.log('USER DAATA : ', data)
      $scope.user = data.user;
      $scope.listings = data.listings;
      $scope.watchlist = data.watchList;
      $scope.listings.forEach(function(listing){
        listing.updatedAt = new Date(listing.updatedAt)
        var time = new Date();
        listing.time = ((time - listing.updatedAt)/1000)
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
      $scope.watchlist.forEach(function(listing){
        listing.updatedAt = new Date(listing.updatedAt)
        var time = new Date();
        listing.time = ((time - listing.updatedAt)/1000)
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
      console.log('user', $scope.user);
      console.log('listings:', $scope.listings)
      console.log('watched listings:', $scope.watchlist)
    })
  } else if ($stateParams.id){
    $location.path('/user/'+$stateParams.id)

    $http.get('/api/user/'+$stateParams.id).success(function(data){
      $scope.user = data.user;
      $scope.listings = data.listings
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
          listing.timestamp = Math.floor(listing.time) + " less than a minute ago"
        }
      })
      console.log('user', $scope.user);
      console.log('listings:', $scope.listings)
    })
  }
}]);