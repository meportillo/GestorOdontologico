app.service('ObraSocialService', function($http,toaster, $location, $route, ObraSocial ) {
	
    this.updatearOS = function (obraSocial) {
    	
		$http({ 
			method : 'POST',
			url : 'http://localhost:8080/GestorOdontologico/service/obraSocial/updateOS',
			headers : { 'Content-Type' : 'application/json'},
			data : obraSocial,
		}).then(function mySucces(response) {
			toaster.pop('sucess', 'Actualizado en forma correcta');
			console.log(response);
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
		});
		
    };
    
    this.eliminarOS = function(obraSocial){		

		$http({ 
			method : 'DELETE',
			url : '/GestorOdontologico/service/obraSocial/deleteObraSocial/'+ obraSocial.idObraSocial,
			headers : { 'Content-Type' : 'application/json'},
			data : obraSocial,
			}).then(function mySucces(response) {
				toaster.pop('sucess', 'Eliminado en forma correcta');
				console.log(response);
				$route.reload();

			}, function myError(response) {
			toaster.pop('error', response.status + ', ' + response.message );
		});	
	};
	
	
	
	this.agregarObraSocial = function(nombre, codigo) {
		
		$http(
				{
					method : "POST",
					url : "http://localhost:8080/GestorOdontologico/service/obraSocial/crearObraSocial/"
							+ nombre
							+ "/"
							+ codigo,
					headers : {
						'Content-Type' : 'application/json'
					},
				}).then(function mySucces(response) {
				toaster.pop('sucess', 'Agregado en forma correcta');
				console.log(response);
				$route.reload();
				
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.message );
		});

	}


});
