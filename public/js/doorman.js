/* Author:

*/
function doorman(){
	var is_verified = function(){
		return !!$.cookie('age_verified');
	};
	var is_vip = function(){
		var identifiers = ['google','googlebot','livebot','msnbot','facebookscraper','facebookexternalhit','ask jeeves'];
		return navigator.userAgent.match(new RegExp('(' + identifiers.join(')|(') + ')', 'i')) !== null;
	};
	this.verify_age = function(){
		if(is_verified() || is_vip()) return;
		this.ask_for_id();
	};
	this.ask_for_id = function(){
		var i_dont_think_so = this.i_dont_think_so, remember = this.remember_for_later;
		$.modal('<img src="/img/bouncer.png" /><h1>Have You Come Of Age Yet?</h1><div class="options"><a href="#" class="simplemodal-close btn">Yes</a><a href="#" class="no btn">No</a></div>', {
			opacity: 100,
			onClose: function (dialog) {
				dialog.container.fadeOut('slow', function () {
					dialog.overlay.slideUp('slow', function () {
						$.modal.close();
						remember();
					});
				});
			},
			onShow: function(dialog){
				$('#simplemodal-container .no').click(i_dont_think_so);
			}
		});
	};
	this.remember_for_later = function(){
		$.cookie('age_verified', true);
	};
	this.i_dont_think_so = function(e){
		e.preventDefault();
		window.location.href = "http://www.google.co.nz/search?q=virgin+cocktails";
	};
}
bouncer = new doorman();
bouncer.verify_age();

