// $(".intro video")[0].onplaying = function() {
// 	console.log("QQQ");
// 	$(".intro video")[0].playbackRate = 1.5;
// 	$(".screen-bg video")[0].playbackRate = 0.7;
// 	$(".intro video")[0].onplaying = null;

// 	if(isIntroDone) return;
// 	$(".intro").addClass('active');
// };

$(".intro video")[0].addEventListener('canplay',function() {
	console.log("Q");
	$(".intro video")[0].playbackRate = 1.5;
	$(".screen-bg video")[0].playbackRate = 0.7;
	$(".intro video")[0].onplaying = null;

	if(isIntroDone) return;
	$(".intro").addClass('active');
});

var isIntroDone = false;
function allReady() {
	var tl = new TimelineMax({repeat:0});
	var useless = {x:0};
	tl.to(useless,3,{x:0});
	tl.call(function(){
		isIntroDone = true;
		$(".intro").removeClass('active');
	});
	tl.to(useless,1,{x:0});
	tl.call(function(){
		$(".page-wrapper").addClass('active');
	});
	
}



//作品頁面
$(".btn-info").on("click", function(){
	$(".audio-click")[0].play();
	$(this).parent().toggleClass("active");
	$(this).toggleClass("active");
})

$(".art-info-container").on("click", function(e){
	if(e.target.classList[0] == 'art-info-container') {
		$(".audio-click")[0].play();
		$(this).removeClass("active");
		$(this).find(".btn-info").removeClass("active");
	}
})

$(".btn-home").on("click", function(){
	$(".audio-click")[0].play();
	var index = $(this).parents(".art-container").data("art");
	$(this).parent().removeClass("active");
	$(".art-lightbox").removeClass("active");
	$(".screen-bg").removeClass('hide');
	$(".iphone").removeClass('wait');
	$(".iphone").unbind();
	app.start();
	isPlaying = true;

	setTimeout(function(){
		$(".art-container[data-art="+index+"]").find("video")[0].pause();
		$(".art-container[data-art="+index+"]").find("video")[0].currentTime = 0;
	},1000)
	
})

function openArt() {
	$(".audio-click")[0].play();
	var index = this.index;

	if(index==3) {
		ga('send', 'pageview', 'page_art3');
		window.open("http://dollar-post.com/", "_blank");
		return;
	}

	app.stop();
	isPlaying = false;

	
	if(index==1) {
		ga('send', 'pageview', 'page_art1');
		$(".art-container[data-art="+index+"]").find("video")[0].play();
	}

	if(index==2) {
		ga('send', 'pageview', 'page_art2');
		art2play();
	}

	$(".art-container.active").removeClass("active");
	$(".art-container[data-art="+index+"]").addClass("active");
	$(".art-lightbox").addClass("active");
}

//siri
function art2play() {
	$(".screen-bg").addClass('hide');
	var isStopedTimes = new Array(22).fill(false);
	var stopTimes = [2,16,29,44,58,75,89,102,118,130,146,159.5,172,186,199,216,229,243,254,264,276,294];
	var video = $(".art-container[data-art=2]").find("video")[0];

	if(window.innerWidth / window.innerHeight >= 1.777) {
		$(".iphone").css({
			width: window.innerHeight*0.63/1.777,
			height: window.innerHeight*0.63
		})
	} else {
		$(".iphone").css({
			width: window.innerWidth*0.2,
			height: window.innerWidth*0.2*1.777
		})
	}

	video.addEventListener("timeupdate", function(){
		// console.log(this.currentTime);
		for (var i = 0; i < stopTimes.length; i++) {
			if(!isStopedTimes[i] && this.currentTime >= stopTimes[i]) {
				// console.log("!!");
				$(".iphone").addClass('wait');
				this.pause();
				break;
			}
		}
	});

	$(".iphone").on("click", function(){
		$(".iphone").removeClass('wait');
		var nowIndex = isStopedTimes.indexOf(false);
		isStopedTimes[isStopedTimes.indexOf(false)] = true;
		video.play();
	})

	video.play();
}

//時鐘和倒數
setInterval(function() {
	var dt = new Date();

	var h = dt.getHours().toString();
	h = h.length == 2 ? h : "0" + h;

	var m = dt.getMinutes().toString();
	m = m.length == 2 ? m : "0" + m;

	var s = dt.getSeconds().toString();
	var s = s.length == 2 ? s : "0" + s;
	
	$(".clock .time").html(`${h}:${m}:${s}`);

	var dt2 = new Date(2018, 10, 30);
	var countdown = parseInt((dt2 - dt) / (1000 * 60 * 60 * 24)) + 1;

	$(".countdown .date").html(countdown);
},1000)


