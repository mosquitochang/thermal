$('body').on("mousewheel",function(e, delta) {
	if(!$(".lightbox-wrapper").hasClass('active')) {
		$('.screen')[0].scrollLeft -= (delta);
	}
    e.preventDefault();
});



$(".screen .art img").on("click", function() {
	$(".lightbox-wrapper").addClass('active');
})


$(".lightbox-wrapper .close").on("click", function(e) {
	$(".lightbox-wrapper").removeClass('active');
	// if($(e.target).hasClass('lightbox-wrapper')) {
	// 	$(".lightbox-wrapper").removeClass('active');
	// }
})


// $("body").on("mousemove", function(e) {
// 	$(".cursor").css({
// 		top: e.pageY + "px",
// 		left: e.pageX + "px"
// 	})
// })
