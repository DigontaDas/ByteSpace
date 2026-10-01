"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Hero3DScene.module.css";

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check WebGL support safely
    try {
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1400ff, 0.025);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    // 2. Renderer setup with high performance & memory safety
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
    } catch (e) {
      console.warn("Failed to initialize WebGLRenderer:", e);
      setIsSupported(false);
      return;
    }

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd4ff00, 2.5); // Brand neon lime
    dirLight1.position.set(8, 12, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00e676, 1.8); // Brand green
    dirLight2.position.set(-10, -6, 8);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 2, 25);
    pointLight.position.set(0, 2, 8);
    scene.add(pointLight);

    // 4. Floating 3D Geometries matching ByteSpace playful aesthetic
    const group = new THREE.Group();
    scene.add(group);

    // Geometry 1: Signature Floating Torus (Neon lime wireframe + frosted core)
    const torusGeo = new THREE.TorusGeometry(3.2, 0.85, 24, 64);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4ff00,
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.5,
      thickness: 1.2,
      emissive: 0xd4ff00,
      emissiveIntensity: 0.25,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(6.5, 1.5, -2);
    torusMesh.rotation.set(0.6, 0.4, 0);
    group.add(torusMesh);

    // Torus outer wireframe ring for high-tech aesthetic
    const torusWireGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 64);
    const torusWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const torusWireMesh = new THREE.Mesh(torusWireGeo, torusWireMat);
    torusMesh.add(torusWireMesh);

    // Geometry 2: Floating Icosahedron (Byte crystal)
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x00e676,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x00e676,
      emissiveIntensity: 0.3,
      flatShading: true,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-7, 3, -1);
    group.add(icoMesh);

    // Geometry 3: Geometric floating Octahedron
    const octGeo = new THREE.OctahedronGeometry(1.1, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0xffaa00,
      emissiveIntensity: 0.4,
      flatShading: true,
    });
    const octMesh = new THREE.Mesh(octGeo, octMat);
    octMesh.position.set(-6, -4, 1);
    group.add(octMesh);

    // Geometry 4: Small Cyber Dodecahedron
    const dodecGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const dodecMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.4,
      flatShading: true,
    });
    const dodecMesh = new THREE.Mesh(dodecGeo, dodecMat);
    dodecMesh.position.set(7.5, -4, 0);
    group.add(dodecMesh);

    // 5. Interactive Constellation of Floating "Bytes" (Particles + Lines)
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 10;
      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008,
      });
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Custom circle particle texture programmatically
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(212, 255, 0, 1)");
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(20, 0, 255, 0)");
      pCtx.fillStyle = gradient;
      pCtx.beginPath();
      pCtx.arc(32, 32, 32, 0, Math.PI * 2);
      pCtx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.45,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Dynamic Cyber Lines connecting close particles
    const lineMaxDistance = 4.2;
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd4ff00,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // 6. Smooth Mouse Parallax & Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;
      targetX = (clientX / rect.width - 0.5) * 2;
      targetY = -(clientY / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize smoothly
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Pause rendering when scrolled out of view to save battery and GPU cycles
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 7. Animation Loop with smooth clock
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (LERP)
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      // Camera parallax tilt
      camera.position.x = mouseX * 2.2;
      camera.position.y = mouseY * 1.6;
      camera.lookAt(0, 0, 0);

      // Rotate group & 3D objects
      torusMesh.rotation.x = 0.6 + Math.sin(elapsedTime * 0.7) * 0.2 + mouseY * 0.5;
      torusMesh.rotation.y = elapsedTime * 0.5 + mouseX * 0.5;
      torusMesh.rotation.z = Math.cos(elapsedTime * 0.5) * 0.2;
      torusMesh.position.y = 1.5 + Math.sin(elapsedTime * 1.2) * 0.35;

      icoMesh.rotation.x = elapsedTime * 0.8;
      icoMesh.rotation.y = elapsedTime * 0.6;
      icoMesh.position.y = 3 + Math.sin(elapsedTime * 1.5 + 1) * 0.3;

      octMesh.rotation.x = -elapsedTime * 0.7;
      octMesh.rotation.z = elapsedTime * 0.9;
      octMesh.position.y = -4 + Math.cos(elapsedTime * 1.3) * 0.25;

      dodecMesh.rotation.y = -elapsedTime * 0.5;
      dodecMesh.rotation.x = Math.sin(elapsedTime * 0.9) * 0.3;
      dodecMesh.position.y = -4 + Math.sin(elapsedTime * 1.1 + 2) * 0.3;

      // Update particle positions
      const pAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const positions = pAttr.array as Float32Array;

      let lineIndex = 0;
      const lineArray = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Move particles
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Wrap around boundaries
        if (Math.abs(positions[i * 3]) > 13) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 8) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 5) particleVelocities[i].z *= -1;

        // Connect nearby particles with lines
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < lineMaxDistance) {
            lineArray[lineIndex++] = positions[i * 3];
            lineArray[lineIndex++] = positions[i * 3 + 1];
            lineArray[lineIndex++] = positions[i * 3 + 2];

            lineArray[lineIndex++] = positions[j * 3];
            lineArray[lineIndex++] = positions[j * 3 + 1];
            lineArray[lineIndex++] = positions[j * 3 + 2];
          }
        }
      }

      pAttr.needsUpdate = true;
      lineGeo.setDrawRange(0, lineIndex / 3);
      lineGeo.attributes.position.needsUpdate = true;

      // Subtle light oscillation
      pointLight.position.x = Math.sin(elapsedTime * 1.5) * 4;
      pointLight.position.y = Math.cos(elapsedTime * 1.2) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup resources cleanly to prevent WebGL leaks
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      // Dispose Three.js objects
      torusGeo.dispose();
      torusMat.dispose();
      torusWireGeo.dispose();
      torusWireMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octGeo.dispose();
      octMat.dispose();
      dodecGeo.dispose();
      dodecMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      particleTexture.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
      }
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={styles.threeHeroContainer}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.threeCanvas} />
      <div className={styles.heroOverlayGradient} />
    </div>
  );
}