//沙漏
var hourglassCount = 0;
var isHourglassTurning = false;
$(".hourglass-gif").on("click", function(){
	if(isHourglassTurning || hourglassCount>4) return;
	$(".audio-click")[0].play();

	if(hourglassCount==4) {
		$(".audio-hourglass")[0].play();
		var tl = new TimelineMax({repeat:0});
		var useless = {x:0};
		tl.call(function(){
			isHourglassTurning = true;
			$(".hourglass-gif").removeClass('active');
			$(".hourglass-turn img:nth-child(4)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			$(".hourglass-turn img:nth-child(4)").removeClass('active');
			$(".hourglass-turn img:nth-child(5)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			$(".hourglass-turn img:nth-child(5)").removeClass('active');
			$(".hourglass-turn img:nth-child(6)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			hourglassCount++;
			isHourglassTurning = false;

			egg();
		});
	} else {
		$(".audio-click")[0].play();
		var tl = new TimelineMax({repeat:0});
		var useless = {x:0};
		tl.call(function(){
			isHourglassTurning = true;
			$(".hourglass-gif").removeClass('active');
			$(".hourglass-turn img:nth-child(1)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			$(".hourglass-turn img:nth-child(1)").removeClass('active');
			$(".hourglass-turn img:nth-child(2)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			$(".hourglass-turn img:nth-child(2)").removeClass('active');
			$(".hourglass-turn img:nth-child(3)").addClass('active');
		});
		tl.to(useless,0.1,{x:0});
		tl.call(function(){
			$(".hourglass-turn img:nth-child(3)").removeClass('active');
			$(".hourglass-gif").addClass('active');
			hourglassCount++;
			isHourglassTurning = false;
		});
	}
})

//彩蛋
function egg() {
	setTimeout(function(){
		ga('send', 'pageview', 'page_egg');
		app.stop();
		isPlaying = false;
		$(".egg").addClass('active');
		var egg1 = $(".egg1")[0];
		var egg2 = $(".egg2")[0];

		egg1.currentTime = 0;

		egg1.addEventListener("timeupdate", function(){
			// console.log(this.currentTime);
			if(this.currentTime >= 15) {
				$(".egg .btn-back").addClass('active');
			}
			if(this.currentTime >= 29) {
				this.pause();
				$(".egg2").addClass('active');
				egg2.removeAttribute("muted");
				egg2.muted = false;
			}
		});
		egg1.play();
	},1000);
}

$(".egg .btn-back").on("click", function() {
	$(".egg1")[0].pause();
	$(".egg2")[0].muted = true;
	$(".egg2")[0].setAttribute("muted","");
	$(".egg2").removeClass('active');
	$(".egg").removeClass('active');
	$(".egg .btn-back").removeClass('active');
	app.start();
	isPlaying = true;
})


//menu
var nowMenuIndex = 1;
var nowArrowIndex = 1;
$(".menu-row").on("mouseenter", function(){
	var index = $(this).data("menu");
	
	for (var i = 1; i < 7; i++) {
		$(".arrow").removeClass("at-"+i);
	}
	
	$(".arrow").addClass("at-"+index);
	nowArrowIndex = index;
})

$(".menu").on("mouseleave", function(){
	var index = $(this).data("menu");
	for (var i = 1; i < 7; i++) {
		$(".arrow").removeClass("at-"+i);
	}
	$(".arrow").addClass("at-"+nowMenuIndex);
})

$(".menu-row").on("click", function(){
	$(".audio-menu")[0].play();
	var index = $(this).data("menu");
	$(".menu-row.active").removeClass('active');
	$(this).addClass('active');

	ga('send', 'pageview', 'page_'+index);

	$(".screen-animate").addClass('active');
	setTimeout(function(){
		$(".main-screen section.active").removeClass('active');
		$(".main-screen section[data-section="+index+"]").addClass('active');
		$(".screen-animate").removeClass('active');

		if(index == 1) {
			app.start();
			appResize();
			isPlaying = true;
		} else {
			app.stop();
			isPlaying = false;
		}

		if(index==6 && !isChatIntro) {
			chatIntro();
		}

		scrollbars.forEach(scrollbar => {
			scrollbar.reset();
			scrollbar.update();
		})
	},800)

	nowMenuIndex = index;
})

function toggleWindow(target,turnOn) {
	if(turnOn) {
		target.addClass('active');
		target.find(".window").removeClass('off');
	} else {
		target.find(".window").addClass('off');
		setTimeout(function(){
			target.removeClass('active');
		},1000);
	}
}


//scrollbar init
var scrollbars = [];
for (var i = 0; i < $(".window").length; i++) {
	var target = $(".window").eq(i);
	var scrollbar = new Scrollbar($(target).find(".scrollbar")[0],$(target).find(".bar")[0],$(target).find(".window-content")[0]);

	scrollbars.push(scrollbar);	
}

var scrollbar = new Scrollbar($(".comment").find(".scrollbar")[0],$(".comment").find(".bar")[0],$(".comment").find(".window-content")[0],true);
scrollbars.push(scrollbar);	



//window tab
$(".window-switch").on("click", function(){
	$(".audio-click")[0].play();
	var index = $(this).data("tab");
	$(this).parents("section").find(".window-switch.active").removeClass('active');
	$(this).addClass('active');
	$(this).parents("section").find(".window.active").removeClass('active');
	$(this).parents("section").find(".window[data-tab="+index+"]").addClass('active');
	scrollbars.forEach(s => s.reset());
	scrollbars.forEach(s => s.update());
})


//聊天室相關
var isChatIntro = false;

function chatIntro() {
	var introTexts = [
		"歡迎來到體感溫室\n\nWelcome to the Sensation Greenhouse.",
		"你可以在這裡留下任何對《體感溫差》的想法或疑問\n\nPease leave your comment or question of Sensation Gap here.",
		"它將會成為溫室的熱度來源\n\nThey will turn into energy for our greenhouse.",
		"而你的發問，我們會在 12/16 Sun. 21:30 直播中解答\n\nAnd we will hold an online live streaming to answer all of your question at 21:30 on December 16.",
		"另外在12/23 Sun. 21:00 我們邀請到《翻掘指南》的策展人蔡秉儒，以及與談人陳岳詮，一同與策展人魏金禾討論線上策展未來的可能性。\n\nBesides, on December 23 21:00, we invite the curator of Read and Interpretation, Tsai Ping-Ju and a commentator Chen Yueh-Chuan to discuss about the possibility of online curation with Wei Chin-Ho."
	];
	var tl = new TimelineMax({repeat:0});
	var useless = {x:0};
	tl.to(useless,1,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 7,
		name: "admin",
		comment: introTexts[0]
	}]);
	tl.to(useless,2,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 7,
		name: "admin",
		comment: introTexts[1]
	}]);
	tl.to(useless,2,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 7,
		name: "admin",
		comment: introTexts[2]
	}]);
	tl.to(useless,2,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 7,
		name: "admin",
		comment: introTexts[3]
	}]);
	tl.to(useless,2,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 7,
		name: "admin",
		comment: introTexts[4]
	}]);

	isChatIntro = true;
}


