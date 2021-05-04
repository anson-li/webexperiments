import React, {
  PureComponent,
} from 'react';
import {
  Scene, PerspectiveCamera, PointLight, WebGLRenderer, Color, ShaderMaterial, Mesh, IcosahedronGeometry,
} from 'three';
import {
  EffectComposer,
} from 'three/examples/jsm/postprocessing/EffectComposer';
import {
  RenderPass,
} from 'three/examples/jsm/postprocessing/RenderPass';
import {
  ShaderPass,
} from 'three/examples/jsm/postprocessing/ShaderPass';
import PerlinFs from './PerlinFs';
import PerlinVs from './PerlinVs';
import styles from './style.module.scss';

class ThreeJS extends PureComponent {
  constructor (props) {
    super(props);

    this.init = this.init.bind(this);
    this.renderScene = this.renderScene.bind(this);
    this.resizeRenderer = this.resizeRenderer.bind(this);
    this.stop = this.stop.bind(this);

    this.backLight = null;
    this.ambientLight = null;
    this.mainScene = null;
    this.mainCamera = null;
    this.fillLight = null;
    this.keyLight = null;
    this.renderer = null;
    this.loader = null;
    this.modelContainer = null;
    this.requestId = null;
    this.finalComposer = null;
    this.material = null;
    this.mesh = null;
    this.start = Date.now();
  }

  componentDidMount () {
    setTimeout(() => {
      this.init();
    }, 1000);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeRenderer);
    this.mount.removeChild(this.renderer.domElement);
    this.stop();

    this.loader = null;
    this.scene = null;
    this.camera = null;
    this.composer = null;
    this.renderer = null;
  }

  // Create Scene + Camera
  init () {
    this.mainScene = new Scene();
    this.start = Date.now();

    // PerspectiveCamera documentation:
    // camera frustrum field of view
    // camera aspect ratio
    // near plane, or the minimum range to start rendering. If it's too high, stuff that's too close will be missed.
    // far plane, or the maximum range to render. Important to note it's affecting your render quality too.

    this.mainCamera = new PerspectiveCamera(
      15,
      this.props.width / this.props.height,
      1,
      10000,
    );

    this.mainCamera.position.z = 100;
    this.mainCamera.position.y = 10;

    // Add Point Lights
    this.backLight = new PointLight(0xdbc0b3, 3, 20);
    this.backLight.position.set(-5, 5, 3);
    this.mainScene.add(this.backLight);

    this.fillLight = new PointLight(0xe0b8c7, 0.7, 20);
    this.fillLight.position.set(5, 0, 5);
    this.mainScene.add(this.fillLight);

    this.keyLight = new PointLight(0xc29999, 2, 20);
    this.keyLight.position.set(5, 0, 0);
    this.mainScene.add(this.keyLight);

    // Create Renderer
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.devicePixelRatio > 1) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
    }
    this.mount.appendChild(this.renderer.domElement);

    this.material = new ShaderMaterial({
      fragmentShader: PerlinFs,
      uniforms: {time: {
        type: 'f',
        value: 0.0,
      }},
      vertexShader: PerlinVs,
    });
    this.mesh = new Mesh(
      new IcosahedronGeometry(20, 4),
      this.material,
    );
    this.mainScene.add(this.mesh);

    this.finalComposer = new EffectComposer(this.renderer);

    // Add color pass to 'wash out' the image
    const colorShader = {
      fragmentShader: `
        uniform vec3 color;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        void main() {
          vec4 previousPassColor = texture2D(tDiffuse, vUv);
          gl_FragColor = vec4(
              previousPassColor.rgb + color,
              previousPassColor.a);
        }
      `,
      uniforms: {
        color: {value: new Color(0x160b00)},
        tDiffuse: {value: null},
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
        }
      `,
    };

    const colorPass = new ShaderPass(colorShader);
    colorPass.renderToScreen = true;

    this.finalComposer.addPass(new RenderPass(this.mainScene, this.mainCamera));
    this.finalComposer.addPass(colorPass);

    window.addEventListener('resize', this.resizeRenderer);
    this.renderScene();
  }

  // Handle Window Resize
  resizeRenderer () {
    this.mainCamera.aspect = window.innerWidth / window.innerHeight;
    this.mainCamera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Render Scene
  renderScene () {
    this.material.uniforms.time.value = 0.00025 * (Date.now() - this.start);
    this.renderer.render(this.mainScene, this.mainCamera);
    this.finalComposer.render();
    this.requestId = requestAnimationFrame(this.renderScene);
  }

  stop () {
    cancelAnimationFrame(this.requestId);
    this.requestId = undefined;
  }

  render () {
    return (
      <div
        className={styles.canvas}
        ref={(ref) => {
          this.mount = ref;
        }} />
    );
  }
}

export default ThreeJS;
