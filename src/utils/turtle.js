import * as THREE from "three";

function assignExisting(target, source) {
  Object.keys(source)
    .filter((key) => key in target)
    .forEach((key) => (target[key] = source[key]));
}

const defaults = Object.freeze({
  length: 0.2,
  angle: 0.4,
  radius: 0.05,
  size: 0.3,
});
export default class Turtle {
  scene;
  lights;
  material;
  materials;
  geometries;
  pos;
  dir;
  tension;
  radius;

  static defaults = defaults;

  constructor(scene) {
    this.scene = scene;

    this.lights = [];
    this.group = new THREE.Group();
    this.materials = [];
    this.geometries = [];

    this.defaults = Object.assign({}, Turtle.defaults);

    this.reset();
  }

  reset() {
    this.pos = new THREE.Vector3();
    this.dir = new THREE.Vector3(0, 1, 0);
    this.tension = 0.5;
    this.radius = this.defaults.radius;
    this.stack = [];
    this.currentCurve = [];

    this.scene.remove(this.group);
    this.lights.forEach((element) => element.dispose());
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
    this.setMaterial();
    return this;
  }

  setDefaults(new_defaults = {}) {
    assignExisting(this.defaults, new_defaults);
    return this;
  }

  setMaterial(
    color = 0xffffff,
    roughness = 0.1,
    metalness = 0.1,
    flatShading = false,
    fog = true,
    wireframe = false
  ) {
    this.material = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      flatShading,
      fog,
      wireframe,
    });
    this.materials.push(this.material);
    return this;
  }

  setTension(tension = 0.5) {
    this.tension = tension;
    return this;
  }

  setRadius(radius = this.defaults.radius) {
    this.radius = radius;
    return this;
  }

  forward(length = this.defaults.length) {
    this.pos.addScaledVector(this.dir, length);
    if (this.drawing) this.currentCurve.push(this.pos.clone());
    return this;
  }

  rotate(axis, angle) {
    this.dir.applyAxisAngle(axis, angle);
    return this;
  }

  rotateX(angle = this.defaults.angle) {
    this.rotate(new THREE.Vector3(1, 0, 0), angle);
    return this;
  }

  rotateY(angle = this.defaults.angle) {
    this.rotate(new THREE.Vector3(0, 1, 0), angle);
    return this;
  }

  rotateZ(angle = this.defaults.angle) {
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
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.group.add(mesh);

    this.currentCurve.length = 0;
    return this;
  }

  line(
    length = this.defaults.length,
    startR = this.radius,
    endR = this.radius
  ) {
    const geometry = new THREE.CylinderGeometry(endR, startR, length);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.lookAt(this.dir);
    mesh.geometry.rotateX(Math.PI / 2);
    mesh.position.copy(this.pos);
    mesh.geometry.translate(0, 0, length / 2);
    this.group.add(mesh);

    this.forward(length);
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

  sphere(radius = this.defaults.size / 2) {
    const geometry = new THREE.IcosahedronGeometry(radius, 5);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.position.copy(this.pos);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.group.add(mesh);

    return this;
  }

  box(
    width = this.defaults.size,
    height = this.defaults.size,
    depth = this.defaults.size
  ) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  cube(side = this.defaults.size) {
    this.box(side, side, side);
    return this;
  }

  cone(radius = this.defaults.size / 2, height = this.defaults.size) {
    const geometry = new THREE.ConeGeometry(radius, height);
    this.geometries.push(geometry);

    const mesh = new THREE.Mesh(geometry, this.material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.geometry.rotateX(Math.PI / 2);
    mesh.lookAt(this.dir);
    mesh.position.copy(this.pos);
    this.group.add(mesh);

    return this;
  }

  do(command) {
    switch (command.sym) {
      case "+x":
        this.rotateX(command.params[0]);
        break;
      case "-x":
        this.rotateX(command.params[0] ?? -this.defaults.angle);
        break;
      case "+y":
        this.rotateY(command.params[0]);
        break;
      case "-y":
        this.rotateY(command.params[0] ?? -this.defaults.angle);
        break;
      case "+z":
        this.rotateZ(command.params[0]);
        break;
      case "-z":
        this.rotateZ(command.params[0] ?? -this.defaults.angle);
        break;
      case "f":
        this.forward(...command.params);
        break;
      case "s":
        this.startLine();
        break;
      case "e":
        this.endLine();
        break;
      case "l":
        this.line(...command.params);
        break;
      case "[":
        this.push();
        break;
      case "]":
        this.pop();
        break;
      case "sphere":
        this.sphere(...command.params);
        break;
      case "box":
        this.box(...command.params);
        break;
      case "cube":
        this.cube(...command.params);
        break;
      case "cone":
        this.cone(...command.params);
        break;
      case "r":
        this.setRadius(...command.params);
        break;
      case "t":
        this.setTension(...command.params);
        break;
      case "m":
        this.setMaterial(...command.params);
        break;

      default:
        break;
    }
  }
}
