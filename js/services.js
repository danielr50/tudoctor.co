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
