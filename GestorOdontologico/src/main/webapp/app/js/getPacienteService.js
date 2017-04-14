app.controller("getPacienteService",function($scope, toaster ,$http, $filter){
	
	$scope.list = [];

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
				$scope.rowCollection = response.data;
			}, function myError(response) {
				toaster.pop('error', "Sistema no disponible en estos momentos");
				console.log(response);
			});	
			
		}
	}
    $scope.showModal = false;

	$scope.itemsByPage=10;
	$scope.verFicha=function(dni){
		
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

});