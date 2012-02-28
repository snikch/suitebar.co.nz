/* Author:

*/
function Scroll(){
	var _this = this;
	this.s = {
		last_story_index: false,
		follow: false,
		num_stories: 0,
		window_height: false
	};
	this.classes = {
		prev: 'prev',
		current: 'current',
		bottom: 'bottom',
		fixed: 'fixed',
		next: 'next'
	};
	this.init = function(){
		_this.stories = [];
		_this.story_positions = [];
		$('.story').each(function(){
			_this.story_positions.push(_this.offsetTop(this));
			_this.stories.push($(this));
		});
		console.log(this.stories);
		_this.s.num_stories = _this.stories.length;
		_this.s.window_height = _this.windowY();
		console.log(_this.s.window_height);
		$(window).scroll(_this.scrollHandler);

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
	this.scrollHandler = function(){
		story_index = 0;
		y = _this.scrollY();
		for(var i=0,j=_this.s.num_stories;i<j;i++){
			pos = _this.story_positions[i];
			if(y > pos) continue;
			i--;
			follow = y < pos - _this.s.window_height;
			break;
		}
		if((i === _this.s.last_story_index && follow === _this.s.follow) || i === -1) return;
		_this.removeClasses();
		_this.setClassesAt(i, follow);
	};
	this.removeClasses = function(){
		i = _this.s.last_story_index;
		if(i === false) return;
		_this.stories[i].removeClass(_this.classes.fixed);
		_this.stories[i].removeClass(_this.classes.bottom);
	};
	this.setClassesAt = function(i, follow){
		_this.s.last_story_index = i;
		_this.s.follow = follow;
		_this.stories[i].addClass(_this.s.follow ? _this.classes.fixed : _this.classes.bottom);
	};
}

var follow = new Scroll();
function Load(){
	var _this = this;
	this.s = {
		stories: ["about-1", "about-2", "cocktail-1", "cocktail-2", "white-wine", "red-wine", "beer-1", "whiskey", "gin", "vodka", "bitter", "tequila", "bourbon", "cognac", "rum"]
	};
	this.init = function(){
		$('.story').each(function(){
			_this.init_node($(this));
		});
		$('.story .visual').css({ height: follow.windowY()})
	};
	this.init_node = function(story){
		console.log(_this.s.stories);
		$.each(_this.s.stories, function(k,v){
			if(!story.hasClass(v)) return true;
			story.prepend($('<div class="visual" />'));
			return true;
		});
	}
}
load = new Load();
load.init();
follow.init();

