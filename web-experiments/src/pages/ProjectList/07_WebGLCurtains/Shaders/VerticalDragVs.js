const VerticalDragVs = `
  precision mediump float;

  // those are the mandatory attributes that the lib sets
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  // those are mandatory uniforms that the lib sets and that contain our model view and projection matrix
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;
      
  // our texture matrix uniform (this is the lib default name, but it could be changed)
  uniform mat4 uTextureMatrix0;

  // our time uniform
  uniform float uTime;

  // our mouse position uniform
  uniform vec2 uMousePosition;

  // our mouse strength
  uniform float uMouseStrength;

  // if you want to pass your vertex and texture coords to the fragment shader
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    vec2 mousePos = uMousePosition;
    mousePos.x = vertexPosition.x; // Lockout vertical position and use horizontal position only

    // get the distance between our vertex and the mouse position
    float distanceFromMouse = distance(mousePos, vec2(vertexPosition.x, vertexPosition.y));

    // this will define how close the ripples will be from each other. The bigger the number, the more ripples you'll get
    float rippleFactor = 1.0;
    // calculate our ripple effect
    float rippleEffect = cos(rippleFactor * (distanceFromMouse));

    // calculate our distortion effect
    float distortionEffect = rippleEffect * uMouseStrength;

    // apply it to our vertex position
    vertexPosition.z += distortionEffect / 20.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

    // varyings
    // thanks to the texture matrix we will be able to calculate accurate texture coords
    // so that our texture will always fit our plane without being distorted
      vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
      vVertexPosition = vertexPosition;
  }
`;

export default VerticalDragVs;
