app.service('PacienteService', function($http,toaster, $location,$q) {

	console.log("PacienteService");
	this.pacientes = [];

	this.pacienteRet = {};
	
	this.init = function(pacienteParam) {
		this.paciente = pacienteParam;
		return this.paciente;
	}
	this.setPaciente = function(pacienteParam) {
		this.paciente = pacienteParam
	}
	this.getPaciente = function() {
		return this.paciente;
	}
	
//	this.agregarPaciente= function(pacienteParam){
//		this.pacientes.push(pacienteParam);
//	}

	this.setPacientes = function(pacientesParam) {
		this.pacientes = pacientesParam;
	}

	this.getPacientes = function() {
		return this.pacientes;
	}

	this.getPacienteDniIII= function(dniParam){
		var temppacientes = this.pacientes.filter(function (el) {
			return el.dni == dniParam
		});
		console.log(temppacientes[0]);
		return temppacientes[0];
	}
	this.updatePaciente=function(pacienteParam){
		console.log("into service");
		this.paciente = pacienteParam;
		console.log(pacienteParam);
		
		$http({
			method : 'PUT',
			url : '/GestorOdontologico/service/paciente/updatePaciente/' + pacienteParam.dni,
			headers : {
				 'Content-Type' : 'application/json',
                 'accept' : 'application/json'
			},
			data: pacienteParam
			
		}).then(function mySucces(response) {
			this.paciente = response.data;			
			console.log(response.data)
			toaster.pop('success', "Acutalizacion OK");

		}, function myError(response) {
			toaster.pop('error', "Sistema no disponible en estos momentos");
			console.log(response);
			return null;
		});	

		return this.paciente;
	}
	
	this.agregarPaciente= function(pacienteParam){
	
		$http({ 
			method : 'POST',
			url : '/GestorOdontologico/service/paciente/crearPaciente',
			headers : { 'Content-Type' : 'application/json'},
			data : pacienteParam,
		}).then(function mySucces(response) {
			toaster.pop('sucess', 'Agregado en forma correcta');
			console.log(response);
			$location.path('/historias/ficha/'+response.data.dni);
	}, function myError(response) {
		console.log(response);
		toaster.pop('error', response.status + ', Error en uno de los campos ingresados ' + response.message );
	
		});

		
	}
	this.obtenerPacienteDni = function(dni){
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url : '/GestorOdontologico/service/paciente/getPacientePorDni/' +dni,
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
			 deferred.resolve(response.data);
			 console.log(response.data);
		}, function myError(response) {
			toaster.pop('error', "Sistema no disponible en estos momentos");
			console.log(response);
			
		});	
		
		 return deferred.promise;
	}
	this.obtenerPacientesPorAlgunDato = function(dato){
		var deferred = $q.defer();
		$http({
			method : 'GET',
			url : '/GestorOdontologico/service/paciente/getPacientePorNombreApellidoDni/' +dato,
			headers : {
				'Content-Type' : 'application/json',
			}
		}).then(function mySucces(response) {
	
			 deferred.resolve(response.data);
			if(response.data.length == 1)
			{
				toaster.pop('sucess', 'Se encontro: ' +response.data.length+  ' paciente')										
			}else{
				toaster.pop('sucess', 'Se encontraron: ' +response.data.length+  ' pacientes')					
			}				
		}, function myError(response) {
			toaster.pop('error', "Sistema no disponible en estos momentos");
			console.log(response);
		});	
		
		 return deferred.promise;
		 }
});
