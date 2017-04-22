app.config(function($routeProvider) {
	console.log("dentro routes config");
	$routeProvider.when('/turnos', {
		templateUrl : 'app/templates/turnos.html',
	}).when('/historias', {
		templateUrl : 'app/templates/historias.html',
		controller : 'getPacienteService',
		controllerAs : 'getPaciente'

	}).when('/historias/ficha/:dni', {
		templateUrl : 'app/templates/fichaPaciente.html',
		controller : 'fichaCtrl',
		controllerAs : 'ficha'

	})
	.when('/agregarpaciente', {
		templateUrl : 'app/templates/agregarpaciente.html',
		controller : 'agregarPacienteCtrl',
		controllerAs : 'agregarPaciente'

	}).otherwise({
		redirectTo : '/'
	});
});

app.config([ '$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
} ]);