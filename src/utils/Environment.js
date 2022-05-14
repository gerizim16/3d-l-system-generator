import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.lights = [];
    this.materials = [];
    this.geometries = [];
    this.objects = [];
  }

  dispose() {
    this.scene.fog = null;
    this.objects.forEach((element) => this.scene.remove(element));
    this.lights.forEach((element) => {
      this.scene.remove(element);
      element.dispose();
    });
    this.materials.forEach((element) => {
      this.scene.remove(element);
      element.dispose();
    });
    this.geometries.forEach((element) => {
      this.scene.remove(element);
      element.dispose();
    });
  }
}

export class NatureEnvironment extends Environment {
  constructor(scene) {
    super(scene);
    this.scene.fog = new THREE.FogExp2(0xd3dee2, 0.02);

    // sky
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.scene.add(sky);
    this.objects.push(sky);
    this.geometries.push(sky.geometry);
    this.materials.push(sky.material);
    const sun = new THREE.Vector3();

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = 5;
    uniforms["rayleigh"].value = 0.4;
    uniforms["mieCoefficient"].value = 0.001;
    uniforms["mieDirectionalG"].value = 0.7;

    const phi = THREE.MathUtils.degToRad(90 - 50);
    const theta = THREE.MathUtils.degToRad(225);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);

    // directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.setFromSphericalCoords(1, phi, theta);
    dirLight.position.multiplyScalar(20);
    this.scene.add(dirLight);
    this.lights.push(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.radius = 4;
    dirLight.shadow.blurSamples = 10;

    const d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    // hemilight
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
    this.lights.push(hemiLight);

    // floor
    const groundGeo = new THREE.PlaneGeometry(10000, 10000);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x748f15,
      roughness: 0.9,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.objects.push(ground);
    this.geometries.push(groundGeo);
    this.materials.push(groundMat);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);
    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHelper);
  }
}

export class DarkNeonEnvironment extends Environment {
  constructor(scene) {
    super(scene);

    // lights
    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight(0xff0000, 10, 4, 10);
    rectLight1.position.set(-5, 5, 10);
    this.scene.add(rectLight1);
    this.lights.push(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0x00ff00, 10, 4, 10);
    rectLight2.position.set(0, 5, 10);
    this.scene.add(rectLight2);
    this.lights.push(rectLight2);

    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 10, 4, 10);
    rectLight3.position.set(5, 5, 10);
    this.scene.add(rectLight3);
    this.lights.push(rectLight3);

    const rectLightHelp1 = new RectAreaLightHelper(rectLight1);
    const rectLightHelp2 = new RectAreaLightHelper(rectLight2);
    const rectLightHelp3 = new RectAreaLightHelper(rectLight3);
    this.scene.add(rectLightHelp1);
    this.scene.add(rectLightHelp2);
    this.scene.add(rectLightHelp3);
    this.lights.push(rectLightHelp1);
    this.lights.push(rectLightHelp2);
    this.lights.push(rectLightHelp3);

    // floor
    const groundGeo = new THREE.PlaneGeometry(10000, 10000);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x748f15,
      roughness: 0.1,
      metalness: 0,
    });

    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.geometries.push(groundGeo);
    this.materials.push(groundMat);
    this.objects.push(ground);
  }
}

export const ENVIRONMENTS = Object.freeze([
  NatureEnvironment,
  DarkNeonEnvironment,
]);

export class EnvironmentSwitcher {
  constructor(scene) {
    this.scene = scene;
    this.env = new NatureEnvironment(scene);
  }

  setEnvironment(name) {
    this.env.dispose();
    for (const env of ENVIRONMENTS) {
      if (env.name == name) {
        this.env = new env(this.scene);
        break;
      }
    }
  }
}
