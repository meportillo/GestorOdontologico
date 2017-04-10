app.controller("getPacienteService",function($scope, toaster ,$http){

	$scope.nombreBsqd =null;
	console.log("getPaciente ");
	$scope.icons ="diente.svg,close.png,azul.png,igual.png,circulo.png,recta.png,tres.png";
	$scope.paciente = null;
	$scope.buscarPorNombre=function(){
		if($scope.nombreBsqd==null)
		{
			toaster.pop('error', "Por favor, ingrese un nombre a buscar");
			return
		}else
		{
			$http({
				method : 'GET',
				url : '/GestorOdontologico/service/paciente/getPacientePorNombreApellidoDni/' +$scope.nombreBsqd,
				headers : {
					'Content-Type' : 'application/json',
				}
			}).then(function mySucces(response) {
				$scope.paciente = response.data[0];
				console.log(response);
			}, function myError(response) {
				toaster.pop('error', "Sistema no disponible en estos momentos");
				console.log(response);
			});	
			console.log($scope.paciente);
			
		}
	}

	$scope.pacienteNotNull = function(){
		return $scope.paciente != null;
	}
	

});