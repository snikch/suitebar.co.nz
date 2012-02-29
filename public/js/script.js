/* Author:

*/
$(function(){
	if(window.location.href.indexOf('scroll=true') != -1)
		$("nav a, .menu-item, header a").click(function(e) {
			e.preventDefault();
			var hash = $(this).attr('href');
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			},{
				duration: 300,
				easing: 'easeInOutSine',
				complete: function(){
					location.hash = hash
				}
			});
		});
	/* Handle cocktails / music z-index */
	$('.menu-cocktails').hover(function(){
		$(this).css('z-index', 76);
	}, function(){
		$(this).css('z-index', 74);
	});
});
$.extend($.easing,
{
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }
});

