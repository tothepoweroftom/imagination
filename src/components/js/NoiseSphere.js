import * as THREE from "three";
import ImprovedNoise from "./ImprovedNoise";

export default class NoiseSphereGeometry extends THREE.SphereGeometry {
  constructor(
    radius,
    widthSegments,
    heightSegments,
    { seed, noiseWidth, noiseHeight }
  ) {
    super(radius, widthSegments, heightSegments);
    const getNoise = vertice =>
        ImprovedNoise().noise(
          seed + vertice.x / noiseWidth,
          seed + vertice.y / noiseWidth,
          seed + vertice.z / noiseWidth
        ),
      noiseMap = this.vertices.map(getNoise),
      noiseMax = Math.max(...noiseMap),
      noiseMin = -Math.min(...noiseMap);
    for (const v in this.vertices) {
      if (noiseMap[v] > 0) {
        this.vertices[v].elevation = noiseMap[v] / noiseMax;
      } else {
        this.vertices[v].elevation = noiseMap[v] / noiseMin;
      }
      // this.vertices[v].multiplyScalar(
      //   1 + (this.vertices[v].elevation * noiseHeight) / radius
      // );
      console.log(this.vertices);
    }
  }
}
