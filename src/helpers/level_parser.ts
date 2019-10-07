import { SceneObject } from "../interfaces/scenes";

function sceneParser(level: string, characterData: ASCIIRenderConfig): SceneObject[] {
  function parseRow(rowString: string[], rowIndex) {
    return rowString
      .map( (char, i) => characterData[char] )
      .map( (obj, i) => Object.assign({}, obj, { position: { x: i, y: rowIndex } }) );
  }

  const trimLevel = level.trim().replace(/\n\s+?(#)/g, '\n$1');
  const sceneObject = trimLevel
    .split(/\n/)
    .map( e => e.split('') )
    .map( (e, rowIndex) => parseRow(e, rowIndex) )
    .reduce( (p, n) => p.concat(...n), []);

  return sceneObject;
}

export default sceneParser;