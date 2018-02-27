// Script for type animation on text
// Adapted from codyhouse :
//      - article: https://codyhouse.co/gem/css-animated-headlines/
//      - terms: https://codyhouse.co/terms/

var textTypeAnimation = (function() {

    //set default animation timing
    var animationDelay = 1000,
        //type effect
        typeLettersDelay = 100,
        selectionDuration = 200,
        typeAnimationDelay = selectionDuration + 300,
		headlineSelector = '.headline-type-animation';

    function initHeadline() {
		//insert <i> element for each letter of a changing word
		singleLetters($(headlineSelector).find('b'));
		//initialise headline animation
		animateHeadline($(headlineSelector));
	}

	function singleLetters($words) {
		$words.each(function(){
			var word = $(this),
				letters = word.text().split(''),
				selected = word.hasClass('is-visible');
			for (i in letters) {
				if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
				letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
			}
		    var newLetters = letters.join('');
		    word.html(newLetters).css('opacity', 1);
		});
	}

	function animateHeadline($headlines) {
		var duration = animationDelay;
		$headlines.each(function(){
			var headline = $(this);

			//trigger animation
			setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
		});
	}

	function hideWord($word) {
		var nextWord = takeNext($word);

		var parentSpan = $word.parent('.headline-text-list');
		parentSpan.addClass('selected').removeClass('waiting');
		setTimeout(function(){
			parentSpan.removeClass('selected');
			$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
		}, selectionDuration);
		setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
	}

	function showWord($word, $duration) {
		showLetter($word.find('i').eq(0), $word, false, $duration);
		$word.addClass('is-visible').removeClass('is-hidden');
	}

	function hideLetter($letter, $word, $bool, $duration) {
		$letter.removeClass('in').addClass('out');

		if(!$letter.is(':last-child')) {
		 	setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else if($bool) {
		 	setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
		}

		if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
		}
	}

	function showLetter($letter, $word, $bool, $duration) {
		$letter.addClass('in').removeClass('out');

		if(!$letter.is(':last-child')) {
			setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
		} else {
            setTimeout(function(){ $word.parents('.headline-text-list').addClass('waiting'); }, 200);
			if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
		}
	}

	function takeNext($word) {
		return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
	}

	function takePrev($word) {
		return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
	}

	function switchWord($oldWord, $newWord) {
		$oldWord.removeClass('is-visible').addClass('is-hidden');
		$newWord.removeClass('is-hidden').addClass('is-visible');
	}

    function initAnimation(selector, delay) {
        headlineSelector = selector;
        animationDelay = delay;
        initHeadline();
    }

    return {
        init: initAnimation
    };
})();