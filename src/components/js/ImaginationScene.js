import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";
import NoiseSphere from "./NoiseSphere";

export default function ImaginationScene(scene) {
  this.sceneGroup = new THREE.Group();
  scene.add(this.sceneGroup);
  this.loader = new GLTFLoader();

  // scene.background
  this.init = () => {
    this.load();
  };

  this.load = () => {
    // instantiate a loader

    var geometry = new THREE.BoxBufferGeometry(10, 10, 10);
    var material = new THREE.MeshStandardMaterial({ color: 0x000000 });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    this.sceneGroup.add(mesh);

    let radius = 10;
    let widthSegments = 100;
    let heightSegments = 100;
    let noiseOptions = {
      seed: 1,
      noiseWidth: 10,
      noiseHeight: 10
    };
    let noiseSphere = new NoiseSphere(
      radius,
      widthSegments,
      heightSegments,
      noiseOptions
    );
  };

  this.update = delta => {
    this.sceneGroup.rotation.x += delta;
    this.sceneGroup.rotation.y += delta;
  };
}
