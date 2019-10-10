class GameStore {
  public objects: InWorldGameObject[];
  public rendered: any[];
  constructor() {
    this.objects = [];
    this.rendered = [];
  }
}

export default new GameStore;