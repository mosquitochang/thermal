$(".intro video")[0].onplaying = function() {
   $(".intro").addClass('active');
   $(".intro video")[0].playbackRate = 1.5;
   $(".screen-bg video")[0].playbackRate = 0.7;
   $(".intro video")[0].onplaying = null;
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
	if(isHourglassTurning) return;

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
})


//menu
var nowMenuIndex = 6;
var nowArrowIndex = 6;
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
	var index = $(this).data("menu");
	$(".menu-row.active").removeClass('active');
	$(this).addClass('active');

	// toggleWindow($(".main-screen section.active"),false);
	// setTimeout(function(){
	// 	toggleWindow($(".main-screen section[data-section="+index+"]"),true);
	// },1000)
	$(".screen-animate").addClass('active');
	setTimeout(function(){
		$(".main-screen section.active").removeClass('active');
		$(".main-screen section[data-section="+index+"]").addClass('active');
		$(".screen-animate").removeClass('active');

		if(index == 6) {
			app.start();
			appResize();
			isPlaying = true;
		} else {
			app.stop();
			isPlaying = false;
		}

		if(index==5 && !isChatIntro) {
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


//聊天室相關
var isChatIntro = false;

function chatIntro() {
	var introTexts = ["歡迎來到體感溫室","你可以在這裡留下任何對《體感溫差》的想法或疑問","它將會成為溫室的熱度來源","而你的發問，我們會在 12/16 Sun. 21:30 直播中解答"];
	var tl = new TimelineMax({repeat:0});
	var useless = {x:0};
	tl.to(useless,1,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 1,
		name: "admin",
		comment: introTexts[0]
	}]);
	tl.to(useless,1.5,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 1,
		name: "admin",
		comment: introTexts[1]
	}]);
	tl.to(useless,1.5,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 1,
		name: "admin",
		comment: introTexts[2]
	}]);
	tl.to(useless,1.5,{x:0});
	tl.call(drawComment,[{
		avatarIndex: 1,
		name: "admin",
		comment: introTexts[3]
	}]);

	isChatIntro = true;
}


$(".form .comment-icon").on("click", function(){
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

var postTemplate = '<div class="comment"><div class="comment-icon"><img src="assets/images/ex{{avatarIndex}}.jpg" alt=""/></div><div class="comment-name"><p>{{name}}</p></div><div class="comment-content"><p>{{comment}}</p></div></div>';


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

	if(commentNum >= initCommentNum) {
		$(".comment .window-content").animate({
			scrollTop: $(".comment .window-content-container").height()
		},500);
		scrollbars.forEach(s => s.update());
	}
}

// getData();

// var scrollbar = new Scrollbar($(".scrollbar")[0],$(".bar")[0],$(".window-content")[0]);