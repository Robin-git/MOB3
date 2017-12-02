import { Injectable } from "@angular/core";

import { Loading, LoadingController, ToastController } from "ionic-angular";

import { File, Entry, DirectoryEntry } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";

import { ParserService } from "./parser.service";
import { Config } from "./config";

@Injectable()
export class UploadService {
  public loader: Loading;
  private DATADIR: string;

  constructor(
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private parserService: ParserService
  ) {
    this.DATADIR = Config.DATADIR(this.file)
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
      console.log(err)
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
  async upload(): Promise<void | Error> {
    try {
      const uri = await this.fileChooser.open();
      this.presentLoader("Importation...");
      const filePath = await this.file.resolveLocalFilesystemUrl(uri);
      const url = await this.filePath.resolveNativePath(filePath.toURL());
      const correctPath = url.substr(0, url.lastIndexOf("/") + 1);
      const currentName = url.substr(url.lastIndexOf("/") + 1);
      if (currentName.split(".").pop() != "his") {
        this.loader.dismiss();
        this.presentToast(
          "Impossible d'importer le fichier, seule les fichiers '.his' sont autorisés."
        );
        return;
      }
      const dateName = await this.parserService.getDateOfFile(currentName, correctPath);
      await this.file.copyFile(
        correctPath,
        currentName,
        this.DATADIR,
        this.generateFileName(dateName)
      );
      this.loader.dismiss();
      this.presentToast("Le fichier à bien était importé.");
    } catch (err) {
      console.log(JSON.stringify(err));
      return err;
    }
  }

  /**
   * Delete file from Data Directory
   * @param item {string}
   */
  async delete(item: string): Promise<void | Error> {
    try {
      this.presentLoader("Suppression...");
      await this.file.removeFile(this.DATADIR, item);
      this.presentToast(`Le fichier ${item} à bien étais supprimé !`);
    } catch (err) {
      this.presentToast(`Une erreur est survenue !`);
      console.log(err);
    }
    this.loader.dismiss();
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

  /**
   * Create and present toast
   * @param msg {string}
   */
  public presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  /**
   * Create and present loader
   * @param msg {string}
   */
  public presentLoader(msg: string) {
    this.loader = this.loadCtrl.create({
      content: msg
    });
    this.loader.present();
  }
}
