/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	retrieve: function(req, res){
    async.auto({
      user: function(callback){
        User.find({id: req.params.id}).populate('listings').populate('watchList').exec(function(err, user){
          callback(null, user[0])
        });
      },
      listings: ['user', function(callback, user){
        async.map(user.user.listings, function(listing, innercb){
          Listing.find({id:listing.id}).populate('images').exec(function(err, data){
            innercb(null, data[0]);
          });
        }, function(err, results){
          callback(null, results)
        })
      }],
    }, function(err, result){
      console.log('err = ', err)
      console.log('results:',result)
      res.send(result)
    })
  },
  update: function(req, res){
    console.log(req.body)
    User.update({id: req.params.id}, {watchList: req.body.watchList}).exec(function(err, user){
      console.log('user watchlist updated', user)
      res.send(user)
    });
  }
};



    // findUser(function(userObject, listingsArr) {
    //   console.log('trying to find *****************************', listingsArr)
    //   console.log('USER *****************************', userObject)
    //   res.send({user: userObject, fullListing: listingsArr})
    // });
