app.controller('agregarPacienteCtrl',['PacienteService',function($scope, $http, toaster, PacienteService) {

	$scope.myDate = new Date();
	$scope.minDate = new Date($scope.myDate.getFullYear(),
		$scope.myDate.getMonth() - 2, $scope.myDate
			.getDate());
	$scope.maxDate = new Date($scope.myDate.getFullYear(),
		$scope.myDate.getMonth() + 2, $scope.myDate
			.getDate());
	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	}


}]);

angular.module('gestorOdont')
.controller('agregarPacienteCtrl', function($scope, $http, toaster) {
	$scope.user = ' ';
	$scope.userRet = {};
	$scope.paciente = {};
 	$scope.paciente.anios = 0;

	$scope.agregarPerfil = function() {

		
		$scope.userRet = "http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente/"
				+ $scope.paciente.nombre
				+ "/"
				+ $scope.paciente.apellido
				+ "/"
				+ $scope.paciente.direccion
				+ "/"
				+ $scope.paciente.anios
				+ "/"
				+ $scope.myDate
				+ "/"
				+ $scope.paciente.obraSocial
				+ "/"
				+ $scope.paciente.DNI;

 		if($scope.myDate == null){
 			toaster.pop('error', 'Por favor ingresa una fecha de nacimiento' );
 		}else{

		$http(
				{
					method : "POST",
					url : "http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente/"
							+ $scope.paciente.nombre
							+ "/"
							+ $scope.paciente.apellido
							+ "/"
							+ $scope.paciente.direccion
							+ "/"
							+ $scope.paciente.anios
							+ "/"
							+ $scope.myDate
							+ "/"
							+ $scope.paciente.obraSocial
							+ "/"
							+ $scope.paciente.DNI,
					headers : {
						'Content-Type' : 'application/json'
					},
					data : $scope.userRet,
				}).then(function mySucces(response) {
				toaster.pop('sucess', 'Agregado en forma correcta');
				console.log(response);
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
			$scope.myTxt = "error";
		});
	}
}
});
