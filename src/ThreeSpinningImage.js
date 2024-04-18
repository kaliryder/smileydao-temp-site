import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeSpinningImage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, camera, and renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Initialize the clock
    const clock = new THREE.Clock();

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/img/spinningcoin.png');
    texture.flipY = true; // Adjust based on your texture orientation needs

    // Material with transparency settings
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: 0.5,
      side: THREE.DoubleSide,
      color: 0xffffff // initial color, white
    });

    // Cylinder geometry for the image with depth
    const geometry = new THREE.CylinderGeometry(2.5, 2.5, 0.1, 64);
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.rotation.x = Math.PI / 2; // Lay flat
    cylinder.rotation.y = Math.PI / 2; // Correct initial orientation
    scene.add(cylinder);

    // Camera position
    camera.position.z = 7;

    // Controls for user interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = true; // Enable auto-rotation
    controls.autoRotateSpeed = 5; // Adjust auto-rotate speed here
    controls.minPolarAngle = Math.PI / 2; // Lock vertical rotation
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableRotate = true;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
      
        // Get the elapsed time in seconds
        const elapsedTime = clock.getElapsedTime();
      
        // Dynamic color change based on time
        const hue = (elapsedTime * 0.1) % 1; // Change color gradually over time, adjust the multiplier to change speed
        const color = new THREE.Color();
        color.setHSL(hue, 0.5, 0.5); // Set color based on hue, saturation, and lightness
        material.color = color;
      
        // Update the controls and render the scene
        controls.update();
        renderer.render(scene, camera);
      };
      

    animate();

    // Handle resizing
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      mountRef.current.removeChild(renderer.domElement);
      scene.remove(cylinder);
      geometry.dispose();
      material.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default ThreeSpinningImage;
