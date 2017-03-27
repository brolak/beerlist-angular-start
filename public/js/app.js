var app = angular.module('beerList', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  //hashbang fix
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/home',
      controller:'mainController',
      templateUrl: '/templates/home.html'
    })
    .state('beer', {
      url: '/reviews/:id',
      params: {
      	beerParam: null
      },
      controller: 'beerController',
      templateUrl: '/templates/beer.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'authController'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'authController'
    })

    //'default' state
    $urlRouterProvider.otherwise('/home');
}]);