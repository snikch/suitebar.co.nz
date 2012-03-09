function Scroll(){
	var _this = this;
	this.s = {
		last_story_index: false,
		follow: false,
		num_stories: 0,
		window_height: false,
		stories: ["about-1", "about-2", "cocktail-1", "cocktail-2", "white-wine", "red-wine", "beer-1", "whiskey", "gin", "vodka", "bitter", "tequila", "bourbon", "cognac", "rum"]
	};
	this.classes = {
		prev: 'prev',
		current: 'current',
		bottom: 'bottom',
		fixed: 'fixed',
		next: 'next'
	};
	this.prepare = function(){
		_this.init_stories();
		_this.scroll_to_hash();
		_this.handle_hash_links();
		_this.menu_preparations();
	};
	this.init = function(){
		_this.stories = [];
		_this.set_positions();
		_this.s.num_stories = _this.stories.length;
		$(window).scroll(_this.scrollHandler);
		$(window).resize(_this.resizeHandler);

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
		$('.story').each(function(){
			_this.story_positions.push(_this.offsetTop(this));
			if(method === 'style')
				_this.stories.push($(this).find('.visual'));
			else
				_this.stories.push($(this));
		});
	};
	this.init_stories = function(){
		$('.story').each(function(i){
			story = $(this);
			story.css({zIndex: i+70})
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

		for(var i=0,j=_this.s.num_stories;i<j;i++){
			pos = _this.story_positions[i];
			if(y >= pos) continue;
			i--;
			follow = y <= pos - _this.s.window_height;
			break;
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
			}, 500);
		}
		i = _this.s.last_story_index;
		if(i === false || i === -1){
			return;
		}

		_this.stories[i].removeClass(_this.classes.fixed);
		_this.stories[i].removeClass(_this.classes.bottom);
	};
	this.startMenuHint = function(){
		_this.clearMenuHint();
		_this.menuHintTimeout = setTimeout(function(){
			log("HINT!");
			hint = $('#main-menu .hint');
			hint.animate({ opacity: 0.5 }, { duraction: 300, easing: 'easeInOutSine'  }).delay(1000).animate({ opacity: 0 }, { duraction: 300, easing: 'easeInOutSine' } );

		}, 3000);
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
	this.init_contact = function(){
		if(_this.contact) return;
		_this.contact = new Contact();
		_this.contact.init();

	}
}

