import { File } from "@ionic-native/file";

/**
 * @namespace Config
 * Configure your project, only contain constante and pure function.
 */
export namespace Config {
  export const DIR: string = "data";
  export function DATADIR(file: File): string {
      return file.dataDirectory + DIR;
  }
}
