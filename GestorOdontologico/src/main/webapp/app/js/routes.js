app.config(function($routeProvider) {
	console.log("dentro routes config");
	$routeProvider.when('/turnos', {
		templateUrl : 'app/templates/turnos.html',
	}).when('/historias', {
		templateUrl : 'app/templates/historias.html',
		controller : 'getPacienteService',
		controllerAs : 'getPaciente'

	}).otherwise({
		redirectTo : '/'
	});
});

app.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);