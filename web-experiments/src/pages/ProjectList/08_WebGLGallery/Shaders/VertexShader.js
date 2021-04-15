const VertexShader = `
  precision mediump float;
        
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 uTextureMatrix0;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform float uPlaneDeformation;

  void main() {
    vec3 vertexPosition = aVertexPosition;

    float rippleFactor = 0.05;
    float offsetPosition = vertexPosition.y;
    float rippleEffect = cos(rippleFactor * (uPlaneDeformation)) * offsetPosition;
    float distortionEffect = rippleEffect * uPlaneDeformation;
    vertexPosition.z += distortionEffect / 500.0;

    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

export default VertexShader;
