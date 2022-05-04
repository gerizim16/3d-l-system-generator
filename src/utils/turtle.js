import * as THREE from "three";
export default class Turtle {
  constructor(scene) {
    this.scene = scene;

    this.lights = [];
    this.group = new THREE.Group();
    this.materials = [];
    this.geometries = [];

    this.reset();
  }

  reset() {
    this.pos = new THREE.Vector3();
    this.dir = new THREE.Vector3(0, 1, 0);
    this.tension = 0.5;
    this.radius = 1;
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

  setTension(tension) {
    this.tension = tension;
    return this;
  }

  setRadius(radius) {
    this.radius = radius;
    return this;
  }

  forward(length) {
    this.pos.addScaledVector(this.dir, length);
    if (this.drawing) this.currentCurve.push(this.pos.clone());
    return this;
  }

  rotate(axis, angle) {
    this.dir.applyAxisAngle(axis, angle);
    return this;
  }

  rotateX(angle) {
    this.rotate(new THREE.Vector3(1, 0, 0), angle);
    return this;
  }

  rotateY(angle) {
    this.rotate(new THREE.Vector3(0, 1, 0), angle);
    return this;
  }

  rotateZ(angle) {
    this.rotate(new THREE.Vector3(0, 0, 1), angle);
    return this;
  }

  startLine() {
    this.drawing = true;
    this.currentCurve.push(this.pos.clone());
    return this;
  }

  endLine() {
    if (!this.drawing) return this;
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

    this.drawing = false;
    this.currentCurve.length = 0;
    return this;
  }

  push() {
    if (this.drawing) this.endLine();
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
    if (this.drawing) this.endLine();
    const x = this.stack.pop();
    if (!x) return;
    Object.assign(this, x);
    return this;
  }

  sphere(radius) {
    const geometry = new THREE.IcosahedronGeometry(radius, 5);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  box(width, height, depth) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  cube(side) {
    this.box(side, side, side);
    return this;
  }

  cone(radius, height) {
    const geometry = new THREE.ConeGeometry(radius, height);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.geometry.rotateX(Math.PI / 2);
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }
}
