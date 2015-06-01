/**
* Listing.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    brand: {
      type: 'string',
      required: true
    },
    desc: {
      type: 'string',
      required: true
    },
    images: {
      collection: 'Image',
      via: 'listing'
    },
    category: {
      type: 'string',
      required: true
    },
    price: {
      type: 'float',
      required: true
    },
    status: {
      type: 'boolean'
    },
    user: {
      model: 'User'
    }
  }
};

