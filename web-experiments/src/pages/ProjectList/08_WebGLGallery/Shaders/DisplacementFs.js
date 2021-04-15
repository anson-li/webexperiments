const DisplacementFs = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  // get our varyings
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  // our render texture
  uniform sampler2D uRenderTexture;
  uniform sampler2D uFlowTexture;

  void main() {
    // our flowmap
    vec4 flowTexture = texture2D(uFlowTexture, vTextureCoord);

    // distort our image texture based on the flowmap values
    vec2 distortedCoords = vTextureCoord;
    distortedCoords -= flowTexture.xy * 0.1;

    // get our final texture based on the displaced coords
    vec4 texture = texture2D(uRenderTexture, distortedCoords);
    
    vec4 rTexture = texture2D(uRenderTexture, distortedCoords + flowTexture.xy * 0.0125);
    vec4 gTexture = texture2D(uRenderTexture, distortedCoords);
    vec4 bTexture = texture2D(uRenderTexture, distortedCoords - flowTexture.xy * 0.0125);

    // mix the BW image and the colored one based on our flowmap color values
    float mixValue = clamp((abs(flowTexture.r) + abs(flowTexture.g) + abs(flowTexture.b)) * 1.5, 0.0, 1.0);
    texture = mix(texture, vec4(rTexture.r, gTexture.g, bTexture.b, texture.a), mixValue);

    gl_FragColor = texture;
  }
`;

export default DisplacementFs;
