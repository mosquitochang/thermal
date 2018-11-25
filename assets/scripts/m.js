var isSmall = false;
if($(".screen").height() <= 500) {
	isSmall = true;
}
console.log(isSmall);

noise.seed(Math.random());

var shaderFrag = `
	precision mediump float;

	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	//c0
	#define C_0 vec3(0.0000,0.0353,0.0745)
	#define C_1 vec3(0.0000,0.0353,0.0784)
	#define C_2 vec3(0.2431,0.0000,0.5647)
	#define C_3 vec3(0.5294,0.0000,0.6353)
	#define C_4 vec3(0.8118,0.0000,0.5608)
	#define C_5 vec3(0.9569,0.1176,0.3176)
	#define C_6 vec3(1.0000,0.3804,0.0000)
	#define C_7 vec3(1.0000,0.5843,0.0000)
	#define C_8 vec3(1.0000,0.7686,0.0000)
	#define C_9 vec3(1.0000,0.9333,0.1608)
	#define C_10 vec3(1.0000,1.0000,0.9529)

	void main(void)
	{
		vec4 fg = texture2D(uSampler, vTextureCoord);


		// fg.r = fg.r * fg.a;
		// fg.g = fg.g * fg.a;
		// fg.b = fg.b * fg.a;

		// fg.a = 1.0;
		

		float gray = (fg.r+fg.g+fg.b)/3.0;

		float grayPercent = (gray - (0.1 * floor(gray/0.1)))*10.0;

		vec3 mixedColor;

		if(gray < 0.1) {
			mixedColor = mix(C_10, C_9, grayPercent);
		} else if (gray < 0.2) {
			mixedColor = mix(C_9, C_8, grayPercent);
		} else if (gray < 0.3) {
			mixedColor = mix(C_8, C_7, grayPercent);
		} else if (gray < 0.4) {
			mixedColor = mix(C_7, C_6, grayPercent);
		} else if (gray < 0.5) {
			mixedColor = mix(C_6, C_5, grayPercent);
		} else if (gray < 0.6) {
			mixedColor = mix(C_5, C_4, grayPercent);
		} else if (gray < 0.7) {
			mixedColor = mix(C_4, C_3, grayPercent);
		} else if (gray < 0.8) {
			mixedColor = mix(C_3, C_2, grayPercent);
		} else if (gray < 0.9) {
			mixedColor = mix(C_2, C_1, grayPercent);
		} else if (gray <= 1.0) {
			mixedColor = mix(C_1, C_0, grayPercent);
		}

		fg.r = mixedColor[0];
		fg.g = mixedColor[1];
		fg.b = mixedColor[2];

		gl_FragColor = fg;
		if(gl_FragColor.a < 1.0) discard;
		// if(gl_FragColor.r > 0.9 && gl_FragColor.g > 0.9 && gl_FragColor.b > 0.9) discard;
	}
`;
var filter = new PIXI.Filter(null, shaderFrag);

//pixi本體
var app = new PIXI.Application($(".screen").width(), $(".screen").height(), { view: $(".screen")[0], transparent: true, resolution: window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio});

var crt = new PIXI.filters.CRTFilter({
	curvature: 5,
	lineWidth: 1,
	lineContrast: 0.2,
	noise: 0.15,
	vignetting: 0.4,
	vignettingAlpha: 0.7
})

// app.stage.filters = [crt];



var backgroundLayer = new PIXI.Container();
// app.stage.addChild(backgroundLayer);

var gridLayer = new PIXI.Container();
// app.stage.addChild(gridLayer);

var frontLayer = new PIXI.Container();
app.stage.addChild(frontLayer);

var shadowGroup = new PIXI.Container();

var realGroup = new PIXI.Container();
frontLayer.addChild(realGroup);

var textLayer = new PIXI.Container();
app.stage.addChild(textLayer);

var uiLayer = new PIXI.Container();
app.stage.addChild(uiLayer);

backgroundLayer.filters = [filter];
frontLayer.filters = [filter];


var isInit = false;
var isPlaying = false;

PIXI.loader
    .add('assets/images/art-1.png')
    .add('assets/images/art-2.png')
    .add('assets/images/art-3.png')
    .add('assets/images/thermal-grid.png')
    .add('assets/images/arrow.png')
    .add('assets/images/m-opening-text.png')
    .add('assets/images/logo.png')
    .add('assets/images/m-ending-text1.png')
    .add('assets/images/m-ending-text2.png')
    .add('assets/images/m-icon-fb.png')
    .add('assets/images/m-icon-line.png')
    .add('assets/images/m-icon-web.png')
    .add('assets/images/m-icon-prev.png')
    .add('assets/images/m-touch.png')
    .load(init);

var shadowSprite1, shadowSprite2, shadowSprite3;
var realSprite1, realSprite2, realSprite3;
var ui1, ui2, ui3;
var uiCursor;
var uiTempText;

var uiTextGroups = [];
var openingTexts = [];
var uiTexts = [];
var uiTextBgs = [];

var tempertureCanvases = [];
// var hideCanvas = $("<canvas>")[0];
// var hideCanvasCtx = hideCanvas.getContext("2d");

