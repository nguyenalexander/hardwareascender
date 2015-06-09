angular.element(document).ready(function(){
  var width = screen.width
  var inboxWidth = width/2
  var menuWidth = width/3
  // angular.element('.button-collapse').sideNav({
  //   menuWidth: menuWidth,
  //   edge: 'left',
  //   closeOnClick: true
  // });
  // angular.element('.inbox-btn').sideNav({
  //   menuWidth: inboxWidth,
  //   edge: 'left'
  // });
  angular.element('.tabs').tabs();
})