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
//				SOLUCION TEMPORAL 
				scopeTurnos.events.push(response.data);
//	
				
				
				toaster.pop('sucess', 'Agregado en forma correcta');
//				console.log(response);
				deferred.resolve(response.data);
//				console.log(deferred.promise);
			}, function myError(response) {
				console.log(response);
				toaster.pop('error', response.status + ', ' + ((paciente == null)? "Debe eligir primero el paciente": (response.status == 409)? "Verificar fecha, hora de inicio y fin " : " verifique los campos"));
			});
			 return deferred.promise;
    }
	
	//editarTurno

	this.editarTurno = function(turno){
		
		var deferred = $q.defer();
		$http({
			method : 'POST',
			url : "/GestorOdontologico/service/turno/editarTurno/"+ turno.title +"/"+ new Date(turno.startsAt) + "/"+ new Date(turno.endsAt) +"/" + turno.idTurno ,
			headers : { 'Content-Type' : 'application/json'	},
			data : {}
		}).then(function mySucces(response) {
			deferred.resolve(response);
			toaster.pop('sucess', 'Editado en forma correcta');
//			console.log(response);

//			SOLUCION TEMPORAL 
			var i = scopeTurnos.events.length;
			while( i-- ) {
			    if( scopeTurnos.events[i].idTurno == turno.idTurno ){ 
			    	scopeTurnos.events[i] = turno;
			    	break
			    }
			}

			
//			
		
		}, function myError(response) {
//			console.log(response);
			toaster.pop('error', response.status + ', ' + response.mesage);
		});
		
		return deferred.promise;
	}
	
	this.eliminarTurno=function(idTurno){
		
		$http({ 
			method : 'DELETE',
			url : '/GestorOdontologico/service/turno/borrarTurno/'+ idTurno,
			headers : { 'Content-Type' : 'application/json'},
			data : idTurno,
			}).then(function mySucces(response) {
//				SOLUCION TEMPORAL
				var i = scopeTurnos.events.length;
				while( i-- ) {
				    if( scopeTurnos.events[i].idTurno == idTurno ){ 
				    	scopeTurnos.events.splice(i, 1);
				    	break
				    }
				}
//			
				
				toaster.pop('sucess', 'Eliminado en forma correcta');
				console.log(response);
//				$route.reload();

			}, function myError(response) {
			toaster.pop('error', response.status + ', ' + response.message );
		});	
   }	

		
	
});