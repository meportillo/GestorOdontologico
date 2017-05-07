app.controller('fichaCtrl', function($scope,$http , $routeParams, PacienteService,toaster) {

	$scope.showModal = false;
	$scope.paciente={};
	$scope.dni = $routeParams.dni;
	
	$scope.verFicha = function(dni) {
	console.log($scope.dni);	
	
	$scope.obtenerPacienteDni($scope.dni);	
	console.log("+++++++++++++++");
	console.log($scope.paciente);
	console.log("+++++++++++++++");

	
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
	$scope.obtenerPacienteDni = function(dni){
		$http({
			method : 'GET',
			url : '/GestorOdontologico/service/paciente/getPacientePorDni/' +dni,
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
			$scope.paciente = response.data;
		}, function myError(response) {
			toaster.pop('error', "Sistema no disponible en estos momentos");
			console.log(response);
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