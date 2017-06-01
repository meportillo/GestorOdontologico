app.service('TurnoService', function($http,toaster,$q ,$route) {

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
				$route.reload();
			
			}, function myError(response) {
				console.log(response);
				toaster.pop('error', response.status + ', ' + response.message );
			});
    }
	
	this.eliminarTurno=function(idTurno){
		
	if(!angular.equals(0, idTurno)){
		
		$http({ 
			method : 'DELETE',
			url : '/GestorOdontologico/service/turno/borrarTurno/'+ idTurno,
			headers : { 'Content-Type' : 'application/json'},
			data : idTurno,
			}).then(function mySucces(response) {
				toaster.pop('sucess', 'Eliminado en forma correcta');
				console.log(response);
				$route.reload();

			}, function myError(response) {
			toaster.pop('error', response.status + ', ' + response.message );
		});	
	}else{
		toaster.pop('error', 'Aun no esta almacenado el turno' );
		
	}
   }	

		
	
});
