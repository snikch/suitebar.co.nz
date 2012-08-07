var ImageLoader = function(){
	var _this = this;
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
			'.cocktail-2 .visual': '/assets/images/b/low/cocktails-1.jpg',
			'.white-wine .visual': '/assets/images/b/low/wine-white.jpg',
			'.red-wine .visual': '/assets/images/b/low/wine-red.jpg',
			'.beer-1 .visual': '/assets/images/b/low/beer.jpg',
			'.whiskey .visual': '/assets/images/b/low/whiskey.jpg',
			'.gin .visual': '/assets/images/b/low/gin.jpg',
			'.bitter .visual': '/assets/images/b/low/bitter.jpg',
			'.vodka .visual': '/assets/images/b/low/vodka.jpg',
			'.tequila .visual': '/assets/images/b/low/tequila.jpg',
			'.bourbon .visual': '/assets/images/b/low/bourbon.jpg',
			'.cognac .visual': '/assets/images/b/low/cognac.jpg',
			'.food .visual': '/assets/images/b/low/food-2.jpg',
			'.awards .visual': '/assets/images/b/low/awards.jpg',
			'.rum .visual': '/assets/images/b/low/rum.jpg',
			'.people .visual': '/assets/images/b/low/people.jpg',
			'.bookings .visual': '/assets/images/b/low/bookings.jpg'
		}
	}
	this.loadGroup = function(group, complete_callback, item_callback){
		log("Loading group " + group);
		var cache_size = 4, complete = 0;
		var queue = function(selector, source, cache){
			img = cache;
			img.rel = selector
			img.onload = function(){
				if(item_callback) item_callback(selector, source);
				if(selectors.length > 0){
					cache = null;
					queue(selectors.shift(), sources.shift(), new Image());
				}else{
					complete++;
					if(complete == cache_size){
						log("Group loaded")
						if(complete_callback) complete_callback(image_groups[group]);
					}
				}
			}
			img.src = source
		}
		selectors = [];
		sources = [];
		$.each(image_groups[group], function(k,v){
			selectors.push(k)
			sources.push(v);
		});
		console.log(image_groups[group]);
		console.log(selectors);
		console.log(sources);
		for(i=0; i<cache_size;i++){
			queue(selectors.shift(), sources.shift(), new Image());
		}
	}

}

