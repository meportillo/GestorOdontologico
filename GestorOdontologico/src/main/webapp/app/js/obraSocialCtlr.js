app.controller('obraSocialCtrl',function($scope, $http, toaster){
	
	$scope.agregarObraSocial = function() {
		
		$http(
				{
					method : "POST",
					url : "http://localhost:8080/GestorOdontologico/service/obraSocial/crearObraSocial/"
							+ $scope.obraSocial.nombre
							+ "/"
							+ $scope.obraSocial.codigo,
					headers : {
						'Content-Type' : 'application/json'
					},
					data : $scope.userRet,
				}).then(function mySucces(response) {
				toaster.pop('sucess', 'Agregado en forma correcta');
				console.log(response);
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
			$scope.myTxt = "error";
		});

	}
	
	
	
})



/*
app.controller('turnosCtrl',function($scope){
	console.log("AAAAAAAAAAAAA");
});

*/