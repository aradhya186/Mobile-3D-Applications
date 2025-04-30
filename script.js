var scene, camera, renderer, box, clock, mixer, actions = [], mode, isWireframe = false;
let loadedModel;

init();

function init() {
    const assetPath = './';  // Path to assets

    clock = new THREE.Clock();


// Create the scene
    scene=new THREE.Scene();
    scene.background = new THREE.Color(0x00aaff);

    // Set up the camera
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
  camera.position.set(-5, 25, 20);


// Add lightning
const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xFFFFFF, 2);
light.position.set(0, 10, 2);
scene.add(light);

// Set up the renderer
const canvas = document.getElementById('threeContainer');
renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setPixelRatio( window.devicePixelRatio);
resize();


// Add OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(1, 2, 0);
controls.update();

// Button to control animations
mode = 'open';
const btn = document.getElementById("btn");
btn.addEventListener('click', function() {
if (actions.length === 2){
    if (mode=== "open") {
        actions.forEach(action => {
                action.timeScale = 1;
                action.reset();
                action.play();
        });
        }
    }
});

// add wireframe toggle button
const wireframeBtn = document.getElementById("toggleWireframe");
wireframeBtn.addEventListener('click', function () {
    isWireframe = !isWireframe;
    toggleWireframe(isWireframe);
});

// Add rotation button logic
const rotateBtn = document.getElementById("Rotate");
rotateBtn.addEventListener('click', function () {
    if (loadedModel) {
        const axis = new THREE.Vector3 (0, 1, 0);   // Y-axis
        const angle = Math.PI / 8;  // Rotate 22.5 degrees
        loadedModel.rotateOnAxis(axis, angle);
    
    } else {
        console.warn('Model not loaded yet.');
    }
});


// Load the glTF model
const loader = new THREE.GLTFLoader();
loader.load(assetPath + 'assets/soda_can_opening.glb', function(gltf){
    const model = gltf.scene;
    scene.add(model);

    loadedModel = model;

    // Set up animations
    mixer = new THREE.AnimationMixer(model);
    const animations = gltf.animations;

    animations.forEach(clip =>{
        const action = mixer.clipAction(clip);
        actions.push(action);
    });

});

    // Handle resizing
    window.addEventListener('resize', resize, false);

    // Start the Animation loop
    animate();
}

function toggleWireframe(enable) {
    scene.traverse(function (object) {
        if (object.isMesh) {
            object.material.wireframe = enable;
        }
    });
}

function animate() {
    requestAnimationFrame(animate);  
    
  // Update animations  
    if (mixer) {
        mixer.update(clock.getDelta());
    }

    renderer.render(scene, camera);
}

function resize() {
    const canvas = document.getElementById('threeContainer');
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}