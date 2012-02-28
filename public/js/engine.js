/* Author:

*/
function suite(){
	var _this = this;
	this.s = {
		last_story_index: false,
		num_stories: 0,
		window_height: false
	};
	this.classes = {
		prev: 'prev',
		current: 'current',
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
		y = _this.scrollY()+_this.s.window_height;
		for(var i=0,j=_this.s.num_stories;i<j;i++){
			if(y > _this.story_positions[i]) continue;
			i--;
			break;
		}
		if(i === _this.s.last_story_index || i === -1) return;
		_this.removeClasses();
		_this.setClassesAt(i);
	};
	this.removeClasses = function(){
		i = _this.s.last_story_index;
		if(i === false) return;
		if(i > 1) _this.stories[i-1].removeClass(_this.classes.prev);
		if(i < _this.s.num_stories-1) _this.stories[i+1].removeClass(_this.classes.next);
		_this.stories[i].removeClass(_this.classes.current);
	}
	this.setClassesAt = function(i){
		_this.s.last_story_index = i
		if(i > 1) _this.stories[i-1].addClass(_this.classes.prev);
		if(i < _this.s.num_stories-1) _this.stories[i+1].addClass(_this.classes.next);
		_this.stories[i].addClass(_this.classes.current);
	};
}
site = new suite();
site.init();
function engine(setup){
	var s = {
		ratio: 2/3,
		max_h: 900,
		max_w: 1350,
		margin: 40,
		current_story: false,
		current_story_index: false,
		current_visual: false,
		current_visual_index: false,
		snapped: false,
		body: $('body')
	}
	this.init = function(){
		var m = $('#main'), v = $('<section class="visuals" />'), t = $('<section class="stories" />');
		console.log(setup);

		s.visuals = $('.visual');
		s.stories = $('.stories .story');
		this.resize();
		$(window).scroll(this.scroll_handler)
		this.scroll_handler();
	}
	this.resize = function(){
		this.size_visuals();
		this.size_stories();
	}
	this.size_visuals = function(){
		var win_h = $(window).height(), h = win_h;
		var win_w = $(window).width(), w = win_w;
		if(win_w > s.max_w) w = s.max_w;
		if(win_h > s.max_h) h = s.max_h;
		if(w * s.ratio > win_h)
			w = h / s.ratio
		else
			h = w * s.ratio

		s.cur_w = w;
		s.cur_h = h;
		s.cur_gap = win_h - h;
		var visuals_css = {
			width: w,
			height: h
		}

		s.story_positions = [0];
		s.story_heights = [];

		s.visuals.css(visuals_css).find('img, iframe').css(visuals_css).end().each(function(i){
			var story_h = s.stories.eq(i).height()
			var this_h =  s.cur_h + story_h +  s.margin+ s.cur_gap + 30;
			$(this).css({height: this_h })
			var prev_h = s.story_positions.length > 0 ? s.story_positions[s.story_positions.length-1] : 0

			s.story_positions.push( prev_h + this_h );
			s.story_heights.push(story_h);

		});
		$('#container').css({ width: w});

		console.log(s.story_positions)
		s.current_visual = s.visuals.eq(0).addClass('current');
		s.current_story = s.stories.eq(0).addClass('current');
		s.visuals.eq(1).addClass('next');
		s.stories.eq(1).addClass('next');
		// set an array of 'break points' to check against on scroll
	}
	this.size_stories = function(){
		s.stories.each(function(i){
			$this = $(this);
			$this.css({marginBottom: s.cur_h +s.cur_gap + s.margin })
		});
	}
	this.scroll_handler = function(e){
		var scroll_y = $(window).scrollTop();
		//console.log(scroll_y)

		var pos = 1;

		$.each(s.story_positions, function(k,v){
			if(s.story_positions[pos] > scroll_y ){
				return false;
			}
			pos++;
		})
		//console.log("In visual " + (pos-1));

		// Determine which visual block we're in, and update
		if(s.current_visual_index != pos-1){
			// New visual
			if(s.current_visual){
			   s.current_story.removeClass('current');
			   s.stories.eq(s.current_story_index+1).removeClass('next');
			   s.current_visual.removeClass('current');
			   s.visuals.eq(s.current_visual_index+1).removeClass('next');
			}
			s.current_story = s.stories.eq(pos-1);
			s.current_story_index = pos-1;
			s.current_story.addClass('current');
			s.stories.eq(pos).addClass('next');
			s.current_visual = s.visuals.eq(pos-1);
			s.current_visual_index = pos-1;
			s.current_visual.addClass('current');
			s.visuals.eq(pos).addClass('next');
		}

		//Determine if snap status
		if(scroll_y < s.story_positions[pos-1] + s.story_heights[pos-1] ){
			// block should be scrolling
			if(!s.snapped){
				s.body.addClass('snapped');
				s.snapped = true;
			}
			console.log(setup)
			if(setup.page == 'abou' && pos == 2){
				if(scroll_y - s.story_positions[pos-1] < s.story_heights[pos-1] / 3){
					s.visuals.eq(pos-1).find('img').attr('src',"img/b/bar_3_1.jpg");
				}else if(scroll_y - s.story_positions[pos-1] < (s.story_heights[pos-1]/3)*2){
					s.visuals.eq(pos-1).find('img').attr('src',"img/b/bar_3_2.jpg");

				}else{
					s.visuals.eq(pos-1).find('img').attr('src',"img/b/bar_3_3.jpg");

				}
			}
		}else{
			// block should be fixed
			if(s.snapped){
				s.body.removeClass('snapped');
				s.snapped = false;
			}
		}
	}
}

