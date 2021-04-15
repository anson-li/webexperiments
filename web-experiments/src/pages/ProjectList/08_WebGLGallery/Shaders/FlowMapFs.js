const FlowMapFs = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;

  uniform sampler2D uFlowMap;

  uniform vec2 uMousePosition;
  uniform float uFalloff;
  uniform float uAlpha;
  uniform float uDissipation;

  uniform vec2 uVelocity;
  uniform float uAspect;

  void main() {
    vec2 textCoords = vTextureCoord;    

    vec4 color = texture2D(uFlowMap, textCoords) * uDissipation;
    //vec4 color = vec4(0.0, 0.0, 0.0, 1.0) * uDissipation;

    vec2 mouseTexPos = (uMousePosition + 1.0) * 0.5;
    vec2 cursor = vTextureCoord - mouseTexPos;
    cursor.x *= uAspect;

    vec3 stamp = vec3(uVelocity * vec2(1.0, -1.0), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
    float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;
    color.rgb = mix(color.rgb, stamp, vec3(falloff));

    gl_FragColor = color;
}
`;

export default FlowMapFs;
