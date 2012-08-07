document.createElement("nav");
document.createElement("header");
document.createElement("article");
alog = function(message){
	log.call(this, message);
	alert(message);
}
function Suite(){
	var _this = this, scroller = new Scroll(this), bouncer = new Doorman(), loader = new ImageLoader(), loaded = 0, loading_message = $('#loading .message');
	var bar = $('#loading .loading_bar span');
	this.load = function(){
		scroller.prepare();
		if(_this.isMobile()){
			loader.loadGroup('visuals_low_res',function(){
				$('#loading-overlay').hide();
				_this.initMenu();
				scroller.init();
			},  _this.low_visual_preloaded);	

		}else{
			log ("Loading as desktop browser")
			$('body').addClass('showmenu');
			loader.loadGroup('index', _this.menu_preloaded, _this.bump_loading);
		}
		_this.initMobile();
		$(function(){
			log('starting bouncer');
			//bouncer.verify_age(function(){
				log('age virified');
			//});
		});
		$('.people a').click(function(e){
		   	e.preventDefault();
		   	new ImageModal($(this).attr('href'))})
	};
	this.bump_loading = function(){
		loaded++;
		// Give a free 10%, and divide by total images - 1
		bar.css({ width: parseInt(Math.round(loaded/17*94)+6) + '%'});
	}
	this.menu_preloaded = function(imgs){
		$.each(imgs, function(k,v){
			_this.apply_image(k, v);
		});
		loader.loadGroup('visuals_low_res',function(){
			loader.loadGroup('visuals_high_res', scroller.init, _this.high_visual_preloaded);
		},  _this.low_visual_preloaded);
		$('#loading-overlay').remove();
	}
	this.low_visual_preloaded = function(selector, source){
		_this.apply_image(selector, source, _this.isMobile() ? {} : { backgroundSize: 'cover'});
	};
	this.high_visual_preloaded = function(selector, source){
		_this.apply_image(selector, source, { backgroundSize: 'cover'});
	};
	this.apply_image = function(selector, value, additional){
		var additional = additional || {}
		if(_this.isMobile()){
			// Add the visual block
			selector = selector.replace(/ .visual/, '');
		}
		log('Applying ' + selector);
		$(selector).css($.extend(additional, {
			backgroundImage: 'url(' + value + ')',
			opacity: 1
		}));
	}
	this.initMobile = function(){
		if(_this.isMobile()) document.title = "Suite Bar";
	}
	this.isMobile = function(){
		return navigator.userAgent.match(/iP(hone|od|ad)/i)
	}
	this.initMenu = function(){
		$('a[rel=reservations]').click(function(e){
			e.preventDefault();
			offset = $('#reservations').offset().top
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

