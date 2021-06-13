import EventEmitter from 'events';
import {
  Plane, Raycaster, Vector2, Vector3,
} from 'three';

export default class InteractiveControls extends EventEmitter {
  get enabled () {
    return this._enabled;
  }

  constructor (camera, el) {
    super();

    this.camera = camera;
    this.el = el || window;

    this.plane = new Plane();
    this.raycaster = new Raycaster();

    this.mouse = new Vector2();
    this.offset = new Vector3();
    this.intersection = new Vector3();

    this.objects = [];
    this.hovered = null;
    this.selected = null;

    this.isDown = false;

    this.enable();
  }

  enable () {
    if (this.enabled) {
      return;
    }
    this.addListeners();
    this._enabled = true;
  }

  disable () {
    if (!this.enabled) {
      return;
    }
    this.removeListeners();
    this._enabled = false;
  }

  addListeners () {
    this.handlerDown = this.onDown.bind(this);
    this.handlerMove = this.onMove.bind(this);
    this.handlerUp = this.onUp.bind(this);
    this.handlerLeave = this.onLeave.bind(this);

    window.addEventListener('mousedown', this.handlerDown);
    window.addEventListener('mousemove', this.handlerMove);
    window.addEventListener('mouseup', this.handlerUp);
    window.addEventListener('mouseleave', this.handlerLeave);
  }

  removeListeners () {
    window.removeEventListener('mousedown', this.handlerDown);
    window.removeEventListener('mousemove', this.handlerMove);
    window.removeEventListener('mouseup', this.handlerUp);
    window.removeEventListener('mouseleave', this.handlerLeave);
  }

  resize (x, y, width, height) {
    if (x || y || width || height) {
      this.rect = {height,
        width,
        x,
        y};
    } else if (this.el === window) {
      this.rect = {height: window.innerHeight,
        width: window.innerWidth,
        x: 0,
        y: 0};
    } else {
      this.rect = this.el.getBoundingClientRect();
    }
  }

  onMove (e) {
    const t = e.touches ? e.touches[0] : e;
    const touch = {x: t.clientX,
      y: t.clientY};

    this.mouse.x = (touch.x + this.rect.x) / this.rect.width * 2 - 1;
    this.mouse.y = -((touch.y + this.rect.y) / this.rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      this.intersectionData = intersects[0];

      this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), object.position);

      if (this.hovered !== object) {
        this.emit('interactive-out', {object: this.hovered});
        this.emit('interactive-over', {object});
        this.hovered = object;
      } else {
        this.emit('interactive-move', {intersectionData: this.intersectionData,
          object});
      }
    } else {
      this.intersectionData = null;

      if (this.hovered !== null) {
        this.emit('interactive-out', {object: this.hovered});
        this.hovered = null;
      }
    }
  }

  onDown (e) {
    this.isDown = true;
    this.onMove(e);

    this.emit('interactive-down', {intersectionData: this.intersectionData,
      object: this.hovered,
      previous: this.selected});
    this.selected = this.hovered;

    if (this.selected) {
      if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
        this.offset.copy(this.intersection).sub(this.selected.position);
      }
    }
  }

  onUp (e) {
    this.isDown = false;

    this.emit('interactive-up', {object: this.hovered});
  }

  onLeave (e) {
    this.onUp(e);

    this.emit('interactive-out', {object: this.hovered});
    this.hovered = null;
  }
}
