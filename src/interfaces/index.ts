interface WorldPosition {
  x: number;
  y: number;
}

interface GameObject<Render = ASCIIRender> {
  name: string;
  position?: WorldPosition;
  floor?: string;
  render?: Render;
  zIndex?: number;
  solid?: boolean;
}

interface InWorldGameObject extends GameObject {
  position: WorldPosition;
  floor?: string;
}
