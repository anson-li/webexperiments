const DragFs = `
  precision mediump float;

  // get our varyings
  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  // our texture sampler (this is the lib default name, but it could be changed)
  uniform sampler2D uSampler0;

  void main() {
    // get our texture coords
    vec2 textureCoords = vTextureCoord;

    // apply our texture
    vec4 finalColor = texture2D(uSampler0, textureCoords);

    // fake shadows based on vertex position along Z axis
    finalColor.rgb -= clamp(-vVertexPosition.z, 0.0, 1.0);
    // fake lights based on vertex position along Z axis
    finalColor.rgb += clamp(vVertexPosition.z, 0.0, 1.0);

    // handling premultiplied alpha (useful if we were using a png with transparency)
    finalColor = vec4(finalColor.rgb * finalColor.a, finalColor.a);

    gl_FragColor = finalColor;
  }
`;

export default DragFs;
