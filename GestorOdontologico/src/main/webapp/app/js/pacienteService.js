app.service('PacienteService', function($http,toaster) {

	console.log("PacienteService");
	this.pacientes = [];

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

	this.setPacientes = function(pacientesParam) {
		this.pacientes = pacientesParam;
	}

	this.getPacientes = function() {
		return this.pacientes;
	}

	this.getPacienteDni= function(dniParam){
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
});
