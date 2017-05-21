app.controller('fichaCtrl', function($scope,$http , $routeParams, PacienteService,toaster) {

	$scope.showModal = false;
	$scope.dni = $routeParams.dni;
	$scope.verInput = false;
	$scope.verGuardar = false;
	$scope.verFicha = function(dni) {
	console.log($scope.dni);	
	
	$scope.dateHoy = new Date();
	
	PacienteService.obtenerPacienteDni($scope.dni)
	.then(function (pacienteRet) {
		$scope.paciente = pacienteRet;
		console.log("+++++++++++++++");
		console.log($scope.paciente);
	 	 $scope.today();
	 	 $scope.alta();	 	  

		console.log("+++++++++++++++");	 
	});
	

	
	$scope.openModal();
	}

	$scope.updatePaciente=function(){

		PacienteService.updatePaciente($scope.paciente)
		.then(function (pacienteRet) {
			$scope.paciente = pacienteRet;
			console.log("++++++UPDATE+++++++++");
			console.log($scope.paciente);
			
			console.log("+++++++++++++++");	 
		});
			
	}	
	$scope.opened = {};
	
	$scope.openedAlta = {};

	$scope.open = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened[elementOpened] = !$scope.opened[elementOpened];
	};
	
	$scope.openAlta = function($event, elementOpened) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedAlta[elementOpened] = !$scope.openedAlta[elementOpened];
	};

	
	$scope.openModal = function() {
		$scope.showModal = true;
	};

	$scope.ok = function() {
		$scope.showModalSeeDetail = true;
	};

	$scope.cancel = function() {
		$scope.showModal = false;
		$scope.paciente = {};
	};
	
	/////////////////////////////////////datepicker//////////////////////////////////////////////////
	
    	 $scope.alta = function() {
	 	    $scope.alta = $scope.paciente.getFicha().fechaAlta;
	 	  };

	
	
	$scope.today = function() {

		 $scope.dt = new Date();
	 };


	 	  $scope.clear = function() {
	 	    $scope.dt = null;
	 	  };

	 	  $scope.inlineOptions = {
	 	    customClass: getDayClass,
	 	    minDate: new Date(),
	 	    showWeeks: true
	 	  };

	 	  $scope.dateOptions = {
	 	    dateDisabled: disabled,
	 	    formatYear: 'yy',
	 	    maxDate: new Date(2020, 5, 22),
	 	    minDate: new Date(),
	 	    startingDay: 1
	 	  };

	 	  // Disable weekend selection
	 	  function disabled(data) {
	 	    var date = data.date,
	 	      mode = data.mode;
	 	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	 	  }

	 	  $scope.toggleMin = function() {
	 	    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
	 	    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
	 	  };

	 	  $scope.toggleMin();

	 	  $scope.open1 = function() {
	 	    $scope.popup1.opened = true;
	 	  };

	 	  $scope.open2 = function() {
	 	    $scope.popup2.opened = true;
	 	  };

	 	  $scope.setDate = function(year, month, day) {
	 	    $scope.dt = new Date(year, month, day);
	 	  };

	 	  $scope.formats = ['dd-MM-yyyy', 'dd/MM/yyyy', 'shortDate'];
	 	  $scope.format = $scope.formats[0];
	 	  $scope.altInputFormats = ['M!/d!/yyyy'];

	 	  $scope.popup1 = {
	 	    opened: false
	 	  };

	 	  $scope.popup2 = {
	 	    opened: false
	 	  };

	 	  var tomorrow = new Date();
	 	  tomorrow.setDate(tomorrow.getDate() + 1);
	 	  var afterTomorrow = new Date();
	 	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	 	  $scope.events = [
	 	    {
	 	      date: tomorrow,
	 	      status: 'full'
	 	    },
	 	    {
	 	      date: afterTomorrow,
	 	      status: 'partially'
	 	    }
	 	  ];

	 	  function getDayClass(data) {
	 	    var date = data.date,
	 	      mode = data.mode;
	 	    if (mode === 'day') {
	 	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	 	      for (var i = 0; i < $scope.events.length; i++) {
	 	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	 	        if (dayToCheck === currentDay) {
	 	          return $scope.events[i].status;
	 	        }
	 	      }
	 	    }

	 	    return '';
	 	  }
	/////////////////////////////////////datepicker//////////////////////////////////////////////////
	

	 		$scope.diferencia = function ()
	 		{
	 			
	 			$scope.paciente.setFechaNac($scope.dt);		
	 		}

	$(document).ready(function(){
 		    $('[data-toggle="tooltip"]').tooltip();   
	}); 	  
	$scope.verFicha($routeParams.DNI);
	
	
	
});