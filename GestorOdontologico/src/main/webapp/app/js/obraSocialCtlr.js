app.controller('obraSocialCtrl',function($scope, $http, toaster,$route){

	
    $scope.model = {
            obrasSociales: [],
            selected: {}
        };
	
	
	
	// table principal
	$http({ 
		method : 'GET',
		url : '/GestorOdontologico/service/obraSocial/obrasSociales',
		headers : { 'Content-Type' : 'application/json'},
		data : $scope.paciente,
		}).then(function mySucces(response) {
			$scope.model.obrasSociales = response.data;
			console.log(response);
		}, function myError(response) {
		toaster.pop('error', response.status + ', ' + response.message );
		$scope.myTxt = "error";
	});
	// table principal
	
	
        // gets the template to ng-include for a table row / item
        $scope.getTemplate = function (contact) {
        	//console.log(contact);
        	//console.log($scope.model.selected);
            if (contact.idObraSocial === $scope.model.selected.idObraSocial) return 'edit';
            else return 'display';
        };

        $scope.editobraSocial = function (contact) {
            $scope.model.selected = angular.copy(contact);
        };

        $scope.updatearOS = function (idx) {
            console.log("Saving contact");
            $scope.model.obrasSociales[idx] = angular.copy($scope.model.selected);
            console.log($scope.model.obrasSociales[idx]);
            
    		$http({ 
    			method : 'POST',
    			url : 'http://localhost:8080/GestorOdontologico/service/obraSocial/updateOS',
    			headers : { 'Content-Type' : 'application/json'},
    			data : $scope.model.obrasSociales[idx],
    		}).then(function mySucces(response) {
    			toaster.pop('sucess', 'Actualizado en forma correcta');
    			console.log(response);
    		}, function myError(response) {
    			console.log(response);
    			toaster.pop('error', response.status + ', ' + response.message );
    		});
            
            $scope.reset();
        };

        $scope.reset = function () {
            $scope.model.selected = {};
        };
	

	
	$scope.eliminarOS = function(idOS){		
		$scope.model.obrasSociales[idOS] = angular.copy($scope.model.selected);
		console.log($scope.model.obrasSociales[idOS]);
		console.log(($scope.model.obrasSociales[idOS]).idObraSocial);
		$http({ 
			method : 'DELETE',
			url : '/GestorOdontologico/service/obraSocial/deleteObraSocial/'+$scope.model.obrasSociales[idOS].idObraSocial,
			headers : { 'Content-Type' : 'application/json'},
			data : $scope.model.obrasSociales[idOS].idObraSocial,
			}).then(function mySucces(response) {
				toaster.pop('sucess', 'Elimado en forma correcta');
				console.log(response);
				$route.reload();

			}, function myError(response) {
			toaster.pop('error', response.status + ', ' + response.message );
			$scope.myTxt = "error";
		});	
	};
	
	
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
				$route.reload();
				
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
			$scope.myTxt = "error";
		});

	}
});



/*
app.controller('turnosCtrl',function($scope){
	console.log("AAAAAAAAAAAAA");
});
*/