HardwareAscender.factory('Messages', ['$resource', function($resource){
  return $resource('/api/message/:id')
}])
.factory('Message', ['$resource', function($resource){
  return $resource('/api/message/:id', null, {
  'update': { method:'PUT' }
  })
}]);