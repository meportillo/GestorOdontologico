app.directive('diente',['$http', function($http) {

	return {

		restrict : 'A',
		replace : true,
		scope :{
			estadoD: '=estado',
			idDiente: '=iddiente'
		},
		templateUrl : "app/curso-template.html",
		link : function(scope, element, attributes) {
			

			var icons = [];
			icons.push({
				'iconFilePath' : 'app/images/diente.svg',
				'iconValue' : 0
			});
			icons.push({
				'iconFilePath' : 'app/images/close.png',
				'iconValue' : 1
			});
			icons.push({
				'iconFilePath' : 'app/images/azul.png',
				'iconValue' : 2
			});
			icons.push({
				'iconFilePath' : 'app/images/igual.png',
				'iconValue' : 3
			});
			icons.push({
				'iconFilePath' : 'app/images/circulo.png',
				'iconValue' : 4
			});
			icons.push({
				'iconFilePath' : 'app/images/recta.png',
				'iconValue' : 5
			});
			icons.push({
				'iconFilePath' : 'app/images/tres.png',
				'iconValue' : 6
			});

		
			var diente = new IconSelect(attributes.iddiente, element[0], []);
			diente.refresh(icons, scope.estadoD);

		
			
			
			element[0].addEventListener('changed', function(e) {
				console.log("--------------event----------------");
				scope.estadoD = diente.getSelectedValue();
				console.log(scope.estadoD);
				console.log("--------------event----------------");
				
				$http({
					method : 'POST',
					url : '/GestorOdontologico/service/diente/updateDiente/'+scope.idDiente+'/'+scope.estadoD,
					headers : {
						'Content-Type' : 'application/json',
					}
				}).then(function mySucces(response) {
					console.log(response);
			
				}, function myError(response) {
					console.log(response);
				});	

				
			});
			
			
			
		}
	}
}]);