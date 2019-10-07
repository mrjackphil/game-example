export type InputConfig = InputConfigElem[];

interface InputConfigElem {
  key: number;
  action: (...args: any[]) => void;
}[];

class InputModule {
  private scene: Phaser.Scene;

  constructor() {
    this.scene = null;
  };

  public attachToScene(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public initControls(conf: InputConfig) {
    conf.forEach( e => {
      this.scene.input.keyboard.addKey(e.key).on('down', e.action);
    });
  }
};

export default new InputModule;