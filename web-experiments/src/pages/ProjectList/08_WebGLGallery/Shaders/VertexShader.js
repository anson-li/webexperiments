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
  uniform float uPlanePosition;
  uniform float uPlaneVelocity;

  void main() {
    vec3 vertexPosition = aVertexPosition;
    
    float rippleFactor = 1.0;
    float offsetPosition = vertexPosition.y;
    float rippleEffect = cos(rippleFactor * uPlanePosition) * vertexPosition.y;
    float distortionEffect = rippleEffect * uPlaneDeformation * pow(uPlanePosition, 1.0);
    vertexPosition.z += distortionEffect / 150.0;
    
    float relativeOffset = vertexPosition.y / 80.0;
    vertexPosition.z += uPlanePosition / 40.0 * uPlaneVelocity;

    // TODO: Update the second value (lower = larger) so that it goes in when in the middle of the page
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    // varyings
    vVertexPosition = aVertexPosition;
    vTextureCoord = (uTextureMatrix0 * vec4(aTextureCoord, 0.0, 1.0)).xy;
  }
`;

export default VertexShader;
