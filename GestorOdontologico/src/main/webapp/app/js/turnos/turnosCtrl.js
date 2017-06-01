angular.module('mwl.calendar.docs', ['mwl.calendar', 'ngAnimate', 'ui.bootstrap', 'colorpicker.module']);
angular
  .module('mwl.calendar.docs') //you will need to declare your module with the dependencies ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
  .controller('KitchenSinkCtrl', function(moment, calendarConfig, $http, toaster, $scope, TurnoService) {

    var vm = this;

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
  	     
      TurnoService.guardarTurno(title, startsAt, endsAt);
      
      }else{
    	  toaster.pop('sucess', 'UPDATEAR');
    	  
      }
   }

    vm.cellIsOpen = true;
    
//pasar dia por parametro
    vm.addEvent = function() {
    	
      vm.events.push({
        title: 'New event',
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
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
      console.log('FFFFF');

   /*   if(vm.calendarView === 'day') {
        console.log('day');
        vm.events = [];        
      }
else{*/
      if (vm.calendarView === 'month') {
        console.log('month');
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;

        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        console.log('year');
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

      //}

    };
    
    
//    TABLE DE DATOS - TUrNOS
	TurnoService.obtenerTodosLosTurnos()
	.then(function (turnos) {
		vm.events  = turnos;
	});

	
    
  });
