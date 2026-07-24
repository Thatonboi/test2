/* ============================================================================
   3D MODEL VIEWER
   ----------------------------------------------------------------------------
   Loads and renders an STL file into a container with drag-to-rotate,
   scroll-to-zoom, and gentle auto-rotation when idle. Used inside the
   project detail overlay as the "main image" for each piece.

   Loaded as an ES module (see the <script type="module"> tag in index.html).
   Exposes window.ModelViewer with load(container, url, options) / dispose().
============================================================================ */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const loader = new STLLoader();

let current = null; // holds refs to the active scene so we can dispose it

function dispose() {
  if (!current) return;
  cancelAnimationFrame(current.rafId);
  if (current.resizeObserver) current.resizeObserver.disconnect();
  current.controls.dispose();
  current.renderer.dispose();
  current.scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
  });
  if (current.renderer.domElement.parentNode) {
    current.renderer.domElement.parentNode.removeChild(current.renderer.domElement);
  }
  current = null;
}

/**
 * @param {HTMLElement} container - element the canvas will fill
 * @param {string} url - path to the .stl file
 * @param {object} opts - { color, onLoad, onError }
 */
function load(container, url, opts = {}) {
  dispose();

  const color = opts.color || 0xc9a76b;
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
  camera.position.set(0, 0.6, 4.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // three-point studio lighting
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 5);
  const fill = new THREE.DirectionalLight(0x88aaff, 0.6);
  fill.position.set(-5, 2, -3);
  const rim = new THREE.DirectionalLight(0xffe3c2, 1.1);
  rim.position.set(-2, -4, -6);
  const ambient = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(key, fill, rim, ambient);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 1.8;
  controls.maxDistance = 9;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.6;

  // pause auto-rotate while the user is actively dragging/zooming, resume after idle
  let idleTimer = null;
  const wake = () => {
    controls.autoRotate = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { controls.autoRotate = true; }, 1800);
  };
  renderer.domElement.addEventListener("pointerdown", wake);
  renderer.domElement.addEventListener("wheel", wake, { passive: true });

  current = { scene, camera, renderer, controls, rafId: null, resizeObserver: null };

  function frame() {
    controls.update();
    renderer.render(scene, camera);
    current.rafId = requestAnimationFrame(frame);
  }
  frame();

  // keep the canvas sized to its container
  const resizeObserver = new ResizeObserver(() => {
    const w = container.clientWidth, h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObserver.observe(container);
  current.resizeObserver = resizeObserver;

  loader.load(
    url,
    (geometry) => {
      geometry.computeVertexNormals();
      geometry.center();

      // normalize scale so every model — regardless of source units — fills the view consistently
      geometry.computeBoundingBox();
      const size = new THREE.Vector3();
      geometry.boundingBox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 2.1 / maxDim;

      const material = new THREE.MeshStandardMaterial({
        color,
        metalness: 0.35,
        roughness: 0.4,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(scale);
      mesh.rotation.x = -Math.PI / 2.6;
      scene.add(mesh);

      if (opts.onLoad) opts.onLoad();
    },
    undefined,
    (err) => {
      if (opts.onError) opts.onError(err);
    }
  );

  return {
    resetView() {
      camera.position.set(0, 0.6, 4.2);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };
}

window.ModelViewer = { load, dispose };
