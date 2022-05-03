<script setup>
import { onMounted, ref } from 'vue';

import Turtle from '@/utils/Turtle';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

// scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000);
camera.position.set(0, 5, - 15);

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
// renderer.setClearColor(0xffffff, 0);

// lights
RectAreaLightUniformsLib.init();

const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
rectLight1.position.set(- 5, 5, 5);
scene.add(rectLight1);

const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
rectLight2.position.set(0, 5, 5);
scene.add(rectLight2);

const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
rectLight3.position.set(5, 5, 5);
scene.add(rectLight3);

scene.add(new RectAreaLightHelper(rectLight1));
scene.add(new RectAreaLightHelper(rectLight2));
scene.add(new RectAreaLightHelper(rectLight3));

// floor
const geoFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
const matStdFloor = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.1, metalness: 0 });
const mshStdFloor = new THREE.Mesh(geoFloor, matStdFloor);
scene.add(mshStdFloor);

// knot
const geoKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
const matKnot = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0, metalness: 0 });
const meshKnot = new THREE.Mesh(geoKnot, matKnot);
meshKnot.name = 'meshKnot';
meshKnot.position.set(0, 5, 0);
scene.add(meshKnot);

// camera orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(meshKnot.position);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    meshKnot.rotation.y += 0.01;
    renderer.render(scene, camera);
};

function resizeCanvasToDisplaySize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}

const container = ref();
const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);

const props = defineProps({
    width: {
        default: "100%",
    },
    height: {
        default: "100%",
    }
})

onMounted(() => {
    canvas.style.width = props.width;
    canvas.style.height = props.height;
    resizeObserver.observe(renderer.domElement, { box: 'content-box' });
    container.value.appendChild(renderer.domElement)
    animate();
})
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
