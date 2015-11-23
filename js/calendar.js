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
		// var d = date.getDate();
		// var m = date.getMonth();
		// var y = date.getFullYear();
		
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
		timezone: 'America/Bogota',

		select: function(start, end) {
			// var title = prompt('Event Title:');
			$('#calendario').modal('show');
			$scope.inicio = start;
			$scope.fin = end;
			// var title = 'Disponible: '+ start;
		},

		 //  events: [		
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+4, 16, 0),
			//   end: new Date(y, m, d+4, 16, 30),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+ new Date(y, m, d+4, 16, 0),
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+4, 17, 10),
			//   end: new Date(y, m, d+4, 18, 30),
			//   allDay: false,
			//   overlap: false,
			//   rendering: 'background',
			//   color: '#ff9f89',
			//   url: 'http://localhost:3000/#/cita/'+ new Date(y, m, d+4, 17, 10)
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+2, 17, 10),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+new Date(y, m, d+2, 17, 10)
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+9, 16, 10),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+new Date(y, m, d+9, 16, 10)
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+9, 17, 10),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+new Date(y, m, d+9, 17, 10)
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+9, 18, 10),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+new Date(y, m, d+9, 18, 10)
			// },
			// {
			//   id: 999,
			//   title: 'Disponible',
			//   start: new Date(y, m, d+9, 19, 10),
			//   allDay: false,
			//   color: '#257e4a',
			//   url: 'http://localhost:3000/#/cita/'+new Date(y, m, d+9, 19, 10)
			// }
		 //  ]
		});
	
}]);


app.controller('calendarPublicCtrl', ['$scope', function($scope){

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




	$('#calendar').fullCalendar({
	  header: {
		left: 'prev',
		center: 'title',
		right: 'month,agendaWeek,agendaDay,next'
		// right: 'month,agendaWeek,agendaDay,next'
	  },
	  lang: 'es',
	  allDay: false,
	  editable: true,
	  businessHours: true, // display business hours
	  eventLimit: true, // allow "more" link when too many events
	  events: [		
		{
		  // id: 999,
		  title: 'Disponible',
		  start: '2015-11-24T09:00:00',
		  end: '2015-11-24T10:00:00',
		  color: '#257e4a',
		  url: 'http://localhost:3000/#/cita/2015-11-24/09:00:00/10:00:00/20',
		}
	  ]
	});

}]);