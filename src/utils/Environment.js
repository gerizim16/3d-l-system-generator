import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import {
  BloomEffect,
  EffectPass,
  GodRaysEffect,
  SMAAEffect,
} from "postprocessing";

export class Environment {
  constructor(scene, composer, camera) {
    this.scene = scene;
    this.composer = composer;
    this.camera = camera;
    this.lights = [];
    this.materials = [];
    this.geometries = [];
    this.objects = [];
    this.effectPass = null;
  }

  initPostEffects() {
    const smaaEffect = new SMAAEffect();

    this.effectPass = new EffectPass(this.camera, smaaEffect);
    this.composer.addPass(this.effectPass);
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
    this.lights.length = 0;
    this.materials.length = 0;
    this.geometries.length = 0;
    this.objects.length = 0;

    this.composer.removePass(this.effectPass);
    if (this.effectPass) this.effectPass.dispose();
    this.effectPass = null;
  }
}

export class NatureEnvironment extends Environment {
  static name = "Nature";
  constructor(scene, composer, camera) {
    super(scene, composer, camera);
    this.scene.fog = new THREE.FogExp2(0xd3dee2, 0.02);

    // sky
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.scene.add(sky);
    this.objects.push(sky);
    this.geometries.push(sky.geometry);
    this.materials.push(sky.material);
    this.sun = new THREE.Vector3();

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = 5;
    uniforms["rayleigh"].value = 0.4;
    uniforms["mieCoefficient"].value = 0.001;
    uniforms["mieDirectionalG"].value = 0.7;

    const phi = THREE.MathUtils.degToRad(90 - 50);
    const theta = THREE.MathUtils.degToRad(225);

    this.sun.setFromSphericalCoords(100, phi, theta);

    uniforms["sunPosition"].value.copy(this.sun);

    // directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.setFromSphericalCoords(1, phi, theta);
    dirLight.position.multiplyScalar(20);
    this.scene.add(dirLight);
    this.lights.push(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    const d = 30;

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
    if (this.composer != null && camera != null) {
      this.initPostEffects();
    }
  }
}

export class DarkNeonEnvironment extends Environment {
  static name = "Dark Neon";
  constructor(scene, composer, camera) {
    super(scene, composer, camera);

    // lights
    RectAreaLightUniformsLib.init();

    const rectLight1 = new THREE.RectAreaLight(0xff0000, 30, 4, 10);
    rectLight1.position.set(-5, 5, 10);
    this.scene.add(rectLight1);
    this.lights.push(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0x00ff00, 10, 4, 10);
    rectLight2.position.set(0, 5, 10);
    this.scene.add(rectLight2);
    this.lights.push(rectLight2);

    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 30, 4, 10);
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

    if (this.composer != null && camera != null) {
      this.initPostEffects();
    }
  }

  initPostEffects() {
    const smaaEffect = new SMAAEffect();

    this.effectPass = new EffectPass(
      this.camera,
      new BloomEffect({
        luminanceThreshold: 0.5,
      }),
      smaaEffect
    );
    this.composer.addPass(this.effectPass);
  }
}

export class SkyEnvironment extends Environment {
  static name = "Sky";
  constructor(scene, composer, camera) {
    super(scene, composer, camera);
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

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    const d = 30;

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

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);
    // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHelper);

    if (this.composer != null && camera != null) {
      this.initPostEffects();
    }
  }
}

export class SunsetEnvironment extends Environment {
  static name = "Sunset";
  constructor(scene, composer, camera) {
    super(scene, composer, camera);
    this.scene.fog = new THREE.FogExp2(0xad9089, 0.02);

    // sky
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.scene.add(sky);
    this.objects.push(sky);
    this.geometries.push(sky.geometry);
    this.materials.push(sky.material);
    this.sun = new THREE.Vector3();

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = 10;
    uniforms["rayleigh"].value = 3;
    uniforms["mieCoefficient"].value = 0.005;
    uniforms["mieDirectionalG"].value = 0.7;

    const phi = THREE.MathUtils.degToRad(90 - 2);
    const theta = THREE.MathUtils.degToRad(0);

    this.sun.setFromSphericalCoords(1000, phi, theta);

    uniforms["sunPosition"].value.copy(this.sun);

    // directional light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.setFromSphericalCoords(1, phi, theta);
    dirLight.position.multiplyScalar(20);
    this.scene.add(dirLight);
    this.lights.push(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;

    const d = 30;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    // hemilight
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.1, 1, 0.95);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.setFromSphericalCoords(-1, phi, theta);
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
    if (this.composer != null && camera != null) {
      this.initPostEffects();
    }
  }

  initPostEffects() {
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffddaa,
      transparent: true,
      fog: false,
    });
    const sunGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
    this.sunObject = new THREE.Mesh(sunGeometry, sunMaterial);
    this.sunObject.position.copy(this.sun);
    this.sunObject.updateMatrix();
    this.sunObject.frustumCulled = false;
    this.sunObject.matrixAutoUpdate = false;

    this.materials.push(sunMaterial);
    this.geometries.push(sunGeometry);
    this.objects.push(this.sunObject);

    const godRaysEffect = new GodRaysEffect(this.camera, this.sunObject, {
      density: 0.96,
      decay: 0.98,
      weight: 0.1,
      exposure: 0.5,
    });

    const smaaEffect = new SMAAEffect();

    this.effectPass = new EffectPass(this.camera, godRaysEffect, smaaEffect);
    this.composer.addPass(this.effectPass);
  }
}

export const ENVIRONMENTS = Object.freeze([
  SunsetEnvironment,
  DarkNeonEnvironment,
  NatureEnvironment,
  SkyEnvironment,
]);

export class EnvironmentSwitcher {
  constructor(scene, composer, camera) {
    this.scene = scene;
    this.composer = composer;
    this.camera = camera;
    this.env = new ENVIRONMENTS[0](scene, composer, camera);
  }

  setEnvironment(name) {
    this.env.dispose();
    for (const env of ENVIRONMENTS) {
      if (env.name == name) {
        this.env = new env(this.scene, this.composer, this.camera);
        break;
      }
    }
  }
}
