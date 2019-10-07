import { SceneObject } from "../interfaces/scenes";

export function findAllInPlace(obj: SceneObject[], pos: WorldPosition) {
  return obj.filter( e => e.position.x === pos.x && e.position.y === pos.y );
}
