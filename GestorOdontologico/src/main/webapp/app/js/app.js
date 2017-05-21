var app = angular
		.module('gestorOdont', [ 'toaster', 'ngRoute', 'smart-table','ui.bootstrap.modal', 'ngMaterial','ngMessages', 'xeditable' ,'ui.bootstrap' ]);

app.filter('ponerCero',function(){

	return function(valor){
	if(valor == 'NaN')
		return "0";
	}
})