app.service('TurnoService', function($http,toaster,$q) {

	console.log("TurnoService");

	this.obtenerTodosLosTurnos = function(){
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url : '/GestorOdontologico/service/turno/obtenerTodosLosTurnos',
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
	
			 deferred.resolve(response.data);
		}, function myError(response) {
			
			toaster.pop('error', response.status + ', ' + response.message );
			console.log(response);
		});	
		
		 return deferred.promise;
		 }
	
	this.guardarTurno=function(title, startsAt, endsAt){
		
			$http({
				method : 'POST',
				url : "/GestorOdontologico/service/turno/crearTurno/"+ title + "/"  +startsAt + "/" + endsAt ,
				headers : { 'Content-Type' : 'application/json'},
				data : title,
			}).then(function mySucces(response) {
			toaster.pop('sucess', 'Agregado en forma correcta');
			console.log(response);
			
			}, function myError(response) {
				console.log(response);
				toaster.pop('error', response.status + ', ' + response.message );
			});
   }

		
	
});
