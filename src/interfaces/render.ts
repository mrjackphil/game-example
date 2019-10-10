type ASCIIRender = string;

type Configuration = ASCIIRenderConfig;

interface ASCIIRenderConfig {
  [key: string]: GameObject;
}
