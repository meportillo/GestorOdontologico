app.controller("getPacienteService",function($scope, toaster ,$http, $filter, PacienteService){
	
	$scope.list = [];

	$scope.nombreBsqd =null;
	$scope.icons ="diente.svg,close.png,azul.png,igual.png,circulo.png,recta.png,tres.png";
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
				toaster.pop('sucess', 'Se encontraron: ' +response.data.length+  ' pacientes');
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
		  
          $scope.iconosDientes = [];
          $scope.iconosDientes.push({'iconFilePath':'app/images/diente.svg', 'iconValue':'1'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/close.png', 'iconValue':'2'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/azul.png', 'iconValue':'3'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/igual.png', 'iconValue':'4'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/circulo.png', 'iconValue':'5'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/recta.png', 'iconValue':'6'});
          $scope.iconosDientes.push({'iconFilePath':'app/images/tres.png', 'iconValue':'7'});
          

		  
		  
});
