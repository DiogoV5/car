const speed = 11;

function player(x,y,z,rx,ry) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.rx = rx;
	this.ry = ry;
}

// Нажата ли клавиша?

var PressBack = 0;
var PressForward = 0;
var PressLeft = 0;
var PressRight = 0;
var PressUp = 0;

// На земле ли игрок?

var onGround = true;

// Обработчик нажатия клавиш

document.addEventListener("keydown", (event) =>{
	if (event.key == "a"){
		PressLeft = 1;
	}
	if (event.key == "w"){
		PressUp = -1;
	}
	if (event.key == "d"){
		PressRight = 1;
	}
	if (event.key == "s"){
		PressUp = 1;
	}
});

// Обработчик отжатия клавиш

document.addEventListener("keyup", (event) =>{
	if (event.key == "a"){
		PressLeft = 0;
	}
	if (event.key == "w"){
		PressUp = 0;
	}
	if (event.key == "d"){
		PressRight = 0;
	}
	if (event.key == "s"){
		PressUp = 0;
	}
});

// Создаем новый объект

var pawn = new player(0,0,0,0,0);

// Привяжем новую переменную к world

var world = document.getElementById("world");

function update(){
	
	let dx = (PressRight - PressLeft) * speed;
	let dz = - (PressForward - PressBack) * speed;
	let dy = - PressUp * speed;

	pawn.x = (pawn.x + dx);
	pawn.y = (pawn.y + dy);
	pawn.z = (pawn.z + dz);
	
	world.style.transform = 
	"rotateX(" + (-pawn.rx) + "deg)" +
	"rotateY(" + (-pawn.ry) + "deg)" +
	"translate3d(" + (-pawn.x) + "px," + (-pawn.y) + "px," + (-pawn.z) + "px)";
	
};

TimerGame = setInterval(update,10);



scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

renderer = new THREE.WebGLRenderer({alpha: true, atialias: true});
renderer.setClearColor(0x000000, 0);
renderer.setSize(1280, 720);

renderer.domElement.setAttribute('id', "3D0bj");
document.body.insertBefore(renderer.domElement, document.body.firstChild);

const aLight = new THREE.AmbientLight(0x404040, 1.2);
scene.add(aLight)

const pLight = new THREE.PointLight(0xFFFFFF, 1.2);
pLight.position.set(0, -3, 7);
scene.add(pLight)

let loader = new THREE.GLTFLoader();
let obj = null;

loader.load('3d/scene.gltf', function(gltf) {
    obj = gltf;
    obj.scene.scale.set(1.3, 1.3, 1.3);

    scene.add(obj.scene);
})