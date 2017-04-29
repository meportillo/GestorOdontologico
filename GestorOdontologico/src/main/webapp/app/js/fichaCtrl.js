app.controller('fichaCtrl', function($scope,$http , $routeParams, PacienteService,toaster) {

	$scope.showModal = false;
	$scope.paciente={};
	$scope.dni = $routeParams.dni;
	console.log($scope.dni);
	$scope.verFicha = function(dni) {
	console.log(PacienteService.getPacienteDni($scope.dni));
	console.log(PacienteService.getPacientes());				
	$scope.paciente = PacienteService.getPacienteDni($scope.dni);
	$scope.openModal();
	}

	$scope.updatePaciente=function(){
//	console.log("asdfsdf");
//	console.log($scope.paciente);
//	var ret =	PacienteService.updatePaciente($scope.paciente);
//	console.log("ret " + ret);
//	$scope.paciente = ret;
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

	
	
})