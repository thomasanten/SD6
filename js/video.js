window.onload = function() {

	// Video
	var video = document.getElementById("bgvid");

	// Buttons
	var playButton = document.getElementById("play-pause"),
		muteButton = document.getElementById("mute"),
		fullScreenButton = document.getElementById("full-screen");

	// Sliders
	var seekBar = document.getElementById("seek-bar"),
		volumeBar = document.getElementById("volume-bar"),
		filterBar = document.getElementById("filter-bar");

	// Audio
	var videoSource = document.getElementById("bgvid"),
		context = new webkitAudioContext(),
		source = context.createMediaElementSource(videoSource),
		filter = context.createBiquadFilter();
		filter.type = 'lowpass';  // In this case it's a lowshelf filter
		filter.frequency.value = 500;
		source.connect(filter);
		filter.connect(context.destination);
	
	var status,
		currentId,
		statusId;
	
	// Popup!
	$(function() {
		$( "#dialog-message" ).dialog({
			width: '30rem',
			modal: true,
			dialogClass: 'no-close',
			buttons: {
				"Let's go": function() {
					statusId = 1;
					console.log(statusId);
					video.play();
					$( this ).dialog( "close" );
				}
			}
		});
	  });

	// Event listener for the play/pause button
	playButton.addEventListener("click", function() {
		if (video.paused == true) {
			// Play the video
			video.play();
			$('#play-pause').children('img').attr("src","img/assets/video-pause.png");
		} else {
			// Pause the video
			console.log('Pause Video');
			video.pause();
			$('#play-pause').children('img').attr("src","img/assets/video-play.png");
		}
	});

	// Event listener for the mute button
	muteButton.addEventListener("click", function() {
		if (video.muted == false) {
			// Mute the video
			video.muted = true;
			$('#mute').children('img').attr("src","img/assets/mute-on.png");
		} else {
			// Unmute the video
			video.muted = false;
			$('#mute').children('img').attr("src","img/assets/mute-off.png");
		}
	});

	// Event listener for the full-screen button
	fullScreenButton.addEventListener("click", function() {
		if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.mozRequestFullScreen) {
			video.mozRequestFullScreen(); // Firefox
		} else if (video.webkitRequestFullscreen) {
			video.webkitRequestFullscreen(); // Chrome and Safari
		}
	});

	// Event listener for the seek bar
	seekBar.addEventListener("change", function() {
		// Calculate the new time
		var time = video.duration * (seekBar.value / 100);

		// Update the video time
		video.currentTime = time;
	});
	
	// Update the seek bar as the video plays
	video.addEventListener("timeupdate", function() {
		// Calculate the slider value
		var value = (100 / video.duration) * video.currentTime;
		seekBar.value = value;
	});

	// Pause the video when the seek handle is being dragged
	seekBar.addEventListener("mousedown", function() {
		video.pause();
	});

	// Play the video when the seek handle is dropped
	seekBar.addEventListener("mouseup", function() {
		video.play();
	});
	
	$(function() {
		$( "#volume-bar" ).slider({
			range: "min",
			value: 60,
			animate: true,
			min: 1,
			max: 100,
			slide: function( event, ui ) {
				video.volume = ui.value/100;
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
	});

	/*$(function() {
		$( "#filter-bar" ).slider({
			range: "min",
			value: 1,
			animate: true,
			min: 1,
			max: 5000,
			slide: function( event, ui ) {
				filter.frequency.value = ui.value;
			}
		});
		$( "#amount" ).val( "$" + $( "#slider-range-min" ).slider( "value" ) );
	});	*/
		
	$(".panel nav ul li a").click(function() {
		var currentId = $(this).attr('id');

		if('dag'+statusId === currentId || currentId > 'dag'+statusId){
			video.src = "vid/dag"+statusId+".webm";
			video.play(video.onended = function(e) {
				checkStatus();
				console.log(statusId);
				//$( "#dialog-message" ).dialog( "open" );
			});
		}else{
			console.log('Helaas nog niet te bekijken');
		}
	});

	function checkStatus(){
		if('dag'+statusId === currentId){ 
			statusId = 2; 
			return true;
		}else{
			statusId++; 
			return false;
		}
	};
	
}