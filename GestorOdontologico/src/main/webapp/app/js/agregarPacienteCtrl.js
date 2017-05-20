app.controller('agregarPacienteCtrl',function($scope, $http, toaster, PacienteService,$location,Paciente) {

	$scope.paciente = new Paciente("", "", "", "", "", null, 0, null);
 	$scope.paciente.anios = 0;

	$scope.myDate = new Date();
//	$scope.minDate = new Date($scope.myDate.getFullYear(), $scope.myDate.getMonth() - 2, $scope.myDate.getDate());
//	$scope.maxDate = new Date($scope.myDate.getFullYear(),$scope.myDate.getMonth() + 2, $scope.myDate.getDate());
	$scope.hoy = new Date();

	
	var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

	$scope.diferencia = function ()
	{
//		var dateTemp = "";
//		($scope.myDate.includes("-")) ? dateTemp = $scope.myDate.split("-")[1]+ '-' + $scope.myDate.split("-")[0] + '-' + $scope.myDate.split("-")[1]:
//			$scope.myDate.split("/")[1]+ '/' + $scope.myDate.split("/")[0] + '/' + $scope.myDate.split("/")[1];
		
		$scope.myDate = new Date($scope.myDate);
		$scope.paciente.setFechaNac($scope.myDate);
	}

	$scope.updateDate = function(){
	
//		var dateTemp = "";
//		($scope.myDate.includes("-")) ? dateTemp = $scope.myDate.split("-")[1]+ '-' + $scope.myDate.split("-")[0] + '-' + $scope.myDate.split("-")[1]:
//			$scope.myDate.split("/")[1]+ '/' + $scope.myDate.split("/")[0] + '/' + $scope.myDate.split("/")[1];
//		
		$scope.myDate = new Date($scope.myDate);
	} 
	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	}
	

 	$scope.obrasSociales = [];
 	
	$http({ 
		method : 'GET',
		url : '/GestorOdontologico/service/obraSocial/obrasSociales',
		headers : { 'Content-Type' : 'application/json'},
		data : $scope.paciente,
		}).then(function mySucces(response) {
			$scope.obrasSociales = response.data;
			console.log(response);
		}, function myError(response) {
		toaster.pop('error', response.status + ', ' + response.message );
		$scope.myTxt = "error";
		});
		

 	
 	
	$scope.guardarPaciente = function() {

		$scope.paciente.fechaNac= $scope.myDate;
		
 		if($scope.myDate.getFullYear() <= new Date().getFullYear() 
 	 		   && $scope.myDate.getMonth() <= new Date().getMonth()
 	 		   &&$scope.myDate.getDate() > new Date().getDate()
 	 		){
 			
 			
 			$scope.myDate = new Date($scope.myDate);
 			console.log($scope.myDate);
 			toaster.pop('error', 'Por favor ingresa una fecha de nacimiento valida' );
 			
 		}else{
 			JSON.stringify($scope.paciente)
 			PacienteService.agregarPaciente($scope.paciente);
 			
  		}
	}
})
