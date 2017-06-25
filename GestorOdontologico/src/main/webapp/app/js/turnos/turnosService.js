app.service('TurnoService', function($http,toaster,$q ,$route) {

	console.log("TurnoService");
	
	var scopeTurnos = '';
	
	this.turnosDelMes = function(date){
		console.log(date);
	}
	
	this.turnosDelAnio = function(date){
		console.log(date);
	}
	
	this.turnosDelMes = function( inicioSemana , asd){
		console.log(inicioSemana);
		console.log(asd);
		
		
	}
	
	
	this.turnosDeLaSemana=function(inicioSemana , FinSemana){
		
		$http({
			method : 'GET',
			url : "/GestorOdontologico/service/turno/turnosDeLaSemana/" + inicioSemana + "/" + FinSemana ,
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
			scopeTurnos.eventsTable = response.data;
			var turno = scopeTurnos.eventsTable[0]; 
			
			   angular.forEach(scopeTurnos.events, function(value, key){
				      if(value.idTurno == 0)
				         value = turno;
				   });
//			scopeTurnos.events = response.data;
			
//			 deferred.resolve(response.data);
		}, function myError(response) {
			
			toaster.pop('error', response.status + ', ' + response.message );
			console.log(response);
		});
		
	}
	

	this.obtenerTodosLosTurnos = function(vm){
		scopeTurnos = vm;
		
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
	
	this.guardarTurno=function(title, startsAt, endsAt, paciente){
		
		var deferred = $q.defer();
			$http({
				method : 'POST',
				url : "/GestorOdontologico/service/turno/crearTurno/"+ title + "/"  +startsAt + "/" + endsAt ,
				headers : { 'Content-Type' : 'application/json'},
				data : paciente
			}).then(function mySucces(response) {
				toaster.pop('sucess', 'Agregado en forma correcta');
				console.log(response);
				 deferred.resolve(response.data);
			
			}, function myError(response) {
				console.log(response);
				toaster.pop('error', response.status + ', ' + ((paciente == null)? "Debe eligir primero el cliete": (response.status == 409)? "Verificar fecha, hora de inicio y fin " : " verifique los campos"));
			});
			 return deferred.promise;
    }
	
	//editarTurno

	this.editarTurno = function(turno){
		
		$http({
			method : 'POST',
			url : "/GestorOdontologico/service/turno/editarTurno/"+ turno.title +"/"+ new Date(turno.startsAt) + "/"+ new Date(turno.endsAt) +"/" + turno.idTurno ,
			headers : { 'Content-Type' : 'application/json' , 'accept' : 'application/json'	},
			data : {}
		}).then(function mySucces(response) {
			toaster.pop('sucess', 'Editado en forma correcta');
			console.log(response);
			$route.reload();
		
		}, function myError(response) {
			console.log(response);
			toaster.pop('error', response.status + ', ' + response.mesage);
		});
}
	
	this.eliminarTurno=function(idTurno){
		
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
   }	

		
	
});