var nowArtIndex = 0;
function init() {
	shadowSprite1 = PIXI.Sprite.fromImage("assets/images/art-1.png");
	shadowGroup.addChild(shadowSprite1);

	shadowSprite1.anchor.set(0.5);
	var ratio = shadowSprite1.width / shadowSprite1.height;
	shadowSprite1.height = app.screen.width / ratio;
	shadowSprite1.width = app.screen.width;
	shadowSprite1.x = app.screen.width / 2;
	shadowSprite1.y = app.screen.height + app.screen.height / 2;
	shadowSprite1.alpha = 0.8;


	shadowSprite2 = PIXI.Sprite.fromImage("assets/images/art-2.png");
	shadowGroup.addChild(shadowSprite2);

	shadowSprite2.anchor.set(0.5);
	var ratio = shadowSprite2.width / shadowSprite2.height;
	shadowSprite2.height = app.screen.width / ratio;
	shadowSprite2.width = app.screen.width;
	shadowSprite2.x = app.screen.width / 2;
	shadowSprite2.y = app.screen.height*2 + app.screen.height / 2;
	shadowSprite2.alpha = 0.8;


	shadowSprite3 = PIXI.Sprite.fromImage("assets/images/art-3.png");
	shadowGroup.addChild(shadowSprite3);

	shadowSprite3.anchor.set(0.5);
	var ratio = shadowSprite3.width / shadowSprite3.height;
	shadowSprite3.height = app.screen.width / ratio;
	shadowSprite3.width = app.screen.width;
	shadowSprite3.x = app.screen.width / 2;
	shadowSprite3.y = app.screen.height*3 + app.screen.height / 2;
	shadowSprite3.alpha = 0.8;




	realSprite1 = PIXI.Sprite.fromImage("assets/images/art-1.png");
	realGroup.addChild(realSprite1);

	realSprite1.index = 1;
	realSprite1.anchor.set(0.5);
	var ratio = realSprite1.width / realSprite1.height;
	realSprite1.height = app.screen.width *1.3 / ratio;
	realSprite1.width = app.screen.width *1.3;
	realSprite1.x = app.screen.width / 2;
	realSprite1.y = app.screen.height + app.screen.height / 2;
	realSprite1.alpha = 1;

	var tlHint;
	realSprite1.interactive = true;
	realSprite1.on('pointerup', function(){
		tlHint.stop();
		TweenMax.to(touchHint,0.5,{alpha:0});
		realSprite1.interactive = false;
	});


	var touchHint = PIXI.Sprite.fromImage("assets/images/m-touch.png");
	textLayer.addChild(touchHint);

	touchHint.anchor.set(0.5);
	touchHint.width = 150;
	touchHint.height = 150;
	touchHint.x = app.screen.width * 2 / 4;
	touchHint.y = app.screen.height + app.screen.height * 1 / 2;
	touchHint.alpha = 0;
	touchHint.isInit = false;


	realSprite2 = PIXI.Sprite.fromImage("assets/images/art-2.png");
	realGroup.addChild(realSprite2);

	realSprite2.index = 2;
	realSprite2.anchor.set(0.5);
	var ratio = realSprite2.width / realSprite2.height;
	realSprite2.height = app.screen.width*1.2 / ratio;
	realSprite2.width = app.screen.width*1.2;
	realSprite2.x = app.screen.width / 2;
	realSprite2.y = app.screen.height*2 + app.screen.height / 2;
	realSprite2.alpha = 1;


	realSprite3 = PIXI.Sprite.fromImage("assets/images/art-3.png");
	realGroup.addChild(realSprite3);

	realSprite3.index = 3;
	realSprite3.anchor.set(0.5);
	var ratio = realSprite3.width / realSprite3.height;
	realSprite3.height = app.screen.width / ratio;
	realSprite3.width = app.screen.width;
	realSprite3.x = app.screen.width / 2;
	realSprite3.y = app.screen.height*3 + app.screen.height / 2;
	realSprite3.alpha = 1;


	noiseSprite.anchor.set(0.5);
	noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height)
	noiseSprite.x = app.screen.width / 2;
	noiseSprite.y = app.screen.height / 2;
	frontLayer.addChild(noiseSprite);

	frontLayer.addChild(mouseHeatSprite);


	//ui
	var textureUi1 = PIXI.Texture.fromImage('assets/images/arrow.png');
	ui1 = PIXI.Sprite.from(textureUi1);
	uiLayer.addChild(ui1);
	ui1.turn = -1;
	ui1.scale.x = 0.3;
	ui1.scale.y = 0.3;
	ui1.anchor.set(0.5,0.5);
	ui1.rotation = Math.PI/2;
	ui1.x = app.screen.width/2;
	ui1.y = 50;
	ui1.alpha = 0;
	// ui1.interactive = true;
	ui1.on('pointerup', moveTo);

	var textureUi2 = PIXI.Texture.fromImage('assets/images/arrow.png');
	ui2 = PIXI.Sprite.from(textureUi2);
	uiLayer.addChild(ui2);
	ui2.turn = 1;
	ui2.scale.x = 0.3;
	ui2.scale.y = 0.3;
	ui2.anchor.set(0.5,0.5);
	ui2.rotation = -Math.PI/2;
	ui2.x = app.screen.width/2;
	ui2.y = app.screen.height-50;
	ui2.alpha = 0;
	// ui2.interactive = true;
	ui2.on('pointerup', moveTo);


	function moveTo() {
		var turn = this.turn;

		nowArtIndex = nowArtIndex+turn;

		TweenMax.to(realGroup,1,{y:-app.screen.height*(nowArtIndex)});
		TweenMax.to(backgroundLayer,1,{y:-app.screen.height*(nowArtIndex)});
		TweenMax.to(gridLayer,1,{y:-app.screen.height*(nowArtIndex)});
		TweenMax.to(textLayer,1,{y:-app.screen.height*(nowArtIndex)});

		if(nowArtIndex==0) {
			TweenMax.to(ui1,0.5,{alpha: 0});
			ui1.interactive = false;
		}
		if(nowArtIndex==1) {
			TweenMax.to(ui1,0.5,{alpha: 1});
			ui1.interactive = true;

			if(!touchHint.isInit) {
				touchHint.isInit = true;
				var tl = new TimelineMax({repeat:0});
				tl.to(touchHint,1,{alpha:0});
				tl.to(touchHint,0.5,{alpha:1});
				tl.call(function(){
					tlHint = new TimelineMax({repeat:-1});
					tlHint.to(touchHint,1,{alpha:0.5, ease: Sine.easeOut});
					tlHint.to(touchHint,1,{alpha:1, ease: Sine.easeOut});
				})
			}
			
		}
		if(nowArtIndex==3) {
			TweenMax.to([ui1,ui2],0.5,{alpha: 1});
			ui1.interactive = true;
			ui2.interactive = true;
		}
		if(nowArtIndex==4) {
			TweenMax.to([ui1,ui2],0.5,{alpha: 0});
			ui1.interactive = false;
			ui2.interactive = false;
		}

		if(nowArtIndex>=1 && nowArtIndex<=3) {
			textAnimate(nowArtIndex);
		}
		
	}

	//opening
	var openingStrings = ["我們何以抽離身體，","抹去虛實間的界限，","卻仍保持靈魂的溫度？"];
	var openingTextGroup = new PIXI.Container();
	textLayer.addChild(openingTextGroup);

	openingTextGroup.x = 0;
	openingTextGroup.y = app.screen.height/2;

	var openingLogoSprite = PIXI.Sprite.fromImage("assets/images/logo.png");
	textLayer.addChild(openingLogoSprite);
	var ratio = openingLogoSprite.width / openingLogoSprite.height;
	openingLogoSprite.width = app.screen.width * 0.8;
	openingLogoSprite.height = openingLogoSprite.width / ratio;
	openingLogoSprite.anchor.set(0.5,1);
	openingLogoSprite.x = app.screen.width/2;
	openingLogoSprite.y = app.screen.height/2;
	openingLogoSprite.alpha = 0;

	var openingLogoTextSprite = PIXI.Sprite.fromImage("assets/images/m-opening-text.png");
	textLayer.addChild(openingLogoTextSprite);
	var ratio = openingLogoTextSprite.width / openingLogoTextSprite.height;
	openingLogoTextSprite.width = app.screen.width * 0.7;
	openingLogoTextSprite.height = openingLogoTextSprite.width / ratio;
	openingLogoTextSprite.anchor.set(0.5,0);
	openingLogoTextSprite.x = app.screen.width/2;
	openingLogoTextSprite.y = app.screen.height/2 + 20;
	openingLogoTextSprite.alpha = 0;


	for (var i = 0; i < openingStrings.length; i++) {
		var uiText = new PIXI.Text(openingStrings[i], {
			fontFamily: ['PingFangTC', '微軟正黑體', 'sans-serif'],
			letterSpacing: 3,
			fill: 0x4AFFFF,
			align: 'center',
			fontWeight: "500"
		});
		uiText.style.fontSize = 20;
		uiText.anchor.set(0.5,0.5);
		uiText.x = app.screen.width/2;
		uiText.y = i*50;
		uiText.alpha = 0;
		openingTextGroup.addChild(uiText);
		openingTexts.push(uiText);
	}

	openingTextGroup.pivot.y = openingTextGroup.height / 2;

	function openingAnimate() {
		var interval = 0.2;
		var tl = new TimelineMax({repeat:0});

		var uiText1 = openingTexts[0];
		var uiText2 = openingTexts[1];
		var uiText3 = openingTexts[2];

		
		tl.set(openingTexts,{alpha: 0});

		for (var i = 0; i < openingTexts.length; i++) {
			tl.to(openingTexts[i],0.5,{text: "_"});

			tl.set(openingTexts[i],{alpha: 1});
			tl.to(openingTexts[i],interval,{text: "_"});

			for (var j = 0; j < openingStrings[i].length; j++) {
				if(i==2 && j >= openingStrings[i].length-4) {
					if(j+1 == openingStrings[i].length) {
						tl.to(openingTexts[i],0.5,{text: openingStrings[i].substring(0, j+1)});
					} else {
						tl.to(openingTexts[i],0.5,{text: openingStrings[i].substring(0, j+1) + "_"});
					}
					
				} else if(j+1 == openingStrings[i].length) {
					tl.to(openingTexts[i],interval,{text: openingStrings[i].substring(0, j+1)});
				} else {
					tl.to(openingTexts[i],interval,{text: openingStrings[i].substring(0, j+1) + "_"});
				}
			}
		}

		tl.to(openingTexts,1,{alpha: 1});
		tl.to(openingTexts,1,{alpha: 0});

		tl.to([openingLogoSprite,openingLogoTextSprite],1,{alpha: 1});

		tl.to(ui2,0.5,{alpha: 1});

		tl.call(function(){
			var tlLogo = new TimelineMax({repeat:-1});
			tlLogo.to(openingLogoSprite,2,{alpha: 0.5, ease: Sine.easeOut});
			tlLogo.to(openingLogoSprite,2,{alpha: 1, ease: Sine.easeOut});

			var tlArrow1 = new TimelineMax({repeat:-1});
			tlArrow1.to(ui1,2,{y: "-=10", ease: Sine.easeOut});
			tlArrow1.to(ui1,2,{y: "+=10", ease: Sine.easeOut});

			var tlArrow2 = new TimelineMax({repeat:-1});
			tlArrow2.to(ui2,2,{y: "+=10", ease: Sine.easeOut});
			tlArrow2.to(ui2,2,{y: "-=10", ease: Sine.easeOut});

			ui2.interactive = true;
		})
	}


	//ending
	var endingGroup = new PIXI.Container();
	textLayer.addChild(endingGroup);

	endingGroup.x = 0;
	endingGroup.y = app.screen.height*4;

	if(isSmall) {
		var scale = 0.7;
	} else {
		var scale = 0.8;
	}

	var endingTextSprite1 = PIXI.Sprite.fromImage("assets/images/m-ending-text1.png");
	endingGroup.addChild(endingTextSprite1);
	var ratio = endingTextSprite1.width / endingTextSprite1.height;
	endingTextSprite1.width = app.screen.width * scale;
	endingTextSprite1.height = endingTextSprite1.width / ratio;
	endingTextSprite1.anchor.set(1,0);
	endingTextSprite1.x = app.screen.width - 30;
	endingTextSprite1.y = 30;

	var endingTextSprite2 = PIXI.Sprite.fromImage("assets/images/m-ending-text2.png");
	endingGroup.addChild(endingTextSprite2);
	var ratio = endingTextSprite2.width / endingTextSprite2.height;
	endingTextSprite2.width = app.screen.width * scale;
	endingTextSprite2.height = endingTextSprite2.width / ratio;
	endingTextSprite2.anchor.set(0,1);
	endingTextSprite2.x = 30;
	if(isSmall) {
		endingTextSprite2.y = app.screen.height - 100;
	} else {
		endingTextSprite2.y = app.screen.height - 130;
	}
	

	var endingIconSprite1 = PIXI.Sprite.fromImage("assets/images/m-icon-web.png");
	endingGroup.addChild(endingIconSprite1);
	var ratio = endingIconSprite1.width / endingIconSprite1.height;
	endingIconSprite1.width = 50;
	endingIconSprite1.height = endingIconSprite1.width / ratio;
	endingIconSprite1.anchor.set(1,0);
	endingIconSprite1.x = app.screen.width - 30;
	endingIconSprite1.y = endingTextSprite1.y + endingTextSprite1.height + 15;
	endingIconSprite1.interactive = true;
	endingIconSprite1.on('pointerup', link);
	endingIconSprite1.link = "https://avat-art.org/「2018視盟x藝術全青年學校」獻給青年策展人-線上策/";

	var endingIconSprite2 = PIXI.Sprite.fromImage("assets/images/m-icon-fb.png");
	endingGroup.addChild(endingIconSprite2);
	var ratio = endingIconSprite2.width / endingIconSprite2.height;
	endingIconSprite2.width = 50;
	endingIconSprite2.height = endingIconSprite2.width / ratio;
	endingIconSprite2.anchor.set(0,1);
	endingIconSprite2.x = 30;
	endingIconSprite2.y = app.screen.height - 30;
	endingIconSprite2.interactive = true;
	endingIconSprite2.on('pointerup', link);
	endingIconSprite2.link = "https://www.facebook.com/sharer.php?u=https://sensation-gap.com";

	var endingIconSprite3 = PIXI.Sprite.fromImage("assets/images/m-icon-line.png");
	endingGroup.addChild(endingIconSprite3);
	var ratio = endingIconSprite3.width / endingIconSprite3.height;
	endingIconSprite3.width = 50;
	endingIconSprite3.height = endingIconSprite3.width / ratio;
	endingIconSprite3.anchor.set(0,1);
	endingIconSprite3.x = 80;
	endingIconSprite3.y = app.screen.height - 30;
	endingIconSprite3.interactive = true;
	endingIconSprite3.on('pointerup', link);
	endingIconSprite3.link = "https://lineit.line.me/share/ui?url=https://sensation-gap.com";

	var endingIconSprite4 = PIXI.Sprite.fromImage("assets/images/m-icon-prev.png");
	endingGroup.addChild(endingIconSprite4);
	var ratio = endingIconSprite4.width / endingIconSprite4.height;
	endingIconSprite4.width = 50;
	endingIconSprite4.height = endingIconSprite4.width / ratio;
	endingIconSprite4.anchor.set(1,1);
	endingIconSprite4.x = app.screen.width - 30;
	endingIconSprite4.y = app.screen.height - 30;
	endingIconSprite4.interactive = true;
	endingIconSprite4.turn = -1;
	endingIconSprite4.on('pointerup', moveTo);

	function link() {
		window.open(this.link, "_blank");
	}
		

	//texts
	var textStrings = [["鄭先喻","Cheng Hsien-yu","Mission Failed"],["楊傑懷","Yang Jie Huai","如何向一支手機解釋愛情","How To Explain Love","To An iPhone"],["吳宜曄","Wu I-Yeh","Dollar-Post"]];
	for (var i = 1; i <= 3; i++) {
		if(i==2) {
			var pos = 2.7/4;
		} else {
			var pos = 3/4;
		}
		if(isSmall) {
			var leftOffset = 20;
			pos = pos * 19/20;
		} else {
			var leftOffset = 50; 
		}
		
		var uiTextGroup = new PIXI.Container();
		textLayer.addChild(uiTextGroup);
		uiTextGroup.x = 0;
		uiTextGroup.y = app.screen.height*(i);
		uiTextGroups.push(uiTextGroup);

		uiTexts.push([]);
		uiTextBgs.push([]);
		
		var uiText = new PIXI.Text(textStrings[i-1][0], {
			fontFamily: ['PingFangTC', '微軟正黑體', 'sans-serif'],
			letterSpacing: 3,
			fill: 0x09053A,
			align: 'center',
			fontWeight: "700"
		});
		uiText.style.fontSize = 24;
		uiText.anchor.set(0,0.5);
		uiText.alpha = 0;

		var textBg = new PIXI.Sprite.fromImage("assets/images/blue.png");
		textBg.anchor.set(0,0.5);
		textBg.width = 0;
		textBg.height = uiText.height + 6;

		uiText.x = leftOffset;
		textBg.x = uiText.x - 5;
		uiText.y = app.screen.height* pos;
		textBg.y = uiText.y;

		uiTextBgs[i-1].push(textBg);
		uiTexts[i-1].push(uiText);

		uiTextGroup.addChild(textBg);
		uiTextGroup.addChild(uiText);


		var uiTextEn = new PIXI.Text(textStrings[i-1][1], {
			fontFamily: 'Press Start 2P',
			fill: 0x09053A,
			align: 'center'
		});
		uiTextEn.style.fontSize = 12;
		uiTextEn.anchor.set(0,0.3);
		uiTextEn.alpha = 0;

		var textBgEn = new PIXI.Sprite.fromImage("assets/images/blue.png");
		textBgEn.anchor.set(0,0.5);
		textBgEn.width = 0;
		textBgEn.height = uiText.height + 6;

		uiTextEn.x = uiText.x + uiText.width + 13;
		textBgEn.x = uiTextEn.x - 5;
		uiTextEn.y = app.screen.height* pos;
		textBgEn.y = uiTextEn.y;

		uiTextBgs[i-1].push(textBgEn);
		uiTexts[i-1].push(uiTextEn);

		uiTextGroup.addChild(textBgEn);
		uiTextGroup.addChild(uiTextEn);

		if(i==2) {
			var uiText = new PIXI.Text(textStrings[i-1][2], {
				fontFamily: ['PingFangTC', '微軟正黑體', 'sans-serif'],
				fill: 0x09053A,
				align: 'center',
				fontWeight: "700"
			});
			uiText.style.fontSize = 18;
		} else {
			var uiText = new PIXI.Text(textStrings[i-1][2], {
				fontFamily: 'Press Start 2P',
				fill: 0x09053A,
				align: 'center'
			});
			uiText.style.fontSize = 14;
		}
		
		uiText.anchor.set(0,0.5);
		uiText.alpha = 0;

		var textBg = new PIXI.Sprite.fromImage("assets/images/blue.png");
		textBg.anchor.set(0,0.5);
		textBg.width = 0;
		textBg.height = uiText.height + 6;

		uiText.x = leftOffset;
		textBg.x = uiText.x - 5;
		uiText.y = app.screen.height* pos + textBg.height + 30;
		textBg.y = uiText.y;

		uiTextBgs[i-1].push(textBg);
		uiTexts[i-1].push(uiText);

		uiTextGroup.addChild(textBg);
		uiTextGroup.addChild(uiText);

		if(i==2) {
			var uiText = new PIXI.Text(textStrings[i-1][3], {
				fontFamily: 'Press Start 2P',
				fill: 0x09053A,
				align: 'center'
			});
			uiText.style.fontSize = 12;

			uiText.anchor.set(0,0.5);
			uiText.alpha = 0;

			var textBg = new PIXI.Sprite.fromImage("assets/images/blue.png");
			textBg.anchor.set(0,0.5);
			textBg.width = 0;
			textBg.height = uiText.height + 6;

			uiText.x = leftOffset;
			textBg.x = uiText.x - 5;
			uiText.y = app.screen.height* pos + textBg.height + 30 + 40;
			textBg.y = uiText.y;

			uiTextBgs[i-1].push(textBg);
			uiTexts[i-1].push(uiText);

			uiTextGroup.addChild(textBg);
			uiTextGroup.addChild(uiText);


			var uiText = new PIXI.Text(textStrings[i-1][4], {
				fontFamily: 'Press Start 2P',
				fill: 0x09053A,
				align: 'center'
			});
			uiText.style.fontSize = 12;

			uiText.anchor.set(0,0.5);
			uiText.alpha = 0;

			var textBg = new PIXI.Sprite.fromImage("assets/images/blue.png");
			textBg.anchor.set(0,0.5);
			textBg.width = 0;
			textBg.height = uiText.height + 6;

			uiText.x = leftOffset;
			textBg.x = uiText.x - 5;
			uiText.y = app.screen.height* pos + textBg.height + 30 + 40 + 16;
			textBg.y = uiText.y;

			uiTextBgs[i-1].push(textBg);
			uiTexts[i-1].push(uiText);

			uiTextGroup.addChild(textBg);
			uiTextGroup.addChild(uiText);
		}

	}

	

	function textAnimate(index) {
		var interval = 0.1;
		var tl = new TimelineMax({repeat:0});

		var uiText1 = uiTexts[index-1][0];
		var uiText2 = uiTexts[index-1][1];
		var uiText3 = uiTexts[index-1][2];
		var textBg1 = uiTextBgs[index-1][0];
		var textBg2 = uiTextBgs[index-1][1];
		var textBg3 = uiTextBgs[index-1][2];

		if(index==2) {
			var uiText4 = uiTexts[index-1][3];
			var textBg4 = uiTextBgs[index-1][3];
			var uiText5 = uiTexts[index-1][4];
			var textBg5 = uiTextBgs[index-1][4];
			tl.set([textBg4,textBg5],{width: 0});
			tl.set([uiText4,uiText5],{alpha: 0});
		}

		//delay
		tl.set([textBg1,textBg2,textBg3],{width: 0});
		tl.set([uiText1,uiText2,uiText3],{alpha: 0});
		tl.to(uiText1,1,{text: "_"});

		tl.set(uiText1,{alpha: 1});
		tl.set(textBg1,{width: 10 + (uiText1.style.fontSize+3)});
		tl.to(uiText1,interval,{text: "_"});

		for (var i = 0; i < textStrings[index-1][0].length; i++) {
			if(i+1 == textStrings[index-1][0].length) {
				tl.set(textBg1,{width: 10 + (i+1)*(uiText1.style.fontSize+3)});
				tl.to(uiText1,interval,{text: textStrings[index-1][0].substring(0, i+1)});
			} else {
				tl.set(textBg1,{width: 10 + (i+2)*(uiText1.style.fontSize+3)});
				tl.to(uiText1,interval,{text: textStrings[index-1][0].substring(0, i+1) + "_"});
			}
		}

		tl.set(uiText2,{alpha: 1});
		tl.set(textBg2,{width: 10 + uiText2.style.fontSize});
		tl.to(uiText2,interval,{text: "_"});


		for (var i = 0; i < textStrings[index-1][1].length; i++) {
			if(i+1 == textStrings[index-1][1].length) {
				tl.set(textBg2,{width: 10 + (i+1)*(uiText2.style.fontSize)});
				tl.to(uiText2,interval,{text: textStrings[index-1][1].substring(0, i+1)});
			} else {
				tl.set(textBg2,{width: 10 + (i+2)*(uiText2.style.fontSize)});
				tl.to(uiText2,interval,{text: textStrings[index-1][1].substring(0, i+1) + "_"});
			}
		}


		tl.set(uiText3,{alpha: 1});
		tl.set(textBg3,{width: 10 + uiText3.style.fontSize});
		tl.to(uiText3,interval,{text: "_"});

		for (var i = 0; i < textStrings[index-1][2].length; i++) {
			if(i+1 == textStrings[index-1][2].length) {
				tl.set(textBg3,{width: 10 + (i+1)*(uiText3.style.fontSize)});
				tl.to(uiText3,interval,{text: textStrings[index-1][2].substring(0, i+1)});
			} else {
				tl.set(textBg3,{width: 10 + (i+2)*(uiText3.style.fontSize)});
				tl.to(uiText3,interval,{text: textStrings[index-1][2].substring(0, i+1) + "_"});
			}
		}

		if(index==2) {

			tl.set(uiText4,{alpha: 1});
			tl.set(textBg4,{width: 10 + uiText4.style.fontSize});
			tl.to(uiText4,interval,{text: "_"});

			for (var i = 0; i < textStrings[index-1][3].length; i++) {
				if(i+1 == textStrings[index-1][3].length) {
					tl.set(textBg4,{width: 10 + (i+1)*(uiText4.style.fontSize)});
					tl.to(uiText4,interval,{text: textStrings[index-1][3].substring(0, i+1)});
				} else {
					tl.set(textBg4,{width: 10 + (i+2)*(uiText4.style.fontSize)});
					tl.to(uiText4,interval,{text: textStrings[index-1][3].substring(0, i+1) + "_"});
				}
			}

			tl.set(uiText5,{alpha: 1});
			tl.set(textBg5,{width: 10 + uiText5.style.fontSize});
			tl.to(uiText5,interval,{text: "_"});

			for (var i = 0; i < textStrings[index-1][4].length; i++) {
				if(i+1 == textStrings[index-1][4].length) {
					tl.set(textBg5,{width: 10 + (i+1)*(uiText5.style.fontSize)});
					tl.to(uiText5,interval,{text: textStrings[index-1][4].substring(0, i+1)});
				} else {
					tl.set(textBg5,{width: 10 + (i+2)*(uiText5.style.fontSize)});
					tl.to(uiText5,interval,{text: textStrings[index-1][4].substring(0, i+1) + "_"});
				}
			}
		}
	}

	isInit = true;
	isPlaying = true;
	openingAnimate();
}

