<?php
// Recibo los datos de la peticion ajax
$nombre = $_POST['nombre'];
$ciudad = $_POST['ciudad'];
$email = $_POST['email'];
$fecha = date("F j, Y, g:i a");

// Conecto a la base de datos, esto debería estar en una clase aparte pero por rapidez se hace aquí
$server = 'localhost';
$user = 'root';
$pass = '';
$db = 'db_doctor';

$conexion = mysql_connect($server, $user, $pass)or die('Error al conectar con la base de datos');
mysql_select_db($db, $conexion)or die('Erro selecciondo la base de datos');

//Preparo el query
$query = "INSERT INTO tb_paciente(nombre, ciudad, email, fecha)VALUES('$nombre', '$ciudad', '$email', '$fecha')";
if (mysql_query($query)) {
	$jsonresponse['error'] = false;
}else{
	$jsonresponse['error'] = true;
}

echo json_encode($jsonresponse);
?>