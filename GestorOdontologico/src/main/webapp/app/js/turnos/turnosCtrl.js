angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module','oc.lazyLoad','gestorOdont']);

angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl',['moment', 'calendarConfig', '$http', 'toaster', '$scope', 'TurnoService', '$window', '$ocLazyLoad', 'PacienteService','Paciente','$timeout', '$q', '$log', 
	  function(moment, calendarConfig, $http, toaster, $scope, TurnoService,  $window, $ocLazyLoad, PacienteService, Paciente, $timeout, $q, $log, datepickerPopupConfig) {

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
//    	console.log(vm.events[index].idTurno);
    	
    	if(!angular.equals(0, vm.eventsTable[index].idTurno)){
    		console.log("eliminar IFFFFFF");
    		TurnoService.eliminarTurno(vm.events[index].idTurno);
    	}else{
    		console.log("eliminar ELSE");
    		vm.eventsTable.splice(index, n);
    	}
//    	vm.events.splice(index, n);
    }
    
    vm.guardarEditados = function(index, n , turno) {
//      console.log(index);		
//      console.log(n);
//      console.log(vm.events[index]);
//      console.log(vm.events[index].color); 
      var idTurno = vm.eventsTable[index].idTurno;
//      console.log(vm.events[index].color.primary);
      if(angular.equals(0, idTurno)){
      
	      var title = vm.eventsTable[index].title;
	      var startsAt = vm.eventsTable[index].startsAt;
	      var endsAt = vm.eventsTable[index].endsAt;
	      var dni = vm.eventsTable[index].dni;
	      var color = vm.eventsTable[index].color;
	  	     
	      TurnoService.guardarTurno(title, startsAt, endsAt, vm.pacienteSeleccionado);
      
      }else{
    	  
    	  TurnoService.editarTurno(turno);
    	  
      }
   }

//    vm.cellIsOpen = true;
    
//pasar dia por parametro
    vm.addEvent = function() {
    	
      vm.eventsTable.push({
        title: '',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().startOf('day').add(30, 'm').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true,
        idTurno: 0
      });
      
//      console.log(calendarConfig.colorTypes.important);
    }
/*
    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };
*/
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
//      console.log('day');
    };

    vm.timespanClicked = function(date, cell) {
    	
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
//        	console.log('vista month if sin turnos');
            vm.cellIsOpen = false;
            
            vm.eventsTable = [];
        } else {
//          console.log('vista month else con turnos' ); 
          
          TurnoService.turnosDeLaSemana(date, moment(date).endOf('day').toDate());

        	
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
//        console.log('year');
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
//            console.log('vista year if sin turnos');
            vm.eventsTable = [];
            
          vm.cellIsOpen = false;
        } else {
//          console.log('vista year else con turnos');
          TurnoService.turnosDeLaSemana(moment(date).startOf('month').toDate(), moment(date).endOf('month').endOf('day').toDate());
            
          
          vm.cellIsOpen = true;
          vm.viewDate = date;
          
        }
      }
      

      //}

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
	
	  // list of `state` value/display objects
    



    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
	
    vm.querySearch = function(query) {
    	
    	
			vm.pacientes = [new Paciente("mau","test", 234, "", null, null, null, null),
		    	  new Paciente("aaaaaaaaa","bbbb", 2343434, "", null, null, null, null)
	    	  ];
		   vm.states        = vm.loadAll();
			return pacientes;
		

    	
    }

    vm.searchTextChange = function (text) {
      $log.info('Text changed to ' + text);
    }


    vm. selectedItemChange =  function(item) {
       $log.info('Item changed to ' + JSON.stringify(item));
       vm.pacienteSeleccionado = item.value;
       vm.searchText = item.display;
       vm.verSeleccionado = true;
     }

    /**
     * Build `states` list of key/value pairs
     */
    vm.loadAll = function() {
      var allStates = vm.pacientes;
      console.log("---------------------------------------------------------------------");
      console.log(allStates);
      console.log("---------------------------------------------------------------------");
      return allStates.map( function (paciente) {

    	  console.log("--ppppppppppppppppppppppppppppppppppppppp");
    	  console.log(paciente);
    	  console.log("--ppppppppppppppppppppppppppppppppppppppp");

    	  return {
          value: paciente,
          display: paciente.nombre + ", " + paciente.apellido 
        };
      });
    
      
      
    }

    /**
     * Create filter function for a query string
     */
    vm.createFilterFor = function (query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(state) {
        return (state.nombre.indexOf(lowercaseQuery) === 0);
      };

    }
    vm.pacientes = [];
     vm.states        = [];
      vm.querySearch   = vm.querySearch;
      vm.selectedItemChange = vm.selectedItemChange;
      vm.searchTextChange   = vm.searchTextChange;



  }]);