var noiseMap;

//bg
var backgroundCanvas = $("<canvas>")[0];
var backgroundCtx = backgroundCanvas.getContext("2d");
backgroundCanvas.width = backgroundCanvas.height = 500;

var backgroundTexture = PIXI.BaseTexture.fromCanvas(backgroundCanvas);
var backgroundSprite = PIXI.Sprite.from(backgroundTexture);
backgroundLayer.addChild(backgroundSprite);

backgroundSprite.width = $(".screen").width();
backgroundSprite.height = $(".screen").height()*5;

backgroundLayer.addChild(shadowGroup);


//grid
var texture = PIXI.Texture.fromImage('assets/images/thermal-grid.png');
var tilingSprite = new PIXI.extras.TilingSprite(
    texture,
    app.screen.width*2,
    app.screen.height*6
);
tilingSprite.alpha = 0.3;
gridLayer.addChild(tilingSprite);



//noise
var noiseCanvas = $("<canvas>")[0];
var noiseCtx = noiseCanvas.getContext("2d");
noiseCanvas.width = noiseCanvas.height = 500;

var noiseTexture = PIXI.BaseTexture.fromCanvas(noiseCanvas);
var noiseSprite = PIXI.Sprite.from(noiseTexture);

//heat
var mouseHeat = new MouseHeat();
var mouseHeatTexture = PIXI.BaseTexture.fromCanvas(mouseHeat.view);
var mouseHeatSprite = PIXI.Sprite.from(mouseHeatTexture);


