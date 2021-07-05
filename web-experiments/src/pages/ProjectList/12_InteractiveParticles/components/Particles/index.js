/* eslint-disable id-match */
import {
  TweenLite, Power4,
} from 'gsap';
import {
  Object3D, TextureLoader, LinearFilter, RGBFormat, Vector2, RawShaderMaterial,
  InstancedBufferGeometry, BufferAttribute, InstancedBufferAttribute, Mesh, PlaneGeometry, MeshBasicMaterial,
} from 'three';
import fs from './Shaders/fs';
import vs from './Shaders/vs';
import TouchTexture from './TouchTexture';

export default class Particles {
  constructor (webgl) {
    this.hide = this.hide.bind(this);
    this.init = this.init.bind(this);
    this.handlerInteractiveMove = this.onInteractiveMove.bind(this);

    this.texture = null;
    this.width = null;
    this.height = null;

    this.webgl = webgl;
    this.container = new Object3D();
    this.object3D = null;
  }

  init (src) {
    const loader = new TextureLoader();

    // FIXME: Point to src instead of imageref.default to randomize image
    loader.load(src.default, (texture) => {
      this.texture = texture;
      this.texture.minFilter = LinearFilter;
      this.texture.magFilter = LinearFilter;
      this.texture.format = RGBFormat;

      this.width = texture.image.width;
      this.height = texture.image.height;

      this.initPoints(true);
      this.initHitArea();
      this.initTouch();
      this.resize();
      this.show();
    }, undefined, (error) => {
      console.log(error);
    });
  }

  initPoints (discard) {
    this.numPoints = this.width * this.height;

    let numVisible = this.numPoints;
    let threshold = 0;
    let originalColors;

    if (discard) {
      // discard pixels darker than threshold #22
      numVisible = 0;
      threshold = 34;

      const img = this.texture.image;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = this.width;
      canvas.height = this.height;
      ctx.scale(1, -1);
      ctx.drawImage(img, 0, 0, this.width, this.height * -1);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalColors = Float32Array.from(imgData.data);

      for (let i = 0; i < this.numPoints; i++) {
        if (originalColors[i * 4 + 0] > threshold) {
          numVisible++;
        }
      }

      // console.log('numVisible', numVisible, this.numPoints);
    }

    const uniforms = {
      uDepth: {value: 2.0},
      uRandom: {value: 1.0},
      uSize: {value: 0.0},
      uTexture: {value: this.texture},
      uTextureSize: {value: new Vector2(this.width, this.height)},
      uTime: {value: 0},
      uTouch: {value: null},
    };

    const material = new RawShaderMaterial({
      depthTest: false,
      fragmentShader: fs,
      transparent: true,
      uniforms,
      vertexShader: vs,

      // blending: THREE.AdditiveBlending
    });

    const geometry = new InstancedBufferGeometry();

    // positions
    const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    geometry.addAttribute('position', positions);

    // uvs
    const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0, 0.0, 0.0);
    uvs.setXYZ(1, 1.0, 0.0);
    uvs.setXYZ(2, 0.0, 1.0);
    uvs.setXYZ(3, 1.0, 1.0);
    geometry.addAttribute('uv', uvs);

    // index
    geometry.setIndex(new BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < this.numPoints; i++) {
      if (discard && originalColors[i * 4 + 0] <= threshold) {
        continue;
      }

      offsets[j * 3 + 0] = i % this.width;
      offsets[j * 3 + 1] = Math.floor(i / this.width);

      indices[j] = i;

      angles[j] = Math.random() * Math.PI;

      j++;
    }

    geometry.addAttribute('pindex', new InstancedBufferAttribute(indices, 1, false));
    geometry.addAttribute('offset', new InstancedBufferAttribute(offsets, 3, false));
    geometry.addAttribute('angle', new InstancedBufferAttribute(angles, 1, false));

    this.object3D = new Mesh(geometry, material);
    this.container.add(this.object3D);
  }

  initTouch () {
    // create only once
    if (!this.touch) {
      this.touch = new TouchTexture(this);
    }
    this.object3D.material.uniforms.uTouch.value = this.touch.texture;
  }

  initHitArea () {
    const geometry = new PlaneGeometry(this.width, this.height, 1, 1);
    const material = new MeshBasicMaterial({color: 0xFFFFFF,
      depthTest: false,
      wireframe: true});
    material.visible = false;
    this.hitArea = new Mesh(geometry, material);
    this.container.add(this.hitArea);
  }

  addListeners () {
    this.webgl.interactive.addListener('interactive-move', this.handlerInteractiveMove);
    this.webgl.interactive.objects.push(this.hitArea);
    this.webgl.interactive.enable();
  }

  removeListeners () {
    this.webgl.interactive.removeListener('interactive-move', this.handlerInteractiveMove);

    const index = this.webgl.interactive.objects.findIndex((obj) => {
      return obj === this.hitArea;
    });
    this.webgl.interactive.objects.splice(index, 1);
    this.webgl.interactive.disable();
  }

  update (delta) {
    if (!this.object3D) {
      return;
    }
    if (this.touch) {
      this.touch.update();
    }

    this.object3D.material.uniforms.uTime.value += delta;
  }

  show (time = 1.0) {
    // reset
    TweenLite.fromTo(this.object3D.material.uniforms.uSize, time, {value: 0.5}, {value: 0.8});
    TweenLite.to(this.object3D.material.uniforms.uRandom, time, {value: 2.0});
    TweenLite.fromTo(this.object3D.material.uniforms.uDepth, time * 1.5, {value: 40.0}, {value: 4.0});

    this.addListeners();
  }

  hide (_destroy, time = 0.8) {
    if (this.object3D) {
      return new Promise((resolve, reject) => {
        TweenLite.to(this.object3D.material.uniforms.uRandom, time, {onComplete: () => {
          if (_destroy) {
            this.destroy();
          }
          resolve();
        },
        value: 5.0});
        TweenLite.to(this.object3D.material.uniforms.uDepth, time, {ease: Power4,
          value: -20.0});
        TweenLite.to(this.object3D.material.uniforms.uSize, time * 0.8, {value: 0.0});

        this.removeListeners();
      });
    }

    return Promise.resolve(true);
  }

  destroy () {
    if (!this.object3D) {
      return;
    }

    this.object3D.parent.remove(this.object3D);
    this.object3D.geometry.dispose();
    this.object3D.material.dispose();
    this.object3D = null;

    if (!this.hitArea) {
      return;
    }

    this.hitArea.parent.remove(this.hitArea);
    this.hitArea.geometry.dispose();
    this.hitArea.material.dispose();
    this.hitArea = null;
  }

  resize () {
    if (!this.object3D) {
      return;
    }

    const scale = this.webgl.fovHeight / this.height;
    this.object3D.scale.set(scale, scale, 1);
    this.hitArea.scale.set(scale, scale, 1);
  }

  onInteractiveMove (e) {
    const uv = e.intersectionData.uv;
    if (this.touch) {
      this.touch.addTouch(uv);
    }
  }
}
