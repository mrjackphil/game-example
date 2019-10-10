interface WorldPosition {
  x: number;
  y: number;
}

interface GameObject<Render = ASCIIRender> {
  name: string;
  position?: WorldPosition;
  render?: Render;
  zIndex?: number;
  solid?: boolean;
}

interface InWorldGameObject extends GameObject {
  position: WorldPosition;
}
