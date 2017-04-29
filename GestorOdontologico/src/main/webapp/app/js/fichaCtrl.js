app.controller('fichaCtrl', function($scope,$http , $routeParams, PacienteService,toaster) {

	$scope.showModal = false;
	$scope.paciente={};
	$scope.dni = $routeParams.dni;
	$scope.verFicha = function(dni) {
	$scope.paciente = PacienteService.getPacienteDni($scope.dni);
	$scope.openModal();
	}

	$scope.updatePaciente=function(){
		$http({
			method : 'PUT',
			url : '/GestorOdontologico/service/paciente/updatePaciente/' + $scope.paciente.dni,
			headers : {
				 'Content-Type' : 'application/json',
                 'accept' : 'application/json'
			},
			data: $scope.paciente
			
		}).then(function mySucces(response) {
			 $scope.paciente = response.data;			
			console.log(response.data)
			toaster.pop('success', "Acutalizacion OK");

		}, function myError(response) {
			toaster.pop('error', "Sistema no disponible en estos momentos");
			console.log(response);
		});	

		
	}
	
	$scope.openModal = function() {
		$scope.showModal = true;
	};

	$scope.ok = function() {
		$scope.showModalSeeDetail = true;
	};

	$scope.cancel = function() {
		$scope.showModal = false;
		$scope.paciente = {};
	};
	$scope.verFicha($routeParams.DNI);
	
});