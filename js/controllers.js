// modulo principal para los controladores de la aplicación
app = angular.module('tuDoctor.controllers', ['ui.router', 'ngAnimate'])

app.controller('HomeCtrl', ['$scope', '$location', 'Auth', '$state', function($scope, $location, Auth, $state){

    $scope.verMenu = true;

    Auth.$onAuth(function(authData){
        if(authData === null){
          console.log("not logged in yet");
          $scope.verMenu = false;
        } else{
          console.log("loggin as :", authData.uid);
          console.log('el email del usuario es '+ authData.password.email);
        }
        $scope.authData = authData;
        console.log(authData);
    });

    $scope.logout = function(){
        var auth = new Firebase("https://tudoctor.firebaseio.com/");
        auth.unauth();
        $state.go('home');
    }

	$scope.filtrar = function(){
		alert('Filtro los datos de tuDoctor');
		$location.path('/dashboard');
	}


    $scope.ajustes = function(){
        $('#load_config').modal('show');
    }
}]);


// login de usuario
app.controller('loginCtrl', ['$scope', '$state', function($scope, $state){
   
    $scope.err = false;
    $scope.user = null;



   $scope.login_user = function(){

        var ref = new Firebase("https://tudoctor.firebaseio.com");
        ref.authWithPassword({
          email    : $scope.email,
          password : $scope.password

        }, function(error, authData) {
          if (error) {
            $scope.err = true;
            $scope.mensaje = 'Datos incorrectos!';

          } else {
            console.log("Successfully with:", authData.uid);

            var count = 0;
            var paciente = [];
        

            // traigo os datos del usuario que ingreso
             var user_paciente = new Firebase("https://tudoctor.firebaseio.com/usuarios");
             user_paciente.orderByChild("idUser").equalTo(authData.uid).on("child_added", function(snapshot) {
                paciente[count] = snapshot.val();
                paciente[count].$id = snapshot.key();
                $scope.paciente = paciente.filter(Boolean);
                count++;
                $state.go('paciente');
            });


            var count1 = 0;
            var doctor = [];

            // traigo os datos del usuario que ingreso
             var user_doctor = new Firebase("https://tudoctor.firebaseio.com/doctores/");
             user_doctor.orderByChild("idUser").equalTo(authData.uid).on("child_added", function(snapshot) {
                doctor[count1] = snapshot.val();
                doctor[count1].$id = snapshot.key();
                $scope.doctor = doctor.filter(Boolean);
                count1++;
                $state.go('doctor');
            });
          }
        });
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
        mapElement = document.getElementById('mapa_doctor');
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
    $scope.ver_mensaje = false;

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
                biografia: $scope.biografia,
                idUser: userData.uid
            });

            $scope.ver_mensaje = true;
            $scope.mensaje = 'Datos guardados correctamente';
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
app.controller('citaCtrl', ['$scope', '$stateParams', '$http', 'Citas', function($scope, $stateParams, $http, Citas){

    var fecha = $stateParams.fecha;
    var hora1 = $stateParams.hora1;
    var hora2 = $stateParams.hora2;
    var duracion = $stateParams.duracion;

    console.log('fecha: ' + fecha);
    $scope.fecha = fecha;
    $scope.hora1 = hora1;
    $scope.hora2 = hora2;
    $scope.duracion = duracion;

    $scope.send_cita = function(){
        alert('Hola: ' + $scope.nombre);

        Citas.$add({
            horario: {
                fecha: $scope.fecha,
                horaInicio: $scope.hora1,
                horaFin: $scope.hora2,
                duracion: $scope.duracion
            },
            nombre: $scope.nombre,
            telefono: $scope.telefono,
            email: $scope.email
        });

        alert('Su cita fue agendada!');
    }


}]);


app.controller('doctorCtrl', ['$scope', '$timeout', 'getConfiguracion', '$http', function($scope, $timeout, getConfiguracion, $http){
    $scope.hora_inicio_labores = null;
    $scope.hora_fin_labores = null;
    $scope.duracion_cita = null;

    getConfiguracion.on('value', function(snapshot){
        var config = snapshot.val();
        console.log(config);

        if (config != null) {
            $scope.hora_inicio_labores = config.hora_inicio_labores;
            $scope.hora_fin_labores = config.hora_fin_labores;
            $scope.duracion_cita = config.duracion_cita;



            var f = new Date();
            var test = f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()+'T'+$scope.hora_inicio_labores+':00';
            console.log(test);
            var fecha_atual = new Date(test);

            
            console.log(fecha_atual.getHours());
            console.log(fecha_atual.getMinutes());


            var fechaI = fecha_atual;
            var fehaF = $scope.hora_fin_labores+':00 GMT-0500 (COT)';

            console.log('Fecha: ' + fechaI);



        }else{
            $timeout(function(){
                $('#load_config').modal('show');
            },2000);
        }
    });




    var inicio = new Date('Wed Nov 18 2015 08:00:00 GMT-0500 (COT)');
    var fin = new Date('Wed Nov 18 2015 12:00:00 GMT-0500 (COT)');

    var transcurso = fin.getHours() - inicio.getHours(); 
    var r = transcurso /1000;

    console.log(inicio.getHours());
    console.log(fin.getHours());

    console.log('inicio: ' + inicio);
    console.log('Fin: ' + fin);
    console.log('Tiempo: ' + r);


    $scope.save_horario = function(){

        var configuracion = {
            hora_inicio_labores: $scope.hora_inicio_labores,
            hora_fin_labores: $scope.hora_fin_labores,
            duracion_cita: $scope.duracion_cita
        };

        // actualio la configuracion en firebase
        getConfiguracion.update(configuracion);

        //oculto el modal
        $('#load_config').modal('hide');

    };


}]);