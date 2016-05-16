const clipboard = require('electron').clipboard;
window.$ = window.jQuery = require('./js/jquery');

jQuery(document).ready(function($) {

    var convertToEmbed = function(val){

		var _url = val;
		if(val.indexOf('https://open.spotify.com') == 0)
		{
			var regexTrack = /https:\/\/open.spotify.com\/track\/(.*)/;
			var matches = val.match(regexTrack);

			_url = 'spotify:track:' + matches[1];
		}
		var embed_url = 'https://embed.spotify.com/openspotify/?spuri=' + _url + '&closedelay=5000';
		return embed_url;
	}

	var handleClick = function handleClick(e) {

        var $this = $(this);
        var embed = convertToEmbed( clipboard.readText() );

		if($(this).hasClass('copy'))
		{
			clipboard.writeText(embed);
            $this.text('copied!');
            setTimeout(function(){
                $this.text('copy to clipboard');
            }, 1000);
		}
		else
		{
            $('iframe').attr('src', embed);
		}

		e.preventDefault();
	};
	$('.btn').on('click', handleClick);

});
