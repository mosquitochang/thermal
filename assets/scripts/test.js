var c = $(".screen")[0];
var ctx = c.getContext("2d");
var img = $("img")[0];

$(window).ready(function() {
	c.width = img.width;
	c.height = img.height;

	ctx.drawImage(img,0,0,img.width,img.height);
	console.log(img);
})

var colorImg = new Image();
var colors = [];
colorImg.onload = function() {
	var cc = $("<canvas>")[0];
	var cctx = cc.getContext("2d");
	cc.width = colorImg.width;
	cc.height = colorImg.height;
	// console.log(colorImg.width,colorImg.height);
	cctx.drawImage(colorImg,0,0,cc.width,cc.height);

	var colorData = cctx.getImageData(0,0,cc.width,cc.height);
	var d = colorData.data;

	for (var i = 0; i <= cc.width; i+=(cc.width/100)) {
		var color = [d[i*4],d[i*4+1],d[i*4+2]];
		colors.push(color);
	}
	// console.log(colors);

	var imgData = ctx.getImageData(0,0,c.width,c.height);
	var dd = imgData.data;

	// var oid = ctx.createImageData(c.width,c.height);;

	for (var i = 0; i < dd.length; i+=4) {
		if(dd[i+3] != 0) {
			var gray = dd[i]/255;
			var color = colors[parseInt(gray*100)];
			// console.log(parseInt(gray*100));

			dd[i] = color[0];
			dd[i+1] = color[1];
			dd[i+2] = color[2];
		}
	}
	ctx.putImageData(imgData,0,0);
}

function handleFileSelect(evt) {
	var files = evt.target.files;
	var output = [];
	for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();
		reader.readAsDataURL(f);

		reader.onload = function (e) {
			colorImg.src = e.target.result;
		}
	}
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);