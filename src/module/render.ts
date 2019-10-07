import sceneParser from "../helpers/level_parser";

function RenderModule(scene: Phaser.Scene, levelString: string, conf: Configuration, cellSize: number) {
  return sceneParser(levelString, conf).forEach( e => {
    scene.add.text( e.position.x * cellSize, e.position.y * cellSize, e.render );
  });
};

export default RenderModule;
