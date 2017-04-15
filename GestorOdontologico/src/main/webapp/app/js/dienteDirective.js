app.directive('diente', function() {

	return {

		restrict : 'A',
		replace : true,
		templateUrl : "app/curso-template.html",
		link : function(scope, element, attributes) {

			var icons = [];
			icons.push({
				'iconFilePath' : 'app/images/diente.svg',
				'iconValue' : '0'
			});
			icons.push({
				'iconFilePath' : 'app/images/close.png',
				'iconValue' : '1'
			});
			icons.push({
				'iconFilePath' : 'app/images/azul.png',
				'iconValue' : '2'
			});
			icons.push({
				'iconFilePath' : 'app/images/igual.png',
				'iconValue' : '3'
			});
			icons.push({
				'iconFilePath' : 'app/images/circulo.png',
				'iconValue' : '4'
			});
			icons.push({
				'iconFilePath' : 'app/images/recta.png',
				'iconValue' : '5'
			});
			icons.push({
				'iconFilePath' : 'app/images/tres.png',
				'iconValue' : '6'
			});

			scope.titulo = attributes.idcuadrante + attributes.posicion;
			scope.estado = attributes.estado;
			scope.posicion = attributes.posicion;
			scope.idcuadrante = attributes.idcuadrante;
			// scope.icons = attributes.iconos.split(",");
			scope.idDiente = attributes.iddiente;
			// scope.icons = attributes.iconos;
			console.log("directive:-- " + scope.idDiente);
			var mauro = new IconSelect(attributes.iddiente, element[0], []);
			console.log(mauro);
			mauro.refresh(icons, attributes.estado);
		}
	}
});
