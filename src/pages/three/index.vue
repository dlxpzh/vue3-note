<template>
	<div ref="threeContainerRef"></div>
</template>
<script setup>
import * as THREE from 'three';
const threeContainerRef = ref('');
// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 挂载在dom上
onMounted(() => {
	11;
	threeContainerRef.value.appendChild(renderer.domElement);
});

/**
 * 画旋转立方体
 */

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = function () {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
};

animate();

/**
 * 画线
 */

// const points = [];
// points.push(new THREE.Vector3(-10, 0, 0));
// points.push(new THREE.Vector3(0, 10, 0));
// points.push(new THREE.Vector3(10, 0, 0));
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
// const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
// const line = new THREE.Line(geometry, material);

// scene.add(line);

// camera.position.set(0, 0, 100);
// camera.lookAt(0, 0, 0);

// 添加到场景中
renderer.render(scene, camera);
</script>
