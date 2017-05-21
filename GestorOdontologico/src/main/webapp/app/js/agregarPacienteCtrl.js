app.controller('agregarPacienteCtrl',function($scope, $http, toaster, PacienteService,$location,Paciente) {

	$scope.paciente = new Paciente("", "", "", "", "", null, 0, null);
 	$scope.paciente.setAnios(0);
 	
/////////////////////////////////////////////////////////////////////////////////777
 	 $scope.today = function() {
 	    $scope.dt = new Date();
 	  };
 	  $scope.paciente.setFechaNac($scope.dt);
 	  $scope.today();

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
////////////////////////////////////////////////////////////////////////////////7777 	  
	$scope.myDate = new Date();
	$scope.hoy = new Date();

	$scope.edad = function(){ return Math.trunc((($scope.hoy -  $scope.dt)/(1000*60*60*24))/365)}
	
	var MILISENGUNDOS_POR_DIA = 1000 * 60 * 60 * 24;

	$scope.diferencia = function ()
	{
		$scope.myDate = new Date($scope.myDate);
		$scope.paciente.setFechaNac($scope.myDate);		
	}
	

	$scope.updateDate = function(){
	
		$scope.myDate = new Date($scope.myDate);
	} 
	$scope.onlyWeekendsPredicate = function(date) {
		var day = date.getDay();
		return day === 0 || day === 6;
	}
	

 	$scope.obrasSociales = [];
 	
	$http({ 
		method : 'GET',
		url : '/GestorOdontologico/service/obraSocial/obrasSociales',
		headers : { 'Content-Type' : 'application/json'},
		data : $scope.paciente,
		}).then(function mySucces(response) {
			$scope.obrasSociales = response.data;
			console.log(response);
		}, function myError(response) {
		toaster.pop('error', response.status + ', ' + response.message );
		$scope.myTxt = "error";
		});
		

 	
 	
	$scope.guardarPaciente = function() {

		$scope.paciente.fechaNac= $scope.myDate;
		
 		if($scope.myDate.getFullYear() <= new Date().getFullYear() 
 	 		   && $scope.myDate.getMonth() <= new Date().getMonth()
 	 		   &&$scope.myDate.getDate() > new Date().getDate()
 	 		){
 			
 			
 			$scope.myDate = new Date($scope.myDate);
 			console.log($scope.myDate);
 			toaster.pop('error', 'Por favor ingresa una fecha de nacimiento valida' );
 			
 		}else{
 			JSON.stringify($scope.paciente)
 			PacienteService.agregarPaciente($scope.paciente);
 			
  		}
	}
})
