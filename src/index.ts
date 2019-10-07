import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import characters from "./data/characters";
import devLevel from "./scenes/dev";
import RenderModule from "./module/render";
import InputModule, { InputConfig } from "./module/input";
import GameStore from './module/store';
import sceneParser from "./helpers/level_parser";
import { move, Direction } from "./module/movement";

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
const store = GameStore;
const renderer = new RenderModule();

function preload() {
  this.load.image("logo", logoImg);
}

function sceneRenderer() {
  const scene = this as Phaser.Scene;
  const cellSize = 50;
  const renderConf = {
    "#": characters.Wooky,
    "@": characters.Player,
  };
  const inputConf: InputConfig = [
    {
      key: Phaser.Input.Keyboard.KeyCodes.W,
      action: () => makeStep("UP"),
    },
    {
      key: Phaser.Input.Keyboard.KeyCodes.A,
      action: () => makeStep("LEFT"),
    },
    {
      key: Phaser.Input.Keyboard.KeyCodes.D,
      action: () => makeStep("RIGHT"),
    },
    {
      key: Phaser.Input.Keyboard.KeyCodes.S,
      action: () => makeStep("DOWN"),
    },
  ];

  /* Init InputModule */
  InputModule.attachToScene(scene);
  InputModule.initControls(inputConf);
  /* Init Renderer */
  renderer.init(scene, cellSize);

  store.objects = sceneParser(devLevel, renderConf);
  store.rendered = renderer.render(store.objects);

  function makeStep(dir: Direction) {
    store.objects = store.objects.map( e => e.render === '@' ? move(e, dir) : e)
    clearScene();
    updateStep();
  }
}

function updateStep() {
  store.rendered = renderer.render(store.objects);
}

function clearScene() {
  store.rendered.forEach( obj => obj.destroy() );
}
