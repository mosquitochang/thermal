precision mediump float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

uniform float colors[300];


void main(void)
{
	vec2 uvs = vTextureCoord.xy;
	vec4 fg = texture2D(uSampler, vTextureCoord);
	int index = int(100.0 - ((fg.r+fg.g+fg.b)/3.0) * 100.0);

	for (int i = 0; i <= 100; i++) {
		if (i == index) {
			fg.r = colors[i*3];
			fg.g = colors[i*3+1];
			fg.b = colors[i*3+2];
			// fg.a = 1.0;
			break;
		}
	}

	gl_FragColor = fg;
	if(gl_FragColor.a < 1.0) discard;
}
