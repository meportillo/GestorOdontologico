app.controller('agregarPacienteCtrl',function($scope, $http, toaster, PacienteService) {

	$scope.myDate = new Date();
	$scope.minDate = new Date($scope.myDate.getFullYear(), $scope.myDate.getMonth() - 2, $scope.myDate.getDate());
	$scope.maxDate = new Date($scope.myDate.getFullYear(),$scope.myDate.getMonth() + 2, $scope.myDate.getDate());

	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	}
	
	$scope.paciente = {};
 	$scope.paciente.anios = 0;

	$scope.agregarPerfil = function() {

		$scope.paciente.fechaNac= $scope.myDate;
 		if($scope.myDate == null){
 			toaster.pop('error', 'Por favor ingresa una fecha de nacimiento' );
 		}else{

		$http({ 
				method : 'POST',
				url : 'http://localhost:8080/GestorOdontologico/service/paciente/crearPaciente',
				headers : { 'Content-Type' : 'application/json'},
				data : $scope.paciente,
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
})
