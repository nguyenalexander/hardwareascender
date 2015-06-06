/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get: function(req, res){
 //    console.log(req.body)
 //    User.create({email: req.body.email, password})
 //  }
 //    console.log(req.params)
    // var fullListings = [];
    //   async.auto({
    //     User.find({id: req.params.id}).populate('listings').exec(function(err, data){
    //       var user = data;
    //       // console.log(data)
    //       async.each(data[0].listings, function(callback, listing){
    //         Listing.find({id: listing.id}).populate('images').exec(function(err, fullListing){
    //           console.log('full listing',fullListing[0])
    //           console.log('full listings array before', fullListings)
    //           fullListings.push(fullListing[0]);
    //           console.log('full listings array after', fullListings)
    //         })
    //         callback(null, {fullListings: fullListings, user: user})
    //       }, function(err){
    //         if (err) {
    //           console.log('error occured when trying to go through listings', err)
    //         }else {
    //           console.log('listings have all been saved.')
    //         }
    //       })
    //     })
    //   }, function(err, results){
    //     console.log('err =', err)
    //     console.log('results =', results)
    //   });

    async.auto({
      user: function(callback){
        User.find({id: req.params.id}).populate('listings').exec(function(err, user){
          callback(null, user[0])
        });
      },
      listing: ['user', function(callback, user){
        // console.log(user)
        // var fullListings = [];
        async.map(user.user.listings, function(listing, innercb){
          Listing.find({id:listing.id}).populate('images').exec(function(err, data){
            // console.log('listings data:', data)
            // fullListings.push({listing: data[0]})
            // console.log(fullListings)
            innercb(null, {listing: data[0]});
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
  }
};



    // findUser(function(userObject, listingsArr) {
    //   console.log('trying to find *****************************', listingsArr)
    //   console.log('USER *****************************', userObject)
    //   res.send({user: userObject, fullListing: listingsArr})
    // });
