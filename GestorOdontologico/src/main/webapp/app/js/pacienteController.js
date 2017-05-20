app.controller("getPacienteService",function($scope, toaster ,$http, $filter, PacienteService){
	
	$scope.list = [];
	
	// table top 10
	$http({ 
		method : 'GET',
		url : '/GestorOdontologico/service/paciente/getTopPacientes',
		headers : { 'Content-Type' : 'application/json'},
		}).then(function mySucces(response) {
			$scope.rowCollection = response.data;
			console.log(response);
		}, function myError(response) {
		toaster.pop('error', response.status + ', ' + response.message );
	});
	// table top 10

	$scope.nombreBsqd =null;
	$scope.paciente = null;
	$scope.buscarPorNombre=function(){
		if($scope.nombreBsqd==null){
			
			toaster.pop('error', "Por favor, ingrese un nombre a buscar");
			return;
		}
		else{
				PacienteService.obtenerPacientesPorAlgunDato($scope.nombreBsqd)
				.then(function (pacientes) {
					$scope.rowCollection = pacientes;
		            console.log(pacientes);
		        });
		}
	}

	$scope.itemsByPage=10;
	});