$("body").on("mousemove", function(e) {
	if(!isInit || !isPlaying) return;
	mouseHeat.mouseMove(e);
})

var el = $("body")[0];

el.addEventListener("touchstart", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);

el.addEventListener("touchmove", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);

function appResize() {
	app.renderer.resize($(".screen").width(), $(".screen").height());

	// backgroundSprite.width = app.screen.width * 3;
	// backgroundSprite.height = app.screen.height;

	// var ratio = shadowSprite1.width / shadowSprite1.height;
	// shadowSprite1.height = app.screen.height;
	// shadowSprite1.width = app.screen.height * ratio;
	// shadowSprite1.x = app.screen.width / 2;
	// shadowSprite1.y = app.screen.height / 2;

	// var ratio = shadowSprite2.width / shadowSprite2.height;
	// shadowSprite2.height = app.screen.height;
	// shadowSprite2.width = app.screen.height * ratio;
	// shadowSprite2.x = app.screen.width + app.screen.width / 2;
	// shadowSprite2.y = app.screen.height / 2;

	// var ratio = shadowSprite3.width / shadowSprite3.height;
	// shadowSprite3.height = app.screen.height;
	// shadowSprite3.width = app.screen.height * ratio;
	// shadowSprite3.x = app.screen.width*2 + app.screen.width / 2;
	// shadowSprite3.y = app.screen.height / 2;

	// var ratio = realSprite1.width / realSprite1.height;
	// realSprite1.height = app.screen.height;
	// realSprite1.width = app.screen.height * ratio;
	// realSprite1.x = app.screen.width / 2;
	// realSprite1.y = app.screen.height / 2;

	// var ratio = realSprite2.width / realSprite2.height;
	// realSprite2.height = app.screen.height;
	// realSprite2.width = app.screen.height * ratio;
	// realSprite2.x = app.screen.width + app.screen.width / 2;
	// realSprite2.y = app.screen.height / 2;

	// var ratio = realSprite3.width / realSprite3.height;
	// realSprite3.height = app.screen.height;
	// realSprite3.width = app.screen.height * ratio;
	// realSprite3.x = app.screen.width*2 + app.screen.width / 2;
	// realSprite3.y = app.screen.height / 2;

	// noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height);
	// noiseSprite.x = app.screen.width / 2;
	// noiseSprite.y = app.screen.height / 2;

	// realGroup.x = backgroundLayer.x = -(nowArtIndex-1)*app.screen.width;

	// for (var i = 0; i < uiTextGroups.length; i++) {
	// 	uiTextGroups[i].x = i*app.screen.width;
	// }

	mouseHeatSprite.width = app.screen.width;
	mouseHeatSprite.height = app.screen.height;

	mouseHeat.resize();
}

