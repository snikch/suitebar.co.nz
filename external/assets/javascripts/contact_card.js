var CardToCall = function(selector){
	var _this = this, browser = '', container = $(selector);
	var card = $('#card_to_call');

	function initializePageEffects() {

		if (navigator.appVersion.indexOf('Mac') < 0)
		{
			isMacOS = false;
		}

		if (navigator.appVersion.indexOf('iPhone') > -1 ||
			navigator.appVersion.indexOf('iPod') > -1 ||
			navigator.appVersion.indexOf('iPad') > -1)
		{
			isTouchDevice = true;
			document.body.className += ' touch';
			document.getElementById('downloadButton').onmouseover = download;
		}

		if (navigator.appVersion.indexOf('WebKit') > -1)
		{

			// Look for backface-visibility compatibility. Requires newest WebKit.

			if ((window.media && window.media.matchMedium('(-webkit-transform-3d)')) || (window.styleMedia && window.styleMedia.matchMedium('-webkit-transform-3d')))
			{
				document.body.className += ' browserWebKit';
				browser = 'webkit';
			}
			else
			{
				document.body.className += ' browserOldWebkit';
				browser = 'oldWebkit';
			}

		}
		else
		{
			document.body.className += ' browserOther';
			browser = 'other';
		}

	}

	_this.flip = function(evt)
	{
		evt.preventDefault();
		card.toggleClass('flipped');
		return;

		var element = document.getElementById('featuresCard');
		var button = this

		if (testShift(evt)) {
			document.getElementById('featuresCard').style.webkitTransitionDuration = '3s';
			flipMidpoint = 900;
		} else {
			document.getElementById('featuresCard').style.webkitTransitionDuration = '1s';
			flipMidpoint = 300;
		}

		if (element.className == '') // Screenshot is showing. Hide it, show list
		{
			hideAllEffects();

			if (browser == 'oldWebkit') // WebKit 4.0.5 Snow Leopard supports backface, Leopard doesn't, sigh. Let's change views on a timer and not reply on backface-visibility
			{
				setTimeout("document.getElementById('featuresList').style.display = 'block'", flipMidpoint);
				setTimeout("document.getElementById('featuresScreenshots').style.display = 'none'", flipMidpoint);
			}
			else if (browser == 'other') // Other browsers don't transition at all, so we just show/hide.
			{
				document.getElementById('featuresList').style.display = 'block';
				document.getElementById('featuresScreenshots').style.display = 'none';
			}
		}
		else // List is showing. Hide it, show screenshot
		{	                                           // show the right screenshot when we flip //
			setTimeout("document.getElementById('featuresEffects" + swappedView + "').style.display = 'block'", (flipMidpoint * 2));
			if (browser == 'oldWebkit')
			{
				setTimeout("document.getElementById('featuresList').style.display = 'none'", flipMidpoint);
				setTimeout("document.getElementById('featuresScreenshots').style.display = 'block'", flipMidpoint);
			}
			else if (browser == 'other')
			{
				document.getElementById('featuresList').style.display = 'none';
				document.getElementById('featuresScreenshots').style.display = 'block';
			}
		}

		// As "newest" WebKit supports backface visibility, this is all that will be executed on there.

		element.className = (element.className == '') ? 'card flipped' : '';
		button.className = (button.className == '') ? 'pressed' : '';
	}
	function testShift(evt) {
		var shift = false;
		if (! evt && window.event) {
			shift = window.event.shiftKey;
		} else if (evt) {
			shift = evt.shiftKey;
			if (shift) evt.stopPropagation(); // Prevents Firefox from doing shifty things
		}
		return shift;
	}

}
