HardwareAscender.factory('Listing', ['$resource', function($resource){
  return $resource('/api/listing/:id', null, {
  'update': { method:'PUT' }
  })
}])
.factory('DeleteListing', ['$resource', function($resource){
  return $resource('/api/listing/:id', null, {
  'delete': { method:'DESTROY' }
  })
}])
.factory('Listings', ['$resource', function($resource){
  return $resource('/api/listing/:id')
}])