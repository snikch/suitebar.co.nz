/* Author:

*/
function Doorman(){
	var is_verified = function(){
		return false; !!$.cookie('age_verified');
	};
	var is_vip = function(){
		var identifiers = ['google','googlebot','livebot','msnbot','facebookscraper','facebookexternalhit','ask jeeves'];
		return navigator.userAgent.match(new RegExp('(' + identifiers.join(')|(') + ')', 'i')) !== null;
	};
	this.verify_age = function(){
		if(is_verified() || is_vip()) return $('#bouncer-overlay').remove();
		return this.ask_for_id();
	};
	this.ask_for_id = function(){
		var dialog = $('#bouncer-overlay'), _this = this;
		dialog.removeClass('disappear');
		$('#bouncer .y').click(function(){
			dialog.addClass('disappear');
			_this.remember_for_later();
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