$(".form .comment-icon").on("click", function(){
	$(".audio-click")[0].play();
	var prev = $(this).find("img.active");
	prev.removeClass('active');
	if(prev.next().length) {
		prev.next().addClass('active');
	} else {
		$(this).find("img").eq(0).addClass('active');
	}
	
})

$(".form .comment-send").on("click", function(){
	if($(".form .comment-content textarea").val().length == 0) return;
	var post = {
		avatarIndex: $(".form .comment-icon img.active").data("avatar"),
		name: $(".form .name-input input").val(),
		comment: $(".form .comment-content textarea").val()
	}

	$(".form .name-input input").val("");
	$(".form .comment-content textarea").val("");

	writeNewPost(post);
})

function writeNewPost(postData) {
  var newPostKey = firebase.database().ref().child('posts').push().key;
  var updates = {};
  updates['/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

var postTemplate = '<div class="comment"><div class="comment-icon"><img src="assets/images/avatar{{avatarIndex}}.png" alt=""/></div><div class="comment-name"><p>{{name}}</p></div><div class="comment-content"><p>{{comment}}</p></div></div>';


var initCommentNum = 0;
function initGetData() {
	var ref = firebase.database().ref('/');
	ref.once('value', function(snapshot) {
		initCommentNum = snapshot.numChildren();

		getData();
	});
}
initGetData();

var commentNum = 0;
function getData() {
	var ref = firebase.database().ref('/');
	ref.on('child_added', function(snapshot) {
		var val = snapshot.val();
		if( val !== null ) {
			drawComment(val);
			
		}
	});
}


function drawComment(val) {
	var filter = $("<div>");
	filter.text(val.name);
	var name = filter.html();
	if(name.length == 0) {
		name = "無名氏";
	}
	filter.text(val.comment);
	var comment = filter.html();

	var post = postTemplate.replace("{{avatarIndex}}", val.avatarIndex)
						   .replace("{{name}}", name)
						   .replace("{{comment}}", comment);
	$(".comment .window-content-container").append(post);

	commentNum++;

	if(commentNum > initCommentNum) {
		$(".comment .window-content").animate({
			scrollTop: $(".comment .window-content-container").height()
		},500);
		scrollbars.forEach(s => s.update());

		$(".audio-send")[0].play();
	}
}

// getData();

// var scrollbar = new Scrollbar($(".scrollbar")[0],$(".bar")[0],$(".window-content")[0]);