const NoiseFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  uniform vec2 u_resolution;

  uniform sampler2D uSampler0;
  
  uniform float uTime;

  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }
  
  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 corners' percentages
    return mix(a, b, u.x) +
      (c - a)* u.y * (1.0 - u.x) +
      (d - b) * u.x * u.y;
    }

  void main() {
    vec2 textureCoord = vTextureCoord;
    vec4 texture = texture2D(uSampler0, textureCoord);
    
    vec2 st = gl_FragCoord.xy / 1000.0;
    vec2 pos = vec2(st*5.0);
    float n = noise(pos);
    vec4 noiseVec = vec4(vec3(n), 1.0);
    
    // Documenting fadeout effect:
    // floor + 0.5: sets step between 0 and 1 for vectorized effect (no blurring). Same as round() but they don't have that in webgl...
    // noiseVec.r + 0.5: noiseVec.r is one of the noise vectors, +0.5 means that we round up the value so that we will eventually show the full image
    // 1.5: multiplier for adjusting show speed
    // abs(cos(X)): depending on time, we run a circular loop to display. Can change to progress when we use an onHover effect
    
    texture.a -= 1.0 - floor((noiseVec.r + 0.5) * 1.5 * abs(cos(uTime / 300.0)) + 0.5);

    gl_FragColor = texture;
  }
`;

export default NoiseFs;
