import { SceneObject } from "../interfaces/scenes";

function sceneParser(level: string, characterData: ASCIIRenderConfig): SceneObject[] {
  function parseRow(rowString: string[], rowIndex: number) {
    const floor = characterData['.'];

    const objsToRender = rowString
      .map( (char, i) => characterData[char] )
      .map( (obj, i) => Object.assign({}, obj, { position: { x: i, y: rowIndex } }) );

    const addFloor = (_objects: InWorldGameObject[], _floor: GameObject) => {
      const withFloor = _objects
        .filter( o => o.floor )
        .map( ({ floor, position }) => Object.assign({}, characterData[floor], { position } ) ) as InWorldGameObject[];

      return _objects.concat(...withFloor);
    }

    const withFloored = addFloor(objsToRender, floor);

    return floor ? withFloored : objsToRender;
  }

  const trimLevel = level.trim().replace(/\n\s+?(#)/g, '\n$1');
  const sceneObject = trimLevel
    .split(/\n/)                                    // Split by rows
    .map( e => e.split('') )                        // Split by character
    .map( (e, rowIndex) => parseRow(e, rowIndex) )  // Parse each character
    .reduce( (p, n) => p.concat(...n), [])          // Put all in object
    .map( (e, index) => ({ ...e, id: index }));     // Add IDs

  return sceneObject;
}

export default sceneParser;