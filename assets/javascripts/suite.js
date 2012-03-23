function Suite(){
	var _this = this, scroller = new Scroll(), bouncer = new Doorman(), loader = new ImageLoader(), loaded = 0, loading_message = $('#loading .message');
	var spin_opts = {
	  lines: 16, // The number of lines to draw
	  length: 0, // The length of each line
	  width: 5, // The line thickness
	  radius: 24, // The radius of the inner circle
	  color: '#000', // #rgb or #rrggbb
	  speed: 1.2, // Rounds per second
	  trail: 60, // Afterglow percentage
	  shadow: false, // Whether to render a shadow
	  hwaccel: true, // Whether to use hardware acceleration
	  className: 'spinner', // The CSS class to assign to the spinner
	  zIndex: 2e9, // The z-index (defaults to 2000000000)
	  top: 'auto', // Top position relative to parent in px
	  left: 'auto' // Left position relative to parent in px
	};
	var bar = $('#loading .loading_bar span');
	this.load = function(){
		loader.loadGroup('index', _this.menu_preloaded, _this.bump_loading);
		$(function(){
			scroller.prepare();
			setTimeout(function(){
				bouncer.verify_age(function(){
					scroller.init();
				});
			}, 700);
		});
	};
	this.bump_loading = function(){
		loaded++;
		// Give a free 10%, and divide by total images - 1
		bar.css({ width: (Math.round(loaded/8*94)+6) + '%'});
	}
	this.menu_preloaded = function(imgs){
		$.each(imgs, function(k,v){
			_this.apply_image(k, v.src);
			log("loaded " + k + ' with ' + v.src)
		});
		loader.loadGroup('visuals_low_res',function(){
			loader.loadGroup('visuals_high_res', scroller.set_positions, _this.high_visual_preloaded);
		},  _this.low_visual_preloaded);
		$('#loading-overlay').remove();
	}
	this.low_visual_preloaded = function(el){
		log('Loaded ' + el.rel);
		_this.apply_image(el.rel, el.src, { backgroundSize: 'cover'});
	};
	this.high_visual_preloaded = function(el){
		log('Loaded ' + el.rel);
		_this.apply_image(el.rel, el.src, { backgroundSize: 'cover'});
	};
	this.apply_image = function(selector, value, additional){
		var additional = additional || {}
		log('Applying ' + selector);
		$(selector).css($.extend(additional, {
			backgroundImage: 'url(' + value + ')',
			opacity: 1
		}));
	}
}

