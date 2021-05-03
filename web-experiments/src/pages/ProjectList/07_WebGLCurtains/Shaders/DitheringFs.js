const DitheringFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform sampler2D uSampler0;
  
  uniform float uTime;
  
  void main() {
    mat4 bayerIndex = mat4(
      vec4(00.0/16.0, 12.0/16.0, 03.0/16.0, 15.0/16.0),
      vec4(08.0/16.0, 04.0/16.0, 11.0/16.0, 07.0/16.0),
      vec4(02.0/16.0, 14.0/16.0, 01.0/16.0, 13.0/16.0),
      vec4(10.0/16.0, 06.0/16.0, 09.0/16.0, 05.0/16.0));

    vec2 textureCoords = vTextureCoord;

    // apply our texture
    vec4 finalColor = texture2D(uSampler0, textureCoords);

    finalColor = vec4(pow(finalColor.rgb,vec3(2.2)) - 0.004, finalColor.a);

    int x = int(abs(gl_FragCoord.x)) - (4 * int(floor(abs(gl_FragCoord.x) / 4.0)));
    int y = int(abs(gl_FragCoord.y)) - (4 * int(floor(abs(gl_FragCoord.y) / 4.0)));

    float bayerValue = 05.0/16.0;

    // Gross loop unrolling because of GL ES Specifications: https://stackoverflow.com/questions/19529690/index-expression-must-be-constant-webgl-glsl-error
    if (x == 0 && y == 0) {
      bayerValue = bayerIndex[0][0];
    } else if (x == 0 && y == 1) {
      bayerValue = bayerIndex[0][1];
    } else if (x == 0 && y == 2) {
      bayerValue = bayerIndex[0][2];
    } else if (x == 0 && y == 3) {
      bayerValue = bayerIndex[0][3];
    } else if (x == 1 && y == 0) {
      bayerValue = bayerIndex[1][0];
    } else if (x == 1 && y == 1) {
      bayerValue = bayerIndex[1][1];
    } else if (x == 1 && y == 2) {
      bayerValue = bayerIndex[1][2];
    } else if (x == 1 && y == 3) {
      bayerValue = bayerIndex[1][3];
    } else if (x == 2 && y == 0) {
      bayerValue = bayerIndex[2][0];
    } else if (x == 2 && y == 1) {
      bayerValue = bayerIndex[2][1];
    } else if (x == 2 && y == 2) {
      bayerValue = bayerIndex[2][2];
    } else if (x == 2 && y == 3) {
      bayerValue = bayerIndex[2][3];
    } else if (x == 3 && y == 0) {
      bayerValue = bayerIndex[3][0];
    } else if (x == 3 && y == 1) {
      bayerValue = bayerIndex[3][1];
    } else if (x == 3 && y == 2) {
      bayerValue = bayerIndex[3][2];
    } else if (x == 3 && y == 3) {
      bayerValue = bayerIndex[3][3];
    }

    gl_FragColor = vec4(
      step(bayerValue, finalColor.r),
      step(bayerValue, finalColor.g),
      step(bayerValue, finalColor.b),
      finalColor.a);

  }
`;

export default DitheringFs;
