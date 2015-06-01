HardwareAscender.controller('ListingCtrl', ['$scope', '$resource', 'Listings', 'UserService', '$location', function($scope, $resource, Listings, UserService, $location){
  $scope.UserService = UserService;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = $scope.UserService.currentUser;
  })

  $scope.categories = ['CPU (Processor)', 'CPU Cooler', 'Motherboard', 'Memory (RAM)', 'Storage (HDD, SSD, RAM Disk)', 'GPU (Video Card)', 'Case', 'PSU (Power Supply)', 'Optical Drive', 'Monitor', 'External Storage', 'Peripherals (e.g. Mouse, Keyboard, Headphones...)', 'Accessories/Other (e.g. Fans, Thermal Paste)']

  // Contacts.get({id: $routeParams.id}, function(data){
  //   $scope.contact = data;
  // })
  $scope.createListing = function(){
    console.log('trying to create listing')
    var listing = new Listings();
    listing.user = $scope.currentUser;
    listing.brand = $scope.brand;
    listing.desc = $scope.desc;
    listing.title = $scope.title;
    listing.category = $scope.category
    listing.price = $scope.price;
    console.log(listing)
    listing.$save(function(data){
      console.log('listing added!', data)
      $scope.listing = data
      $scope.title = "";
      $scope.brand = "";
      $scope.category = "";
      $scope.desc = "";
      $scope.price = "";
      $scope.goTo('/')
    })

    $scope.goTo = function(path){
      $location.path(path);
    };
    // comment.body = $scope.commentBody;
    // comment.$save({contactId: $scope.contact.id}, function(data){
    //   console.log(data)
    //   console.log('comment added!')
    //   $scope.contact = data;
    //   $scope.commentBody = "";
    // })
  }
}]);