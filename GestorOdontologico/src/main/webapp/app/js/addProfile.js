app.controller('dateController', dateController);

$scope.myDate = new Date();
function dateController ($scope , $http) {
$scope.myDate = new Date();
$scope.minDate = new Date(
   $scope.myDate.getFullYear(),
   $scope.myDate.getMonth() - 2,
   $scope.myDate.getDate());
$scope.maxDate = new Date(
   $scope.myDate.getFullYear(),
   $scope.myDate.getMonth() + 2,
   $scope.myDate.getDate());
$scope.onlyWeekendsPredicate = function(date) {
   var day = date.getDay();
   return day === 0 || day === 6;
}

$scope.user = ' ';
$scope.userRet = {};
$scope.agregarPerfil = function () {

$scope.userRet = "http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente/"+ $scope.paciente.nombre + "/"+ 
$scope.paciente.apellido + "/" + $scope.paciente.direccion +"/"+ $scope.paciente.anios +"/"+ $scope.myDate + "/"+ $scope.paciente.obraSocial +"/" + $scope.paciente.DNI ;
	
$http({
	method : "POST",
	url : "http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente/"+ $scope.paciente.nombre + "/"+ 
	$scope.paciente.apellido + "/" + $scope.paciente.direccion +"/"+ $scope.paciente.anios +"/"+ $scope.myDate + "/"+ $scope.paciente.obraSocial +"/" + $scope.paciente.DNI ,
	headers: {'Content-Type': 'application/json'},
	data : $scope.userRet,
 //withCredentials: true,
})
.then(function mySucces(response, toaster) {
    $scope.myTxt = response.data.id;
    $scope.test = $scope.rock;
    console.log(response);
}, function myError(response) {
	console.log(response);
 	$scope.myTxt = "error";
});
}
}






