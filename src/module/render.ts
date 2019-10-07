import { SceneObject } from "../interfaces/scenes";
import { findAllInPlace } from "../helpers/object_placement";

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

    function checkZIndex(obj: SceneObject[], zIndex: number) {
      return obj.map( e => e.zIndex ).reduce( (p, n) => n > p ? n : p, 0) === zIndex;
    }

    const renderedElms = objects.filter( e => {
      const elems = findAllInPlace(objects, e.position)
      return elems.length === 1 || checkZIndex(elems, e.zIndex)
    });

    return renderedElms.map( e => scene.add.text( e.position.x * cellSize, e.position.y * cellSize, e.render ) );
};

}

export default RenderModule;
