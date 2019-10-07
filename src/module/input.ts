class InputModule {
  private scene: Phaser.Scene;
  private events: [Phaser.Input.Keyboard.Key, (...args: any[]) => void][];

  constructor() {
    this.scene = null;
    this.events = [];
  };

  public attachToScene(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public initControls() {
    this.events.push( [this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W), () => console.log('up')] );
    this.events.forEach( e => {
      e[0].on('down', e[1]);
    })
  }
};

export default new InputModule;