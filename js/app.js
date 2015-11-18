
// modulo principal de la aplicación
var app = angular.module('tuDoctor', ['tuDoctor.controllers', 'tuDoctor.calendar', 'tuDoctor.services', 'firebase'])


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
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})
		
		.state('perfil', {
			url: '/perfil',
			templateUrl: 'views/doctor/perfil.html'
		})

		.state('account', {
			url: '/account',
			templateUrl: 'views/doctor/account.html'
		})

		.state('cita', {
			url: '/cita/:fecha',
			templateUrl: 'views/cita.html',
			controller: 'citaCtrl'
		})

		.state('doctor', {
			url: '/doctor',
			templateUrl: 'views/doctor/dashboard.html',
			controller: 'doctorCtrl'
		})

		.state('calendar', {
			url: '/doctor/calendar',
			templateUrl: 'views/doctor/calendar.html',
			controller: 'calendarCtrl'
		})
		.state('paciente', {
			url: '/paciente',
			templateUrl: 'views/paciente/dashboard.html'
		})

		.state('registro',{
			url: '/registro',
			templateUrl: 'views/registro.html',
			controller: 'registroCtrl'
		});

		$urlRouterProvider.otherwise('/');

});

