HardwareAscender.controller('ListingCtrl',
  ['$scope', '$resource', 'Listings',
  'UserService', '$location', '$routeParams',
  '$mdDialog', 'cloudinary', 'FileUploader', '$http', '$mdToast',
  function($scope, $resource, Listings,
  UserService, $location, $routeParams,
  $mdDialog, cloudinary, FileUploader, $http, $mdToast){
    $scope.UserService = UserService;

    $scope.$watchCollection('UserService',function(){
      $scope.currentUser = $scope.UserService.currentUser;
    })

    $scope.isImage = function(item) {
      var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }

    $scope.uploader = new FileUploader({
      url: '/api/listing/new/images'
    })

    $scope.uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 10;
        }
    });

    $scope.doUpload = function(id){
      console.log('queue', $scope.uploader.queue)
      console.log('before',$scope.uploader.url)
      $scope.uploader.queue.forEach(function(item){
        console.log(item)
        console.log(item.formData)
        item.formData = id;
      })
      // $scope.uploader.formData[0] = id+""
      // $scope.uploader.url = '/api/listing/'+id+'/images'
      console.log('after',$scope.uploader.url)
      // $scope.uploader.formData = id
      $scope.uploader.uploadAll()
      $scope.uploader.onCompleteItem = function(fileItem, response, status, headers){
        console.log('image upload completed', fileItem)
        $scope.goTo('/')
      }
    }


    $scope.categories = [
    'CPU (Processor)', 'CPU Cooler', 'Motherboard',
    'Memory (RAM)', 'Storage (HDD, SSD, RAM Disk)', 'GPU (Video Card)',
    'Case', 'PSU (Power Supply)', 'Optical Drive',
    'Monitor', 'External Storage', 'Peripherals (e.g. Mouse, Keyboard, Headphones...)',
    'Accessories/Other (e.g. Fans, Thermal Paste)']

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

    $scope.showListingToast = function(action) {
      $mdToast.show(
        $mdToast.simple()
          .content('Your listing has been '+action)
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };

    $scope.createListing = function(){
      console.log('trying to create listing')
      $http.post('/api/listing',
        {user: $scope.currentUser, brand: $scope.brand, desc: $scope.desc,
        title: $scope.title, category: $scope.category, price: $scope.price,
        status: false}).success(function(data){
          $scope.showListingToast(' created!')
          $scope.title = "";
          $scope.brand = "";
          $scope.category = "";
          $scope.desc = "";
          $scope.price = "";
          $scope.doUpload(data.id)
        })
      // })

      $scope.goTo = function(path){
        $location.path(path);
      };
    }
  }])
  .controller('ListingShowCtrl', ['$scope', '$resource', 'Listings',
    'UserService', '$location', '$routeParams',
    '$mdDialog', 'cloudinary', 'FileUploader', '$http', 'Listing', 'DeleteListing', '$mdToast',
     function($scope, $resource, Listings,
      UserService, $location, $routeParams,
      $mdDialog, cloudinary, FileUploader, $http, Listing, DeleteListing, $mdToast){

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

      $scope.showListingToast = function(action) {
        $mdToast.show(
          $mdToast.simple()
            .content('Your listing has been '+action)
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
      };

      $scope.showBumpDenyToast = function(action) {
        $mdToast.show(
          $mdToast.simple()
            .content("You can't bump your listing right now!")
            .position($scope.getToastPosition())
            .hideDelay(3000)
        );
      };

        $scope.UserService = UserService;

        $scope.isImage = function(item) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }

        $scope.uploader = new FileUploader({
          url: '/api/listing/new/images'
        })

        $scope.uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        $scope.doUpload = function(id){
          console.log('queue', $scope.uploader.queue)
          console.log('before',$scope.uploader.url)
          $scope.uploader.queue.forEach(function(item){
            console.log(item)
            console.log(item.formData)
            item.formData = id;
          })
          // $scope.uploader.formData[0] = id+""
          // $scope.uploader.url = '/api/listing/'+id+'/images'
          console.log('after',$scope.uploader.url)
          // $scope.uploader.formData = id
          $scope.uploader.uploadAll()
          $scope.uploader.onCompleteItem = function(fileItem, response, status, headers){
            console.log('image upload completed', fileItem)
            $scope.goTo('/')
          }
        }

        $scope.categories = [
        'CPU (Processor)', 'CPU Cooler', 'Motherboard',
        'Memory (RAM)', 'Storage (HDD, SSD, RAM Disk)', 'GPU (Video Card)',
        'Case', 'PSU (Power Supply)', 'Optical Drive',
        'Monitor', 'External Storage', 'Peripherals (e.g. Mouse, Keyboard, Headphones...)',
        'Accessories/Other (e.g. Fans, Thermal Paste)']

        Listings.get({id: $routeParams.id}, function(data){
          $scope.listing = data;
          console.log($scope.listing)
          $scope.listing.time = new Date($scope.listing.updatedAt)
          var fortnight = new Date(+$scope.listing.time + 12096e5)
          console.log('listing last updated at', $scope.listing.time)
          console.log('fortnight', fortnight)
          $scope.nextBump = (fortnight - new Date)/1000;
          console.log('next bump time', $scope.nextBump)
          if ($scope.nextBump > 3600 * 24){
            if (Math.floor((($scope.nextBump/60)/60)/24).toString().charAt(0) == 1 && ((($scope.nextBump/60)/60)/24).length == 1) {
              $scope.listing.nextBump = "in " + Math.floor((($scope.nextBump/60)/60)/24) + " day"
            }else {
              $scope.listing.nextBump = "in " + Math.floor((($scope.nextBump/60)/60)/24) + " days"
            }
          }else if ($scope.nextBump > 3600){
            if (Math.floor(($scope.nextBump/60)/60).toString().charAt(0) == 1 && (($scope.nextBump/60)/60).length == 1) {
              $scope.listing.nextBump = "in " + Math.floor(($scope.nextBump/60)/60) + " hour"
            }else {
              $scope.listing.nextBump = "in " + Math.floor(($scope.nextBump/60)/60) + " hours"
            }
          }else if ($scope.nextBump > 60){
            if (Math.floor(($scope.nextBump/60)).toString().charAt(0) == 1 && (($scope.nextBump/60)).length == 1) {
              $scope.listing.nextBump = "in " + Math.floor($scope.nextBump/60) + " minute"
            }else {
              $scope.listing.nextBump = "in " + Math.floor($scope.nextBump/60) + " minutes"
            }
          }else{
            $scope.listing.nextBump = Math.floor($scope.nextBump) + " in less than a minute"
          }
        });

        $scope.goTo = function(path){
          $location.path(path);
        };

        if ($scope.nextBump !=0) {
          $scope.disabled = true;
        }

        $scope.update = function(){
          Listing.update({id: $routeParams.id},
            {brand: $scope.listing.brand, desc: $scope.listing.desc,
             title: $scope.listing.title, category: $scope.listing.category,
             price: $scope.listing.price}, function(listing){
              console.log(listing)
              $scope.showListingToast('successfully edited!')
              $scope.goTo('/listing/'+$routeParams.id)
              })
        }

        $scope.delete = function(){
          Listing.delete({id: $routeParams.id}, function(deletedListing){
            $scope.showListingToast('deleted!')
            console.log(deletedListing)
            $scope.goTo('/user/'+$scope.currentUser.id)
          })
        }

        $scope.dropAndBump = function(){
          Listing.update({id: $routeParams.id},
            {price: ($scope.listing.price - Math.round($scope.listing.price/10)),
              updatedAt: new Date()}, function(bumped){
              $scope.showListingToast('has been bumped to the top!')
              $scope.goTo('/')
              })
        }

        $scope.bump = function(){
          if ($scope.disabled == true){
            $scope.showBumpDenyToast()
          }else{
            Listing.update({id: $routeParams.id},
              {updatedAt: new Date()}, function(bumped){
                $scope.showListingToast('has been bumped to the top!')
                $scope.goTo('/')
                })
          }
        }

        $scope.$watchCollection('UserService',function(){
          $scope.currentUser = $scope.UserService.currentUser;
          console.log($scope.currentUser)
        })

        $scope.showQuestion = function(event) {
          $mdDialog.show({
            controller: 'messageCtrl',
            templateUrl: 'templates/questionModalTmpl.html',
            targetEvent: event,
          });
        };

        $scope.showOffer = function(event) {
          $mdDialog.show({
            controller: 'messageCtrl',
            templateUrl: 'templates/offerModalTmpl.html',
            targetEvent: event,
          });
        };

        $scope.sendOffer = function(offer){
          io.socket.post('/user/'+$scope.listing.user.id+'/messages', {title:$scope.currentUser.username+' is offering to buy '+$scope.listing.title+'!', body: $scope.currentUser.username+' wants to buy '+$scope.listing.title+' for your listing price!', type:'buy', offer:offer, listing: $scope.listing.id}, function(data){
            $scope.$evalAsync(function(){
            if (data){
                console.log('offer sent',data)
              }else{
                console.log('error!', data)
              };
            });
          });
        };

      $scope._Index = 0;

      // if a current image is the same as requested image
      $scope.isActive = function (index) {
          return $scope._Index === index;
      };

      // show prev image
      $scope.showPrev = function () {
          $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.listing.images.length - 1;
      };

      // show next image
      $scope.showNext = function () {
          $scope._Index = ($scope._Index < $scope.listing.images.length - 1) ? ++$scope._Index : 0;
     };

    // show a certain image
      $scope.showPhoto = function (index) {
          $scope._Index = index;
      };

    }]);