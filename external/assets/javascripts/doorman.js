/* Author:

*/
function Doorman(){
	var is_verified = function(){
		return !!$.cookie('age_verified');
	};
	var is_vip = function(){
		var identifiers = ['google','googlebot','livebot','msnbot','facebookscraper','facebookexternalhit','ask jeeves'];
		return navigator.userAgent.match(new RegExp('(' + identifiers.join(')|(') + ')', 'i')) !== null;
	};
	this.verify_age = function(callback){
		log("verifying age")
		if(true | is_verified() || is_vip()){
			log("is verified")
			$('#bouncer-overlay').remove();
			log("removed overlay")
			if(callback) callback();
			log("returning")
			return;
		}
		return this.ask_for_id(callback);
	};
	this.ask_for_id = function(callback){
		var dialog = $('#bouncer-overlay'), _this = this;
		dialog.removeClass('disappear');
		$('#bouncer .y').click(function(e){
			e.preventDefault();
			_this.remember_for_later();
			if(callback) callback();
			dialog.addClass('disappear');
			setTimeout(function(){
				dialog.remove();
			}, 300);
		});
		$('#bouncer .n').click(this.i_dont_think_so);
	};
	this.remember_for_later = function(){
		$.cookie('age_verified', true);
	};
	this.i_dont_think_so = function(e){
		e.preventDefault();
		window.location.href = "http://www.google.co.nz/search?q=virgin+cocktails";
	};
}

