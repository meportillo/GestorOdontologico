app.factory('Paciente', function () {

  function Paciente(nombre, apellido, dni, direccion, fechaNac, ficha, anios, obraSocial) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.direccion = direccion;
    this.fechaNac = fechaNac;
    this.ficha = ficha;
    this.anios = anios;
    this.obraSocial = obraSocial;
  }
  
  Paciente.prototype.setFechaNac=function(fechaNac){
	
		var hoy = new Date();
		this.fechaNac = new Date(fechaNac);
		var diff = hoy - this.fechaNac;
		this.anios = Math.trunc((diff/(1000*60*60*24))/365);
  }
  
  Paciente.prototype.setObraSocial = function(obraSocial){ this.obraSocial =
  obraSocial; }
  
  Paciente.prototype.getFicha = function(){ return this.ficha; }
  
  Paciente.prototype.setFicha = function(ficha){ this.ficha = ficha; }
  
  Paciente.prototype.validar = function() {
	  var mensajesDeError = []
	  if (this.fechaNac > new Date()) {
		  mensajesDeError.push("La fecha de nacimiento debe ser anterior a la fecha del día")	  
	  }
	  if (this.apellido == "" || this.apellido == null) {
		  mensajesDeError.push("apellido sin completar ")
	  }
	  if (this.nombre == "" || this.nombre == null) {
		  mensajesDeError.push("nombre sin completar")
	  }
	  if (this.dni == "" || this.dni == null) {
		  mensajesDeError.push("dni sin completar")
	  }
	  
	  
	  return mensajesDeError
  }
  
  Paciente.prototype.errorMsjSimple = function() {
	  var mensajesDeError = []

	  if (this.apellido == "" || this.apellido == null) {
		  mensajesDeError.push("apellido sin completar ")
	  }
	  if (this.nombre == "" || this.nombre == null) {
		  mensajesDeError.push("nombre sin completar")
	  }
	  if (this.dni == "" || this.dni == null) {
		  mensajesDeError.push("dni invalido, verificar los digitos, valores minimo: 1000000 y maximo: 1000000000")
	  }
	  
	  return mensajesDeError
  }

  Paciente.prototype.noEsValido = function() {
	  return (this.apellido == "" || this.apellido == null) ||  (this.nombre == "" || this.nombre == null) || (this.dni == "" || this.dni == null)
  }


  return Paciente;
}
)