$(window).on("resize", function() {
	appResize();
})


var time = 0;
app.ticker.add(function(delta) {
	noiseMap = getPerlinNoiseImage(500,500,0.1,1,1,time);

	backgroundCtx.fillStyle = "#fff";
	backgroundCtx.fillRect(0,0,backgroundCanvas.width,backgroundCanvas.height);

	backgroundCtx.globalAlpha = 0.6;
	backgroundCtx.drawImage(noiseMap,0,0,backgroundCanvas.width,backgroundCanvas.height);
	backgroundCtx.globalAlpha = 1;

	noiseCtx.clearRect(0,0,noiseCanvas.width,noiseCanvas.height);
	noiseCtx.drawImage(noiseMap,0,0,noiseCanvas.width,noiseCanvas.height);

	backgroundTexture.update();
	noiseTexture.update();

	mouseHeat.update();
	mouseHeatTexture.update();

	// crt.seed = Math.random();

	time += 0.01;
});

function getPerlinNoiseImage(width,height,resolution,diff,scale,time) {
	var perlinNoiseImage = $("<canvas>")[0];
	var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
	perlinNoiseImage.width = width*resolution;
	perlinNoiseImage.height = height*resolution;

	var perlinNoiseImageData = perlinNoiseCtx.createImageData(perlinNoiseImage.width,perlinNoiseImage.height);

	for (var x = 0; x < perlinNoiseImage.width; x++) {
	  for (var y = 0; y < perlinNoiseImage.height; y++) {
	  	var value = noise.perlin3(x / (50*resolution*diff), y / (50*resolution*diff), time);

	  	value = (1.6+value) * 30 * scale;

	  	var cell = (x + y * perlinNoiseImage.width) * 4;
	  	perlinNoiseImageData.data[cell + 3] = value;
	  }
	}
	perlinNoiseCtx.putImageData(perlinNoiseImageData,0,0);

	var scaleUpCanvas = $("<canvas>")[0];
	var scaleUpCtx = scaleUpCanvas.getContext("2d");
	scaleUpCanvas.width = width;
	scaleUpCanvas.height = height;
	scaleUpCtx.scale(1/resolution,1/resolution);
	scaleUpCtx.drawImage(perlinNoiseImage, 0, 0);

	return scaleUpCanvas;
}

