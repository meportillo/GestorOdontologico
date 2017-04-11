angular
.module('firstApplication', ['ngMaterial','ngMessages'])
.controller('dateController', dateController);

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

$scope.user = {};
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
.then(function mySucces(response) {
 $scope.myTxt = response.data.id;
 $scope.test = $scope.rock;
 console.log(response);
}, function myError(response) {
 console.log(response);
 $scope.myTxt = "error";
});
}

}

/*
app.controller('agregarPacienteCtrl', function($scope, $http) {
   $scope.user = {};
   $scope.userRet = {};
$scope.agregarPerfil = function () {
  $scope.userRet.amountMax = $scope.user.montoMaximo;
  $scope.userRet.nameUser = $scope.user.nameUser;  
  
  $http({
    method : "POST",
    url : "http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente/nombreTest2/apellidoTest2/direccionTest2/2/3/1/11112" ,
    headers: {'Content-Type': 'application/json'},
    data : $scope.userRet,
    //withCredentials: true,
  })
  .then(function mySucces(response) {
    $scope.myTxt = response.data.id;
    $scope.test = $scope.rock;
    console.log(response);
  }, function myError(response) {
    console.log(response);
    $scope.myTxt = "error";
  });
}
});
*/
/* ANDANDO
angular.module('adondevamosgrupodApp')
.controller('addProfileCtrl', function($scope, $http) {
$scope.agregarPerfil = function () {
	$http({
		method : "POST",
		url : "http://localhost:8080/desapp-grupod-backend/rest/profile/addprofile/" + $scope.txtBoxMontoMaximo,
		headers: {'Content-Type': 'application/json'}
	}).then(function mySucces(response) {
		$scope.myTxt = response.data.id;
		$scope.test = $scope.rock;
		console.log(response);
	}, function myError(response) {
		console.log(response);
		$scope.myTxt = "error";
	});
}
});
*/





