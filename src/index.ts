import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import characters, { Wooky } from "./data/characters";
import devLevel from "./scenes/dev";
import sceneParser from './helpers/level_parser';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: sceneRenderer,
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", logoImg);
}

function sceneRenderer() {
  const scene = this as Phaser.Scene;
  const level = devLevel.trim().replace(/\n\s+?(#)/g, '\n$1');
  const cellSize = 50;
  const renderConf = {
    "#": Wooky,
  };

  sceneParser(level, renderConf).forEach( e => {
    scene.add.text( e.position.x * cellSize, e.position.y * cellSize, e.render );
  });
}
