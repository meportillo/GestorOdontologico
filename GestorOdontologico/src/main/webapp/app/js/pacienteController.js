app.controller("getPacienteService",function($scope, toaster ,$http, $filter, PacienteService){
	
	$scope.list = [];

	$scope.nombreBsqd =null;
	$scope.paciente = null;
	$scope.buscarPorNombre=function(){
		if($scope.nombreBsqd==null)
		{
			toaster.pop('error', "Por favor, ingrese un nombre a buscar");
			return;
		}else
		{
			$http({
				method : 'GET',
				url : '/GestorOdontologico/service/paciente/getPacientePorNombreApellidoDni/' +$scope.nombreBsqd,
				headers : {
					'Content-Type' : 'application/json',
				}
			}).then(function mySucces(response) {
				$scope.rowCollection = response.data;
				toaster.pop('sucess', 'Se encontraron: ' +response.data.length+  ' pacientes')
				PacienteService.setPacientes(response.data);
				console.log(PacienteService.getPacientes());				

			}, function myError(response) {
				toaster.pop('error', "Sistema no disponible en estos momentos");
				console.log(response);
			});	
			
		}
	}
    $scope.showModal = false;

	$scope.itemsByPage=10;
	$scope.verFicha=function(dni){
		
		console.log(PacienteService.getPacienteDni(dni));
		
		$scope.paciente =  ($filter('filter')($scope.rowCollection, { 'dni': dni }))[0];
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
		  };
		  		  
	    $scope.opened = {};
		
	    $scope.open = function($event, elementOpened) {
				$event.preventDefault();
				$event.stopPropagation();

				$scope.opened[elementOpened] = !$scope.opened[elementOpened];
		};	  
});
