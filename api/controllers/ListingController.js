/**
 * ListingController
 *
 * @description :: Server-side logic for managing listings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudinary = require('cloudinary')

module.exports = {

  create: function(req, res){
    console.log(req.body)
    Listing.create({title: req.body.title, brand: req.body.brand, desc: req.body.desc, category: req.body.category, price: req.body.price, status: req.body.status, user: req.body.user.id}).populate('user').exec(function(err, listing){
      res.send(listing)
    })

  },

  upload: function(req, res){
    req.file('file').upload(function(err, file){
      var listingId = req.body['0'].join('')
      console.log(file, listingId)
      cloudinary.uploader.upload(file[0].fd, function(result){
        console.log(result)
        Image.create({listing: listingId, url: result.url}).exec(function(err, image){
          Listing.find({id: listingId}).populate('images').exec(function(err, listing){
            console.log(listing)
            if (!listing.images){
              listing[0].images = image;
            }else{
              listing[0].images.add(image);
            }
            listing[0].save(function(err, saved){
              console.log('saved listing', saved)
            });
            res.send(listing)
          })
        })
      })
    })
  }
};

