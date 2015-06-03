HardwareAscender.factory('Messages', ['$resource', function($resource){
  return $resource('/api/message/:id')
}]);