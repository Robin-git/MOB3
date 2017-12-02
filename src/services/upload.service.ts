import { Injectable } from "@angular/core";

import { File, Entry, DirectoryEntry } from "@ionic-native/file";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { Loading, LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class UploadService {
  public Directory: string = "data";
  public loader: Loading;

  constructor(
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private loadCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {}

  /**
   * Return full name of Data Directory of application.
   * @return {string}
   */
  get DataDirectory(): string {
    return this.file.dataDirectory + this.Directory;
  }

  /**
   * Return list of files into Data Directory of application.
   * @return {Promise<Entry[]>}
   */
  getDataList(): Promise<Entry[]> {
    return this.file.listDir(this.file.dataDirectory, "data");
  }

  /**
   * Check if Data Directory is exist. If not exist, dir is created.
   * @return {Promise<DirectoryEntry | Error>}
   */
  async checkDataDirectoryIsExist(): Promise<DirectoryEntry | Error> {
    try {
      await this.file.checkDir(this.file.dataDirectory, this.Directory);
    } catch (err) {
      console.log(err)
      if (err.message == "NOT_FOUND_ERR") { 
        return await this.file.createDir(
          this.file.dataDirectory,
          this.Directory,
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
      await this.file.copyFile(
        correctPath,
        currentName,
        this.DataDirectory,
        this.generateFileName()
      );
      this.loader.dismiss();
      this.presentToast("Le fichier à bien était importé.");
    } catch (err) {
      console.log(err);
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
      await this.file.removeFile(this.DataDirectory, item);
      this.presentToast(`Le fichier ${item} à bien étais supprimé !`);
    } catch (err) {
      this.presentToast(`Une erreur est survenue !`);
      console.log(err);
    }
    this.loader.dismiss();
  }

  /**
   * Generate name of file
   * @example generateFileName()
   * 02-02-2017.his
   * @return {string}
   */
  generateFileName(): string {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    const d = new Date();
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
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
