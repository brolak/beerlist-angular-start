app.factory('authFactory', function($http,$state) {

  var auth = {};

  auth.currentUser = {};

  auth.register = function(user) {
  	return $http.post('/users/register', user)
    .then(function(response) {
      auth.currentUser.username = angular.copy(response.data);
      $state.go('home');
    }, function(err) {
        alert(err.data.message);
    });
  };

  auth.login = function (user) {
  	return $http.post('/users/login', user)
    .then(function(response){
      auth.currentUser.username = angular.copy(response.data);
      $state.go('home');
    }, function(err){
      alert(err.data);
    })
  };

  auth.getCurrentUser = function () {
  	return $http.get('/users/currentUser')
    .then(function(response) {
      auth.currentUser.username = angular.copy(response.data);
    })	
  };

  auth.logout = function () {
    return $http.get('/users/logout')
    .then(function() {
      auth.currentUser.username = null;
      $state.go('home');
    })
  };
  
  return auth;
});