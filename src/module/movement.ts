export type Direction = "LEFT" | "RIGHT" | "UP" | "DOWN"

export function move(instance: { position: {x: number, y: number }}, direction: Direction) {
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

