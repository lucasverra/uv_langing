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

				if($("#subscribe")) {
					$('.sentForm').click(function(ev){
						ev.preventDefault();
						ev.stopPropagation();
						ajaxSubmit();
					});
				}
				$(window).scroll( function(){
    
			        /* Check the location of each desired element */
			        $('.feature').each( function(i){
			            console.log($(this));
			            var bottom_of_object = $(this).position().top + $(this).outerHeight();
			            var bottom_of_window = $(window).scrollTop() + $(window).height();
			            
			            /* If the object is completely visible in the window, fade it it */
			            if( bottom_of_window > bottom_of_object ){
			                
			                $(this).addClass('active');
			                    
			            }
			            
			        }); 
			    
			    });




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
	function ajaxSubmit() {
		var form = $('#subscribe');
		// var data = {
			// 'email' : $('.email').val(),
		// 	// 'name': $('.name').val(),
		// 	// 'verbose': $('.message').val(),
		// };
		var email = $('.email').val();
		var name = $('.name').val();
		var verbose = $('.message').val();
		$.ajax({
			url:'https://mlite-subscribe-8d7ad3er7vt6.runkit.sh/subscribe/'+email+','+name+','+verbose,
			method:'GET',
			// data: form.serialize(),
			dataType: 'json',
			beforeSend: function(ter) {
				console.log('request is',ter);
				console.log('tested bineesh');
				$('.loader').removeClass('hide');
				$('.sentForm').addClass('hide');
			},
			success: function(res) {
				console.log('complete',res);
			},
            error:function () {
            	console.log('res',XMLHttpRequest);	
            }
			
		});
	}
})(jQuery);