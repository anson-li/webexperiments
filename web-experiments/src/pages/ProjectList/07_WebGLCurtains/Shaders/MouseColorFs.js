const MouseColorFs = `
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
    finalColor.r += distance / 1.15;
    finalColor.g += abs(0.5 - distance) / 1.25;
    finalColor.b += abs(0.75 - distance) / 2.5 + 0.3;
    gl_FragColor = finalColor;
    
    // vec2 textureCoord = vTextureCoord; // Get the base texture out to manipulate
    // vec4 finalColor = texture2D(uSampler0, textureCoord); // Get the base texture to apply colorshifting to
    // finalColor.rgba += vec4(abs(sin(uTime / 100.0)), 0, 0, 0.0);
    // finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
    // gl_FragColor = finalColor;
  }
`;

export default MouseColorFs;
