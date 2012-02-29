/* Author:

*/
function Suite(){
	var _this = this, scroller = new Scroll(), bouncer = new Doorman(), loader = new ImageLoader();
	var spin_opts = {
	  lines: 16, // The number of lines to draw
	  length: 0, // The length of each line
	  width: 5, // The line thickness
	  radius: 18, // The radius of the inner circle
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
	this.load = function(){
		var target = $('#loading .spin');
		var spinner = new Spinner(spin_opts).spin(target.get(0));
		loader.loadGroup('index', _this.menu_preloaded);
		setTimeout(function(){
			bouncer.verify_age(function(){
				scroller.init();
			});
		}, 700);
	};
	this.menu_preloaded = function(imgs){
		console.log('loaded');
		$.each(imgs, function(k,v){
			_this.apply_image(k, v.src);
			log("loaded " + k + ' with ' + v.src)
		});
		loader.loadGroup('visuals_low_res',function(){
			loader.loadGroup('visuals_high_res', null, _this.high_visual_preloaded);
		},  _this.low_visual_preloaded);
		$('#loading-overlay').remove();
	}
	this.low_visual_preloaded = function(el){
		log('Loaded ' + el.rel);
		_this.apply_image(el.rel, el.src, { backgroundSize: 'cover '});
	};
	this.high_visual_preloaded = function(el){
		log('Loaded ' + el.rel);
		_this.apply_image(el.rel, el.src);
	};
	this.apply_image = function(selector, value, additional){
		var additional = additional || {}
		$(selector).css($.extend(additional, {
			backgroundImage: 'url(' + value + ')'
		}));
	}
}
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
	this.init = function(){
		_this.init_stories();
		_this.stories = [];
		_this.set_positions();
		_this.s.num_stories = _this.stories.length;
		$(window).scroll(_this.scrollHandler);
		$(window).resize(_this.resizeHandler);

	};
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
		$('.story').each(function(){
			story = $(this);
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
	method = 'style';
	this.scrollHandler = function(){
		story_index = 0;
		y = _this.scrollY();

		for(var i=0,j=_this.s.num_stories;i<j;i++){
			pos = _this.story_positions[i];
			if(y >= pos) continue;
			i--;
			follow = y <= pos - _this.s.window_height;
			break;
		}
		match = i === _this.s.last_story_index && follow === _this.s.follow;
		if(!match){
			method === 'style' ? _this.removeStyles() : _this.removeClasses();
			method === 'style' ? _this.setStylesAt(i, follow) : _this.setClassesAt(i, follow);
		}
		_this.s.last_story_index = i;
		_this.s.follow = follow;
	};
	this.removeStyles = function(){
		i = _this.s.last_story_index;
		if(i === false || i === -1) return;
		_this.stories[i].css({
			position: 'absolute',
			top: '0',
			bottom: 'auto'
		});
	};
	this.removeClasses = function(){
		i = _this.s.last_story_index;
		if(i === false || i === -1) return;
		_this.stories[i].removeClass(_this.classes.fixed);
		_this.stories[i].removeClass(_this.classes.bottom);
	};
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
}

var ImageLoader = function(){
	log("Created image loader")
	var _this = this;
	var image_groups = {
		index: {
			'#main-menu': '/img/b/index.jpg',
			'.menu-spirits': '/img/m/spirits-mask.png',
			'.menu-cocktails': '/img/m/cocktails-mask.png',
			'.menu-food': '/img/m/food-mask.png',
			'.menu-beer': '/img/m/beer-mask.png',
			'.menu-wine': '/img/m/wine-mask.png',
			'.menu-music': '/img/m/music-mask.png',
			'.menu-awards': '/img/m/awards-mask.png',
			'.menu-people': '/img/m/people-mask.png'
		},
		visuals_high_res: {
			'.about-2 .visual': '/img/b/about-1.jpg',
			'.cocktail-1 .visual': '/img/b/cocktails-2.jpg',
			'.cocktail-2 .visual': '/img/b/wine-1.jpg',
			'.white-wine .visual': '/img/b/white-wine.jpg',
			'.red-wine .visual': '/img/b/red-wine.jpg',
			'.beer-1 .visual': '/img/b/beer-1.jpg',
			'.whiskey .visual': '/img/b/whiskey.jpg',
			'.gin .visual': '/img/b/gin.jpg',
			'.vodka .visual': '/img/b/gin.jpg',
			'.bitter .visual': '/img/b/bitter.jpg',
			'.tequila .visual': '/img/b/tequila.jpg',
			'.bourbon .visual': '/img/b/bourbon.jpg',
			'.cognac .visual': '/img/b/cognac.jpg',
			'.rum .visual': '/img/b/rum.jpg'
		},
		visuals_low_res: {
			'.about-2 .visual': '/img/b/low/about-1.jpg',
			'.cocktail-1 .visual': '/img/b/low/cocktails-2.jpg',
			'.cocktail-2 .visual': '/img/b/low/wine-1.jpg',
			'.white-wine .visual': '/img/b/low/white-wine.jpg',
			'.red-wine .visual': '/img/b/low/red-wine.jpg',
			'.beer-1 .visual': '/img/b/low/beer-1.jpg',
			'.whiskey .visual': '/img/b/low/whiskey.jpg',
			'.gin .visual': '/img/b/low/gin.jpg',
			'.vodka .visual': '/img/b/low/gin.jpg',
			'.bitter .visual': '/img/b/low/bitter.jpg',
			'.tequila .visual': '/img/b/low/tequila.jpg',
			'.bourbon .visual': '/img/b/low/bourbon.jpg',
			'.cognac .visual': '/img/b/low/cognac.jpg',
			'.rum .visual': '/img/b/low/rum.jpg'
		}
	}
	this.loadGroup = function(group, complete_callback, item_callback){
		log("Loading group " + group);
		var imgs = {}, togo=0;
		var loaded = function(){
			togo--;
			log('Loaded image ' + this.src + ', ' + togo + ' left');
			if(item_callback) item_callback(this);
			if(togo <= 0){
				log("Group loaded");
				if(complete_callback) complete_callback(imgs);
			}
		}
		$.each(image_groups[group], function(k,v){
			img = new Image();
			img.src = v;
			img.rel = k;
			$(img).load(loaded);
			imgs[k] = img;
			togo++;
		});
	}

}
