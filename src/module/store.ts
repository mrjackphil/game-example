class GameStore {
  public objects: any[];
  public rendered: any[];
  constructor() {
    this.objects = [];
    this.rendered = [];
  }
}

export default new GameStore;