const ColorFs = `
  precision mediump float;

  varying vec2 vTextureCoord;

  uniform float uTime;
  uniform sampler2D uSampler0;

  void main() {
    vec2 textureCoord = vTextureCoord; // Get the base texture out to manipulate
    vec4 finalColor = texture2D(uSampler0, textureCoord); // Get the base texture to apply colorshifting to
    finalColor.rgba += vec4(abs(sin(uTime / 100.0)) / 3.0, abs(cos(uTime / 100.0)) / 3.0, 0.0, 0.0);
    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);
    gl_FragColor = finalColor;
  }
`;

export default ColorFs;
