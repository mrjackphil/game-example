interface WorldPosition {
  x: number;
  y: number;
}

interface GameObjects<Render = ASCIIRender> {
  name: string;
  position?: WorldPosition;
  render?: Render;
  zIndex?: number;
}
