const FragmentShader = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D uSampler0;
    
  void main() {
    vec2 textureCoord = vTextureCoord;    
    gl_FragColor = texture2D(uSampler0, vTextureCoord);
  }
`;

export default FragmentShader;
