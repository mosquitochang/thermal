// $("button").on("click", function() {
// 	if($(this).hasClass('org')) {
// 		frontLayer.filters = [orgfilter];
// 	} else if($(this).hasClass('c1')) {
// 		frontLayer.filters = [filter1];
// 	} else if($(this).hasClass('c2')) {
// 		frontLayer.filters = [filter2];
// 	}
// })


$(".intro video")[0].onplaying = function() {
	$(".intro video")[0].playbackRate = 1.5;
	$(".screen-bg video")[0].playbackRate = 0.7;
	$(".intro video")[0].onplaying = null;

	if(isInit) return;
	$(".intro").addClass('active');
};

function allReady() {
	var tl = new TimelineMax({repeat:0});
	var useless = {x:0};
	tl.to(useless,1,{x:0});
	tl.call(function(){
		$(".intro").removeClass('active');
	});
	tl.to(useless,1,{x:0});
	$(".page-wrapper").addClass('active');
}



//作品頁面
$(".btn-info").on("click", function(){
	$(".audio-click")[0].play();
	$(this).parent().toggleClass("active");
	$(this).toggleClass("active");
})

$(".art-info-container").on("click", function(e){
	if(e.target.classList[0] == 'art-info-container') {
		$(this).removeClass("active");
		$(this).find(".btn-info").removeClass("active");
	}
})

$(".btn-home").on("click", function(){
	$(".audio-click")[0].play();
	var index = $(this).parents(".art-container").data("art");
	$(this).parent().removeClass("active");
	$(".art-lightbox").removeClass("active");
	app.start();

	if(index!=2) {
		setTimeout(function(){
			$(".art-container[data-art="+index+"]").find(".art").html("");
		},1000)
	} else {
		$(".art-container[data-art="+index+"]").find("video")[0].pause();
	}
	
})

function openArt() {
	$(".audio-click")[0].play();
	var index = this.index;

	if(index==3) {
		window.open("http://dollar-post.com/", "_blank");
		return;
	}

	app.stop();

	
	if(index==1) {
		var iframe = $("<iframe>");
		iframe[0].src = "https://bent-flag.surge.sh/";
		$(".art-container[data-art="+index+"]").find(".art").append(iframe);
	}

	if(index==2) {
		$(".art-container[data-art="+index+"]").find("video")[0].play();
	}

	// if(index==3) {
	// 	var iframe = $("<iframe>");
	// 	iframe[0].src = "http://dollar-post.com/";
	// 	$(".art-container[data-art="+index+"]").find(".art").append(iframe);
	// }

	$(".art-container.active").removeClass("active");
	$(".art-container[data-art="+index+"]").addClass("active");
	$(".art-lightbox").addClass("active");
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
			// $(".hourglass-turn img:nth-child(6)").removeClass('active');
			// $(".hourglass-gif").addClass('active');
			hourglassCount++;
			isHourglassTurning = false;
		});
	} else {
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
	var introTexts = ["歡迎來到體感溫室","你可以在這裡留下任何對《體感溫差》的想法或疑問","它將會成為溫室的熱度來源","而你的發問，我們會在 12/16 Sun. 21:30 直播中解答"];
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