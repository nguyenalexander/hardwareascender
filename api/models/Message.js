/**
* Message.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    messageTitle:{
      type: 'string'
    },
    messageBody: {
      type: 'string',
      required: true
    },
    sender: {
      model: 'User'
    },
    recipient: {
      model: 'User'
    },
    status: {
      type: 'boolean'
    },
    type: {
      type: 'string'
    },
    listing: {
      model: 'Listing'
    }
  }
};

