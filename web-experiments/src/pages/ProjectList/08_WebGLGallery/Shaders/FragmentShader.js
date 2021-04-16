const FragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D uSampler0;
  uniform float uPlaneVelocity;
  uniform float uPlanePosition;

  void main() {
    vec2 textureCoord = vTextureCoord;    
    vec4 finalColor = texture2D(uSampler0, vTextureCoord);
    float f = 0.3;
    float r = finalColor.r;
    float g = finalColor.g;
    float b = finalColor.b;
    float L = 0.3 * r + 0.6 * g + 0.1 * b; // desaturation algorithm
    finalColor.r = r + f * (L - r) - 0.1 - 0.5 + uPlanePosition * 0.5;
    finalColor.g = g + f * (L - g) - 0.1 - 0.5 + uPlanePosition * 0.5;
    finalColor.b = b + f * (L - b) - 0.1 - 0.5 + uPlanePosition * 0.5;
    gl_FragColor = finalColor;
  }
`;

export default FragmentShader;
