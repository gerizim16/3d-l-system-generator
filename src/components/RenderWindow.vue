<script setup>
import { onMounted, ref, watch } from "vue";

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
  commands: {
    default: [],
  },
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
rectLight1.position.set(-5, 5, 10);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0x00ff00, 10, 4, 10);
rectLight2.position.set(0, 5, 10);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0x0000ff, 10, 4, 10);
rectLight3.position.set(5, 5, 10);
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
const turtle = new Turtle(scene);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.copy(new THREE.Vector3(0, 5, 0));
// controls.update();

watch(
  () => props.commands,
  (commands) => {
    turtle.reset();
    for (const command of commands) {
      turtle.do(command);
    }

    // bounding box
    const aabb = new THREE.Box3().setFromObject(turtle.group);
    const target = new THREE.Vector3();
    aabb.getCenter(target);
    controls.target.copy(target);
    controls.update();
  }
);

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
  canvas.style.width = "100%";
  canvas.style.height = "100%";
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
  height: v-bind(height);
  width: v-bind(width);
}
</style>
