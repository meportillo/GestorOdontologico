 var app = angular.module('gestorOdont', []);

app.controller("test",function($scope, $http){

	$scope.nombreBsqd =null;
	console.log("controller test");
	$scope.icons ="diente.svg,close.png,azul.png,igual.png,circulo.png,recta.png,tres.png";
	$scope.paciente = null;
	$scope.buscarPorNombre=function(){
		if($scope.nombreBsqd==null)
		{
			alert("ingresar un nombre");
			return
		}else
		{
			$http({
				method : 'GET',
				url : '/GestorOdontologico/service/paciente/getPacientePorNombre/' +$scope.nombreBsqd,
				headers : {
					'Content-Type' : 'application/json',
				}
			}).then(function mySucces(response) {
				$scope.paciente = response.data[0];
				console.log(response);
			}, function myError(response) {
				console.log(response);
			});	
			console.log($scope.paciente);
			
		}
	}

	$scope.pacienteNotNull = function(){
		return $scope.paciente != null;
	}
	

});




 app.directive('diente',function() {

 	return {

 		restrict: 'A',
 		replace : true,
 		templateUrl: "../app/curso-template.html",
 		link: function(scope, elment, attributes){
 		
 			scope.titulo = attributes.idcuadrante + attributes.posicion ;
 			scope.estado = attributes.estado;
 			scope.posicion = attributes.posicion;
 			scope.idcuadrante = attributes.idcuadrante;
 			scope.icons = attributes.iconos.split(",");

 			scope.getIcon = function(item){
 				return url + scope.icons[item];
 			}
 		  }
		}		
 }); 

 var url = '../app/images/';

