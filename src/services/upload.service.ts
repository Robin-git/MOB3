import { Injectable } from "@angular/core";

import { File, Entry, DirectoryEntry } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";

import { ParserService } from "./parser.service";
import { ErrorList } from "./error.service";
import { Config } from "./config";

@Injectable()
export class UploadService {
  private DATADIR: string;

  constructor(
    private file: File,
    private filePath: FilePath,
    private parserService: ParserService
  ) {
    this.DATADIR = Config.DATADIR(this.file);
  }

  /**
   * Return list of files into Data Directory of application.
   * @return {Promise<Entry[]>}
   */
  getDataList(): Promise<Entry[]> {
    return this.file.listDir(this.file.dataDirectory, Config.DIR);
  }

  /**
   * Check if Data Directory is exist. If not exist, dir is created.
   * @return {Promise<DirectoryEntry | Error>}
   */
  async checkDataDirectoryIsExist(): Promise<DirectoryEntry | Error> {
    try {
      await this.file.checkDir(this.file.dataDirectory, Config.DIR);
    } catch (err) {
      if (err.message == "NOT_FOUND_ERR") {
        return await this.file.createDir(
          this.file.dataDirectory,
          Config.DIR,
          false
        );
      }
    }
  }

  /**
   * Open file chooser and copy file into DataDirectory of application.
   * @return {Promise<string | Error>}
   */
  async upload(uri: string): Promise<Entry> {
    try {
      const filePath = await this.file.resolveLocalFilesystemUrl(uri);
      const url = await this.filePath.resolveNativePath(filePath.toURL());
      const correctPath = url.substr(0, url.lastIndexOf("/") + 1);
      const currentName = url.substr(url.lastIndexOf("/") + 1);
      if (currentName.split(".").pop() != "his") {
        throw new Error(ErrorList.EXTENSION_FILE_ERR);
      }
      const dateName = await this.parserService.getDateOfFile(
        currentName,
        correctPath
      );
      return await this.file.copyFile(
        correctPath,
        currentName,
        this.DATADIR,
        this.generateFileName(dateName)
      );
    } catch (err) {
      throw err;
    }
  }

  /**
   * Delete file from Data Directory
   * @param item {string}
   */
  async delete(item: string): Promise<void | Error> {
    try {
      await this.file.removeFile(this.DATADIR, item);
    } catch (err) {
      throw new Error(ErrorList.STANDARD_ERR);
    }
  }

  /**
   * Generate name of file white date
   * @param date {Date}
   * @example generateFileName(new Date(2017-02-02 00:00:00))
   * 02-02-2017.his
   * @return {string}
   */
  generateFileName(date: Date): string {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return [day, month, year].join("-") + ".his";
  }
}
