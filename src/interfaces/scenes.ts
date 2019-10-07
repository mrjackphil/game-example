export interface SceneObject<Render = ASCIIRender> {
  position: WorldPosition;
  render?: Render;
}
