/**
 * ImageController
 *
 * @description :: Server-side logic for managing images
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudinary = require('cloudinary');

module.exports = {
	// upload: function(req, res){
 //    req.file('file').upload(function(err, file){
 //      cloudinary.uploader.upload(file[0].fd, function(result){
 //        console.log(result)
 //        res.send(result)
 //        Image.create({listing: })
 //      })
 //    })

    // req.file('images').upload(function(err, files){
    //   console.log(files)
    // })
    // res.send(JSON.stringify(req.file('images')));
    // var cache = [];
    // var item = JSON.stringify(req.body.images, function(key, value) {
    //     if (typeof value === 'object' && value !== null) {
    //         if (cache.indexOf(value) !== -1) {
    //             // Circular reference found, discard key
    //             return;
    //         }
    //         // Store value in our collection
    //         cache.push(value);
    //     }
    //     return value;
    // });
    // cache = null;
    // console.log('stringified images', req.body.images)
    // console.log('cache',cache)
    // console.log('item', item)
    // res.send('stringified', req.file('images'), cache, item)
  }
// };

