noise.seed(Math.random());

var shaderFrag = `
	precision mediump float;

	varying vec2 vTextureCoord;
	uniform sampler2D uSampler;

	// #define C_0 vec3(0.0000,0.0000,0.0039)

	//org
	// #define C_0 vec3(0.0035,0.0019,0.2247)
	// #define C_1 vec3(0.0000,0.3137,0.6118)
	// #define C_2 vec3(0.0000,0.6588,0.8549)
	// #define C_3 vec3(0.0980,0.9333,0.6588)
	// #define C_4 vec3(0.4275,0.9333,0.1804)
	// #define C_5 vec3(0.7882,0.9882,0.0000)
	// #define C_6 vec3(1.0000,0.9843,0.0000)
	// #define C_7 vec3(1.0000,0.7686,0.0000)
	// #define C_8 vec3(1.0000,0.3529,0.0000)
	// #define C_9 vec3(1.0000,0.2118,0.2000)
	// #define C_10 vec3(1.0000,0.9569,0.9686)


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
var app = new PIXI.Application($(".screen").width(), $(".screen").height(), { view: $(".screen")[0], transparent: true });

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
app.stage.addChild(backgroundLayer);

var gridLayer = new PIXI.Container();
app.stage.addChild(gridLayer);

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
    .add('assets/images/icon-art-1-1.png')
    .add('assets/images/icon-art-1-2.png')
    .add('assets/images/icon-art-2-1.png')
    .add('assets/images/icon-art-2-2.png')
    .add('assets/images/icon-art-3-1.png')
    .add('assets/images/icon-art-3-2.png')
    .add('assets/images/thermal-grid.png')
    .add('assets/images/cursor.png')
    .add('assets/images/blue.png')
    .add('assets/images/icon-temp.png')
    .add('assets/images/test-mouse.png')
    .load(init);

var shadowSprite1, shadowSprite2, shadowSprite3;
var realSprite1, realSprite2, realSprite3;
var ui1, ui2, ui3;
var uiArtBtnTextures = [];
var uiCursor;
var uiTempText;

var uiTextGroups = [];
var uiTexts = [];
var uiTextBgs = [];
var uiTextLines = [];

var tempertureCanvases = [];
// var hideCanvas = $("<canvas>")[0];
// var hideCanvasCtx = hideCanvas.getContext("2d");

var nowArtIndex = 1;
function init() {
	shadowSprite1 = PIXI.Sprite.fromImage("assets/images/art-1.png");
	shadowGroup.addChild(shadowSprite1);

	shadowSprite1.anchor.set(0.5);
	var ratio = shadowSprite1.width / shadowSprite1.height;
	shadowSprite1.height = app.screen.height;
	shadowSprite1.width = app.screen.height * ratio;
	shadowSprite1.x = app.screen.width / 2;
	shadowSprite1.y = app.screen.height / 2;
	shadowSprite1.alpha = 0.8;


	shadowSprite2 = PIXI.Sprite.fromImage("assets/images/art-2.png");
	shadowGroup.addChild(shadowSprite2);

	shadowSprite2.anchor.set(0.5);
	var ratio = shadowSprite2.width / shadowSprite2.height;
	shadowSprite2.height = app.screen.height;
	shadowSprite2.width = app.screen.height * ratio;
	shadowSprite2.x = app.screen.width + app.screen.width / 2;
	shadowSprite2.y = app.screen.height / 2;
	shadowSprite2.alpha = 0.8;


	shadowSprite3 = PIXI.Sprite.fromImage("assets/images/art-3.png");
	shadowGroup.addChild(shadowSprite3);

	shadowSprite3.anchor.set(0.5);
	var ratio = shadowSprite3.width / shadowSprite3.height;
	shadowSprite3.height = app.screen.height;
	shadowSprite3.width = app.screen.height * ratio;
	shadowSprite3.x = app.screen.width*2 + app.screen.width / 2;
	shadowSprite3.y = app.screen.height / 2;
	shadowSprite3.alpha = 0.8;




	realSprite1 = PIXI.Sprite.fromImage("assets/images/art-1.png");
	realGroup.addChild(realSprite1);

	realSprite1.index = 1;
	realSprite1.anchor.set(0.5);
	var ratio = realSprite1.width / realSprite1.height;
	realSprite1.height = app.screen.height;
	realSprite1.width = app.screen.height * ratio;
	realSprite1.x = app.screen.width / 2;
	realSprite1.y = app.screen.height / 2;
	realSprite1.alpha = 1;
	realSprite1.interactive = true;
	realSprite1.on('pointerup', openArt);


	var hideCanvas = $("<canvas>")[0];
	var hideCanvasCtx = hideCanvas.getContext("2d");
	hideCanvas.width = realSprite1.texture.baseTexture.source.width;
	hideCanvas.height = realSprite1.texture.baseTexture.source.height;
	hideCanvasCtx.drawImage(realSprite1.texture.baseTexture.source,0,0);
	
	tempertureCanvases.push(hideCanvas);


	realSprite2 = PIXI.Sprite.fromImage("assets/images/art-2.png");
	realGroup.addChild(realSprite2);

	realSprite2.index = 2;
	realSprite2.anchor.set(0.5);
	var ratio = realSprite2.width / realSprite2.height;
	realSprite2.height = app.screen.height;
	realSprite2.width = app.screen.height * ratio;
	realSprite2.x = app.screen.width + app.screen.width / 2;
	realSprite2.y = app.screen.height / 2;
	realSprite2.alpha = 1;
	realSprite2.interactive = true;
	realSprite2.on('pointerup', openArt);

	var hideCanvas = $("<canvas>")[0];
	var hideCanvasCtx = hideCanvas.getContext("2d");
	hideCanvas.width = realSprite2.texture.baseTexture.source.width;
	hideCanvas.height = realSprite2.texture.baseTexture.source.height;
	hideCanvasCtx.drawImage(realSprite2.texture.baseTexture.source,0,0);
	
	tempertureCanvases.push(hideCanvas);


	realSprite3 = PIXI.Sprite.fromImage("assets/images/art-3.png");
	realGroup.addChild(realSprite3);

	realSprite3.index = 3;
	realSprite3.anchor.set(0.5);
	var ratio = realSprite3.width / realSprite3.height;
	realSprite3.height = app.screen.height;
	realSprite3.width = app.screen.height * ratio;
	realSprite3.x = app.screen.width*2 + app.screen.width / 2;
	realSprite3.y = app.screen.height / 2;
	realSprite3.alpha = 1;
	realSprite3.interactive = true;
	realSprite3.on('pointerup', openArt);

	var hideCanvas = $("<canvas>")[0];
	var hideCanvasCtx = hideCanvas.getContext("2d");
	hideCanvas.width = realSprite3.texture.baseTexture.source.width;
	hideCanvas.height = realSprite3.texture.baseTexture.source.height;
	hideCanvasCtx.drawImage(realSprite3.texture.baseTexture.source,0,0);
	
	tempertureCanvases.push(hideCanvas);



	noiseSprite.anchor.set(0.5);
	noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height)
	noiseSprite.x = app.screen.width / 2;
	noiseSprite.y = app.screen.height / 2;
	frontLayer.addChild(noiseSprite);

	// frontLayer.addChild(mouseHeatSprite);


	//ui
	var textureUi11 = PIXI.Texture.fromImage('assets/images/icon-art-1-1.png');
	var textureUi12 = PIXI.Texture.fromImage('assets/images/icon-art-1-2.png');
	uiArtBtnTextures.push([textureUi11,textureUi12]);
	ui1 = PIXI.Sprite.from(textureUi12);
	uiLayer.addChild(ui1);
	ui1.index = 1;
	ui1.scale.x = 0.4;
	ui1.scale.y = 0.4;
	ui1.anchor.set(1,0);
	ui1.x = app.screen.width - 10;
	ui1.y = 10;
	ui1.interactive = true;

	ui1.on('mouseover', onHover);
	ui1.on('mouseout', onHoverOut);
	ui1.on('pointerup', moveTo);

	var textureUi21 = PIXI.Texture.fromImage('assets/images/icon-art-2-1.png');
	var textureUi22 = PIXI.Texture.fromImage('assets/images/icon-art-2-2.png');
	uiArtBtnTextures.push([textureUi21,textureUi22]);
	ui2 = PIXI.Sprite.from(textureUi21);
	uiLayer.addChild(ui2);
	ui2.index = 2;
	ui2.scale.x = 0.4;
	ui2.scale.y = 0.4;
	ui2.anchor.set(1,0);
	ui2.x = app.screen.width - 10;
	ui2.y = ui1.y + ui1.height + 10;
	ui2.interactive = true;

	ui2.on('mouseover', onHover);
	ui2.on('mouseout', onHoverOut);
	ui2.on('pointerup', moveTo);

	var textureUi31 = PIXI.Texture.fromImage('assets/images/icon-art-3-1.png');
	var textureUi32 = PIXI.Texture.fromImage('assets/images/icon-art-3-2.png');
	uiArtBtnTextures.push([textureUi31,textureUi32]);
	ui3 = PIXI.Sprite.from(textureUi31);
	uiLayer.addChild(ui3);
	ui3.index = 3;
	ui3.scale.x = 0.4;
	ui3.scale.y = 0.4;
	ui3.anchor.set(1,0);
	ui3.x = app.screen.width - 10;
	ui3.y = ui2.y + ui2.height + 10;
	ui3.interactive = true;

	ui3.on('mouseover', onHover);
	ui3.on('mouseout', onHoverOut);
	ui3.on('pointerup', moveTo);

	function onHover() {
		if(this.index != nowArtIndex) {
			this.setTexture(uiArtBtnTextures[this.index-1][1]);
		}
	}
	function onHoverOut() {
		if(this.index != nowArtIndex) {
			this.setTexture(uiArtBtnTextures[this.index-1][0]);
		}
	}

	function moveTo() {
		$(".audio-click")[0].play();
		var index = this.index;
		ui1.setTexture(uiArtBtnTextures[0][0]);
		ui2.setTexture(uiArtBtnTextures[1][0]);
		ui3.setTexture(uiArtBtnTextures[2][0]);
		this.setTexture(uiArtBtnTextures[index-1][1]);
		TweenMax.to(realGroup,1,{x:-$(".screen").width()*(index-1)});
		TweenMax.to(backgroundLayer,1,{x:-$(".screen").width()*(index-1)});
		TweenMax.to(tilingSprite,1,{x:-$(".screen").width()*(index-1)});
		TweenMax.to(textLayer,1,{x:-$(".screen").width()*(index-1)});
		nowArtIndex = index;
		textAnimate(index);
	}

	//開作品頁
	// function openArt() {
	// 	var index = this.index;
	// 	console.log(index);
	// }


	//temperture
	var textureUiTemp = PIXI.Texture.fromImage('assets/images/icon-temp.png');
	var uiTemp = PIXI.Sprite.from(textureUiTemp);
	uiLayer.addChild(uiTemp);
	uiTemp.index = 1;
	uiTemp.scale.x = 0.35;
	uiTemp.scale.y = 0.35;
	uiTemp.anchor.set(0,0);
	uiTemp.x = 10;
	uiTemp.y = 10;

	uiTempText = new PIXI.Text('-20', {
		fontFamily: 'Press Start 2P',
		fill: 0x4AFFFF,
		align: 'center'
	});
	uiLayer.addChild(uiTempText);
	uiTempText.style.fontSize = 22;
	uiTempText.anchor.set(1,0.5);

	uiTempText.x = 140;
	uiTempText.y = 38;



	//texts
	var textStrings = [["鄭先喻","Cheng Hsien-yu","Mission Failed"],["楊傑懷","Yang Jie Huai","如何向一支手機解釋愛情","How To Explain Love","To An iPhone"],["吳宜曄","Wu I-Yeh","Dollar-Post"]];
	for (var i = 1; i <= 3; i++) {
		var pos = 3/4;
		var leftOffset = 50;
		
		var uiTextGroup = new PIXI.Container();
		textLayer.addChild(uiTextGroup);
		uiTextGroup.x = app.screen.width*(i-1);
		uiTextGroup.y = 0;
		uiTextGroups.push(uiTextGroup);

		uiTexts.push([]);
		uiTextBgs.push([]);
		uiTextLines.push([]);
		
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

		var line = new PIXI.Sprite.fromImage("assets/images/blue.png");
		line.anchor.set(1,0);
		line.width = 150;
		line.height = 2;
		line.x = uiText.x + 250;
		line.y = uiText.y - 120;

		// textLayer.addChild(line);
		uiTextGroup.addChild(line);
		uiTextLines[i-1].push(line);

		var line = new PIXI.Sprite.fromImage("assets/images/blue.png");
		line.anchor.set(1,0);
		line.width = 50;
		line.height = 2;
		line.x = uiText.x + 100;
		line.y = uiText.y - 120;
		line.rotation = - Math.PI * 2 * 0.125;

		// textLayer.addChild(line);
		uiTextGroup.addChild(line);
		uiTextLines[i-1].push(line);

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

	
	var textAnimateTl;
	function textAnimate(index) {
		if(textAnimateTl) {
			textAnimateTl.pause();
		}
		var interval = 0.1;
		textAnimateTl = new TimelineMax({repeat:0});

		var uiText1 = uiTexts[index-1][0];
		var uiText2 = uiTexts[index-1][1];
		var uiText3 = uiTexts[index-1][2];
		var textBg1 = uiTextBgs[index-1][0];
		var textBg2 = uiTextBgs[index-1][1];
		var textBg3 = uiTextBgs[index-1][2];
		var line1 = uiTextLines[index-1][0];
		var line2 = uiTextLines[index-1][1];

		if(index==2) {
			var uiText4 = uiTexts[index-1][3];
			var textBg4 = uiTextBgs[index-1][3];
			var uiText5 = uiTexts[index-1][4];
			var textBg5 = uiTextBgs[index-1][4];
			textAnimateTl.set([textBg4,textBg5],{width: 0});
			textAnimateTl.set([uiText4,uiText5],{alpha: 0});
		}

		//delay
		textAnimateTl.set([textBg1,textBg2,textBg3,line1,line2],{width: 0});
		textAnimateTl.set([uiText1,uiText2,uiText3],{alpha: 0});
		textAnimateTl.to(uiText1,1,{text: "_"});

		textAnimateTl.to(line1,0.2,{width: 150});
		textAnimateTl.to(line2,0.15,{width: 50});
		textAnimateTl.to(line2,0.2,{width: 50});

		textAnimateTl.set(uiText1,{alpha: 1});
		textAnimateTl.set(textBg1,{width: 10 + (uiText1.style.fontSize+3)});
		textAnimateTl.to(uiText1,interval,{text: "_"});

		for (var i = 0; i < textStrings[index-1][0].length; i++) {
			if(i+1 == textStrings[index-1][0].length) {
				textAnimateTl.set(textBg1,{width: 10 + (i+1)*(uiText1.style.fontSize+3)});
				textAnimateTl.to(uiText1,interval,{text: textStrings[index-1][0].substring(0, i+1)});
			} else {
				textAnimateTl.set(textBg1,{width: 10 + (i+2)*(uiText1.style.fontSize+3)});
				textAnimateTl.to(uiText1,interval,{text: textStrings[index-1][0].substring(0, i+1) + "_"});
			}
		}

		textAnimateTl.set(uiText2,{alpha: 1});
		textAnimateTl.set(textBg2,{width: 10 + uiText2.style.fontSize});
		textAnimateTl.to(uiText2,interval,{text: "_"});


		for (var i = 0; i < textStrings[index-1][1].length; i++) {
			if(i+1 == textStrings[index-1][1].length) {
				textAnimateTl.set(textBg2,{width: 10 + (i+1)*(uiText2.style.fontSize)});
				textAnimateTl.to(uiText2,interval,{text: textStrings[index-1][1].substring(0, i+1)});
			} else {
				textAnimateTl.set(textBg2,{width: 10 + (i+2)*(uiText2.style.fontSize)});
				textAnimateTl.to(uiText2,interval,{text: textStrings[index-1][1].substring(0, i+1) + "_"});
			}
		}


		textAnimateTl.set(uiText3,{alpha: 1});
		textAnimateTl.set(textBg3,{width: 10 + uiText3.style.fontSize});
		textAnimateTl.to(uiText3,interval,{text: "_"});

		for (var i = 0; i < textStrings[index-1][2].length; i++) {
			if(i+1 == textStrings[index-1][2].length) {
				textAnimateTl.set(textBg3,{width: 10 + (i+1)*(uiText3.style.fontSize)});
				textAnimateTl.to(uiText3,interval,{text: textStrings[index-1][2].substring(0, i+1)});
			} else {
				textAnimateTl.set(textBg3,{width: 10 + (i+2)*(uiText3.style.fontSize)});
				textAnimateTl.to(uiText3,interval,{text: textStrings[index-1][2].substring(0, i+1) + "_"});
			}
		}

		if(index==2) {

			textAnimateTl.set(uiText4,{alpha: 1});
			textAnimateTl.set(textBg4,{width: 10 + uiText4.style.fontSize});
			textAnimateTl.to(uiText4,interval,{text: "_"});

			for (var i = 0; i < textStrings[index-1][3].length; i++) {
				if(i+1 == textStrings[index-1][3].length) {
					textAnimateTl.set(textBg4,{width: 10 + (i+1)*(uiText4.style.fontSize)});
					textAnimateTl.to(uiText4,interval,{text: textStrings[index-1][3].substring(0, i+1)});
				} else {
					textAnimateTl.set(textBg4,{width: 10 + (i+2)*(uiText4.style.fontSize)});
					textAnimateTl.to(uiText4,interval,{text: textStrings[index-1][3].substring(0, i+1) + "_"});
				}
			}

			textAnimateTl.set(uiText5,{alpha: 1});
			textAnimateTl.set(textBg5,{width: 10 + uiText5.style.fontSize});
			textAnimateTl.to(uiText5,interval,{text: "_"});

			for (var i = 0; i < textStrings[index-1][4].length; i++) {
				if(i+1 == textStrings[index-1][4].length) {
					textAnimateTl.set(textBg5,{width: 10 + (i+1)*(uiText5.style.fontSize)});
					textAnimateTl.to(uiText5,interval,{text: textStrings[index-1][4].substring(0, i+1)});
				} else {
					textAnimateTl.set(textBg5,{width: 10 + (i+2)*(uiText5.style.fontSize)});
					textAnimateTl.to(uiText5,interval,{text: textStrings[index-1][4].substring(0, i+1) + "_"});
				}
			}
		}
	}

	//cursor

	uiCursor = PIXI.Sprite.fromImage("assets/images/cursor.png");
	uiLayer.addChild(uiCursor);
	uiCursor.scale.x = 0.5;
	uiCursor.scale.y = 0.5;
	uiCursor.anchor.set(0.5);
	uiCursor.x = -100;
	uiCursor.y = -100;

	uiMouseHeat = PIXI.Sprite.fromImage("assets/images/test-mouse.png");
	frontLayer.addChild(uiMouseHeat);
	uiMouseHeat.alpha = 0.8;
	uiMouseHeat.width = 100;
	uiMouseHeat.height = 100;
	uiMouseHeat.anchor.set(0.5);
	uiMouseHeat.x = -100;
	uiMouseHeat.y = -100;
	TweenMax.fromTo(uiMouseHeat,2,{width:100, height:100},{width:130, height:130, ease: Sine.easeInOut, repeat:-1, yoyo:true});


	isInit = true;
	isPlaying = true;
	allReady();
	setTimeout(textAnimate,4000,1);
	// textAnimate(1);
}

function cursorMove(e) {
	if(!isInit || !isPlaying) return;
	var currentPoint = { 
		x: e.pageX - $(".screen").offset().left, 
		y: e.pageY - $(".screen").offset().top
	};

	uiCursor.x = currentPoint.x;
	uiCursor.y = currentPoint.y;

	//熱源
	uiMouseHeat.x = currentPoint.x;
	uiMouseHeat.y = currentPoint.y;

	var uiMouseHeatTrail = PIXI.Sprite.fromImage("assets/images/test-mouse.png");
	frontLayer.addChild(uiMouseHeatTrail);
	uiMouseHeatTrail.alpha = 0.2;
	uiMouseHeatTrail.width = 100;
	uiMouseHeatTrail.height = 100;
	uiMouseHeatTrail.anchor.set(0.5);
	uiMouseHeatTrail.x = currentPoint.x;
	uiMouseHeatTrail.y = currentPoint.y;
	TweenMax.to(uiMouseHeatTrail,2,{width:20, height:20, alpha:0, ease:Linear.easeNone, onComplete:function(){
		frontLayer.removeChild(this.target);
	}});
}

//從滑鼠位置算溫度
function computeTemperture(e) {
	var currentPoint = { 
		x: (e.pageX - $(".screen").offset().left - (app.screen.width-app.screen.height)/2) / app.screen.height, 
		y: (e.pageY - $(".screen").offset().top) / app.screen.height
	};

	var tctx = tempertureCanvases[nowArtIndex-1].getContext("2d");

	var tImageData = tctx.getImageData(currentPoint.x*1000,currentPoint.y*1000,1,1);
	
	if(tImageData.data[0] == 0 && tImageData.data[3] != 0) {
		//把顏色跟alpha相乘變成灰階值
		var temperture = 255*(tImageData.data[3]/255);
	} else if(tImageData.data[3] == 0){
		var temperture = tImageData.data[0];
	} else {
		var temperture = 255 - tImageData.data[0];
	}

	temperture = Math.floor(scale(temperture,0,255,-15,45));

	// console.log(temperture);
	uiTempText.text = temperture;

	function scale(num, in_min, in_max, out_min, out_max) {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}
	
}



//bg
var backgroundCanvas = $("<canvas>")[0];
var backgroundCtx = backgroundCanvas.getContext("2d");
backgroundCanvas.width = backgroundCanvas.height = 500;

var backgroundTexture = PIXI.BaseTexture.fromCanvas(backgroundCanvas);
var backgroundSprite = PIXI.Sprite.from(backgroundTexture);
backgroundLayer.addChild(backgroundSprite);

backgroundSprite.width = $(".screen").width()*3;
backgroundSprite.height = $(".screen").height();

backgroundLayer.addChild(shadowGroup);


//grid
var texture = PIXI.Texture.fromImage('assets/images/thermal-grid.png');
var tilingSprite = new PIXI.extras.TilingSprite(
    texture,
    app.screen.width*4,
    app.screen.height*2
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
// var mouseHeat = new MouseHeat();
// var mouseHeatTexture = PIXI.BaseTexture.fromCanvas(mouseHeat.view);
// var mouseHeatSprite = PIXI.Sprite.from(mouseHeatTexture);


$("body").on("mousemove", function(e) {
	if(!isInit || !isPlaying) return;
	// mouseHeat.mouseMove(e);
	cursorMove(e);
	computeTemperture(e);
})

var el = $("body")[0];

el.addEventListener("touchstart", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);

el.addEventListener("touchmove", function(e){
	mouseHeat.mouseMove(e.targetTouches[0]);
}, false);

function appResize() {
	$(".screen").height($(".homepage").height()); 
	app.renderer.resize($(".screen").width(), $(".screen").height());

	backgroundSprite.width = app.screen.width * 3;
	backgroundSprite.height = app.screen.height;

	tilingSprite.width = app.screen.width * 3;

	var ratio = shadowSprite1.width / shadowSprite1.height;
	shadowSprite1.height = app.screen.height;
	shadowSprite1.width = app.screen.height * ratio;
	shadowSprite1.x = app.screen.width / 2;
	shadowSprite1.y = app.screen.height / 2;

	var ratio = shadowSprite2.width / shadowSprite2.height;
	shadowSprite2.height = app.screen.height;
	shadowSprite2.width = app.screen.height * ratio;
	shadowSprite2.x = app.screen.width + app.screen.width / 2;
	shadowSprite2.y = app.screen.height / 2;

	var ratio = shadowSprite3.width / shadowSprite3.height;
	shadowSprite3.height = app.screen.height;
	shadowSprite3.width = app.screen.height * ratio;
	shadowSprite3.x = app.screen.width*2 + app.screen.width / 2;
	shadowSprite3.y = app.screen.height / 2;

	var ratio = realSprite1.width / realSprite1.height;
	realSprite1.height = app.screen.height;
	realSprite1.width = app.screen.height * ratio;
	realSprite1.x = app.screen.width / 2;
	realSprite1.y = app.screen.height / 2;

	var ratio = realSprite2.width / realSprite2.height;
	realSprite2.height = app.screen.height;
	realSprite2.width = app.screen.height * ratio;
	realSprite2.x = app.screen.width + app.screen.width / 2;
	realSprite2.y = app.screen.height / 2;

	var ratio = realSprite3.width / realSprite3.height;
	realSprite3.height = app.screen.height;
	realSprite3.width = app.screen.height * ratio;
	realSprite3.x = app.screen.width*2 + app.screen.width / 2;
	realSprite3.y = app.screen.height / 2;

	noiseSprite.width = noiseSprite.height = Math.max(app.screen.width,app.screen.height);
	noiseSprite.x = app.screen.width / 2;
	noiseSprite.y = app.screen.height / 2;

	realGroup.x = backgroundLayer.x = -(nowArtIndex-1)*app.screen.width;

	ui1.x = app.screen.width - 10;
	ui2.x = app.screen.width - 10;
	ui3.x = app.screen.width - 10;

	for (var i = 0; i < uiTextGroups.length; i++) {
		uiTextGroups[i].x = i*app.screen.width;
	}

	// mouseHeatSprite.width = app.screen.width;
	// mouseHeatSprite.height = app.screen.height;

	// mouseHeat.resize();
}

$(window).on("resize", function() {
	appResize();
})


var time = 0;

var noiseMap = $("<canvas>")[0];
app.ticker.add(function(delta) {
	updatePerlinNoiseImage(noiseMap,time);

	backgroundCtx.fillStyle = "#fff";
	backgroundCtx.fillRect(0,0,backgroundCanvas.width,backgroundCanvas.height);

	backgroundCtx.globalAlpha = 0.6;
	backgroundCtx.drawImage(noiseMap,0,0,backgroundCanvas.width,backgroundCanvas.height);
	backgroundCtx.globalAlpha = 1;

	noiseCtx.clearRect(0,0,noiseCanvas.width,noiseCanvas.height);
	noiseCtx.drawImage(noiseMap,0,0,noiseCanvas.width,noiseCanvas.height);

	backgroundTexture.update();
	noiseTexture.update();

	crt.seed = Math.random();

	time += 0.01;
});

var perlinNoiseImage = $("<canvas>")[0];
var perlinNoiseCtx = perlinNoiseImage.getContext("2d");
function updatePerlinNoiseImage(target,time) {
	var width = 500;
	var height = 500;
	var resolution = 0.1;
	var diff = 1;
	var scale = 1;

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

	target.width = width;
	target.height = height;
	var targetCtx = target.getContext("2d");
	targetCtx.clearRect(0,0,width,height);
	targetCtx.scale(1/resolution,1/resolution);
	targetCtx.drawImage(perlinNoiseImage, 0, 0);
}

//stat
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()


