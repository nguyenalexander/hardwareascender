HardwareAscender.factory('SignupService', ['$http', function($http){
  return {
    signup: function(email, password, username, callback){
      var self = this;
      $http.post('/api/user', {email: email, password: password, username: username})
        .success(function(data){
          console.log(data)
          if(data && data.email && data.password && data.username){
            self.currentUser = data.user;
          }else{
            self.currentUser = false;
          }
          callback(null, data);
        })
        .error(function(err){
          callback(err)
        });
    }
  }
}]);