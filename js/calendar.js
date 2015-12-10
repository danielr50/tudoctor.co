var app = angular.module("tuDoctor.calendar", []);

app.controller('calendarCtrl', ['$scope', 'Horarios_doctor', function($scope, Horarios_doctor){


	$scope.select_fecha = function(){
		var eventData;

			if ($scope.nombre_horario !== "") {
				eventData = {
					title: $scope.nombre_horario,
					start: $scope.inicio,
					end: $scope.fin
				};
				$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
			}
			$('#calendar').fullCalendar('unselect');

			
			console.log('Inicio: '+$scope.inicio.format());
			console.log('Fin: '+$scope.fin.format());

			var inicio = $scope.inicio.format();
			var fin = $scope.fin.format();

			var horario = {
				nombre: $scope.nombre_horario,
				fecha_inicio: inicio,
				fecha_fin: fin,
				hora_inicio: $scope.hora_inicio,
				hora_fin: $scope.hora_fin
			};

			console.log(horario);

			// Horarios_doctor.$add(horario);

			$('#calendario').modal('hide');

	}

	var date = new Date();
			
		$('#calendar').fullCalendar({
			defaultView : "agendaWeek",
    		// axisFormat : "HH:mm",
    		agenda : "HH:mm",

		header: {
			left: 'prev',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,next'
			// right: 'month,agendaWeek,agendaDay,next'
		},
		lang: 'es',
		editable: true,
		businessHours: true, // display business hours
		eventLimit: true, // allow "more" link when too many events
		selectable: true,
		selectHelper: true,
		// timezone: 'America/Bogota',

		select: function(start, end) {
			// var title = prompt('Event Title:');
			$('#calendario').modal('show');
			$scope.inicio = start;
			$scope.fin = end;
			// var title = 'Disponible: '+ start;
		},
		});
	
}]);


