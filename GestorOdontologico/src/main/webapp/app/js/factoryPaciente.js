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
  
  Paciente.prototype.setNombre = function(nombre){
	  this.nombre = nombre;
  }

  Paciente.prototype.setApellido = function(apellido){
	  this.apellido = apellido;
  }
  
  Paciente.prototype.setDni = function(dni){
	  this.dni = dni;
  }

  Paciente.prototype.setFicha = function(ficha){
	  this.ficha = ficha;
  }

  Paciente.prototype.setFicha = function(ficha){
	  this.ficha = ficha;
  }
  
  Paciente.prototype.setAnios = function(anios){
	  this.anios = anios;
  }

  Paciente.prototype.setObraSocial = function(obraSocial){
	  this.obraSocial = obraSocial;
  }
  
  Paciente.prototype.setNombre = function(nombre){
	  this.nombre = nombre;
  }

  Paciente.prototype.setApellido = function(apellido){
	  this.apellido = apellido;
  }
  
  Paciente.prototype.setDni = function(dni){
	  this.dni = dni;
  }
  Paciente.prototype.setApellido = function(apellido){
	  this.apellido = apellido;
  }

  Paciente.prototype.setFicha = function(ficha){
	  this.ficha = ficha;
  }

  Paciente.prototype.setFicha = function(ficha){
	  this.ficha = ficha;
  }
  
  Paciente.prototype.setAnios = function(anios){
	  this.anios = anios;
  }

  Paciente.prototype.setObraSocial = function(obraSocial){
	  this.obraSocial = obraSocial;
  }
  

  Paciente.prototype.getNombre = function(){
	  return this.nombre;
  }


  Paciente.prototype.getApellido = function(){
	  return this.apellido;
  }

  Paciente.prototype.getNombre = function(){
	  return this.nombre;
  }


  Paciente.prototype.getDni = function(){
	  return this.dni;
  }
  
  Paciente.prototype.getDni = function(){
	  return this.dni;
  }

  Paciente.prototype.getFechaNac = function(){
	  return this.fechaNac;
  }
  Paciente.prototype.getFicha = function(){
	  return this.ficha;
  }

  Paciente.prototype.getObraSocial = function(){
	  return this.obraSocial;
  }

  
  return Paciente;
})