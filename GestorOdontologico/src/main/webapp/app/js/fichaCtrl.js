app.controller('fichaCtrl', function($scope, $routeParams, PacienteService) {

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