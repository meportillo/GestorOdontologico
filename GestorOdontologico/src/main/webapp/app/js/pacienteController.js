app.controller("getPacienteService",function($scope, toaster ,$http, $filter, PacienteService){
	
	$scope.list = [];
	
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
	
	$scope.buscarTopDiez = function(){
		PacienteService.getTopPaciente()
		.then(function(pacientes){
			
			$scope.rowCollection = pacientes;
			
		});
	}
	

	$scope.itemsByPage=10;
	});
