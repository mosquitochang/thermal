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


var nowMenuIndex = 1;
var nowArrowIndex = 1;
$(".menu-row").on("mouseenter", function(){
	var index = $(this).data("menu");
	
	for (var i = 1; i < 7; i++) {
		$(".arrow").removeClass("at-"+i);
	}
	
	$(".arrow").addClass("at-"+index);

	// $(".menu-row.active").removeClass('active');
	// $(this).addClass('active');

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

	nowMenuIndex = index;
})