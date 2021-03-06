/**
 * 
 * Created with NetBeans IDE
 * 
 * Code : Icon Select JS Version : 1.0
 * 
 * User : Bugra OZDEN Site : http://www.bugraozden.com Mail :
 * bugra.ozden@gmail.com
 * 
 * Date : 10/30/13 Time : 01:10 PM
 * 
 */

IconSelect.DEFAULT = {};
IconSelect.DEFAULT.SELECTED_ICON_WIDTH = 33;
IconSelect.DEFAULT.SELECTED_ICON_HEIGHT = 33;
IconSelect.DEFAULT.SELECTED_BOX_PADDING = 1;
IconSelect.DEFAULT.SELECTED_BOX_PADDING_RIGHT = 12;
IconSelect.DEFAULT.ICONS_WIDTH = 32;
IconSelect.DEFAULT.ICONS_HEIGHT = 32;
IconSelect.DEFAULT.BOX_ICON_SPACE = 1;
IconSelect.DEFAULT.HORIZONTAL_ICON_NUMBER = 3;
IconSelect.DEFAULT.VECTORAL_ICON_NUMBER = 3;

IconSelect.COMPONENT_ICON_FILE_PATH = "images/control/icon-select/arrow.png";


function IconSelect($$elementID, element, $$parameters) {

	// console.log("id ---" + $$elementID);

	var _icons = [];
	var _selectedIndex = -1;
	var _boxScroll;

	var _default = IconSelect.DEFAULT;

	function _init() {

		_View.iconSelectElement = element;
		// parametreler boş gelirse
		if (!$$parameters)
			$$parameters = {};
		// console.log("sdfsd " + _View.iconSelectElement);
		// En üst elementi seç
		if (_View.iconSelectElement) {

			// set parameters
			$$parameters = _Model.checkParameters($$parameters);
			// create UI
			var ui = _View.createUI($$parameters, $$elementID);
			// basıldığında göster/gizle
			_View.iconSelectElement.onclick = function() {
				_View.showBox();
			};

			// Başlangıçta gizle
			_View.showBox(false);

			// Nesneye basıldığında gizlemeyi iptal et.
			_View.iconSelectElement.addEventListener('click', function($event) {
				$event.stopPropagation();
			});

			// dışarı basıldığında gizle.
			window.addEventListener('click', function() {
				_View.showBox(false);
			});

		} else {
			alert("Element not found.");
		}

	}
	
	var titulos = ["Pieza Completa","Pieza Ausente","P. No Erupcionada","Extraccion","Coronas","Protesis Removible","Protesis Fija"];

	this.titulo = function(estado){
		
		return titulos[estado];
	}



	// Tüm iconları yeniden yükle.
	this.refresh = function($icons, ind) {

		_icons = [];

		var setSelectedIndex = this.setSelectedIndex;

		for (var i = 0; i < $icons.length; i++) {
			$icons[i].element = _View.createIcon($icons[i].iconFilePath,
					$icons[i].iconValue, i, $$parameters);
			$icons[i].element.onclick = function() {
				setSelectedIndex(this.childNodes[0].getAttribute('icon-index'));

			};
			_icons.push($icons[i]);

		}

		var horizontalIconNumber = Math.round(($icons.length)
				/ $$parameters.vectoralIconNumber);

		_View.boxElement.style.height = (($$parameters.iconsHeight + 2) * horizontalIconNumber)
				+ ((horizontalIconNumber + 1) * $$parameters.boxIconSpace);
		this.setSelectedIndex(ind);

	};

	// icon listesini al.
	this.getIcons = function() {
		return _icons;
	};

	// iconu seçili hale gelir.
	this.setSelectedIndex = function($index) {

		var icon;
		var titulos = ["Pieza Completa","Pieza Ausente","P. No Erupcionada","Extraccion","Coronas","Protesis Removible","Protesis Fija"];

		var titulo = function(estado){
			
			return titulos[estado];
		}


		if (_icons.length > $index)
			icon = _icons[$index];

		if (icon) {
			// eski icondan seçilme özelliğini kaldır.
			if (_selectedIndex != -1)
				_icons[_selectedIndex].element.setAttribute('class', 'icon');
			_selectedIndex = $index;
			
			_View.selectedIconImgElement.setAttribute('src', icon.iconFilePath);
			//CAMBIAR
			_View.selectedIconImgElement.setAttribute("ng-attr-title",titulo($index));
			if (_selectedIndex != -1)
				_icons[_selectedIndex].element.setAttribute('class',
						'icon selected dropdown-toggle');
		}

		_View.iconSelectElement.dispatchEvent(new Event('changed'));

		// _View.showBox(false);

	};

	this.getSelectedIndex = function() {
		return _selectedIndex;
	};
	this.getSelectedValue = function() {
		return _icons[_selectedIndex].iconValue
	};
	this.getSelectedFilePath = function() {
		return _icons[_selectedIndex].iconFilePath
	};

	// ### VIEW CLASS ###

	function _View() {
	}

	_View.iconSelectElement;
	_View.boxElement;
	_View.boxScrollElement;
	_View.selectedIconImgElement;
	_View.selectedIconElement;

	_View.showBox = function($isShown) {

		if ($isShown == null) {
			$isShown = (_View.boxElement.style.display == "none") ? true
					: false;
		}

		if ($isShown) {
			_View.boxElement.style.display = "block";
			_View.boxScrollElement.style.display = "block";
			_boxScroll = (_boxScroll) ? _boxScroll : new iScroll($$elementID
					+ "-box-scroll");
		} else {
			_View.boxElement.style.display = "none";
			_View.boxScrollElement.style.display = "none";
		}

		_View.boxElement.style.display = ($isShown) ? "block" : "none";

	};

	_View.setIconSelectElement = function($$elementID) {
		// console.log("view id" + $$elementID);
		_View.iconSelectElement = document.getElementById($$elementID);
		// console.log("view " + _View.iconSelectElement);
		return _View.iconSelectElement;
	};

	_View.clearUI = function() {
		_View.iconSelectElement.innerHTML = "";
	};

	_View.clearIcons = function() {
		_View.boxElement.innerHTML = "";
	};

	_View.createUI = function($parameters) {

		/*
		 * HTML MODEL
		 * 
		 * <div id="my-icon-select" class="icon-select"> <div
		 * class="selected-box"> <div class="selected-icon"><img
		 * src="images/icons/i2.png"></div> <div class="component-icon"><img
		 * src="images/control/icon-select/arrow.png"></div> <div class="box">
		 * <div class="icon"><img src="images/icons/i1.png"></div> <div
		 * class="icon selected"><img src="images/icons/i2.png"></div> <div
		 * class="icon"><img src="images/icons/i3.png"></div> <div
		 * class="icon"><img src="images/icons/i4.png"></div> <div
		 * class="icon"><img src="images/icons/i3.png"></div> <div
		 * class="icon"><img src="images/icons/i4.png"></div> <div
		 * class="icon"><img src="images/icons/i5.png"></div> <div
		 * class="icon"><img src="images/icons/i6.png"></div> <div
		 * class="icon"><img src="images/icons/i7.png"></div> <div
		 * class="icon"><img src="images/icons/i8.png"></div> </div> </div>
		 * </div>
		 * 
		 */

		
		_View.clearUI();

		_View.iconSelectElement.setAttribute('class', 'icon-select');
		_View.iconSelectElement.setAttribute('class', 'col-sm-1');

		var selectedBoxElement = document.createElement('div');
		selectedBoxElement.setAttribute('class', 'selected-box dropup');

		var selectedIconElement = document.createElement('div');
		selectedIconElement.setAttribute('class', 'selected-icon');
		// selectedIconElement.setAttribute('ng-model',
		// 'diente.idEstadoDiente');

		_View.selectedIconImgElement = document.createElement('img');
		_View.selectedIconImgElement.setAttribute('src', '');
		
//		_View.selectedIconImgElement.setAttribute('data-toggle', 'tooltip');
//		_View.selectedIconImgElement.setAttribute('ng-attr-title', 'diente');
//		_View.selectedIconImgElement.setAttribute('title', titulo(0));

			selectedIconElement.appendChild(_View.selectedIconImgElement);

		
		var componentIconElement = document.createElement('div');
		componentIconElement.setAttribute('class', 'component-icon');

		var componentIconImgElement = document.createElement('img');
		// se comentaron estas lineas para eliminarla imagen
		// componentIconImgElement.setAttribute('src',
		// IconSelect.COMPONENT_ICON_FILE_PATH );
		// componentIconElement.appendChild(componentIconImgElement);

		_View.boxScrollElement = document.createElement('div');
		_View.boxScrollElement.setAttribute('id', $$elementID + "-box-scroll");
		_View.boxScrollElement.setAttribute('class', 'box dropdown-menu col-md-3');

		_View.boxElement = document.createElement('div');

		// _View.boxElement.setAttribute('class', 'box');
		_View.boxScrollElement.appendChild(_View.boxElement);

		_View.selectedIconImgElement.setAttribute('width',
				$parameters.selectedIconWidth);
		_View.selectedIconImgElement.setAttribute('height',
				$parameters.selectedIconHeight);
		selectedIconElement.style.width = $parameters.selectedIconWidth;
		selectedIconElement.style.height = $parameters.selectedIconHeight;
		selectedBoxElement.style.width = $parameters.selectedIconWidth
				+ $parameters.selectedBoxPadding
				+ $parameters.selectedBoxPaddingRight;
		selectedBoxElement.style.height = $parameters.selectedIconHeight
				+ ($parameters.selectedBoxPadding * 2);
		selectedIconElement.style.top = $parameters.selectedBoxPadding;
		selectedIconElement.style.left = $parameters.selectedBoxPadding;
		componentIconElement.style.bottom = 4 + $parameters.selectedBoxPadding;

		_View.boxScrollElement.style.left = parseInt(selectedBoxElement.style.width) + 1;

		_View.boxScrollElement.style.width = (($parameters.iconsWidth + 2) * $parameters.vectoralIconNumber)
				+ (($parameters.vectoralIconNumber + 1) * $parameters.boxIconSpace);
		_View.boxScrollElement.style.height = (($parameters.iconsHeight + 2) * $parameters.horizontalIconNumber)
				+ (($parameters.horizontalIconNumber + 1) * $parameters.boxIconSpace);

		_View.boxElement.style.left = _View.boxScrollElement.style.left;
		_View.boxElement.style.width = _View.boxScrollElement.style.width;

		_View.iconSelectElement.appendChild(selectedBoxElement);
		selectedBoxElement.appendChild(selectedIconElement);
		selectedBoxElement.appendChild(componentIconElement);
		selectedBoxElement.appendChild(_View.boxScrollElement);

		var results = {};
		results['iconSelectElement'] = _View.iconSelectElement;
		results['selectedBoxElement'] = selectedBoxElement;
		results['selectedIconElement'] = selectedIconElement;
		results['selectedIconImgElement'] = _View.selectedIconImgElement;
		results['componentIconElement'] = componentIconElement;
		// results['componentIconImgElement'] = componentIconImgElement;

		return results;

		// trigger: created ( run setValues )

	};

	_View.createIcon = function($iconFilePath, $iconValue, $index, $parameters) {
		// console.log($iconFilePath);
		// console.log($iconValue);
		// console.log($index);
		// console.log($parameters);

		/*
		 * HTML MODEL
		 * 
		 * <div class="icon"><img src="images/icons/i1.png"></div>
		 * 
		 */

		var iconElement = document.createElement('div');
		iconElement.setAttribute('class', 'icon dropdown-item');
		iconElement.style.width = $parameters.iconsWidth;
		iconElement.style.height = $parameters.iconsHeight;
		iconElement.style.marginLeft = $parameters.boxIconSpace;
		iconElement.style.marginTop = $parameters.boxIconSpace;
		iconElement.style.cssFloat = 'left';

		var iconImgElement = document.createElement('img');
		iconImgElement.setAttribute('src', $iconFilePath);
		iconImgElement.setAttribute('icon-value', $iconValue);
		iconImgElement.setAttribute('icon-index', $index);
		iconImgElement.setAttribute('width', $parameters.iconsWidth);
		iconImgElement.setAttribute('height', $parameters.iconsHeight);
		iconImgElement.style.cssFloat = 'left';
		
		var titulos = ["Pieza Completa","Pieza Ausente","P. No Erupcionada","Extraccion","Coronas","Protesis Removible","Protesis Fija"];

		var titulo = function(estado){
			
			return titulos[estado];
		}
		iconImgElement.setAttribute('title', titulo($index));

		iconElement.appendChild(iconImgElement);
		_View.boxElement.appendChild(iconElement);

		return iconElement;

	};

	// ### MODEL CLASS ###

	function _Model() {
	}

	// TODO: params değişkenini kaldır yeni oluştursun.
	_Model.checkParameters = function($parameters) {

		$parameters.selectedIconWidth = ($parameters.selectedIconWidth) ? $parameters.selectedIconWidth
				: _default.SELECTED_ICON_WIDTH;
		$parameters.selectedIconHeight = ($parameters.selectedIconHeight) ? $parameters.selectedIconHeight
				: _default.SELECTED_ICON_HEIGHT;
		$parameters.selectedBoxPadding = ($parameters.selectedBoxPadding) ? $parameters.selectedBoxPadding
				: _default.SELECTED_BOX_PADDING;
		$parameters.selectedBoxPaddingRight = ($parameters.selectedBoxPaddingRight) ? $parameters.selectedBoxPaddingRight
				: _default.SELECTED_BOX_PADDING_RIGHT;
		$parameters.iconsWidth = ($parameters.iconsWidth) ? $parameters.iconsWidth
				: _default.ICONS_WIDTH;
		$parameters.iconsHeight = ($parameters.iconsHeight) ? $parameters.iconsHeight
				: _default.ICONS_HEIGHT;
		$parameters.boxIconSpace = ($parameters.boxIconSpace) ? $parameters.boxIconSpace
				: _default.BOX_ICON_SPACE;
		$parameters.vectoralIconNumber = ($parameters.vectoralIconNumber) ? $parameters.vectoralIconNumber
				: _default.VECTORAL_ICON_NUMBER;
		$parameters.horizontalIconNumber = ($parameters.horizontalIconNumber) ? $parameters.horizontalIconNumber
				: _default.HORIZONTAL_ICON_NUMBER;

		return $parameters;

	};

	_init();

}