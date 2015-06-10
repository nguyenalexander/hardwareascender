var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true
    },
    reputation: {
      type: 'integer'
    },
    listings: {
      collection: 'Listing',
      via: 'user'
    },
    watchList : {
      collection: 'Listing'
    },
    messages: {
      collection: 'Message',
      via: 'sender'
    },
    received: {
      collection: 'Message',
      via: 'recipient'
    },
    socketId: {
      type: 'string'
    }
  },
  beforeCreate: function(values, callback) {

    // salt is 10 digits
    bcrypt.hash(values.password, 10, function(err, hash) {

      // callback with error
      if (err) return callback(err);

      values.password = hash;

      // callback without arguments is success;
      callback();
    });
  }
};

