// modulo principal para los controladores de la aplicación
app = angular.module('tuDoctor.controllers', ['ui.router', 'ngAnimate'])

app.controller('HomeCtrl', ['$scope', '$location', function($scope, $location){

	$scope.filtrar = function(){
		alert('Filtro los datos de tuDoctor');
		$location.path('/dashboard');
	}

}]);



app.controller('dashboardCtrl', ['$scope', 'Doctores', '$location', function($scope, Doctores, $location){

	// listado de doctores
	$scope.doctores = Doctores;

	/* ==========================================================================
    Map
    ========================================================================== */
    function init() {

        var myLatlng, mapOptions, mapElement, map, markerimage, marker, styleSs;

        myLatlng = new google.maps.LatLng(4.6741146, -74.04834249999999);
        mapOptions = {
            zoom: 16,
            panControl: false,
            scrollwheel: false,
            mapTypeControl: true,
            center: myLatlng
        };
        mapElement = document.getElementById('map');
        map = new google.maps.Map(mapElement, mapOptions);
        
        marker = new google.maps.Marker({
            position: myLatlng,
            map: map
            
        });
    }

    testconnection = navigator.onLine;
    if (testconnection) {
        google.maps.event.addDomListener(window, 'load', init);
    }



    $scope.calendar = function(){
    	alert('Aquí muestro el perfil y calendario del doctor');
        $location.path('/perfil');
    }


}]);


// controlador de registro de usuarios al sistema
app.controller('registroCtrl', ['$scope', 'Doctores', 'Usuarios', function($scope, Doctores, Usuarios){

    // registra doctor
	$scope.saveDoctor = function(){

        var docRef = new Firebase("https://tudoctor.firebaseio.com/doctores");
        docRef.createUser({
          email    : $scope.email,
          password : $scope.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {

            Doctores.$add({
                nombre: $scope.nombre,
                especialidad: $scope.especialidad,
                email: $scope.email,
                ciudad: $scope.ciudad,
                biografia: $scope.biografia
            });
          }
        });


		
	}

    // registra usuario
    $scope.saveUsuario = function(){
        var userRef = new Firebase("https://tudoctor.firebaseio.com/usuarios");
        userRef.createUser({
          email    : $scope.emailUser,
          password : $scope.passwordUser
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            
            Usuarios.$add({
                nombre: $scope.nameUser,
                idUser: userData.uid
            });
          }
        });
    }
}]);



// cita
app.controller('citaCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
    var fecha = $stateParams.fecha;
    console.log('fecha: ' + fecha);
    $scope.fecha = fecha;
}]);