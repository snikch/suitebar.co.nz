var maps_callback;
var Contact = function(){
	var _this = this, map, suite = [-36.844739,174.763244], el = $('#contact .visual .map').get(0);
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
		var opts = {
			zoom: 16,
			scrollwheel: false,
			center: new google.maps.LatLng(-36.845880,174.768276),
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
        var marker = new google.maps.Marker({
            position: pin_lat_lng,
            map: map,
            icon: image,
            shadow: shadow,
            shape: shape
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
