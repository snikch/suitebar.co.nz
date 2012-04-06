function Suite(){
	var _this = this, scroller = new Scroll(), bouncer = new Doorman(), loader = new ImageLoader(), loaded = 0, loading_message = $('#loading .message');
	var bar = $('#loading .loading_bar span');
	this.load = function(){
		loader.loadGroup('index', _this.menu_preloaded, _this.bump_loading);
		_this.initMobile();
		$(function(){
			scroller.prepare();
			setTimeout(function(){
				bouncer.verify_age(function(){
					_this.initMenu();
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
	this.initMobile = function(){
		if(!navigator.userAgent.match(/iP(hone|od|ad)/i)) return;
		document.title = "Suite Bar"
	}
	this.initMenu = function(){
		$('a[rel=reservations]').click(function(e){
			e.preventDefault();
			offset = $('#reservations').offset().top
			console.log(offset)
			if(window.location.href.indexOf('scroll=true') == -1){
				$('html, body').scrollTop(offset);
			} else {
				$('html, body').animate({ scrollTop: offset },{
					duration: 200,
					easing: 'easeInOutSine'
				});
			}
		})
	}
}

