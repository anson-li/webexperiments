const FragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D uSampler0;
  uniform float uPlaneVelocity;
  uniform float uPlanePosition;
  uniform float uHoverProgress;

  void main() {
    vec2 textureCoord = vTextureCoord;    

    // Section for adjusting zoom onHover
    float progress = uHoverProgress;
    float d = -progress * 0.5;
    vec2 centerInterp = (textureCoord - 0.5) * d;
  
    vec2 r2 = centerInterp * (progress * 0.6 + 0.4) + textureCoord;
    vec2 g2 = centerInterp * (progress * 0.9 + 0.1) + textureCoord;
    vec2 b2 = centerInterp * (progress * 0.9 + 0.1) + textureCoord;

    vec4 finalColor = vec4( texture2D( uSampler0, r2).r , texture2D( uSampler0, g2).g, texture2D( uSampler0, b2).b , 1.); 

    // Section for desaturating color based on proximity to middle of page
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
