(function () {
    const canvas = document.getElementById('hero-3d');
    if (!canvas || !window.THREE) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 8);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.42, 2);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x2563eb,
        roughness: 0.38,
        metalness: 0.18,
        clearcoat: 0.72,
        clearcoatRoughness: 0.22,
        transmission: 0.12,
        transparent: true,
        opacity: 0.88
    });

    const core = new THREE.Mesh(geometry, material);
    group.add(core);

    const wire = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({
            color: 0x14b8a6,
            wireframe: true,
            transparent: true,
            opacity: 0.22
        })
    );
    wire.scale.setScalar(1.08);
    group.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });

    for (let i = 0; i < 3; i += 1) {
        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.05 + i * 0.24, 0.012, 16, 160),
            ringMaterial.clone()
        );
        ring.rotation.x = Math.PI / 2.6 + i * 0.32;
        ring.rotation.y = i * 0.48;
        group.add(ring);
    }

    const particleGeometry = new THREE.BufferGeometry();
    const count = 170;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
        const radius = 2.8 + Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
            color: 0x60a5fa,
            size: 0.035,
            transparent: true,
            opacity: 0.58
        })
    );
    group.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 1.8));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.5, 3, 4);
    scene.add(keyLight);

    const accentLight = new THREE.PointLight(0x14b8a6, 3, 12);
    accentLight.position.set(-3.5, -1.5, 3);
    scene.add(accentLight);

    let pointerX = 0;
    let pointerY = 0;

    window.addEventListener('pointermove', (event) => {
        pointerX = (event.clientX / window.innerWidth - 0.5) * 0.5;
        pointerY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    }, { passive: true });

    function resize() {
        const width = canvas.clientWidth || window.innerWidth;
        const height = canvas.clientHeight || window.innerHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        group.position.x = width < 760 ? 1.1 : 2.45;
        group.position.y = width < 760 ? 0.25 : 0;
        group.scale.setScalar(width < 760 ? 0.78 : 1);
    }

    window.addEventListener('resize', resize);
    resize();

    const clock = new THREE.Clock();

    function animate() {
        const elapsed = clock.getElapsedTime();

        group.rotation.y = elapsed * 0.18 + pointerX;
        group.rotation.x = Math.sin(elapsed * 0.45) * 0.12 + pointerY;
        core.rotation.z = elapsed * 0.12;
        wire.rotation.y = -elapsed * 0.16;
        particles.rotation.y = elapsed * 0.035;
        particles.rotation.x = Math.sin(elapsed * 0.18) * 0.08;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
}());
