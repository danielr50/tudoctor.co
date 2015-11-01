
// modulo principal de la aplicación
var app = angular.module('tuDoctor', ['tuDoctor.controllers', 'tuDoctor.services', 'firebase'])


//app.constant('firebaseUrl', 'https://tucocina.firebaseio.com/');

// configuración de las rutas para la aplicación web
app.config(function($stateProvider, $urlRouterProvider){

	// defino las rutas de la app
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		})

		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'dashboardCtrl'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html'
		})
		

		.state('perfil', {
			url: '/perfil',
			templateUrl: 'views/perfil.html'
		})

		.state('registro',{
			url: '/registro',
			templateUrl: 'views/registro.html',
			controller: 'registroCtrl'
		});

		$urlRouterProvider.otherwise('/');

});

