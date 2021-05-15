const GradientCloudsFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform vec2 uMousePosition;
  uniform vec2 u_resolution;
  uniform sampler2D uSampler0;
  
  uniform float uTime;
 
  float PI = 3.14159265359;
  float EXP = 2.71828182846;

  float w1 = 3.0;
  float w2 = 1.0;
  float w3 = 20.0;
  float A = 0.5;
  float R = 3.0;

  float horizontal(in vec2 xy, float t) {
    float v = cos(w1 * xy.x + A * t);
    return v;
  }
      
  float diagonal(in vec2 xy, float t) {
    float v = cos(w2 * (xy.x * cos(t) + 5.0 * xy.y * sin(t)) + A * t);
    return v;
  }

  float radial(in vec2 xy, float t) {
    float x = 0.3 * xy.x - 0.5 + cos(t);
    float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
    float v = sin(w3 * sqrt(x * x + y * y + 1.0) + A * t);
    
    return v;
  }

  float map(float a, float b, float c, float d, float x) {
    return ((x - a) * (d - c) / (b - a)) + c;
  }

  float log_map(float a, float b, float c, float d, float x) {
    float x1 = map(a, b, 1.0, EXP, x);
    return log(x1) * (d - c) + c;
  }

  void main() {
    vec2 textureCoords = vTextureCoord;
    vec4 finalColor = texture2D(uSampler0, textureCoords);
    float t = uTime / 500.;

    vec2 xy = gl_FragCoord.xy / 800.;
    float v = horizontal(xy, t);
    
    v += diagonal(xy, t);
    v += radial(xy, t);
    v /= 3.0;
    
    float r = map(-1.0, 1.0, 0.75, 0.6, sin(PI * v));
    float g = map(-2.0, 1.0, 0.0, 0.8, sin(PI * v));
    
    g += log_map(-1.0, 1.5, 0.0, 0.1, cos(PI * v));
    
    float b = map(-5.0, 1.0, 0.75, 1.0, sin(PI * v));
    // gl_FragColor = vec4(pow(r, R), pow(g, R), pow(b, R), 1.0);
    gl_FragColor = vec4(finalColor.r + pow(r, R), finalColor.g + pow(g, R), finalColor.b + pow(b, R), 1.0);
  }
`;

export default GradientCloudsFs;
