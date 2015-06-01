HardwareAscender.controller('HomeCtrl', ['$scope', '$resource', function($scope, $resource){

  console.log("home controller loaded")
  $scope.listings = [];

  $scope.loadListings = function(){
    io.socket.get('/api/listing/', function(data, jwRes){
      $scope.$evalAsync(function(){
        $scope.listings = data
      })
      console.log('data', data)
    })
  }
  $scope.loadListings();

  // io.socket.on('contact', function(msg){
  //   console.log('Message:',msg);
  //   if (msg && msg.verb){
  //     switch(msg.verb){
  //       case 'created':
  //         $scope.$evalAsync(function(){
  //           $scope.Listing.push(msg.data)
  //         })
  //       break;
  //       case 'destroyed':
  //         $scope.$evalAsync(function(){
  //           for(var i=0; i<$scope.Listing.length; i++){
  //             if($scope.Listing[i].id == msg.id){
  //               $scope.Listing.splice(i, 1)
  //             }
  //           }
  //         })
  //       break;
  //       case 'updated':
  //         $scope.$evalAsync(function(){
  //           for(var i=0; i<$scope.Listing.length; i++){
  //             if($scope.Listing[i].id == msg.id){
  //               for(var key in msg.data){
  //                 $scope.Listing[i][key] == msg.data[key]
  //               }
  //               break;
  //             }
  //           }
  //         })
  //       break;
  //     }
  //   }
  // })

  // $scope.deleteContact = function(contactId){
  //   Listing.delete({id:contactId}, function(data){
  //     AlertService.add('danger', 'Contact Deleted!')
  //   });
  // };

  // $scope.showContact = function(contactId){
  //   Listing.get({id:contactId}, function(data){
  //     console.log(data)
  //   });
  // };

  // $scope.createContact = function(){
  //   var contact = new Listing();
  //   contact.firstName = "Test"
  //   contact.lastName = "Test"
  //   contact.email = "Test"
  //   contact.address ="Test"
  //   contact.city ="Test"
  //   contact.state ="Test"
  //   contact.zip ="12321"
  //   contact.phone ="Test"
  //   contact.notes ="Test"
  //   contact.$save(function(data){
  //     console.log(data);
  //     $scope.loadListing();
  //   });
  // };

  // $scope.openEditModal = function(contactId){
  //   $scope.contactId = contactId
  //   $modal.open({
  //     templateUrl: '/views/editContactModal.html',
  //     controller: 'EditContactModal',
  //     resolve: {
  //       contact: function(){
  //         return $scope.contactId
  //       }
  //     }
  //   })
  // }


}]);
