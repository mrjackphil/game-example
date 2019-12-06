import Phaser, { Game } from "phaser";
import logoImg from "./assets/logo.png";
import characters from "./data/characters";
import devLevel from "./scenes/dev";
import RenderModule from "./module/render";
import InputModule, { InputConfig } from "./module/input";
import GameStore from './module/store';
import sceneParser from "./helpers/level_parser";
import { returnNewPosition, Direction, isSolid } from "./module/movement";
import objects from "./data/objects";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: renderScene,
  }
};

const game = new Phaser.Game(config);
const renderer = new RenderModule();

function preload() {
  const scene = this as Phaser.Scene;

  scene.load.image("logo", logoImg);
  scene.load.bitmapFont('atari-smooth', 'src/assets/fonts/atari-smooth/atari-smooth.png', 'src/assets/fonts/atari-smooth/atari-smooth.xml');
  scene.load.bitmapFont(
    'source-code-pro',
    [
      'src/assets/fonts/source-code-pro/source-code-pro_0.png',
      'src/assets/fonts/source-code-pro/source-code-pro_1.png'
    ],
    'src/assets/fonts/source-code-pro/source-code-pro.xml');
}

function renderScene() {
  const scene = this as Phaser.Scene;
  const cellSize = 20;
  const renderConf = {
    "@": characters.Player,
    'W': characters.Wooky,
    "#": objects.wall,
    ".": objects.floor,
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

  GameStore.objects = sceneParser(devLevel, renderConf);
  GameStore.rendered = renderer.render(GameStore.objects);

  /* When player use WASD */
  function makeStep(dir: Direction) {
    function characterMoveAction(_instance: InWorldGameObject, _direction: Direction, _store: InWorldGameObject[]) {
      const instanceWithNextPosition = returnNewPosition(_instance, _direction);
      return isSolid(_store, instanceWithNextPosition) ? _instance : instanceWithNextPosition;
    }

    GameStore.objects = GameStore.objects.map( object =>
      object.render === '@'
      ? characterMoveAction(object, dir, GameStore.objects)
      : object
    );

    clearScene();
    updateStep();
  }
}

function updateStep() {
  GameStore.rendered = renderer.render(GameStore.objects);
}

function clearScene() {
  GameStore.rendered.forEach( obj => obj.destroy() );
}
