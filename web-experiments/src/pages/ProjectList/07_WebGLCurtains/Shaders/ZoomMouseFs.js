const ZoomMouseFs = `
  precision mediump float;

  varying vec2 vTextureCoord;

  uniform float uTime;
  uniform sampler2D uSampler0;

  // vertex position (relative position of each point)
  varying vec3 vVertexPosition;

  // our mouse position uniform
  uniform vec2 uMousePosition;

  // our mouse strength
  uniform float uMouseStrength;

  // Reference: https://thebookofshaders.com/03/
  // https://github.com/martinlaxenaire/curtainsjs/blob/master/examples/vertex-coords-helper/js/coord.helper.setup.js
  void main() {
    vec2 textureCoord = vTextureCoord; // Get the base texture out to manipulate
    float distance = distance(vec2(vVertexPosition.x, vVertexPosition.y), uMousePosition);
    vec2 centerInterp = (textureCoord - 0.5) * distance;
    vec2 scale = centerInterp + textureCoord;

    vec2 r = centerInterp * (0.25) + textureCoord;
    vec2 g = centerInterp * (0.25) + textureCoord;
    vec2 b = centerInterp * (0.25) + textureCoord;

    vec4 finalColor = vec4( texture2D( uSampler0, r).r , texture2D( uSampler0, g).g, texture2D( uSampler0, b).b , 1.); 
    gl_FragColor = finalColor;
  }
`;

export default ZoomMouseFs;
