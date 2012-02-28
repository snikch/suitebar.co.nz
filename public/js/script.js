/* Author:

*/
$(function(){
	$("nav a, .menu-item, header a").click(function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 300, 'easeInOutSine');
	});
	/* Handle cocktails / music z-index */
	$('.menu-cocktails').hover(function(){
		$(this).css('z-index', 76);
	}, function(){
		$(this).css('z-index', 74);
	});
});

/*var suite_setup = suite_setup || {}
suite = new engine(suite_setup);
suite.init();
$(window).resize(function(){ suite.resize(); })

*/

$.extend($.easing,
{
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
});

