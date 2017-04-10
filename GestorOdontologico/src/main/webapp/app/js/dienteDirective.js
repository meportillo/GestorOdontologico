 app.directive('diente',function() {

 	return {

 		restrict: 'A',
 		replace : true,
 		templateUrl: "app/curso-template.html",
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

 var url = 'app/images/';

