import * as THREE from "three";
import { TweenLite } from "gsap";

import ImaginationScene from "./ImaginationScene.js";

export default class SceneManager {
  constructor(canvas) {
    let container = document.getElementById("threejs-container");
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    this.width = canvas.width;
    this.height = canvas.height;
    this.size = {
      width: this.width,
      height: this.height
    };

    this.clock = new THREE.Clock();
    this.clock.start();

    //Setup Scene, Lights, Camera and Renderer
    this.scene = new THREE.Scene();
    this.lights = this.buildLights(this.scene);
    this.camera = this.buildCamera(this.width, this.height);
    this.renderer = this.buildRender(this.width, this.height);

    this.initScenes();
  }

  initScenes() {
    this.imaginationScene = new ImaginationScene(this.scene);
    this.imaginationScene.init();
  }

  buildLights(scene) {
    var light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 150);
    light.position.set(10, 5, 5);
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 1, 150);
    light.position.set(-10, 5, 5);
    scene.add(light);
  }

  buildCamera(width, height) {
    var aspectRatio = width / height;
    var fieldOfView = 75;
    var nearPlane = 1;
    var farPlane = 200;
    var camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    camera.position.set(0, 20, 1);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }

  buildRender(width, height) {
    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    var DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    return renderer;
  }

  update() {
    const delta = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
    this.time += 1;
    this.imaginationScene.update(delta);
  }
}
