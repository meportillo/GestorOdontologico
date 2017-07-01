var appc = angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module','oc.lazyLoad','gestorOdont','ngMaterial']);

appc.controller('KitchenSinkCtrl',
	  function(moment, calendarConfig, $http, toaster, $scope, TurnoService,  $window, $ocLazyLoad, PacienteService, Paciente, $timeout, $q, $log,Turno) {

	  moment.defineLocale('moment', {parentLocale:'angular-bootstrap-calendar.js'})

	    var vm = this;
	    vm.showModalPaciente = false;
		vm.pacienteSeleccionado = null;
		vm.pacienteTemp = null;
		vm.verSeleccionado = false;
		vm.simulateQuery = true;
		vm.isDisabled    = false;
		vm.cancel = function(){
	    	vm.showModalPaciente = false;
	    }
	    
		vm.crearPacienteSimple = function(){
			vm.pacienteTemp =  new Paciente("", "", "", "", null, null, null, null);
			console.log(vm.pacienteTemp);
		}
		
		vm.buscarPorNombre=function(){
			vm.verSeleccionado = false;

			if(vm.nombreBsqd==null){
				
				toaster.pop('error', "Por favor, ingrese un nombre a buscar");
				return;
			}
			else{
				PacienteService.obtenerPacientesPorAlgunDato(vm.nombreBsqd)
					.then(function (pacientes) {
						vm.pacientesTurnos = pacientes;
			            console.log(pacientes);
			        });
				vm.showModalPaciente = true;
			}
		}

		vm.seleccionarPaciente = function(paciente){
			vm.cancel();
			vm.pacienteSeleccionado = paciente;
			vm.verSeleccionado = true;

		}
	  

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();

    var actions = [{
      label: '<i class=\'glyphicon glyphicon-pencil\'></i>',
      onClick: function(args) {
	        alert.show('Edited', args.calendarEvent);
	      }
	    }, {
	      label: '<i class=\'glyphicon glyphicon-remove\'></i>',
	      onClick: function(args) {
	        alert.show('Deleted', args.calendarEvent);
	      }
    }];
    
    vm.eliminarTurnos = function(index, n) {
    	
    	if(!angular.equals(0, vm.eventsTable[index].idTurno)){
    		console.log("eliminar IFFFFFF");
    		TurnoService.eliminarTurno(vm.events[index].idTurno);
    	}else{
    		console.log("eliminar ELSE");
    		vm.eventsTable.splice(index, n);
    	}
    }
    
    vm.guardarEditados = function(index, n , turno) {
    
    turno.paciente = vm.pacienteSeleccionado;
    
    var mensajesDeError = turno.validar();	
    
    if(mensajesDeError.length > 0){
    	
    	mensajesDeError.forEach(function(mensaje) {
 				toaster.pop('error', mensaje)	
 			})

    	
    }else{
    var idTurno = vm.eventsTable[index].idTurno;

      if(angular.equals(0, idTurno)){
	  	    console.log("--------------------------ALTA--------------------------------------")
	      	TurnoService.guardarTurno(turno);
      
      }else{
	  	    console.log("--------------------------EDICION--------------------------------------")
    	    TurnoService.editarTurno(turno);
      	  }
       }
    }
//pasar dia por parametro
    vm.addEvent = function() {
    	var turno = new Turno(0,'',moment().startOf('day').toDate(),moment().startOf('day').add(30, 'm').toDate(), true, true,null,calendarConfig.colorTypes.important);
    	vm.eventsTable.push(turno);
        }

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
//      alert.show('Dropped or resized', event);
//  llamada al servicio
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {
    	
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
            vm.cellIsOpen = false;
            vm.eventsTable = [];
        } else {

          TurnoService.turnosDeLaSemana(date, moment(date).endOf('day').toDate());
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
            vm.eventsTable = [];
            
          vm.cellIsOpen = false;
        } else {
          TurnoService.turnosDeLaSemana(moment(date).startOf('month').toDate(), moment(date).endOf('month').endOf('day').toDate());
          vm.cellIsOpen = true;
          vm.viewDate = date;
          
        }
      }
    };
    
    
    calendarConfig.dateFormatter = 'moment'; // use moment instead of angular for formatting dates
    var originali18n = angular.copy(calendarConfig.i18nStrings);
    calendarConfig.i18nStrings.weekNumber = 'Semaine {week}';
    
    $window.moment = $window.moment || moment;
    $ocLazyLoad.load('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/locale/es.js').then(function() {
      moment.locale('es', {
        week: {
          dow: 1 // Monday is the first day of the week
        }
      });
      moment.locale('es'); // change the locale to french
    });

    $scope.$on('$destroy', function() {
      moment.locale('en');
      calendarConfig.i18nStrings = originali18n;
    });

    
    
//    TABLE DE DATOS - TUrNOS
	TurnoService.obtenerTodosLosTurnos(vm)
	.then(function (turnos) {
		console.log(turnos);
		vm.events  = turnos;
		
//		datosPaciente
		
        angular.forEach(vm.events, function (value, key) {
        	value.title = value.datosPaciente  + " " + value.title ;
        });
        
		vm.eventsTable = turnos;
	});

	vm.nombre = "";
	vm.apellido = "";
	vm.dni = null;
	
	vm.agregarPacienteSimple = function(){
	
var mensajesDeError = vm.pacienteTemp.errorMsjSimple()
		
 		if (mensajesDeError.length > 0) {
 			console.log($scope.myDate);
 			mensajesDeError.forEach(function(mensaje) {
 				toaster.pop('error', mensaje)	
 			})
 		} else{
 			JSON.stringify($scope.paciente)
 			PacienteService.agregarPacienteSimple(vm.pacienteTemp.dni,vm.pacienteTemp.nombre, vm.pacienteTemp.apellido)
			.then(function (paciente) {
				vm.pacienteSeleccionado = paciente;
				vm.verSeleccionado = true;
			});
 		}
	}
    vm.querySearch = function(query) {
    	var deferred = $q.defer();
    	
    	PacienteService.obtenerPacientesPorAlgunDato(vm.searchText).
    	then(function(pacientes){
    		
    		vm.pacientes = pacientes;
    		vm.pacientes  = vm.loadAll();
    		deferred.resolve(vm.pacientes);
    	});
		 return deferred.promise;
    
    }
    

    vm.searchTextChange = function (text) {
      $log.info('Text changed to ' + text);
    }

    vm.searchText = "";
    vm.selectedItem = null;
    
    vm.selectedItemChange =  function(item) {
       
   	   console.log('------ertwertwertw-------------- ' + JSON.stringify(vm.selectedItem));
   	   console.log('Item changed to ' + JSON.stringify(item));
       vm.pacienteSeleccionado = item.value;
       vm.searchText = item.display;
       vm.verSeleccionado = true;
     }

    vm.loadAll = function() {
      var pacientes = vm.pacientes;
      return pacientes.map( function (paciente) {
    	  return {
	          value: paciente,
	          display:  paciente.dni +":" + paciente.nombre+" ," + paciente.apellido 
    	  	};
      });
    }

    
    vm.pacientes = [];


  });
