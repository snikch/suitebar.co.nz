 window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function( callback ){
			window.setTimeout(callback, 1000 / 30);
		};
})();
    // usage:
    // instead of setInterval(render, 16) ....

function Scroll(app_instance){
	this.app = app_instance;
	var _this = this;
	this.s = {
		last_story_index: false,
		follow: false,
		num_stories: 0,
		window_height: false,
		stories: ["about-1", "about-2", "cocktail-1", "cocktail-2", "white-wine", "red-wine", "beer-1", "whiskey", "gin", "vodka", "bitter", "tequila", "bourbon", "cognac", "rum", "food","awards", "bookings", "people"]
	};
	this.classes = {
		prev: 'prev',
		current: 'current',
		bottom: 'bottom',
		fixed: 'fixed',
		next: 'next'
	};
	this.prepare = function(){
		log("preparing scroller");
		_this.stories = [];
		_this.init_stories();
		_this.set_positions();
		_this.scroll_to_hash();
		_this.handle_hash_links();
		if(_this.app.isMobile()) return;
		_this.menu_preparations();
	};
	this.init = function(){
		log("Scroller init");
		_this.set_positions();
		_this.scrollHandler();
		_this.s.num_stories = _this.stories.length;
		_this.prepareContact();
		_this.init_contact();
		if(_this.app.isMobile()) return;
		$(window).resize(_this.resizeHandler);
		_this.initMenu();
		_this.animloop();

	};
	this.animloop = function(){
      requestAnimFrame(_this.animloop);
      _this.scrollHandler();
    };

	this.menu_preparations = function(){
		/* Handle cocktails / music z-index */
		$('.menu-cocktails').hover(function(){
			$(this).css('z-index', 76);
		}, function(){
			$(this).css('z-index', 74);
		});
	}
	this.scroll_to_hash = function(){
		if(location.hash){
			hash = location.hash;
			_this.trigger_ui(hash);
		}
	}
	this.handle_hash_links = function(){
		$(function(){
			$("nav a, .menu-item, header a").click(function(e) {
				var hash = $(this).attr('href');
				_this.push_hash(hash);
				if(window.location.href.indexOf('scroll=true') == -1) return;
				e.preventDefault();
				$('html, body').animate({
					scrollTop: $(hash).offset().top
				},{
					duration: 200,
					easing: 'easeInOutSine',
					complete: function(){
						location.hash = hash
					}
				});
			});
		});
	}
	this.resizeHandler = function(){
		_this.set_positions();
		_this.scrollHandler();
	};
	this.set_positions = function(){
		_this.s.window_height = _this.windowY();
		$('.story .visual').css({ height: _this.s.window_height});
		_this.story_positions = [];
		_this.stories = [];
		$('.story').each(function(){
			_this.story_positions.push(_this.offsetTop(this));
			if(method === 'style')
				_this.stories.push($(this).find('.visual'));
			else
				_this.stories.push($(this));
		});
		minHeight = parseInt($('#main-menu').css('minHeight'));
		maxHeight = parseInt($('#main-menu').css('maxHeight'));
		if(_this.s.window_height > maxHeight){
			targetMenuHeight = maxHeight;
		}else if(_this.s.window_height < minHeight){
			targetMenuHeight = minHeight;
		}else{
			targetMenuHeight = _this.s.window_height;
		}
		$('#main-menu').css({height: targetMenuHeight});
	};
	this.init_stories = function(){
		$('.story').each(function(i){
			story = $(this);
			story.css({zIndex: i+40})
			$.each(_this.s.stories, function(k,v){
				if(!story.hasClass(v)) return true;
				story.prepend($('<div class="visual" />'));
				return true;
			});
		});
	};
	this.offsetTop = function(el){
		var cur_top = 0;
		if (el.offsetParent) {
			do {
				cur_top += el.offsetTop;
			} while ((el = el.offsetParent));
		}
		return cur_top;
	};
	this.scrollY = function() {
    	if( window.pageYOffset ) { return window.pageYOffset; }
    	return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	};
	this.windowY = function() {
		var winH = 0;
		if (document.body && document.body.offsetWidth) {
		 winH = document.body.offsetHeight;
		}
		if (document.compatMode=='CSS1Compat' &&
			document.documentElement &&
			document.documentElement.offsetWidth ) {
		 winH = document.documentElement.offsetHeight;
		}
		if (window.innerWidth && window.innerHeight) {
		 winH = window.innerHeight;
		}
		return winH;
	};
	method = 'class';
	this.scrollHandler = function(){
		y = _this.scrollY();
		follow = true;
		set = false

		for(var i=0,j=_this.s.num_stories;i<j;i++){
			pos = _this.story_positions[i];
			if(y >= pos) continue;
			set = true
			i--;
			follow = y <= pos - _this.s.window_height;
			break;
		}
		// If it wasn't set, we're at the end
		if(set == false){
			i--;
		}
		match = i === _this.s.last_story_index && follow === _this.s.follow;
		if(!match){
			method === 'style' ? _this.removeStyles() : _this.removeClasses(i,follow);
			method === 'style' ? _this.setStylesAt(i, follow) : _this.setClassesAt(i, follow);
			if(i !== _this.s.last_story_index && i !== -1){
				el = (method === 'style' ? _this.stories[i].parent() : _this.stories[i]).eq(0)
				var attempts = 0;
				while(attempts < 100 && el && !(id = el.attr('id'))){
					el = el.prev();
					attempts++;
				}
				if(id)
					_this.push_hash('#' + id, i)
			}
		}
		_this.s.last_story_index = i;
		_this.s.follow = follow;
	};
	this.push_hash = function(hash,i){
		clearTimeout(_this.hash_debounce)
		_this.hash_debounce = setTimeout(function(){
			hash = hash.replace( /^#/, '' );
			_this.replace_hash(hash);
			if(_this.stories[i]){
				_this.stories[i].find('h2').animate({ opacity: 0},{
					duration: 200,
					easing: 'easeInOutSine',
					complete: function(){
						_this.stories[i].addClass('delayed')
						$(this).animate({opacity: 1}, { duration: 500, easing: 'easeInOutSine'});
					}
				});
			}
			_gaq.push(['_trackPageview', hash]);
			_this.trigger_ui(hash);
		}, 150);
	}
	this.replace_hash = function (hash){
		var fx, node = $( '#' + hash );
		if ( node.length ) {
		  fx = $( '<div></div>' ).css({
			  position:'absolute',
			  visibility:'hidden',
			  top: _this.scrollY() + 'px'
		  })
		  .attr( 'id', hash )
		  .appendTo( document.body );
		  node.attr( 'id', '' );
		}
		document.location.hash = hash;
		if ( node.length ) {
		  fx.remove();
		  node.attr( 'id', hash );
		}
	}
	this.removeStyles = function(){
		i = _this.s.last_story_index;
		if(i === false || i === -1){
			return;
		}
		_this.stories[i].css({
			position: 'absolute',
			top: '0',
			bottom: 'auto'
		});
	};
	this.removeClasses = function(i, follow){
		if((follow && i !=  _this.s.last_story_index) || i < _this.s.last_story_index){
			$('.story').removeClass('delayed');
		}
		if(i < 0){
			_this.startMenuHint();
			// Lazily remove the current tag when hitting the top
			setTimeout(function(){
				$('header li').removeClass('active');
				_this.replace_hash('main-menu')
			}, 500);
		}
		i = _this.s.last_story_index;
		if(i === false || i === -1){
			return;
		}

		_this.stories[i].removeClass(_this.classes.fixed);
		_this.stories[i].removeClass(_this.classes.bottom);
	};
	// start the menu hint timer, and set up menu items to stop it if they're hovered
	this.initMenu = function(){
		_this.startMenuHint();
		$('.menu-item').hover(_this.clearMenuHint,function(){
			_this.startMenuHint(6000);
		});
	}
	this.startMenuHint = function(delay){
		_this.clearMenuHint();
		_this.menuHintTimeout = setTimeout(function(){
			hint = $('#main-menu .hint');
			hint.animate({ opacity: 0.8 }, { duraction: 300, easing: 'easeInOutSine'  }).delay(1500).animate({ opacity: 0 }, { duraction: 300, easing: 'easeInOutSine' } );
		}, delay || 4000);
	}
	this.clearMenuHint = function(){
		clearTimeout(_this.menuHintTimeout);
	}
	this.setStylesAt = function(i, follow){
		if(i === -1) return;
		if(follow)
			_this.stories[i].css({
				position: 'fixed',
				top: 0,
				bottom: 'auto'
			});
		else
			_this.stories[i].css({
				position: 'absolute',
				top: 'auto',
				bottom: 0
			});
	};
	this.setClassesAt = function(i, follow){
		if(i === -1) return;
		_this.stories[i].addClass(follow ? _this.classes.fixed : _this.classes.bottom);
	};
	this.trigger_ui = function(ui){
		log("Triggering " + ui);
		switch(ui.replace('#','')){
		case 'contact':
			this.init_contact();
			break;
		}
		$('header li').removeClass('active');
		$('header a[href=#' + ui.replace('#','') + ']').parent('li').addClass('active');
	};
	this.prepareContact = function(){
		if(!Modernizr.inputtypes.range){
			$('body').addClass('no-input-range');
		}
		_this.booking = new Booking;
		_this.booking.init();
	}
	this.init_contact = function(){
		if(_this.contact) return;
		_this.contact = new Contact();
		_this.contact.init();
	}
}

