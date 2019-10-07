import { SceneObject } from "../interfaces/scenes";

class RenderModule {
  scene: Phaser.Scene;
  cellSize: number;

  constructor(scene: Phaser.Scene = null, cellSize: number = 0) {
    this.scene = scene;
    this.cellSize = cellSize;
  }

  init(scene: Phaser.Scene, cellSize: number) {
    this.scene = scene;
    this.cellSize = cellSize;
  }

  render(objects: SceneObject[]) {
    const {scene, cellSize} = this;
    return objects.map( e => scene.add.text( e.position.x * cellSize, e.position.y * cellSize, e.render ) );
};

}

export default RenderModule;
