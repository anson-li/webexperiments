const DisplacementVs = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  // default mandatory variables
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  // custom variables
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {

    gl_Position = vec4(aVertexPosition, 1.0);
    // set the varyings
    vTextureCoord = aTextureCoord;
    vVertexPosition = aVertexPosition;
  }
`;

export default DisplacementVs;
