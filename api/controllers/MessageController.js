/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	send: function(req, res){
    console.log(req.body)
    User.findOne({id: req.params.id}).then(function(user){
      console.log(user)
      var title = 'New question on ' +req.body.title+'!';
      var body = req.body.body;
      var sender = req.session.user.id;
      var recipient = user.id;
      var type = req.body.type;
      var offer = req.body.offer
      console.log('message', recipient, sender, body, title, type);
      switch(type){
        case 'question':
        Message.create({messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, status: false}).exec(function(err, data){
          if (err) {console.log(err)}
          user.received.push(data)
          User.findOne({id: data.sender}).then(function(sender){
            sender.messages.push(data)
            sails.sockets.emit([req.socket.id, user.socketId], 'message', data)
            res.send(user.received)
          })
        })
      break;
        case 'offer':
        Message.create({messageTitle: title, messageBody: body, sender: sender, recipient: recipient, type: type, offer: offer, status: false}).exec(function(err, data){
          if (err) {console.log(err)}
          user.received.push(data)
          User.findOne({id: data.sender}).then(function(sender){
            sender.messages.push(data)
            sails.sockets.emit([req.socket.id, user.socketId], 'message', data)
            res.send(user.received)
          })
        })
      break;
        case 'buy':
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

