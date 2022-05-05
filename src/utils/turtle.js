import * as THREE from "three";
export default class Turtle {
  constructor(scene) {
    this.scene = scene;

    this.lights = [];
    this.group = new THREE.Group();
    this.materials = [];
    this.geometries = [];

    this.defLength = 0.25;
    this.defAngle = 0.4363;
    this.defRadius = 0.05;
    this.defSize = 0.3;

    this.reset();
  }

  reset() {
    this.pos = new THREE.Vector3();
    this.dir = new THREE.Vector3(0, 1, 0);
    this.tension = 0.5;
    this.radius = this.defRadius;
    this.stack = [];
    this.currentCurve = [];

    this.lights.forEach((element) => element.dispose());
    this.scene.remove(this.group);
    this.materials.forEach((element) => element.dispose());
    this.geometries.forEach((element) => element.dispose());

    this.lights = [];
    this.group = new THREE.Group();
    this.materials = [];
    this.geometries = [];

    this.resetMaterial();
    this.scene.add(this.group);
    return this;
  }

  resetMaterial() {
    this.setMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.7,
    });
    return this;
  }

  setMaterial(parameters = {}) {
    this.material = new THREE.MeshStandardMaterial(parameters);
    this.materials.push(this.material);
    return this;
  }

  setTension(tension = 0.5) {
    this.tension = tension;
    return this;
  }

  setRadius(radius = this.defRadius) {
    this.radius = radius;
    return this;
  }

  forward(length = this.defLength) {
    this.pos.addScaledVector(this.dir, length);
    if (this.drawing) this.currentCurve.push(this.pos.clone());
    return this;
  }

  rotate(axis, angle) {
    this.dir.applyAxisAngle(axis, angle);
    return this;
  }

  rotateX(angle = this.defAngle) {
    this.rotate(new THREE.Vector3(1, 0, 0), angle);
    return this;
  }

  rotateY(angle = this.defAngle) {
    this.rotate(new THREE.Vector3(0, 1, 0), angle);
    return this;
  }

  rotateZ(angle = this.defAngle) {
    this.rotate(new THREE.Vector3(0, 0, 1), angle);
    return this;
  }

  startLine() {
    if (this.drawing) return this;
    this.drawing = true;
    this.currentCurve.push(this.pos.clone());
    return this;
  }

  endLine() {
    if (!this.drawing) return this;
    this.drawing = false;
    if (this.currentCurve.length <= 1) {
      this.currentCurve.length = 0;
      return this;
    }
    const curve = new THREE.CatmullRomCurve3(
      this.currentCurve,
      false,
      "catmullrom",
      this.tension
    );

    const tubularSegments = this.currentCurve.length * 5;

    const geometry = new THREE.TubeGeometry(
      curve,
      tubularSegments,
      this.radius,
      8,
      false
    );
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    this.group.add(mesh);

    this.currentCurve.length = 0;
    return this;
  }

  push() {
    if (this.drawing) {
      this.endLine();
      this.startLine();
    }
    this.stack.push({
      pos: this.pos.clone(),
      dir: this.dir.clone(),
      material: this.material,
      tension: this.tension,
      radius: this.radius,
    });
    return this;
  }

  pop() {
    if (this.drawing) {
      this.endLine();
      this.startLine();
    }
    const x = this.stack.pop();
    if (!x) return this;
    Object.assign(this, x);
    return this;
  }

  sphere(radius = this.defSize / 2) {
    const geometry = new THREE.IcosahedronGeometry(radius, 5);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  box(width = this.defSize, height = this.defSize, depth = this.defSize) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  cube(side = this.defSize) {
    this.box(side, side, side);
    return this;
  }

  cone(radius = this.defSize, height = this.defSize) {
    const geometry = new THREE.ConeGeometry(radius, height);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.geometry.rotateX(Math.PI / 2);
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  do(command) {
    switch (command.sym) {
      case "x":
        this.rotateX(-this.defAngle);
        break;
      case "X":
        this.rotateX();
        break;
      case "y":
        this.rotateY(-this.defAngle);
        break;
      case "Y":
        this.rotateY();
        break;
      case "z":
        this.rotateZ(-this.defAngle);
        break;
      case "Z":
        this.rotateZ();
        break;
      case "fwd":
        this.forward();
        break;
      case "start":
        this.startLine();
        break;
      case "end":
        this.endLine();
        break;
      case "[":
        this.push();
        break;
      case "]":
        this.pop();
        break;
      case "sphere":
        this.sphere();
        break;
      case "box":
        this.box();
        break;
      case "cube":
        this.cube();
        break;
      case "cone":
        this.cone();
        break;
      case "rad":
        this.setRadius();
        break;
      case "tens":
        this.setTension();
        break;
      case "mat":
        this.setMaterial();
        break;

      default:
        break;
    }
  }
}
