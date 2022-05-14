<script setup>
import { onMounted, ref, watch } from "vue";

import Turtle from "@/utils/Turtle";
import { EnvironmentSwitcher, ENVIRONMENTS } from "@/utils/Environment";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
  modelAngle: {
    default: 0,
  },
  autoRotate: {
    default: true,
  },
  environment: {
    default: ENVIRONMENTS[0],
  },
  defaults: {
    default: Object.assign({}, Turtle.defaults),
  },
});

const container = ref();

// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
const canvas = renderer.domElement;

// turtle
const turtle = new Turtle(scene);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

const env = new EnvironmentSwitcher(scene);

watch([() => props.commands, () => props.defaults], ([commands, defaults]) => {
  turtle.setDefaults(defaults);
  turtle.reset();
  for (const command of commands) {
    turtle.do(command);
  }

  // bounding box
  const aabb = new THREE.Box3().setFromObject(turtle.group);
  const target = new THREE.Vector3();
  aabb.getCenter(target);
  target.setX(0);
  camera.position.set(0, target.y, -15);
  controls.target.copy(target);
  controls.update();
});

watch(
  () => props.modelAngle,
  (angle) => {
    turtle.group.rotation.y = angle;
  }
);

watch(
  () => props.environment,
  (name) => {
    env.setEnvironment(name);
  }
);

function animate(time) {
  time *= 0.001; // convert time to seconds

  if (props.autoRotate) turtle.group.rotation.y += 0.005;

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
