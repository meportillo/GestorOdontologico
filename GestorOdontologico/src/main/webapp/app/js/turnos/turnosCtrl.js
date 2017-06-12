angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module','oc.lazyLoad', 'gestorOdont']);
angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl',['moment', 'calendarConfig', '$http', 'toaster', '$scope', 'TurnoService', '$window', '$ocLazyLoad', 'PacienteService',
	  function(moment, calendarConfig, $http, toaster, $scope, TurnoService,  $window, $ocLazyLoad, PacienteService) {
	  
	  moment.defineLocale('moment', {parentLocale:'angular-bootstrap-calendar.js'})

	    var vm = this;
	  
	    vm.showModalPaciente = false;
		vm.pacienteSeleccionado = null;	    
		vm.verSeleccionado = false;
		vm.cancel = function(){
	    	vm.showModalPaciente = false;
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
    	
    	
    	TurnoService.eliminarTurno(vm.events[index].idTurno);
//    	vm.events.splice(index, n);
    }
    
    vm.guardarEditados = function(index, n) {
//      console.log(index);		
//      console.log(n);
//      console.log(vm.events[index]);
//      console.log(vm.events[index].color);
      
 
      var idTurno = vm.events[index].idTurno;
  
//      console.log(vm.events[index].color.primary);
      
      if(angular.equals(0, idTurno)){
      
      var title = vm.events[index].title;
      var startsAt = vm.events[index].startsAt;
      var endsAt = vm.events[index].endsAt;
      var dni = vm.events[index].dni;
      var color = vm.events[index].color;
  	     
      TurnoService.guardarTurno(title, startsAt, endsAt, vm.pacienteSeleccionado);
      
      }else{
    	  toaster.pop('sucess', 'UPDATEAR');
    	  
      }
   }

    vm.cellIsOpen = true;
    
//pasar dia por parametro
    vm.addEvent = function() {
    	
      vm.events.push({
        title: 'Observacion',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().startOf('day').add(30, 'm').toDate(),
        color: calendarConfig.colorTypes.important,
        draggable: true,
        resizable: true,
        idTurno: 0
      });
      
      console.log(calendarConfig.colorTypes.important);
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
      console.log('day');
    };

    vm.timespanClicked = function(date, cell) {

    	console.log(date);
    	console.log(cell);
    	
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        	console.log('vista month if sin turnos');
        	
//        	vm.eventsCopy  = [];
//        	console.log(vm.eventsCopy.length);
        	
          vm.cellIsOpen = false;
        } else {
          console.log('vista month else con turnos' );
          
          console.log(vm.calendarView);
          console.log('vista month else con turnos' );          

//          TurnoService.turnosDelMes(date)
//          .then(function (turnos) {
//        		vm.eventsCopy = turnos;
//          });
        	
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        console.log('year');
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
            console.log('vista year if sin turnos');
            
//            vm.eventsCopy  = [];
//            console.log(vm.eventsCopy.length);
            
          vm.cellIsOpen = false;
        } else {
          console.log('vista year else con turnos');
            
//      	TurnoService.turnosDelAnio(date)
//    	.then(function (turnos) {
//    		vm.eventsCopy = turnos;
//    	});
          
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
		vm.eventsTable = turnos;
	});

	vm.nombre = "";
	vm.apellido = "";
	vm.dni = null;
	
	vm.agregarPacienteSimple = function(){
		PacienteService.agregarPacienteSimple(vm.dni,vm.nombre, vm.apellido)
		.then(function (paciente) {

			vm.pacienteSeleccionado = paciente;
			vm.verSeleccionado = true;

			
		});
	}
	
	
    
  }]);
