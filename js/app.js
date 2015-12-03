
// modulo principal de la aplicación
var app = angular.module('tuDoctor', ['tuDoctor.controllers', 'tuDoctor.calendar', 'tuDoctor.services', 'tuDoctor.directives', 'firebase'])


//app.constant('firebaseUrl', 'https://tucocina.firebaseio.com/');

// configuración de las rutas para la aplicación web
app.config(function($stateProvider, $urlRouterProvider){
	// $window.Stripe.setPublishableKey('pk_test_Go8oRcGqi7nirJSYWmLddjfd');

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
			templateUrl: 'views/perfil.html',
			controller: 'calendarPublicCtrl'
		})

		.state('account', {
			url: '/account',
			templateUrl: 'views/doctor/account.html'
		})

		.state('cita', {
			url: '/cita/:fecha/:hora1/:duracion/:events',
			templateUrl: 'views/cita.html',
			controller: 'citaCtrl'
		})

		.state('doctor', {
			url: '/doctor',
			templateUrl: 'views/doctor/dashboard.html',
			controller: 'doctorCtrl'
		})

		.state('perfilDoctor', {
			url: '/doctor/perfil',
			templateUrl: 'views/doctor/perfil.html'
		})

		.state('pago', {
			url: '/doctor/pago/:plan',
			templateUrl: 'views/doctor/pago.html',
			controller: 'pagoCtrl'
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

