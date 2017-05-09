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
				if(response.data.length == 1)
				{
					toaster.pop('sucess', 'Se encontro: ' +response.data.length+  ' paciente')										
				}else{
					toaster.pop('sucess', 'Se encontraron: ' +response.data.length+  ' pacientes')					
				}
				PacienteService.setPacientes(response.data);
				console.log(PacienteService.getPacientes());				

			}, function myError(response) {
				toaster.pop('error', "Sistema no disponible en estos momentos");
				console.log(response);
			});	
			
		}
	}

	$scope.itemsByPage=10;
	});
