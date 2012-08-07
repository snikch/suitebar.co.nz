var ImageLoader = function(){
	var _this = this;
	this.saved_groups = {};
	var image_groups = {
		index: {
			'#main-menu': '/assets/images/b/index.jpg',
			'.menu-spirits': '/assets/images/m/spirits-mask.png',
			'.menu-cocktails': '/assets/images/m/cocktails-mask.png',
			'.menu-food': '/assets/images/m/food-mask.png',
			'.menu-beer': '/assets/images/m/beer-mask.png',
			'.menu-wine': '/assets/images/m/wine-mask.png',
			'.menu-music': '/assets/images/m/music-mask.png',
			'.menu-awards': '/assets/images/m/awards-mask.png',
			'.menu-people': '/assets/images/m/people-mask.png'
		},
		visuals_high_res: {
			'.about-2 .visual': '/assets/images/b/about-1.jpg',
			'.cocktail-1 .visual': '/assets/images/b/cocktails-2.jpg',
			'.cocktail-2 .visual': '/assets/images/b/cocktails-1.jpg',
			'.white-wine .visual': '/assets/images/b/wine-white.jpg',
			'.red-wine .visual': '/assets/images/b/wine-red.jpg',
			'.beer-1 .visual': '/assets/images/b/beer.jpg',
			'.whiskey .visual': '/assets/images/b/whiskey.jpg',
			'.gin .visual': '/assets/images/b/gin.jpg',
			'.bitter .visual': '/assets/images/b/bitter.jpg',
			'.vodka .visual': '/assets/images/b/vodka.jpg',
			'.tequila .visual': '/assets/images/b/tequila.jpg',
			'.bourbon .visual': '/assets/images/b/bourbon.jpg',
			'.cognac .visual': '/assets/images/b/cognac.jpg',
			'.food .visual': '/assets/images/b/food-2.jpg',
			'.awards .visual': '/assets/images/b/awards.jpg',
			'.rum .visual': '/assets/images/b/rum.jpg',
			'.people .visual': '/assets/images/b/people.jpg',
			'.bookings .visual': '/assets/images/b/bookings.jpg'
		},
		visuals_low_res: {
			'.about-2 .visual': '/assets/images/b/low/about-1.jpg',
			'.cocktail-1 .visual': '/assets/images/b/low/cocktails-2.jpg',
			'.cocktail-2 .visual': '/assets/images/b/cocktails-1.jpg',
			'.white-wine .visual': '/assets/images/b/wine-white.jpg',
			'.red-wine .visual': '/assets/images/b/wine-red.jpg',
			'.beer-1 .visual': '/assets/images/b/beer.jpg',
			'.whiskey .visual': '/assets/images/b/low/whiskey.jpg',
			'.gin .visual': '/assets/images/b/low/gin.jpg',
			'.bitter .visual': '/assets/images/b/low/bitter.jpg',
			'.vodka .visual': '/assets/images/b/vodka.jpg',
			'.tequila .visual': '/assets/images/b/low/tequila.jpg',
			'.bourbon .visual': '/assets/images/b/low/bourbon.jpg',
			'.cognac .visual': '/assets/images/b/low/cognac.jpg',
			'.food .visual': '/assets/images/b/food-2.jpg',
			'.awards .visual': '/assets/images/b/awards.jpg',
			'.rum .visual': '/assets/images/b/low/rum.jpg',
			'.people .visual': '/assets/images/b/people.jpg',
			'.bookings .visual': '/assets/images/b/bookings.jpg'
		}
	}
	this.loadGroup = function(group, complete_callback, item_callback){
		log("Loading group " + group);
		var imgs = {}, togo=0;
		_this.saved_groups[group] = imgs
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
			img.rel = k;
			img.onload = loaded;
			img.src = v;
			imgs[k] = img;
			togo++;
		});
	}

}

