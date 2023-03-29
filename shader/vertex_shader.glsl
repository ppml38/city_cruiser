precision mediump float;

//const vec3 lightDirection = normalize(vec3(0, 1.0, 1.0));
//const float ambient = 0.1;

attribute vec3 position;
attribute vec2 uv;
//attribute vec3 normal;

varying vec2 vUV;
//varying float vBrightness;

uniform mat4 matrix;
//uniform mat4 normalMatrix;

void main() {        
    //vec3 worldNormal = (normalMatrix * vec4(normal, 1)).xyz;
    //float diffuse = max(0.0, dot(worldNormal, lightDirection));

    vUV = uv;
    //vBrightness = ambient + diffuse;

    gl_Position = matrix * vec4(position, 1);
}