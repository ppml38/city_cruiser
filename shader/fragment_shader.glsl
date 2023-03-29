precision mediump float;

varying vec2 vUV;
//varying float vBrightness;

uniform sampler2D textureID;

void main() {
    vec4 texel = texture2D(textureID, vUV);
    //texel.xyz *= vBrightness;
    gl_FragColor = texel;
}