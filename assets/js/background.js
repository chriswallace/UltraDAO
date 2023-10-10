const elToAnimate = document.getElementById('elToAnimate');

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, elToAnimate.offsetWidth / elToAnimate.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Get the device pixel ratio
const pixelRatio = window.devicePixelRatio || 1;

// Set the size of the renderer
renderer.setSize(elToAnimate.offsetWidth * pixelRatio, elToAnimate.offsetHeight * pixelRatio);

// Set the CSS size of the renderer
renderer.domElement.style.width = `${elToAnimate.offsetWidth}px`;
renderer.domElement.style.height = `${elToAnimate.offsetHeight}px`;

renderer.setClearColor(0x000555);  // 0x000037 is red in hexadecimal

// Set the camera aspect ratio and update the projection matrix
camera.aspect = elToAnimate.offsetWidth / elToAnimate.offsetHeight;
camera.updateProjectionMatrix();

renderer.domElement.classList.add('animated-bg');
elToAnimate.appendChild(renderer.domElement);

// Invisible shape
const invisibleSphere = new THREE.Vector3();

// Custom shaders
const vertexShader = `
    uniform vec3 spherePosition;
    varying vec2 vUv;
    varying float dist;
    uniform float time;

    // Improved noise function for more organic look
    float noise(vec2 uv) {
        float n = sin(uv.x * 20.0 + time) * 0.5 + 0.5;
        n *= sin(uv.y * 20.0 + time) * 0.5 + 0.5;
        return n;
    }

    void main() {
        vUv = uv;
        vec3 pos = position;
        dist = distance(pos.xy, spherePosition.xy);
        pos.z += sin(dist * 10.0 - time) * 2.0;
        
        // Add a curve to the edges of the plane
        float curveAmount = 0.99999;  // Adjust this value to control the amount of curve
        pos.x += curveAmount * (vUv.x - 0.5) * (vUv.x - 0.5);
        pos.y += curveAmount * (vUv.y - 0.5) * (vUv.y - 0.5);
        
        // Add liquid effect to the edges
        float liquidEffect = noise(vUv * 2.0) * 0.1;
        pos.x += liquidEffect * sin(time);
        pos.y += liquidEffect * cos(time);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    varying float dist;
    void main() {
        float edgeDist = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
        float edgeFactor = smoothstep(0.01, 0.03, edgeDist);  // Adjusted smoothstep for smoother edges
        vec4 color = vec4(0.75, 0, 0.15, 1.0);
        gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 1.0), color, edgeFactor);
    }
`;

const uniforms = {
    spherePosition: { value: invisibleSphere },
    time: { value: 20000 }
};

// Create grid
const grid = new THREE.Group();
for (let i = 0; i < 240; i++) {
    for (let j = 0; j < 240; j++) {
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(i - 4.5, j - 4.5, 0);
        grid.add(mesh);
    }
}
scene.add(grid);

camera.position.z = 28;
camera.position.y = 40;
camera.position.x = 50;

function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.0035;
    invisibleSphere.x = 5 * Math.sin(uniforms.time.value);
    invisibleSphere.y = 5 * Math.cos(uniforms.time.value);
    renderer.render(scene, camera);
}

animate();