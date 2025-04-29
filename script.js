var scene, camera, renderer, box, clock, mixer, action = [], mode;

init();

function init(){

    const assetPath = './';

    clock = new THREE.Clock();

    scene=new THREE.Scene();

    scene.background = new THREE.Color(0x00aaff);

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-5, 25, 20);
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(ambient);

const light = new THREE.DirectionalLight(0xFFFFFF);
light.position.set(0,10,2);
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.st(1,2,0);
controls.update();

mode = 'open';
const btn = document.getElementById("btn");
btn.addEventListener('click', function(){
if (actions.length === 2){
    if (mode=== "open"){
        actions.forEach(action =>{
            action.timeScale = 1.;
            actions.reset();
            action.play();
        })
    }
}

});

//GLFT loader

const loader = new THREE.GLTFLoader();
loader.load(assetPath + )

window.addEventListener('resize', onResize,false);

update();

}

function update(){

    requestAnimationFrame(update);

    box.rotation.y +=0.01;

    renderer.render(scene, camera);


}

function onResize(){
camera.aspecr = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer,setSize(window.innerWidth, window.innerHeight);

}