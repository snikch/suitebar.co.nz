var maps_callback;
var Contact = function(){
	var _this = this, map, suite = [-36.844739,174.763244], el = $('#contact .visual .map').get(0), marker, infowindow, page_center;

	this.init = function(){
		maps_callback = _this.load;
		$.getScript('//maps.googleapis.com/maps/api/js?sensor=false&callback=maps_callback');
		_this.fix_cursor_bug();
	}
	this.fix_cursor_bug = function(){
		cursor = new Image();
		cursor.src = 'http://maps.gstatic.com/mapfiles/openhand_8_8.cur';
	};
	this.load = function(){
		page_center = calculate_page_center(); //-36.845880,174.768276
		var opts = {
			zoom: 16,
			scrollwheel: false,
			center: new google.maps.LatLng(page_center[0], page_center[1]),
			disableDefaultUI: true,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			streetViewControl: true,
			streetViewControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			}
        }
        map = new google.maps.Map(el, opts);
		_this.pin_suite();
		_this.setup_streetview();
	}
	var calculate_page_center = function(){
		// 0.0001 x = ~4.66px
		// 0.0001 y = ~5.82px
		var right_offset = 489+110;
		// 80 = InfoWindow + Icon / 2
		return [
			suite[0]+(0.0001*(80/5.82)), 
			suite[1]+(0.0001*Math.round(right_offset/2)/4.666)
		];
	}
	this.pin_suite = function(){
        var shadow = new google.maps.MarkerImage('http://mal.co.nz/suite/skull-pin-shadow.png',
            new google.maps.Size(70, 42),
            new google.maps.Point(0,0),
            new google.maps.Point(10, 42)
        );
        var image = new google.maps.MarkerImage('http://mal.co.nz/suite/skull-pin.png',
            new google.maps.Size(41, 54),
            new google.maps.Point(0,0),
            new google.maps.Point(20, 54)
        );
        var shape = {
            coord: [1, 1, 1, 20, 18, 20, 18 , 1],
            type: 'poly'
        };
        var pin_lat_lng = new google.maps.LatLng(suite[0], suite[1]);
        marker = new google.maps.Marker({
            position: pin_lat_lng,
            map: map,
            icon: image,
            shadow: shadow,
            shape: shape
        });
		infowindow = new google.maps.InfoWindow({
	    	content: "<p>Suite Bar<p><p><small>123 Hobson St<br />Auckland</small></p>"
		});
		function BlackOverlay(content, loc, map, options){
			this.options_ = $.extend({ width: 200, height: 90},options);
			this.loc_ = loc;
			this.map_ = map;
			this.div_ = null;
			this.content_ = content;
			this.setMap(map);

		}
		BlackOverlay.prototype = new google.maps.OverlayView();
		BlackOverlay.prototype.onAdd = function(){
			var div = document.createElement('DIV');
			div.style.border = "none";
			div.style.borderWidth = "0px";
			div.style.position = "absolute";
			div.className = 'black-overlay'
			div.innerHTML = this.content_
			this.div_ = div;
			var panes = this.getPanes();
			panes.overlayLayer.appendChild(div);
		}
		BlackOverlay.prototype.draw = function() {
		  var overlayProjection = this.getProjection();
		  var tc = overlayProjection.fromLatLngToDivPixel(this.loc_);
		  var width = this.options_.width;
		  var height = this.options_.height;
		  var div = this.div_;
		  div.style.left = (tc.x-(width/2)) + 'px';
		  div.style.top = (tc.y - 80 - height) + 'px';
		  div.style.width = width + 'px';
		  div.style.height = height + 'px';
		}
		overlay = new BlackOverlay('<p>Suite Bar</p><p><small>123 Hobson St<br />Auckland</small></p>', new google.maps.LatLng(suite[0], suite[1]), map);
		google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});
		
		
	};
	this.setup_streetview = function(){
		var street_view_opts = {
			addressControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			linksControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			panControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			enableCloseButton: true,
			scrollwheel: false,
			visible: false
		}
		var panorama = new google.maps.StreetViewPanorama(el, street_view_opts);
		map.setStreetView(panorama);
	}
}
