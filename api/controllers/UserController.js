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
    var fullListings = [];
    var findUser = function(callback){
      User.find({id: req.params.id}).populate('listings').exec(function(err, data){
        console.log(data)
        data[0].listings.forEach(function(listing){
          Listing.find({id: listing.id}).populate('images').exec(function(err, fullListing){
            console.log('full listing',fullListing[0])
            console.log(fullListings)
            fullListings.push(fullListing[0]);
          })
        })
      })
    }
    findUser(function(){
      console.log('trying to find', data, fullListings)
      res.send({user: data, fullListing: fullListings})
    })
  }


};

