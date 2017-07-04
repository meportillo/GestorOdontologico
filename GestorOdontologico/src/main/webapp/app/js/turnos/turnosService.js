app.service('TurnoService', function($http,toaster,$q ,$route, Turno, Paciente) {

	console.log("TurnoService");
	
	var scopeTurnos = '';
	
	this.turnosDeLaSemana = function(inicioSemana , FinSemana){
		
		$http({
			method : 'GET',
			url : "/GestorOdontologico/service/turno/turnosDeLaSemana/" + inicioSemana + "/" + FinSemana ,
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
			scopeTurnos.eventsTable = response.data.map(function(elem){
				var turno = new Turno(elem.idTurno,elem.title,elem.startsAt,elem.endsAt,elem.draggable,elem.resizable,elem.datosPaciente,elem.color)
				turno.paciente = new Paciente();
				turno.paciente.dni = elem.datosPaciente.split(",")[0];
				return turno
			}) ;
			var turno = scopeTurnos.eventsTable[0]; 
			
			   angular.forEach(scopeTurnos.events, function(value, key){
				      if(value.idTurno == 0)
				         value = turno;
				   });
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
	
		var turnos = response.data.map(function(elem){
				var turno = new Turno(elem.idTurno,elem.title,elem.startsAt,elem.endsAt,elem.draggable,elem.resizable,elem.datosPaciente,elem.color)
				turno.paciente = new Paciente();
				turno.paciente.dni = elem.datosPaciente.split(",")[0];
				return turno
			}) ;
			
			 deferred.resolve(turnos);
		}, function myError(response) {
			
			toaster.pop('error', response.status + ', ' + response.message );
			console.log(response);
		});	
		
		 return deferred.promise;
	 }
	
	this.guardarTurno=function(turno){
		
		var deferred = $q.defer();
			$http({
				method : 'POST',
				url : "/GestorOdontologico/service/turno/crearTurno/"+ turno.title + "/"  + turno.startsAt + "/" + turno.endsAt ,
				headers : { 'Content-Type' : 'application/json'},
				data : turno.paciente
			}).then(function mySucces(response) {
//				SOLUCION TEMPORAL 
				var turno =  response.data ;
				turno.title = turno.datosPaciente  + " " + turno.title ;

				scopeTurnos.events.push(turno);
				console.log(response.data);
				toaster.pop('sucess', 'Agregado en forma correcta');
				deferred.resolve(response.data);
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
			console.log(response);
//			var turno = new Turno();
			deferred.resolve(response);
			
			toaster.pop('sucess', 'Editado en forma correcta');
			var i = scopeTurnos.events.length;
			var n = 0 ;
			while( i-- ) {
			    if( scopeTurnos.events[i].idTurno == turno.idTurno ){ 
//			    	scopeTurnos.events[i] = turno;
			    	n = i;
			    	break
			    }
			}
			scopeTurnos.events.splice(i, 1);
			scopeTurnos.events.push(turno);
			
		}, function myError(response) {
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
				toaster.pop('sucess', 'Eliminado en forma correcta');
				console.log(response);

			}, function myError(response) {
			toaster.pop('error', response.status + ', ' + response.message );
		});	
   }	

		
	
});