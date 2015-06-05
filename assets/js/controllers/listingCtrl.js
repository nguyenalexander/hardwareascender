HardwareAscender.controller('ListingCtrl',
  ['$scope', '$resource', 'Listings',
  'UserService', '$location', '$routeParams',
  '$mdDialog', 'cloudinary', 'FileUploader', '$http',
  function($scope, $resource, Listings,
  UserService, $location, $routeParams,
  $mdDialog, cloudinary, FileUploader, $http){
    console.log('listing controller loaded')
    console.log('cloudinary',cloudinary)
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

    // $scope.uploadAll = function(){

    // var fd = new FormData();
    // // fd.append('images', $scope.uploader.queue)
    // // console.log('fd', fd)
    // var formData = {};
    // $scope.uploader.queue.forEach(function(item){

    //   // $scope.uploader.formData.push(item._file)
    // })
    // formData = $scope.uploader.formData
    // var data = {formData: formData}
    // console.log('data',formData)
    // console.log('stringified data',JSON.stringify(data))
    // $http.post('/api/image', data).success(function(data){
    //   console.log(data)
    // })
    // }




    $scope.categories = [
    'CPU (Processor)', 'CPU Cooler', 'Motherboard',
    'Memory (RAM)', 'Storage (HDD, SSD, RAM Disk)', 'GPU (Video Card)',
    'Case', 'PSU (Power Supply)', 'Optical Drive',
    'Monitor', 'External Storage', 'Peripherals (e.g. Mouse, Keyboard, Headphones...)',
    'Accessories/Other (e.g. Fans, Thermal Paste)']

    // $scope.$watch('images', function(images){
    //   console.log(images)
    //   if(!$scope.images) return;
    //   $scope.images.forEach(function(image){
    //     $scope.upload = cloudinary.upload({
    //       url: "https://api.cloudinary.com/v1_1/" + $.cloudinary.config().cloud_name + "/upload",
    //       data: {upload_preset: $.cloudinary.config().upload_preset, tags: 'myphotoalbum', context:'photo=' + $scope.title},
    //       file: file
    //     })
    //   })
    // })

    $scope.createListing = function(){
      console.log('trying to create listing')
      $http.post('/api/listing',
        {user: $scope.currentUser, brand: $scope.brand, desc: $scope.desc,
        title: $scope.title, category: $scope.category, price: $scope.price,
        status: false}).success(function(data){
          console.log('listing added!', data)
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
    '$mdDialog', function($scope, $resource,
      Listings, UserService, $location, $routeParams,
      $mdDialog){
        Listings.get({id: $routeParams.id}, function(data){
          $scope.listing = data;
        });

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
          io.socket.post('/api/user/'+$scope.listing.user.id+'/messages', {title:$scope.currentUser.username+' is offering to buy '+$scope.listing.title+'!', body:$scope.currentUser.username+' wants to buy '+$scope.listing.title+' for your listing price!', type:'buy', offer:offer, listing: $scope.listing.id}, function(data){
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




      // var listing = new Listings();
      // listing.user = $scope.currentUser;
      // listing.brand = $scope.brand;
      // listing.desc = $scope.desc;
      // listing.title = $scope.title;
      // listing.category = $scope.category
      // listing.price = $scope.price;
      // listing.status = false;
      // console.log(listing)
      // listing.$save(function(data){
