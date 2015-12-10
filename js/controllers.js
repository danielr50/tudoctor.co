// modulo principal para los controladores de la aplicación
app = angular.module('tuDoctor.controllers', ['ui.router', 'ngAnimate', 'angularPayments'])

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

    $scope.getPosition = function(){
        // setTimeout(function(){
        // $scope.$apply(function(){
        // $scope.origen = '';
        console.log('Aqui voy');
            if (navigator.geolocation) {
            var geocoder = new google.maps.Geocoder();
            navigator.geolocation.getCurrentPosition(function(position){
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                console.log('LAT: ' + lat + ' LON: ' + lng);

                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, function(results, status){
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            // console.log('Dirección: ' +results[0].formatted_address);
                            var origen = results[0].formatted_address;
                            console.log('origen: '+origen);

                            // if ($scope.activo) {
                            // setTimeout(function(){
                            //  $scope.$apply(function(){
                            //      $scope.origen = origen;
                            //  });
                            // }, 100);
                            
                            $scope.$apply(function(){
                            $scope.origen = 'Posición actual';

                            });

                        // }else{
                        //     $scope.$apply(function(){
                        //     $scope.origen = '';

                        //     });
                        // }
                        }
                    }
                });
            });
        }
    }

    $scope.logout = function(){
        var auth = new Firebase("https://tudoctor.firebaseio.com/");
        auth.unauth();
        $state.go('home');
    }

	$scope.filtrar = function(){
		alert('Filtro los datos de tuDoctor');
        if ($scope.origen != null) {
		  $location.path('/dashboard');

        }
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
app.controller('registroCtrl', ['$scope', 'Doctores', 'Usuarios', '$state', function($scope, Doctores, Usuarios, $state){
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
            $state.go('doctor/perfilDoctor');
        }

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
app.controller('citaCtrl', ['$scope', '$stateParams', '$http', 'Citas', 'Eventos', '$state', 'Auth', function($scope, $stateParams, $http, Citas, Eventos, $state, Auth){
    var doctor_id = null;

    // doctor logueado
    Auth.$onAuth(function(authData){
        if(authData === null){
          console.log("not logged in yet");
          $state.go('login');
        } else{
          doctor_id = authData.uid;
        }
    });

    var fecha = $stateParams.fecha;
    var hora1 = $stateParams.hora1;
    var duracion = $stateParams.duracion;
    var id_event = $stateParams.events;

    console.log('ID eventos: ' + id_event);

    console.log('fecha: ' + fecha);
    $scope.fecha = fecha;
    $scope.hora1 = hora1;
    $scope.duracion = duracion;

    // var count = 0;
    // var config = [];
    // var user_doctor = new Firebase("https://tudoctor.firebaseio.com/eventos/");
    // user_doctor.orderByChild("doctor_id").equalTo('-K2xFw_MDovcZZo4zISZ').on("child_added", function(snapshot) {
    //     console.log(snapshot);

    //     config[count] = snapshot.val();
    //     config[count].$id = snapshot.key();
    //     var items = config.filter(Boolean);
    //     count++;
        
    //     var item = items[0].eventos[id_event];

    //     // items.$remove(item).then(function(ref) {
    //     //   ref.key() === item.$id; // true
    //     // });

    //     console.log(item);
    // });

    $scope.send_cita = function(){
        alert('Hola: ' + $scope.nombre);

        Citas.$add({
            horario: {
                fecha: $scope.fecha,
                horaInicio: $scope.hora1,
                duracion: $scope.duracion
            },
            nombre: $scope.nombre,
            telefono: $scope.telefono,
            email: $scope.email,
            doctor_id: doctor_id
        });

        alert('Su cita fue agendada!');

        var count = 0;
        var config = [];
        
        // var eventosUpdate = new Firebase('https://tudoctor.firebaseio.com/eventos/-K2xFw_MDovcZZo4zISZ');

        // traigo os datos del usuario que ingreso
         var user_doctor = new Firebase("https://tudoctor.firebaseio.com/eventos/");

         user_doctor.orderByChild("doctor_id").equalTo(doctor_id).on("child_added", function(snapshot) {
            config[count] = snapshot.val();
            config[count].$id = snapshot.key();
            var eventos_list = config.filter(Boolean);
            count++;

            // var eventEdit = Eventos;
            // Eventos[0].eventos.splice(id_event,1);
            // delete Eventos[0].eventos[id_event];
            Eventos[0].eventos[id_event] = {
                color: '#16a085',
                start: '0000-00-00T00:00:00',
                title: 'Ocupado',
                url: '#'
            };

            Eventos.$save(0).then(function(ref){
                ref.key() === Eventos[0].$id; // true
                console.log(ref);
            });

            // console.log(eventEdit);

            

        });        
    }


}]);


app.controller('doctorCtrl', ['$scope', '$timeout', '$http', 'Eventos', '$state', 'Auth', 'Config', function($scope, $timeout, $http, Eventos, $state, Auth, Config){
    $scope.hora_inicio_labores = null;
    $scope.hora_fin_labores = null;
    $scope.duracion_cita = null;

    var doctor_id = null;

    // doctor logueado
    Auth.$onAuth(function(authData){
        if(authData === null){
          console.log("not logged in yet");
          $state.go('login');
        } else{
          doctor_id = authData.uid;
        }
    });


    // traigo las citas pendientes del doctor
    var count = 0;
    var citas = [];

    // traigo os datos del usuario que ingreso
    var citas_doctor = new Firebase("https://tudoctor.firebaseio.com/citas/");
     citas_doctor.orderByChild("doctor_id").equalTo(doctor_id).on("child_added", function(snapshot) {
        citas[count] = snapshot.val();
        // config[count].$id = snapshot.key();
        $scope.citas = citas.filter(Boolean);
        $scope.num_citas = $scope.citas.length;
        count++;
        console.log($scope.citas);
    });

    var ref = new Firebase('https://tudoctor.firebaseio.com/configuracion/'+doctor_id);
    ref.on('value', function(snapshot){
        var config = snapshot.val();
        console.log('Config: '+config);

        if (config != null) {
            $scope.hora_inicio_labores = config.hora_inicio_labores;
            $scope.hora_fin_labores = config.hora_fin_labores;
            $scope.duracion_cita = config.duracion_cita;
            // $scope.hora_almuerzo = config.hora_almuerzo;
        }else{

            $timeout(function(){
                $('#load_config').modal('show');
            },2000);
        }
    });


    $scope.save_horario = function(){

        var configuracion = {
            hora_inicio_labores: $scope.hora_inicio_labores,
            hora_fin_labores: $scope.hora_fin_labores,
            duracion_cita: $scope.duracion_cita,
            hora_almuerzo: $scope.hora_almuerzo
        };

        if ($scope.config =! null) {
            // actualio la configuracion en firebase
            var ref = new Firebase('https://tudoctor.firebaseio.com/configuracion/'+doctor_id);
            ref.update(configuracion);
        }else{
            Config.$add({
                hora_inicio_labores: $scope.hora_inicio_labores,
                hora_fin_labores: $scope.hora_fin_labores,
                // hora_almuerzo: $scope.hora_almuerzo,
                duracion_cita: $scope.duracion_cita,
                doctor_id: doctor_id
            });
        }



        //creo el calendario de la semana
        var f = new Date();
        var fecha_actual = f.getFullYear() + "-" + (f.getMonth() +1);

        var hora1 = parseInt($scope.hora_inicio_labores.substr(0,2));
        var minuto1 = parseInt($scope.hora_inicio_labores.substr(3, 2));

        var hora2 = parseInt($scope.hora_fin_labores.substr(0,2));
        var minuto2 = parseInt($scope.hora_fin_labores.substr(3,2));

        var tiempo_cita = parseInt($scope.duracion_cita);

        var contador = 0;
        var horario = [];

        var hoy = f.getDate();
        var diaSemana = f.getDay();
        var incremento = 0;

        // var id_event = 0;

        // horario
        horario = {
            doctor_id: doctor_id,
            periodo: 4,
            dias: {
               lunes:[],
               martes: [],
               miercoles: [],
               jueves: [],
               viernes: []
            }
        };

        for (var j = diaSemana; j <= 5; j++) {
            
            for (var i = hora1; i <= hora2; i++) {

                for (var k = 1; k <= (60/tiempo_cita); k++) {

                    console.log('Valor de j: ' + j);

                    switch(j){
                        case 1:
                            horario.dias.lunes.push({
                                cita: fecha_actual+'-'+(hoy+incremento)+'T'+i+':'+contador
                            });
                            break;

                        case 2:
                            horario.dias.martes.push({
                                cita: fecha_actual+'-'+(hoy+incremento)+'T'+i+':'+contador
                            });
                            break;

                        case 3:
                            horario.dias.miercoles.push({
                                cita: fecha_actual+'-'+(hoy+incremento)+'T'+i+':'+contador
                            });
                            break;

                        case 4:
                            horario.dias.jueves.push({
                                cita: fecha_actual+'-'+(hoy+incremento)+'T'+i+':'+contador
                            });
                            break;

                        case 5:
                            horario.dias.viernes.push({
                                cita: fecha_actual+'-'+(hoy+incremento)+'T'+i+':'+contador
                            });
                            break;

                        default:
                            console.log('Dia no valido');

                    }


                    contador = parseInt(contador);
                    i = parseInt(i);
                    
                    // id_event++;

                    contador = (contador + tiempo_cita);

                    if (contador == 60) {
                        contador = 0;
                    }
                }
                
            }
            incremento++;
        } // fin calendario semanal

        Eventos.$add(horario);

        //oculto el modal
        $('#load_config').modal('hide');

    };


}]);




app.controller('pagoCtrl', ['$scope', '$stateParams', function($scope, $stateParams){
    var plan = $stateParams.plan;

    $scope.ver_banco = false;
    $scope.ver_credito = true;

    $scope.banco = function(){
        
        $scope.ver_credito = false;
        $scope.ver_banco = true;
    }
    $scope.credito = function(){
        
        $scope.ver_banco = false;
        $scope.ver_credito = true;
    }

    $scope.pagar = function(){
        console.log('Pagar');
    }


    // Stripe Response Handler
    $scope.stripeCallback = function (code, result) {
        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
            window.alert('success! token: ' + result.id);
        }
    };

    switch(plan){
        case 'gratis':
            $scope.plan_doctor = {
                nombre: 'Gratis',
                valor: 0,
                pago: 'Mensual',
                descripcion: 'Este plan permite probar nuestros servicios por un mes, teniendo acceso a todas los servicios de la plataforma'
            };
        break;

        case 'basico':
            $scope.plan_doctor = {
                nombre: 'Básico',
                valor: 20,
                pago: 'Mensual',
                descripcion: 'Este plan le permite publicar información de su perfil en nuestra plataforma pero su calendario no estará publico'
            };
        break;

        case 'avanzado':
            $scope.plan_doctor = {
                nombre: 'Avanzado',
                valor: 26,
                pago: 'Mensual',
                descripcion: 'Este plan le permite tener publica toda su información profesional así como tambien su calendarió de citas'
            };
        break;

        default:
            $scope.plan_doctor = {
                nombre: 'Ninguno',
                valor: 0,
                pago: '0',
                descripcion: 'Seleccion un plan'
            };
    }

}]);
