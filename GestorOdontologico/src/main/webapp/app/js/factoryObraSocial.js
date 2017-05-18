app.factory('ObraSocial', function () {

  function ObraSocial(nombre, codigo) {
    this.nombre = nombre;
    this.codigo = codigo;

  }
  
  ObraSocial.prototype.setNombre = function(nom){
	  this.nombre = nom;
  }
  
  ObraSocial.prototype.getNombre = function(){
	  return this.nombre;
  }
  
  ObraSocial.prototype.setCodigo = function(cod){
	  this.codigo = cod;
  }
  
  ObraSocial.prototype.getCodigo = function(){
	  return this.codigo;
  }

  
  return ObraSocial;
})