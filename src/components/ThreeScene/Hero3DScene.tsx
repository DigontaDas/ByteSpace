"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Hero3DScene.module.css";

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Safe WebGL feature check & context pre-allocation
    let canvas: HTMLCanvasElement;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      if (typeof window === "undefined" || !window.WebGLRenderingContext) {
        setIsSupported(false);
        return;
      }
      canvas = document.createElement("canvas");
      gl =
        (canvas.getContext("webgl2", { alpha: true, antialias: true }) as WebGL2RenderingContext) ||
        (canvas.getContext("webgl", { alpha: true, antialias: true }) as WebGLRenderingContext) ||
        (canvas.getContext("experimental-webgl", { alpha: true, antialias: true }) as WebGLRenderingContext);

      if (!gl || typeof gl.getShaderPrecisionFormat !== "function") {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    // Clean reference tracking for disposal
    const disposables: { dispose: () => void }[] = [];

    try {
      // 2. Initialize renderer with the verified context to prevent null precision errors
      renderer = new THREE.WebGLRenderer({
        canvas,
        context: gl,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 600;

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;

      renderer.domElement.className = styles.threeCanvas;
      renderer.domElement.style.pointerEvents = "none";
      container.appendChild(renderer.domElement);

      // 3. Scene & Camera setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x1400ff, 0.025);

      const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        100
      );
      camera.position.set(0, 0, 18);

      // 4. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xd4ff00, 2.5);
      dirLight1.position.set(8, 12, 10);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0x00e676, 1.8);
      dirLight2.position.set(-10, -6, 8);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0xffffff, 2, 25);
      pointLight.position.set(0, 2, 8);
      scene.add(pointLight);

      // 5. Floating 3D Geometries matching ByteSpace playful aesthetic
      const group = new THREE.Group();
      scene.add(group);

      // Geometry 1: Signature Floating Torus
      const torusGeo = new THREE.TorusGeometry(3.2, 0.85, 24, 64);
      const torusMat = new THREE.MeshPhysicalMaterial({
        color: 0xd4ff00,
        metalness: 0.2,
        roughness: 0.15,
        transmission: 0.5,
        thickness: 1.2,
        emissive: 0xd4ff00,
        emissiveIntensity: 0.25,
      });
      const torusMesh = new THREE.Mesh(torusGeo, torusMat);
      torusMesh.position.set(6.5, 1.5, -2);
      torusMesh.rotation.set(0.6, 0.4, 0);
      group.add(torusMesh);
      disposables.push(torusGeo, torusMat);

      // Torus outer wireframe ring
      const torusWireGeo = new THREE.TorusGeometry(3.5, 0.08, 16, 64);
      const torusWireMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const torusWireMesh = new THREE.Mesh(torusWireGeo, torusWireMat);
      torusMesh.add(torusWireMesh);
      disposables.push(torusWireGeo, torusWireMat);

      // Geometry 2: Floating Icosahedron
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
      disposables.push(icoGeo, icoMat);

      // Geometry 3: Geometric Octahedron
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
      disposables.push(octGeo, octMat);

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
      disposables.push(dodecGeo, dodecMat);

      // 6. Interactive Constellation of Floating "Bytes"
      const particleCount = 75;
      const particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);
      const particleVelocities: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 26;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

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

      // Texture
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
      disposables.push(particleGeo, particleMat, particleTexture);

      // Dynamic Cyber Lines
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
      disposables.push(lineGeo, lineMat);

      // 7. Mouse tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const clientX = event.clientX - rect.left;
        const clientY = event.clientY - rect.top;
        targetX = (clientX / rect.width - 0.5) * 2;
        targetY = -(clientY / rect.height - 0.5) * 2;
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || 600;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      };

      window.addEventListener("resize", handleResize);

      let isVisible = true;
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]) isVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(container);

      // 8. Animation loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (!isVisible || !renderer) return;

        const elapsedTime = clock.getElapsedTime();

        mouseX += (targetX - mouseX) * 0.04;
        mouseY += (targetY - mouseY) * 0.04;

        camera.position.x = mouseX * 2.2;
        camera.position.y = mouseY * 1.6;
        camera.lookAt(0, 0, 0);

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

        // Particle updates
        const pAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        const positions = pAttr.array as Float32Array;

        let lineIndex = 0;
        const lineArray = lineGeo.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] += particleVelocities[i].x;
          positions[i * 3 + 1] += particleVelocities[i].y;
          positions[i * 3 + 2] += particleVelocities[i].z;

          if (Math.abs(positions[i * 3]) > 13) particleVelocities[i].x *= -1;
          if (Math.abs(positions[i * 3 + 1]) > 8) particleVelocities[i].y *= -1;
          if (Math.abs(positions[i * 3 + 2]) > 5) particleVelocities[i].z *= -1;

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

        pointLight.position.x = Math.sin(elapsedTime * 1.5) * 4;
        pointLight.position.y = Math.cos(elapsedTime * 1.2) * 3;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        observer.disconnect();

        disposables.forEach((d) => {
          try {
            d.dispose();
          } catch {}
        });

        if (renderer) {
          if (renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
          renderer.dispose();
          renderer.forceContextLoss();
        }
      };
    } catch (err) {
      console.warn("Hero3DScene WebGL initialization skipped:", err);
      setIsSupported(false);
    }
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
      <div className={styles.heroOverlayGradient} />
    </div>
  );
}