app.controller('calendarPublicCtrl', ['$scope', 'Eventos', function($scope, Eventos){
	$scope.count =4;

    // funcion para retroceder una semana en el calendario
	$scope.prev = function(){
		alert('Semana Anterior');

	}	

    // función para avanzar una semana en el calendario
	$scope.next = function(){
		alert('Semana Siguiente');

		$scope.count++;

		if ($scope.count <= 10) {
            console.log($scope.count);

            // ocultar semana actual
            // $scope.calendario_semanal = '';
            // $scope.config ='';


			for (var i = $scope.count; i <= 10; i++) {

		    	$scope.calendario_semanal[i] = {
		    		id: i+1,
		    		dia: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
		    		fecha: (fecha_dia+i)-(dia-1) + ' ' + $scope.mes
		    	}
	   		}
		}
	}

	// mapa
	var testconnection = navigator.onLine;
    if (testconnection) {
    	// alert('Navegador Online!');
        // google.maps.event.addDomListener(window, 'load', init);
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

    $scope.calendario_semanal = [];

    var f = new Date();
    var dia = f.getDay();
    var fecha_dia = f.getDate();
    var mes = (f.getMonth() +1);

    switch(mes){
    	case 1:
    		$scope.mes = 'Ene';
    	break;

    	case 2:
    		$scope.mes = 'Feb';
    	break;

    	case 3:
    		$scope.mes = 'Mar';
    	break;

    	case 4:
    		$scope.mes = 'Abr';
    	break;

    	case 5:
    		$scope.mes = 'May';
    	break;

    	case 6:
    		$scope.mes = 'Jun';
    	break;

    	case 7:
    		$scope.mes = 'Jul';
    	break;

    	case 8:
    		$scope.mes = 'Ago';
    	break;

    	case 9:
    		$scope.mes = 'Sep';
    	break;

    	case 10:
    		$scope.mes = 'Oct';
    	break;

    	case 11:
    		$scope.mes = 'Nov';
    	break;

    	case 12:
    		$scope.mes = 'Dic';
    	break;
    }


    switch(dia){
    	case 1:
	    	// es lunes
	    	$('.lunes').css('background', '#ecf0f1');
	    	$scope.dia = 'Lunes';
    	break;

    	case 2:
    		// es martes
    		$('.martes').css('background', '#ecf0f1');
    		$scope.dia = 'Martes';
    		break;

    	case 3:
    		// 	es miercoles
    		$('.miercoles').css('background', '#ecf0f1');
    		$scope.dia = 'Miercoles';
    		break;

    	case 4:
    		// es jueves
    		$('.jueves').css('background', '#ecf0f1');
    		$scope.dia = 'Jueves';
    		break;

    	case 5:
    		// es viernes
    		$('.viernes').css('background', '#ecf0f1');
    		$scope.dia = 'Viernes';
    		break;
    }


    for (var i = 0; i <= 4; i++) {

    	$scope.calendario_semanal[i] = {
    		id: i+1,
    		dia: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    		fecha: (fecha_dia+i)-(dia-1) + ' ' + $scope.mes
    	};
    }

    console.log($scope.calendario_semanal);

    // if (dia == 1) {
    // 	// alert('Hoy es lunes');
    // 	$('.lunes').css('background', '#ecf0f1');
    // }
    


    if (dia < 10) {
    	dia = '0'+dia;
    }
    // var fecha_actual = f.getFullYear() + "-" + (f.getMonth() +1) + '-' + dia + 'T'+ (f.getHours()-1)+':'+f.getMinutes()+":"+f.getSeconds();

    // console.log('Fecha: ' + fecha_actual);

    // leo los parametros de comfiguracion de la base de datos
    var count = 0;
    var config = [];
    var fdb = Date();

    $scope.lunes = [];
    $scope.martes = [];
    $scope.miercoles = [];
    $scope.jueves = [];
    $scope.viernes = [];

    $scope.dia = [];

    // traigo os datos del usuario que ingreso
     var user_doctor = new Firebase("https://tudoctor.firebaseio.com/eventos/");
     user_doctor.orderByChild("doctor_id").equalTo('-K2xFw_MDovcZZo4zISZ').on("child_added", function(snapshot) {
        config[count] = snapshot.val();
        // config[count].$id = snapshot.key();
        $scope.config = config.filter(Boolean);
        count++;
       

        // LUNES
        for (var i = 0; i < $scope.config[0].dias.lunes.length; i++) {
        	$scope.lunes[i] = $scope.config[0].dias.lunes[i].cita.substring($scope.config[0].dias.lunes[i].cita.lastIndexOf('T')+1);
        	$scope.dia[i] = $scope.config[0].dias.lunes[i].cita.substring($scope.config[0].dias.lunes[i].cita.lastIndexOf('T'),0);

        	// console.log('Dia: '+$scope.dia);
        	if (parseInt($scope.lunes[i]) >= 12) {
        		$scope.lunes[i] += ' PM';
        	}else{
        		$scope.lunes[i] += ' AM';
        	}
        }

        // martes
        for (var i = 0; i < $scope.config[0].dias.martes.length; i++) {
        	$scope.martes[i] = $scope.config[0].dias.martes[i].cita.substring($scope.config[0].dias.martes[i].cita.lastIndexOf('T')+1);
        	if (parseInt($scope.martes[i]) >= 12) {
        		$scope.martes[i] += ' PM';
        	}else{
        		$scope.martes[i] += ' AM';
        	}
        }

          // miercoles
        for (var i = 0; i < $scope.config[0].dias.miercoles.length; i++) {
        	$scope.miercoles[i] = $scope.config[0].dias.miercoles[i].cita.substring($scope.config[0].dias.miercoles[i].cita.lastIndexOf('T')+1);
        	if (parseInt($scope.miercoles[i]) >= 12) {
        		$scope.miercoles[i] += ' PM';
        	}else{
        		$scope.miercoles[i] += ' AM';
        	}
        }

        // jueves
        for (var i = 0; i < $scope.config[0].dias.jueves.length; i++) {
        	$scope.jueves[i] = $scope.config[0].dias.jueves[i].cita.substring($scope.config[0].dias.jueves[i].cita.lastIndexOf('T')+1);
        	if (parseInt($scope.jueves[i]) >= 12) {
        		$scope.jueves[i] += ' PM';
        	}else{
        		$scope.jueves[i] += ' AM';
        	}
        }

        // viernes
        for (var i = 0; i < $scope.config[0].dias.viernes.length; i++) {
        	$scope.viernes[i] = $scope.config[0].dias.viernes[i].cita.substring($scope.config[0].dias.viernes[i].cita.lastIndexOf('T')+1);
        	if (parseInt($scope.viernes[i]) >= 12) {
        		$scope.viernes[i] += ' PM';
        	}else{
        		$scope.viernes[i] += ' AM';
        	}
        }





        // aquí filtro los eventos para mostrar solo las fechas validas
        // for (var i = 0; i <= $scope.config[0].eventos.length - 1; i++) {
        // 	var fecha = $scope.config[0].eventos[i].start;
        // 	fdb = fecha;

        // 	// console.log('FECHA: '+ fdb);

        // 	if (fdb < fecha_actual) {
        // 		console.log('es menor: ' + $scope.config[0].eventos[parseInt(i)].start);
        // 		$scope.config[0].eventos[i] = {
        // 			color: '#16a085',
	       //          start: '0000-00-00T00:00:00',
	       //          title: 'Vencido',
	       //          url: '#'
        // 		};
        // 	}
        // }

        

        // console.log($scope.config[0].eventos);
    	
    	// calculo horario del doctor
		// $('#calendar').fullCalendar({
		//   header: {
		// 	left: 'prev',
		// 	center: 'title',
		// 	right: 'month,next'
			// right: 'month,agendaWeek,agendaDay,next'
		  // },
		  // lang: 'es',
		  // defaultView: 'month',
		  // editable: false,
		  // businessHours: true, // display business hours
		  // eventLimit: true, // allow "more" link when too many events

		  // slotMinutes: 30,
		  // minTime : $scope.config[0].hora_inicio_labores+ ':00',
		  // maxTime : $scope.config[0].hora_fin_labores+ ':00',
		  // firstDay : 1,
		  // allDaySlot : false,
		  // weekends: false,
		  // defaultEventMinutes : $scope.config[0].hora_inicio_labores, 
		  // dragOpacity: "0.5",
		  // unselectAuto: false,
		  // weekMode : false,
		//   businessHours: {
		//   	start: $scope.config[0].hora_inicio_labores,
		//   	end: $scope.config[0].hora_fin_labores,
		//   	dow: [1,2,3,4,5]
		//   },
		//   events: function(start, end, timezone, callback){
		//   	callback($scope.config[0].eventos);
		//   }
		// });


    	
    });

	// console.log($scope.config[0].eventos);

}]);