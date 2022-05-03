<script setup>
import Turtle from '../utils/Turtle';
import * as THREE from 'three';
import { onMounted, ref } from 'vue';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

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
}
</style>
