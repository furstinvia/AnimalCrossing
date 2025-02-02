const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 1).normalize();
scene.add(directionalLight);

const loader = new THREE.GLTFLoader();
const models = [];
let currentIndex = 0;

loader.load('model/Cow.glb', function(gltf) {
    const cow = gltf.scene;
    cow.scale.set(1, 1, 1);
    cow.position.set(0, -1.5, 0);
    models[0] = cow;
    if (currentIndex === 0) {
        scene.add(cow);
    }
});

loader.load('model/rabbit.glb', function(gltf) {
    const rabbit = gltf.scene;
    rabbit.scale.set(0.3, 0.3, 0.3);
    rabbit.position.set(0, -1.5, 0);
    models[1] = rabbit;
});

loader.load('model/pig.glb', function(gltf) {
    const pig = gltf.scene;
    pig.scale.set(0.1, 0.1, 0.1);
    pig.position.set(0, -1, 0);
    models[2] = pig;
});

loader.load('model/chicken.glb', function(gltf) {
    const chicken = gltf.scene;
    chicken.scale.set(0.1, 0.1, 0.1);
    chicken.position.set(0, -1, 0);
    models[3] = chicken;
});

loader.load('model/lion.glb', function(gltf) {
    const lion = gltf.scene;
    lion.rotation.y = Math.PI; 
    
    lion.scale.set(1, 1, 1);
    lion.position.set(0, -1.5, 0);
    models[4] = lion;
});

camera.position.set(0, 0, 5);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI;
controls.minPolarAngle = 0;

function updateModelDisplay() {
    for (let model of models) {
        scene.remove(model);
    }
    const modelToDisplay = models[currentIndex];
    if (modelToDisplay) {
        scene.add(modelToDisplay);
    }
    modelSelect.value = currentIndex;
}

// Button event listeners
document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % models.length;
    updateModelDisplay();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + models.length) % models.length;
    updateModelDisplay();
});

const selectButton = document.getElementById('selectBtn');
const modelSelect = document.getElementById('modelSelect');

modelSelect.addEventListener('change', function() {
    currentIndex = parseInt(this.value, 10);
    updateModelDisplay();
});

selectButton.addEventListener('click', function() {
    const selectedModelName = modelSelect.options[modelSelect.selectedIndex].text;
    localStorage.setItem('selectedCharacter', selectedModelName);
    alert(`You have selected: ${selectedModelName}`);
});

document.getElementById('playBtn').addEventListener('click', () => {
    window.location.href = '../Game/index.html';
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
