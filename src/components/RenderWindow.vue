<script setup>
import { onMounted, ref } from "vue";

import Turtle from "@/utils/Turtle";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

const props = defineProps({
  width: {
    default: "100%",
  },
  height: {
    default: "100%",
  },
  commands: {},
});

const container = ref();

// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);
camera.position.set(0, 5, -15);

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;

// lights
RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight(0xff0000, 10, 4, 10);
rectLight1.position.set(-5, 5, 5);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0x00ff00, 10, 4, 10);
rectLight2.position.set(0, 5, 5);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0x0000ff, 10, 4, 10);
rectLight3.position.set(5, 5, 5);
scene.add(rectLight3);

scene.add(new RectAreaLightHelper(rectLight1));
scene.add(new RectAreaLightHelper(rectLight2));
scene.add(new RectAreaLightHelper(rectLight3));

// floor
const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
const matStdFloor = new THREE.MeshStandardMaterial({
  color: 0x808080,
  roughness: 0.1,
  metalness: 0,
});
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
scene.add(mshStdFloor);

// turtle
// TODO command turtle based on commands
const turtle = new Turtle(scene);
turtle
  .push()
  .setMaterial({
    color: 0xffffff,
    roughness: 1,
    metalness: 0.1,
    wireframe: true,
  })
  .setRadius(0.5)
  .startLine()
  .forward(3)
  .rotateX(-Math.PI / 2)
  .forward(3)
  .rotateY(Math.PI / 2)
  .forward(3)
  .rotateZ(Math.PI / 2)
  .forward(3)
  .endLine()
  .pop()
  .setRadius(0.25)
  .startLine()
  .forward(3)
  .rotateX(Math.PI / 2)
  .forward(3)
  .rotateY(Math.PI / 2)
  .forward(3)
  .rotateZ(Math.PI / 2)
  .forward(3)
  .endLine()
  .sphere(1)
  .rotateZ(Math.PI / 4)
  .forward(2)
  .box(2, 2, 0.5)
  .startLine()
  .forward(2)
  .endLine()
  .cone(1, 2);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(new THREE.Vector3(0, 5, 0));
controls.update();

function animate(time) {
  time *= 0.001; // convert time to seconds

  turtle.group.rotation.y = time;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function resizeCanvasToDisplaySize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);

onMounted(() => {
  canvas.style.width = props.width;
  canvas.style.height = props.height;
  resizeObserver.observe(renderer.domElement, { box: "content-box" });
  container.value.appendChild(renderer.domElement);
  requestAnimationFrame(animate);
});
</script>

<template>
  <div id="container" ref="container"></div>
</template>

<style scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>
