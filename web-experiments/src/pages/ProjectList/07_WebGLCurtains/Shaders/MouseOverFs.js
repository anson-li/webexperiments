const MouseOverFs = `
  precision mediump float;

  varying vec2 vTextureCoord;

  uniform float uTime;
  uniform sampler2D uSampler0;

  // vertex position (relative position of each point)
  varying vec3 vVertexPosition;

  // our mouse position uniform
  uniform vec2 uMousePosition;

  uniform float uProgress;

  // our mouse strength
  uniform float uMouseStrength;

  // Reference: https://thebookofshaders.com/03/
  // https://github.com/martinlaxenaire/curtainsjs/blob/master/examples/vertex-coords-helper/js/coord.helper.setup.js
  void main() {
    vec2 textureCoord = vTextureCoord; // Get the base texture out to manipulate
    float progress = uProgress;
    float d = -progress * 0.5;
    vec2 centerInterp = (textureCoord - 0.5) * d;
  
    vec2 r = centerInterp * (progress * 0.6 + 0.4) + textureCoord;
    vec2 g = centerInterp * (progress * 0.9 + 0.1) + textureCoord;
    vec2 b = centerInterp * (progress * 0.9 + 0.1) + textureCoord;

    vec4 finalColor = vec4( texture2D( uSampler0, r).r , texture2D( uSampler0, g).g, texture2D( uSampler0, b).b , 1.); 
    gl_FragColor = finalColor;
  }
`;

export default MouseOverFs;
