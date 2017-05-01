app.controller('agregarPacienteCtrl',function($scope, $http, toaster, PacienteService,$location) {

	$scope.myDate = new Date();
	$scope.minDate = new Date($scope.myDate.getFullYear(), $scope.myDate.getMonth() - 2, $scope.myDate.getDate());
	$scope.maxDate = new Date($scope.myDate.getFullYear(),$scope.myDate.getMonth() + 2, $scope.myDate.getDate());

	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	}
	
	$scope.paciente = {};
 	$scope.paciente.anios = 0;

 	$scope.obrasSociales = [];
 	
	$http({ 
		method : 'GET',
		url : '/GestorOdontologico/service/obraSocial/obrasSociales',
		headers : { 'Content-Type' : 'application/json'},
		data : $scope.paciente,
		}).then(function mySucces(response) {
			$scope.obrasSociales = response.data;
			console.log(response);
		}, function myError(response) {
		toaster.pop('error', response.status + ', ' + response.message );
		$scope.myTxt = "error";
		});
		

 	
 	
	$scope.agregarPerfil = function() {

		$scope.paciente.fechaNac= $scope.myDate;
 		if($scope.myDate == null){
 			$scope.myDate = new Date($scope.myDate);
 			console.log($scope.myDate);
 			toaster.pop('error', 'Por favor ingresa una fecha de nacimiento' );
 		}else{

		$http({ 
				method : 'POST',
				url : '/GestorOdontologico/service/paciente/crearPaciente',
				headers : { 'Content-Type' : 'application/json'},
				data : $scope.paciente,
			}).then(function mySucces(response) {
				toaster.pop('sucess', 'Agregado en forma correcta');
				PacienteService.agregarPaciente(response.data);
				$location.path('/historias/ficha/'+response.data.dni);
				console.log(response);
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
			$scope.myTxt = "error";
			});
 		}
	}
})
