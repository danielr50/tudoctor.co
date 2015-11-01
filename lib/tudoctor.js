//Javascript para enviar la solicitud ajax al server
$(document).ready(function(){
	$('#registrarDoctor').click(function(){
		//e.preventDefault(); //Elimino el evento por default del boton submit del form
		
		data = $('#frmDoctor').serialize();

		$.ajax({
			url: 'backend/doctor.php',
			data: data,
			type: 'POST',
			dataType: 'json',

			success: function(data){
				if (data.error) {
					console.log('incorrecto ');
					$('.respuesta').addClass('alert alert-danger');
					$('.respuesta').html("<p>Error al registrar los datos</p>");
				}else{
					console.log('Correcto');
					$('.respuesta').addClass('alert alert-success');
					$('.respuesta').html("<p>Los datos fueron registrados</p>");
				}
			},

			error: function(jqXHR, textStatus, error){
	            	console.log(jqXHR.responseText);
	                console.log(error.mensaje);
	            }
		});
	});



	$('#registrarPaciente').click(function(){
	//e.preventDefault(); //Elimino el evento por default del boton submit del form
	
		data = $('#frmPaciente').serialize();

		$.ajax({
			url: 'backend/paciente.php',
			data: data,
			type: 'POST',
			dataType: 'json',

			success: function(data){
				if (data.error) {
					console.log('incorrecto ');
					$('.respuestaPaciente').addClass('alert alert-danger');
					$('.respuestaPaciente').html("<p>Error al registrar los datos</p>");
				}else{
					console.log('Correcto');
					$('.respuestaPaciente').addClass('alert alert-success');
					$('.respuestaPaciente').html("<p>Los datos fueron registrados</p>");
				}
			},

			error: function(jqXHR, textStatus, error){
	            	console.log(jqXHR.responseText);
	                console.log(error.mensaje);
	            }
		});
	});
});