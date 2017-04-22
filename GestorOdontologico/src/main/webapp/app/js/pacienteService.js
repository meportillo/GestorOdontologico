app.service('PacienteService', function() {

	console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
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
			return el.dni = dniParam
		});
		return temppacientes[0];
	}	
});