function MouseHeat() {
	var _this = this;

	this.view = $("<canvas>")[0];
	this.viewCtx = this.view.getContext("2d");

	this.width = this.view.width = $(".screen").width();
	this.height = this.view.height = $(".screen").height();

	this.time = 0;

	this.update = function() {
		this.viewCtx.clearRect(0,0,this.width,this.height);


		for (var i = 0; i < this.heats.length; i++) {
			if(this.heats[i] !== undefined) {
				this.heats[i].draw();
				this.heats[i].lifeCount();
			}
		}

		this.time += 0.02;
	}

	this.resize = function() {
		this.width = this.view.width = $(".screen").width();
		this.height = this.view.height = $(".screen").height();
	}

	this.heats = [];

	this.lastPoint = undefined;

	this.mouseMove = function(e) {
		var currentPoint = { 
			x: e.pageX - $(".screen").offset().left, 
			y: e.pageY - $(".screen").offset().top
		};

		// console.log(currentPoint);

		if(this.lastPoint !== undefined) {
			var dist = distanceBetween(this.lastPoint, currentPoint);
			var angle = angleBetween(this.lastPoint, currentPoint);

			for (var i = 0; i < dist; i+=30) {

				var x = this.lastPoint.x + (Math.sin(angle) * i);
				var y = this.lastPoint.y + (Math.cos(angle) * i);

				var heat = new Heat(x,y,this.heats.length);
				this.heats.push(heat);
			}

			this.lastPoint = currentPoint;
		} else {
			var heat = new Heat(currentPoint.x,currentPoint.y,this.heats.length);
			this.heats.push(heat);

			this.lastPoint = currentPoint;
		}
	}

	function distanceBetween(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}
	function angleBetween(point1, point2) {
	  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
	}

	function Heat(x,y,index) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.life = 30;
		this.wave = 0;

		this.draw = function() {
			var innerRadius = 5;
			var outerRadius = Math.max(70*this.life/30 + 30, 0) / 2;
			// var radius = 70*this.life/60 + 30;
			var alpha = 0.15*this.life/30;
			if(this.index == _this.heats.length - 1) {
				outerRadius = radius = (100+this.wave) / 2 ;
				alpha = 0.7+this.wave/100;
			}

			var gradient = _this.viewCtx.createRadialGradient(this.x, this.y, innerRadius, this.x, this.y, outerRadius);
			gradient.addColorStop(0, 'rgba(0,0,0,'+alpha+')');
			gradient.addColorStop(0.7, 'rgba(0,0,0,'+alpha/4+')');
			gradient.addColorStop(1, 'rgba(0,0,0,0)');

			_this.viewCtx.beginPath();
			_this.viewCtx.arc(this.x, this.y, outerRadius, 0, 2 * Math.PI);
			_this.viewCtx.fillStyle = gradient;
			_this.viewCtx.fill();
		}

		this.lifeCount = function() {
			this.life -= 0.2;
			this.wave = Math.sin(_this.time) * 6;

			if(this.life <= 0) {
				if(this.index != _this.heats.length - 1) {
					this.dispose();
				}
			}
		}

		this.dispose = function() {
			_this.heats[this.index] = undefined;
		}
	}
}