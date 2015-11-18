var app = angular.module('tuDoctor.services', [])

// gestion de doctores
app.factory("Doctores", function($firebaseArray) {
  var doctores = new Firebase("https://tudoctor.firebaseio.com/doctores");
  return $firebaseArray(doctores);
});


// gestion de usuarios
app.factory("Usuarios", function($firebaseArray) {
  var usuarios = new Firebase("https://tudoctor.firebaseio.com/usuarios");
  return $firebaseArray(usuarios);
});


// gestion de horarios_doctor
app.factory("Horarios_doctor", function($firebaseArray) {
  var horarios_doctor = new Firebase("https://tudoctor.firebaseio.com/horarios_doctor");
  return $firebaseArray(horarios_doctor);
});


// configuración doctor
app.factory("Configuracion", function($firebaseObject) {
  var configuracion = new Firebase("https://tudoctor.firebaseio.com/configuracion/-K3QFCPkQtlscqS8CCeI");
  return $firebaseObject(configuracion);
});

app.factory("Auth", function($firebaseAuth){

	var ref = new Firebase("https://tudoctor.firebaseio.com/");
	var auth = $firebaseAuth(ref);

	return auth;
});