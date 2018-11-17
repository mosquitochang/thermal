
// function crtAnimate() {
// 	requestAnimationFrame(crtAnimate);
// 	$(".n1").toggleClass('active');
// 	$(".n2").toggleClass('active');
// }
// crtAnimate();




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
		} else {
			app.stop();
		}

		scrollbars.forEach(scrollbar => {
			scrollbar.reset();
		})
	},800)
	

	

	nowMenuIndex = index;
})

$(".main-screen").on("click", function(){
	// $(".screen-animate").toggleClass('active');

	// if($(".curator .window").hasClass('off')) {
	// 	$(".curator .window").removeClass('off2');
	// 	setTimeout(function(){
	// 		$(".curator .window").removeClass('off');
	// 	},300);
	// } else {
	// 	$(".curator .window").addClass('off');
	// 	setTimeout(function(){
	// 		$(".curator .window").addClass('off2');
	// 	},300);
	// }
})

function toggleWindow(target,turnOn) {
	if(turnOn) {
		target.addClass('active');
		target.find(".window").removeClass('off');
		// setTimeout(function(){
		// 	target.find(".window").removeClass('off');
		// },300);
	} else {
		target.find(".window").addClass('off');
		setTimeout(function(){
			target.removeClass('active');
		},1000);
	}
}


var scrollbars = [];
for (var i = 1; i < $(".main-screen section").length; i++) {
	var target = $(".main-screen section").eq(i);
	var scrollbar = new Scrollbar($(target).find(".scrollbar")[0],$(target).find(".bar")[0],$(target).find(".window-content")[0]);

	scrollbars.push(scrollbar);	
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
	var post = {
		avatarIndex: $(".form .comment-icon img.active").data("avatar"),
		name: $(".form .name-input input").val(),
		comment: $(".form .comment-content textarea").val()
	}
	console.log(writeNewPost(post));
	
})

function writeNewPost(postData) {
  var newPostKey = firebase.database().ref().child('posts').push().key;
  var updates = {};
  updates['/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

// var scrollbar = new Scrollbar($(".scrollbar")[0],$(".bar")[0],$(".window-content")[0]);