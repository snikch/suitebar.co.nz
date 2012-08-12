var ImageLoader = function(){
	var _this = this;
	//var asset_path = "/assets/images";
	var asset_path = (SuiteEnv.dev() ? "" : "/suitebar") + "/assets/images";
	this.image_groups = {
		index: {
			'#main-menu': '/b/index.jpg',
			'.menu-spirits': '/m/spirits-mask.png',
			'.menu-cocktails': '/m/cocktails-mask.png',
			'.menu-food': '/m/food-mask.png',
			'.menu-beer': '/m/beer-mask.png',
			'.menu-wine': '/m/wine-mask.png',
			//'.menu-music': '/m/music-mask.png',
			'.menu-awards': '/m/awards-mask.png',
			'.menu-people': '/m/people-mask.png'
		},
		visuals_high_res: {
			'.about-2 .visual': '/b/about-1.jpg',
			'.cocktail-1 .visual': '/b/cocktails-2.jpg',
			'.cocktail-2 .visual': '/b/cocktails-1.jpg',
			'.white-wine .visual': '/b/wine-white.jpg',
			'.red-wine .visual': '/b/wine-red.jpg',
			'.beer-1 .visual': '/b/beer.jpg',
			'.whiskey .visual': '/b/whiskey.jpg',
			'.gin .visual': '/b/gin.jpg',
			'.bitter .visual': '/b/bitter.jpg',
			'.vodka .visual': '/b/vodka.jpg',
			'.tequila .visual': '/b/tequila.jpg',
			'.bourbon .visual': '/b/bourbon.jpg',
			'.cognac .visual': '/b/cognac.jpg',
			'.food .visual': '/b/food-2.jpg',
			'.awards .visual': '/b/awards.jpg',
			'.rum .visual': '/b/rum.jpg',
			'.people .visual': '/b/people.jpg',
			'.bookings .visual': '/b/bookings.jpg'
		},
		visuals_low_res: {
			'.about-2 .visual': '/b/low/about-1.jpg',
			'.cocktail-1 .visual': '/b/low/cocktails-2.jpg',
			'.cocktail-2 .visual': '/b/low/cocktails-1.jpg',
			'.white-wine .visual': '/b/low/wine-white.jpg',
			'.red-wine .visual': '/b/low/wine-red.jpg',
			'.beer-1 .visual': '/b/low/beer.jpg',
			'.whiskey .visual': '/b/low/whiskey.jpg',
			'.gin .visual': '/b/low/gin.jpg',
			'.bitter .visual': '/b/low/bitter.jpg',
			'.vodka .visual': '/b/low/vodka.jpg',
			'.tequila .visual': '/b/low/tequila.jpg',
			'.bourbon .visual': '/b/low/bourbon.jpg',
			'.cognac .visual': '/b/low/cognac.jpg',
			'.food .visual': '/b/low/food-2.jpg',
			'.awards .visual': '/b/low/awards.jpg',
			'.rum .visual': '/b/low/rum.jpg',
			'.people .visual': '/b/low/people.jpg',
			'.bookings .visual': '/b/low/bookings.jpg'
		}
	}
	this.loadGroup = function(group, complete_callback, item_callback){
		log("Loading group " + group);
		image_group = _this.image_groups[group];
		$.each(image_group,function(k,v){
			image_group[k] = asset_path + v;
		});
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
						log("Group loaded " + group)
						if(complete_callback) complete_callback(image_group);
					}
				}
			}
			img.src = source
		}
		selectors = [];
		sources = [];
		$.each(_this.image_groups[group], function(k,v){
			selectors.push(k)
			sources.push(v);
		});
		for(i=0; i<cache_size;i++){
			queue(selectors.shift(), sources.shift(), new Image());
		}
	}

}

