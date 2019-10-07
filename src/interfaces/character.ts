interface Character<Render = ASCIIRender> {
  name: string;
  position?: WorldPosition;
  render?: Render;
}
