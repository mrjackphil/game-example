interface GameObjects<Render = ASCIIRender> {
  name: string;
  position?: WorldPosition;
  render?: Render;
}
