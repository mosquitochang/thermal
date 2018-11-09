precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

#define C_0 vec3(0.0000,0.0000,0.0039)
#define C_1 vec3(0.0000,0.3137,0.6118)
#define C_2 vec3(0.0000,0.6588,0.8549)
#define C_3 vec3(0.0980,0.9333,0.6588)
#define C_4 vec3(0.4275,0.9333,0.1804)
#define C_5 vec3(0.7882,0.9882,0.0000)
#define C_6 vec3(1.0000,0.9843,0.0000)
#define C_7 vec3(1.0000,0.7686,0.0000)
#define C_8 vec3(1.0000,0.3529,0.0000)
#define C_9 vec3(1.0000,0.2118,0.2000)
#define C_10 vec3(1.0000,0.9569,0.9686)


void main(void)
{
	vec4 fg = texture2D(uSampler, vTextureCoord);

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
}