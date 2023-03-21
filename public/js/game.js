import * as THREE from "./three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);
renderer.domElement.style.opacity = 1;
const world = new CANNON.World();
world.gravity.set(0, -12, 0);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;
const objectsToUpdate = {};
const PLATFORM = 1;
const PLAYER = 2;
const modelDir = "models/";

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const platforms = [
  {
    width: 12,
    height: 2,
    depth: 5,
    x: 0,
    y: -5.5,
    z: -0.8,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: -4,
    y: -2.5,
    z: 0,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: 4,
    y: -2.5,
    z: 0,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: 0,
    y: -2.5,
    z: 0,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: -2,
    y: 0,
    z: 0,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: 2,
    y: 0,
    z: 0,
    color: 0xff0000,
  },
  {
    width: 2,
    height: 0.2,
    depth: 1,
    x: 0,
    y: 2.5,
    z: 0,
    color: 0xff0000,
  },
];

platforms.forEach(platform => {
  createPlatform(platform);
});

function createPlatform(platform) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.4,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.scale.set(platform.width, platform.height, platform.depth);
  mesh.position.set(platform.x, platform.y, platform.z);
  mesh.material.color.setHex(platform.color);
  scene.add(mesh);

  const shape = new CANNON.Box(
    new CANNON.Vec3(platform.width * 0.5, platform.height * 0.5, platform.depth * 0.5)
  );

  const body = new CANNON.Body({
    mass: 0,
    shape,
    fixedRotation: true,
    collisionFilterGroup: PLATFORM,
    collisionFilterMask: PLAYER,
  });
  body.position.set(platform.x, platform.y, platform.z);
  world.addBody(body);
  objectsToUpdate["platform-" + platforms.indexOf(platform)] = { mesh, body };
};

function createPlayer(player) {
  const loader = new GLTFLoader();
  loader.load(
    modelDir + player.character + ".glb",
    gltf => {
      gltf.scene.scale.set(player.glbScale, player.glbScale, player.glbScale);
      gltf.scene.position.set(player.x, player.y, player.z);
      gltf.scene.castShadow = true;
      scene.add(gltf.scene);

      var body;
      const mesh = gltf.scene;

      if (player.id === myId) {
        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const shape = new CANNON.Box(
          new CANNON.Vec3(0.2, size.y * 0.5, size.z * 0.5)
        );

        body = new CANNON.Body({
          mass: player.mass,
          fixedRotation: true,
          collisionFilterGroup: PLAYER,
          collisionFilterMask: PLATFORM,
        });
        body.addShape(shape, new CANNON.Vec3(0, size.y / 2, 0));
        body.position.copy(mesh.position);
        body.addEventListener("collide", () => {
          players[myId].jumping = false;
          players[myId].jumps = 0;
        });
        world.addBody(body);
      } else {
        body = new CANNON.Body();
      }

      objectsToUpdate[player.id] = { mesh, body };
    },
  );
}

function initGame() {
  Object.keys(players).forEach(id => {
    createPlayer(players[id]);
  });

  animate();
}

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 40, 60);
spotLight.castShadow = true;
scene.add(spotLight);

camera.position.z = 7;
camera.fov = 60;
camera.updateProjectionMatrix();

function animate() {
  animateFrame = requestAnimationFrame(animate);
  updatePlayer();
  world.step(1 / 60);

  Object.keys(objectsToUpdate).forEach(o => {
    const object = objectsToUpdate[o];
    const buffer = 0.6;
    object.mesh.position.copy(object.body.position);
    object.mesh.quaternion.copy(object.body.quaternion);

    if (Object.keys(players).includes(o) && o !== myId) {
      const player = players[o];
      const box = new THREE.Box3().setFromObject(object.mesh);
      const size = box.getSize(new THREE.Vector3());
      object.body.position.x += buffer * (player.x - object.body.position.x);
      object.body.position.y += buffer * ((player.y - size.y / 2) - object.body.position.y);
      object.body.position.z += buffer * (player.z - object.body.position.z);
    }
  });

  renderer.render(scene, camera);
}

function updatePlayer() {
  if (!players[myId]) return;
  if (typeof objectsToUpdate[myId] === "undefined") return;

  if (movement.up && players[myId].jumps < players[myId].maxJumps && !players[myId].jumping) {
    players[myId].jumping = true;
    objectsToUpdate[myId].body.velocity.y = players[myId].jumpForce;
    players[myId].jumps++;
  } else if (!movement.up) {
    players[myId].jumping = false;
  }

  if (movement.left) {
    players[myId].xVel -= players[myId].speed;
  }

  if (movement.right) {
    players[myId].xVel += players[myId].speed;
  }

  players[myId].xVel *= 0.8;

  objectsToUpdate[myId].body.position.x += players[myId].xVel;
  objectsToUpdate[myId].body.velocity.x = 0;
  objectsToUpdate[myId].body.position.z = 0;

  const box = new THREE.Box3().setFromObject(objectsToUpdate[myId].mesh);
  const size = box.getSize(new THREE.Vector3());

  players[myId].x = objectsToUpdate[myId].body.position.x;
  players[myId].y = objectsToUpdate[myId].body.position.y + size.y / 2;
  players[myId].z = 0;

  var distancesX = [];
  var distancesY = [];

  Object.keys(players).forEach(id => {
    const player = players[id];
    distancesX[distancesX.length] = player.x;
    distancesY[distancesY.length] = player.y;
  });

  const zoom = {
    default: 50,
    amount: 3,
    min: 40,
    max: 80,
  };
  const position = {
    xmin: -6,
    xmax: 6,
    ymin: -6,
    ymax: 6,
  };
  const smoothing = 0.1;
  const distance = getDistance(distancesX[0], distancesX[distancesX.length - 1], distancesY[0], distancesY[distancesY.length - 1]);
  const range = (distance * zoom.amount) / 13 * zoom.default;

  camera.position.x += smoothing * ((distancesX[0] + distancesX[distancesX.length - 1]) / 2 - camera.position.x);
  camera.position.y += smoothing * ((distancesY[0] + distancesY[distancesY.length - 1]) / 2 - camera.position.y);
  camera.rotation.y += smoothing * (camera.position.x / 40 - camera.rotation.y);
  camera.fov += smoothing * (range - camera.fov);
  
  if (camera.fov > zoom.max) {
    camera.fov += smoothing * (zoom.max - camera.fov);
  }

  if (camera.fov < zoom.min) {
    camera.fov += smoothing * (zoom.min - camera.fov);
  }

  if (camera.position.x > position.xmax) {
    camera.position.x += smoothing * (position.xmax - camera.position.x);
  }

  if (camera.position.x < position.xmin) {
    camera.position.x += smoothing * (position.xmin - camera.position.x);
  }

  if (camera.position.y > position.ymax) {
    camera.position.y += smoothing * (position.ymax - camera.position.y);
  }

  if (camera.position.y < position.ymin) {
    camera.position.y += smoothing * (position.ymin - camera.position.y);
  }

  camera.updateProjectionMatrix();

  Object.keys(objectsToUpdate).forEach(id => {
    if (id.includes("platform")) return;
    if (Object.keys(players).includes(id)) return;
    removeObject(id);
  });

  sessionStorage.setItem("gameSave", JSON.stringify(players[myId]));
}

function getDistance(x1, x2, y1, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function removeObject(id) {
  scene.remove(objectsToUpdate[id].mesh);
  world.removeBody(objectsToUpdate[id].body);
  delete objectsToUpdate[id];
}