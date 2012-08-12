document.createElement("nav");
document.createElement("header");
document.createElement("article");
alog = function(message){
	log.call(this, message);
	alert(message);
}
var SuiteEnv = {
	env:  function (){
		return window.location.href.match('0.0.0.0') != null ? 'development' : 'production';
	},
	dev: function(){
		return this.env() == 'development';
	}
}
function Suite(){
	var _this = this, scroller = new Scroll(this), bouncer = new Doorman(), loader = new ImageLoader(), loaded = 0, loading_message = $('#loading .message'), start = new Date();
	var bar = $('#loading .loading_bar span');
	this.load = function(){
		scroller.prepare();
		_this.initMenu();
		_this.initMobile();
		if(_this.isMobile()){
			loader.loadGroup('visuals_low_res',function(){
				$('#loading-overlay').hide();
				scroller.init();
			},  _this.low_visual_preloaded);

		}else{
			log ("Loading as desktop browser")
			$('body').addClass('showmenu');
			loader.loadGroup('index', _this.menu_preloaded, _this.bump_loading);
		}
		$(function(){
			bouncer.verify_age(function(){
			});
		});
		$('.people a').click(function(e){
		   	e.preventDefault();
		   	new ImageModal($(this).attr('href'))})
	};
	this.bump_loading = function(){
		loaded++;
		// Give a free 10%, and divide by total images - 1
		total_images = 27;
		bar.css({ width: parseInt(Math.round(loaded/(total_images-1)*94)+6) + '%'});
	}
	this.menu_preloaded = function(imgs){
		$.each(imgs, function(k,v){
			_this.apply_image(k, v);
		});
		loader.loadGroup('visuals_low_res',function(){
			// If it's been a few seconds, slide up
			scroller.init();
			var dialog = $('#loading-overlay');
			if(new Date().getTime() - start.getTime() > 3000){
				dialog.addClass('disappear');
				setTimeout(function(){
					dialog.remove();
				}, 300);
			}else{
				dialog.remove();
			}
			if($(window).width() > 1024)
				loader.loadGroup('visuals_high_res', null, _this.high_visual_preloaded);
		},  _this.low_visual_preloaded);
	}
	this.low_visual_preloaded = function(selector, source){
		_this.bump_loading();
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
		if(_this.isMobile()){
			document.title = "Suite Bar";
			$('body').addClass('touch');
		}
	}
	this.isMobile = function(){
		return navigator.userAgent.match(/iP(hone|od|ad)/i)
	}
	this.initMenu = function(){
		$('header nav h1 a').click(function(e){ $('header nav ul').toggleClass('active'); })
		$('header nav li a').click(function(e){ e.stopPropagation(); $('header nav ul').toggleClass('active', false); })
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

