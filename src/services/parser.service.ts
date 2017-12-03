import { Injectable } from "@angular/core";

import { File } from "@ionic-native/file";
import { ErrorList } from "./error.service";
import { Config } from "./config";

@Injectable()
export class ParserService {
  private DATADIR: string;

  constructor(private file: File) {
    this.DATADIR = Config.DATADIR(this.file);
  }

  /**
   * Verify file is good format
   * @param file {string} name of file
   * @param path {string} (optionnal)
   */
  async getDateOfFile(file: string, path?: string): Promise<Date> {
    try {
      const data = await this.parserFile(file, path);
      return new Date(data[2][0]);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Parse file and return data
   * @param file {string}
   * @param path {string} (optionnal)
   */
  async parserFile(file: string, path?: string): Promise<string[][]> {
    try {
      if (!path) {
        path = this.DATADIR;
      }
      const buff = await this.file.readAsBinaryString(path, file);
      const row = buff.split("\n");
      const data = row.map(r => r.split("\t"));
      if (data[1][0] != "CREATEDATE") {
        throw new Error(ErrorList.CANNOT_READ_FILE_ERR);
      }
      return data;
    } catch (err) {
      throw err;
    }
  }
}
