app.factory('Turno', function() {

  function Turno(idTurno,title,startsAt,endsAt,draggable,resizable,datosPaciente,color) {
  
	  this.title = title
	  this.startsAt = startsAt
	  this.endsAt = endsAt
	  this.draggable = draggable
	  this.resizable = resizable
	  this.datosPaciente = datosPaciente
	  this.color = color
	  this.idTurno = idTurno
	  this.paciente = null
	  this.searchText = ""
	  this.selectedItem = null
  }
  
  Turno.prototype.setTitle=function(titulo){
	  this.title = titulo;
  }
  
  Turno.prototype.validar = function() {
	  var mensajesDeError = []
	  console.log(this);
	  
	  if(this.startsAt == null)
		  mensajesDeError.push("Fecha y Hora de inicio sin definir")
	  
	  else  
		  if (this.startsAt < moment().startOf('day').toDate()) 
			  mensajesDeError.push("Verificar la fecha y hora de inicio del turno, debe ser posterior al dia y a la hora actual")	  

	  if (this.endsAt == null)
		  mensajesDeError.push("Fecha y Hora de fin sin definir")

      else   
		  if (this.endsAt < moment().startOf('day').toDate()) 
			  mensajesDeError.push("Verificar la fecha y hora de fin de turno debe ser posterior a la hora actual")	  
	
			  
	  if (this.startsAt > this.endsAt) {
		  mensajesDeError.push("la fecha y hora de inicio tiene que ser menor a la fecha y hora de fin del turno")	  
	  }
	 

	  if (this.title == "" || this.title == null) {
		  mensajesDeError.push("Debe ingresar alguna observacion en el turno")
	  }	  
	  if (this.paciente == null && (this.datosPaciente == null || this.datosPaciente == '')){
		  mensajesDeError.push("Debe seleccionar o ingresar algun paciente")
	  }
	  return mensajesDeError
  }
  return Turno
})
