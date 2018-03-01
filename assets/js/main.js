/*
	Directive by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)',
		mobilep: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});
			$(document).ready(function() {
				console.log('fire ready');
				languageSelector();
				textTypeAnimation.init('#test-data', 1000);
				textTypeAnimation.init('#test-info', 1000);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});
	});
	function languageSelector() {
		var isFirst = true;
		$('.language-selector span').click(function() {
			if(isFirst) {
				$('.language-selector ul').addClass('active');
				isFirst = false;
			}
			else {
				$('.language-selector ul').removeClass('active');
				isFirst = true;
			}	
		});
		$('.language-selector ul li').each(function() {
			$(this).find('a').click(function(ev){
				ev.preventDefault();
				var getvalue = $(this).parent().attr('data-nav');
				if(getvalue == 'FR') {
					$(document.body).removeClass('UK').addClass(getvalue);
				} else {
					$(document.body).removeClass('FR').addClass(getvalue);
				}

				$('.language-selector ul').removeClass('active');
				$('.language-selector span').text(getvalue);
			});
		});
	}
})(jQuery);