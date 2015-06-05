/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function(req, res){
    User.findOne({id: req.params.id}).then(function(user){
      console.log(user)
      console.log(req.body)
      var body = req.body.body;
      var sender = req.session.user.id;
      var recipient = user.id;
      var type = req.body.type;
      var offer = req.body.offer;
      var listing = req.body.listing;
      console.log('message', recipient, sender, body, req.body.title, type);
      switch(type){
        case 'question':
        var title = req.body.title;
        Message.create({messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, status: false, listing: listing}).populate('recipient').populate('sender').exec(function(err, data){
          if (err) {console.log(err)}
          user.received.push(data)
          User.findOne({id: data.sender}).then(function(sender){
            sender.messages.push(data)
            if (user.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', data)
              res.send(data)
            }else{
              sails.sockets.emit([req.socket.id], 'message', data)
              res.send(data)
            }
          })
        })
      break;
        case 'offer':
        var title = 'New offer on ' +req.body.title+'!';
        Message.create({messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, offer: offer, status: false, listing: listing}).exec(function(err, data){
          if (err) {console.log(err)}
          user.received.push(data)
          User.findOne({id: data.sender}).then(function(sender){
            sender.messages.push(data)
            if (user.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', data)
            res.send(data)
            }else{
              sails.sockets.emit([req.socket.id], 'message', data)
            res.send(data)
            }
          })
        })
      break;
        case 'offer reply':
        var title = 'Counter offer on "'+req.body.title+'"!';
        Message.update({id:req.body.id}, {messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, offer: offer, status: false}).exec(function afterwards(err,updated){
          if (err) {
            console.log(err);
            res.send(500, err);
            return
          }
          if (updated){
            console.log('updated',updated)
            user.received.push(updated[0])
            User.findOne({id: updated[0].sender}).then(function(sender){
              console.log(sender)
              sender.messages.push(updated[0])
            if (sender.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', updated[0])
              res.send(updated[0])
            }else{
              sails.sockets.emit([req.socket.id], 'message', updated[0])
              res.send(updated[0])
            }
            })
          }else{
            res.send("Couldn't find this item.")
          }
        })
      break;
        case 'offer decline':
        var title = 'Your offer on "'+req.body.title+'" has been declined.';
        Message.update({id:req.body.id}, {messageTitle: title, messageBody: 'Your offer of '+offer+' has been declined', sender: sender, recipient: recipient, type: type, offer: offer, status: false}).exec(function afterwards(err,updated){
          if (err) {
            console.log(err);
            res.send(500, err);
            return
          }
          if (updated){
            console.log('updated',updated)
            user.received.push(updated[0])
            User.findOne({id: updated[0].sender}).then(function(sender){
              console.log(sender)
              sender.messages.push(updated[0])
            if (sender.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', updated[0])
              res.send(updated[0])
            }else{
              sails.sockets.emit([req.socket.id], 'message', updated[0])
              res.send(updated[0])
            }
            })
          }else{
            res.send("Couldn't find this item.")
          }
        })
      break;
        case 'offer accept':
        var title = 'Your offer on "'+req.body.title+'" has been accepted!';
        Message.update({id:req.body.id}, {messageTitle: title, messageBody: 'Your offer of '+offer+' has been accepted!', sender: sender, recipient: recipient, type: type, offer: offer, status: false}).exec(function afterwards(err,updated){
          if (err) {
            console.log(err);
            res.send(500, err);
            return
          }
          if (updated){
            console.log('updated',updated)
            user.received.push(updated[0])
            User.findOne({id: updated[0].sender}).then(function(sender){
              console.log(sender)
            if (sender.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', updated[0])
            }else{
              sails.sockets.emit([req.socket.id], 'message', updated[0])
            }
            })
            Listing.update({id: updated[0].listing}, {status: true}).exec(function afterwards(err, listing){
              console.log(listing)
              sails.sockets.emit([req.socket.id], 'accept', listing[0])
            })
            res.send(updated[0])
          }else{
            res.send("Couldn't find this item.")
          }
        })
      break;
        case 'buy':
        console.log(req.body)
        var title = req.body.title;
        Message.create({messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, offer: offer, status: false, listing: listing}).exec(function(err, data){
          if (err) {console.log(err)}
          console.log(data)
          user.received.push(data)
          User.findOne({id: data.sender}).then(function(sender){
            sender.messages.push(data)
            if (sender.socketId){
              sails.sockets.emit([req.socket.id, user.socketId], 'message', data)
              res.send(data)
            }else{
              sails.sockets.emit([req.socket.id], 'message', data)
              res.send(data)
            }
          })
        })
      break;
      }
    })
  }
};


  // $scope.send = function(){
  //   $scope.currentUser = UserService.currentUser;
  //   console.log($scope.currentUser, $scope.listing.user)
  //   var title = "Question on \'" + $scope.listing.title + '\'!';
  //   MessageService.send(title, $scope.messageBody, $scope.currentUser, $scope.listing.user, function(err, data){
  //     if (err){
  //       console.log(err);
  //     }else if (data && data.messages){
  //       console.log(data, data.messages)
  //       $mdDialog.hide();
  //     }else{
  //       console.log('message could not be sent!')
  //     }
  //   })
  // };

