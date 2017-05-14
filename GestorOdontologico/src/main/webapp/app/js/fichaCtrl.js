app.controller('fichaCtrl', function($scope,$http , $routeParams, PacienteService,toaster) {

	$scope.showModal = false;
	$scope.dni = $routeParams.dni;
	
	$scope.verFicha = function(dni) {
	console.log($scope.dni);	
	
	PacienteService.obtenerPacienteDni($scope.dni)
	.then(function (pacienteRet) {
		$scope.paciente = pacienteRet;
		console.log("+++++++++++++++");
		console.log($scope.paciente);
		
		console.log("+++++++++++++++");	 
	});
	

	
	$scope.openModal();
	}

	$scope.updatePaciente=function(){

		PacienteService.updatePaciente($scope.paciente)
		.then(function (pacienteRet) {
			$scope.paciente = pacienteRet;
			console.log("++++++UPDATE+++++++++");
			console.log($scope.paciente);
			
			console.log("+++++++++++++++");	 
		});
			
	}	
	$scope.opened = {};
	
	$scope.openedAlta = {};

	$scope.open = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
	};
	
	$scope.openAlta = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedAlta[elementOpened] = !$scope.openedAlta[elementOpened];
	};

	
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