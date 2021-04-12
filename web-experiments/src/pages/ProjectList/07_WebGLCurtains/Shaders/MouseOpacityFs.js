const MouseOpacityFs = `
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
    // vec4 finalColor = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 textureCoord = vTextureCoord; // Get the base texture out to manipulate
    float distance = distance(vec2(vVertexPosition.x, vVertexPosition.y), uMousePosition);
    vec4 finalColor = texture2D(uSampler0, textureCoord); // Get the base texture to apply colorshifting to
    finalColor.a -= distance / 1.5 - 0.1;
    finalColor.rgba += vec4(0.25, 0, 0, 0.0);
    gl_FragColor = finalColor;
  }
`;

export default MouseOpacityFs;
