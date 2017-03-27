app.factory('authFactory', function($http) {

  var auth = {};

  auth.register = function(user) {
  	return $http.post('/users/register', user);
  };

  auth.login = function (user) {
  	return $http.post('users/login', user)
 //  	.then(function(response){
	// 	auth.currentUser.username = response.data;
	// 	console.log(auth.currentUser.username);
	// })
  }

  auth.currentUser = {};

  return auth;
});