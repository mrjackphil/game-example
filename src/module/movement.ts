import { findAllInPlace } from "../helpers/object_placement";

export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN"

export function move(instance: InWorldGameObject, direction: Direction) {
  switch(direction) {
    case "LEFT":
      return {...instance, position: { ...instance.position, x: instance.position.x - 1}};
    case "RIGHT":
      return {...instance, position: { ...instance.position, x: instance.position.x + 1}};
    case "UP":
      return {...instance, position: { ...instance.position, y: instance.position.y - 1}};
    case "DOWN":
      return {...instance, position: { ...instance.position, y: instance.position.y + 1}};
  }
}

export function isSolid(store: InWorldGameObject[], instanceWithNextPosition: InWorldGameObject) {
  const solids = findAllInPlace(store, instanceWithNextPosition.position)
    .filter( object => object.solid );

  return solids.length !== 0;
}

