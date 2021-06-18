let backGroundColorTop;
let backGroundColorDown;
let backGroundColorGradient;
let myFont;

let system;

let camTarget;


var latitude = " ";
var longitude= " ";
var altitude = " ";

function preload() {
	myFont = loadFont('assets/sans.otf');
}

function onOrientationChange(e) {
	alpha = e.alpha;
	beta = e.beta;
	gamma = e.gamma;

	println(alpha + " " + beta + " " + gamma);
}

function setup() {
	const canvasElt = createCanvas(600, 800, WEBGL).elt;
	canvasElt.style.width = '100%', canvasElt.style.height = '100%';
	//	createCanvas(displayWidth, displayHeight, WEBGL);
	backGroundColorTop = loadImage("img/oceanAbove.jpg");
	backGroundColorDown = loadImage("img/oceanBelow.jpg");
	backGroundColorGradient = loadImage("img/oceanBackground.jpg");
	textFont(myFont);
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', onOrientationChange);
	}
	//system = new ParticleSystem(createVector(0,5,10));
	//system = new particle
	camTarget = createVector(0, 0, 0);

	if (!navigator.geolocation) {
		alert("navigator.geolocation is not available");
	}
	navigator.geolocation.getCurrentPosition(setPos);
}



function setPos(position) {
	latitude = position.coords.latitude;
	longitude = position.coords.longitude;
	altitude = position.coords.altitude;
}

function draw() {
	navigator.geolocation.getCurrentPosition(setPos);

	background(0);

	//fill(255);
	//text('p5*js', 10, 50);

	fill(0, 0, 0, 0);
	//let angleX = map(mouseX,0,displayWidth,-179,179);
	//let angleZ = map(mouseY,0,displayHeight,-45,45);
	let angle_t = map(constrain(pRotationX, 0, 180), 0, 180, 89, -89);
	let angle_a = map(constrain(pRotationY, 0, 180), 0, 180, -89, 89);
	let fixR = 100;

	let camX = fixR * cos(radians(angle_a)) * cos(radians(angle_t));
	let camY = fixR * sin(radians(angle_t));
	let camZ = fixR * sin(radians(angle_a)) * cos(radians(angle_t));
	camTarget = createVector(camX, camY, camZ);

	camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	//system.show();
	push();
	translate(0, 5, 5);
	textSize(12);
	fill(255);
	text("Latitude: " + latitude, 0, -40)
	text("Longitude: " + longitude, 0, -30)
	text("Altitude: " + altitude, 0, -20)
	text("RotationX: " + pRotationX, 0, 0);
	text("RotationY: " + pRotationY, 0, 10);
	text("RotationZ: " + pRotationZ, 0, 20);
	pop();

	camera(0, 0, 0, camX, camY, camZ, 0, 1, 0);
	//texture(backGroundColorGradient);
	textureMode(NORMAL);
	stroke(255);
	noFill()
	translate(500, 0);
	sphere(1000);
	//shakeCheck();
}


function onClick() {
	// feature detect
	if (typeof DeviceOrientationEvent.requestPermission === 'function') {
		DeviceOrientationEvent.requestPermission().then(permissionState => {
			if (permissionState === 'granted') {
				window.addEventListener('deviceorientation', () => {});
			}
		}).catch(console.error);
	} else {
		// handle regular non iOS 13+ devices
	}
}

function touchEnded() {
	var spk = new p5.Speech();
	var currentText = char(int(97 + random(26)));
	//system.add(camTarget,currentText);
	spk.speak(currentText);
}

function shakeCheck() {

	var shakeThreshold = 50;
	accX = abs(accelerationX - pAccelerationX);
	accY = abs(accelerationY - pAccelerationY);
	accT = accX + accY;
	// If shake
	if (accT >= shakeThreshold) {
		var spk = new p5.Speech();
		var currentText = char(int(97 + random(26)));
		//system.add(camTarget,currentText);
		spk.speak(currentText);
	}
	// If not shake
	else {}
}




//Prevent mouse dragging event
function touchMoved(event) {
	console.log(event);
	return false;
}
