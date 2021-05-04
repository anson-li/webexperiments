const DitheringFs = `
  precision mediump float;

  varying vec3 vVertexPosition;
  varying vec2 vTextureCoord;
  
  uniform vec2 uMousePosition;
  uniform sampler2D uSampler0;
  
  uniform float uTime;
  
  // Perlin Noise (Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
  float noise(vec3 P) {
    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0); gx1 = fract(gx1);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
      g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
      g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
      g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));
    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
      dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
      vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
        dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
  }

  float noise(vec2 P) { return noise(vec3(P, 0.0)); }
  float fractal(vec3 P) {
    float f = 0., s = 1.;
    for (int i = 0 ; i < 9 ; i++) {
      f += noise(s * P) / s;
      s *= 2.;
      P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
    }
    return f;
  }
  float turbulence(vec3 P) {
    float f = 0., s = 1.;
    for (int i = 0 ; i < 9 ; i++) {
      f += abs(noise(s * P)) / s;
      s *= 2.;
      P = vec3(.866 * P.x + .5 * P.z, P.y + 100., -.5 * P.x + .866 * P.z);
    }
    return f;
  }

  vec3 clouds(float x, float y) {
    float L = turbulence(vec3(x, y, uTime * .001));
    return vec3(noise(vec3(.5, .5, L) * .7));
  }

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

    vec3 color;
  
    vec3 cloudEffect = clouds(vVertexPosition.x, vVertexPosition.y);
    color = cloudEffect + vec3(.95, .8, 0.95);

    float distance = distance(vec2(vVertexPosition.x, vVertexPosition.y), uMousePosition);

    // The farther the distance, the closer opacity should hit 1

    // isRevealed is 0 when within mouse radius and 1 when outside mouse radius
    // Adding min to clamp max distance to 1
    float isRevealed = min(distance / 1.5, 0.5);
    
    // color.r is one noise sample we're going to use in the opacity
    // should only use color when isRevealed is equal to 0

    float opacity = isRevealed;
    if (isRevealed < 1.0 && isRevealed != 0.) {
      opacity = floor(isRevealed * color.r * 5. + 0.5);
    }
    
    if (opacity == 1.0) {
      finalColor = vec4(
        step(bayerValue, finalColor.r),
        step(bayerValue, finalColor.g),
        step(bayerValue, finalColor.b),
        finalColor.a);
        // Convert to greyscale using luminance (https://www.programmersought.com/article/43404192116/)
        float luminance = 0.299 * finalColor.r + 0.587 * finalColor.g + 0.114 * finalColor.b;
        gl_FragColor = vec4(luminance, luminance, luminance, finalColor.a);    
    } else {
      gl_FragColor = finalColor;
    }

  }
`;

export default DitheringFs;
