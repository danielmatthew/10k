$(document).ready(function(){
		var getTrending = function(){
		     var akey = 'b8df9a60e079274d5a6dfb9974ed5b05'; //your api key
		     // Get the JSON URL
		     var lfmurl = 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=12&api_key=' + akey + '&format=json&callback=?';
	              
	         //Now get the Data
	         $.getJSON(lfmurl, function(data){
	         
	         	if(data.tracks.track.length > 0){
	                 $.each(data.tracks.track, function(index, item){
	                 	var number = index + 1;
	                 	if( item.image && item.image[3] && item.image[3]['#text'] ) { 
						    var txt = item.image[3]['#text']; 
						} else { 
						    var txt = ''; 
						}
	                 	$('.lastfm').append('<li class="recordInfo"><img class="recordLabel" src="' + txt + '"><span class="vinyl"></span></img></li>');	
	                 });
	             }
	         });
         }
         
         getTrending();
         
         var getFriends = function(){
         		 // Set some vars
                 var user = $('#userName').val(); //the user you want to follow
                 if(user == ''){
                 	$('.message').text('Erm…this is awkward, you forgot to type something');
                 } else {
	                 var akey = 'b8df9a60e079274d5a6dfb9974ed5b05'; //your api key
	                 // Get the JSON URL
	                 var lfmurl = 'http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&user=' + user + '&api_key=' + akey + '&format=json&callback=?';
	              
			         //Now get the Data
			         $.getJSON(lfmurl, function(data){
			         console.log(data);
				         if(data.message != 'No user with that name was found'){
				         	$('.lastfm').empty();
			                $.each(data.toptracks.track, function(index, item){
			                	var number = index + 1;
			                	if( item.image && item.image[3] && item.image[3]['#text'] ) { 
								    var txt = item.image[3]['#text']; 
								} else { 
								    var txt = ''; 
								}
			                	
			                	$('.lastfm').append('<figure class="clearfix"><span class="recordNo">#'+number+'</span><a class="trackName" href="'+item.url+'">'+item.name+'</a><p class="artistName">'+item.artist.name+'</p><div class="vinyl"><img class="recordLabel" src="' + txt + '" /></div></figure>');
			                	
			                });
			             } else {
			             	$('.message').text('Sorry: we\'ve found no-one by that name!');
			             }
			         });
		         }
		         
		         return false;
         }
         
         $('#submit').click(getFriends);
		 $('#userName').keyup(function(event){
		    if(event.keyCode == 13){
		        getFriends();
		    }
		 });
		 
		 $('#userName').keydown(function(){
		 	$('.message').empty();
		 });
		 
});