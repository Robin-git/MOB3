import { Component, OnInit } from "@angular/core";
import { FileChooser } from "@ionic-native/file-chooser";
import { Refresher } from "ionic-angular/components/refresher/refresher";
import { NavController } from "ionic-angular";

import { UploadService } from "../../services/upload.service";
import { InteractionService } from "../../services/interaction.service";
import { ErrorService } from "../../services/error.service";

import { TableAnalysisPage } from "../table-analysis/table-analysis";

@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage implements OnInit {
  dataList: string[] = [];

  constructor(
    private fileChooser: FileChooser,
    private uploadService: UploadService,
    private uiService: InteractionService,
    private errorService: ErrorService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.uploadService
      .checkDataDirectoryIsExist()
      .then(() => this.updateDataList());
  }

  /**
   * Open file chooser and upload file in datadirectory.
   * @return {Promise<void>}
   */
  async upload(): Promise<void> {
    try {
      const uri = await this.fileChooser.open();
      this.uiService.presentLoader("Importation...");
      await this.uploadService.upload(uri);
      this.uiService.presentToast("Le fichier a été importé avec succès.");
      await this.updateDataList();
    } catch (err) {
      this.errorService.handleError(err);
    } finally {
      this.uiService.loader.dismiss();
    }
  }

  /**
   * Delete file from datadirectory.
   * @param item {string}
   * @return {Promise<void>}
   */
  async delete(item: string): Promise<void> {
    try {
      this.uiService.presentLoader("Suppression...");
      await this.uploadService.delete(item);
    } catch(err) {
      this.errorService.handleError(err)
    } finally {
      this.updateDataList()
      this.uiService.loader.dismiss();
      this.uiService.presentToast(`Le fichier ${item} a été supprimé avec succés !`);
    }
  }

  /**
   * Push TableAnalysisPage onto the navigation stack.
   * @param item {string}
   */
  goToStat(item: string) {
    this.navCtrl.push(TableAnalysisPage, { file: item })
  }

  /**
   * Get list of file and sort list.
   * @param refresher {Refresher} if refresher, refrecher complete.
   */
  private updateDataList(refresher?: Refresher): Promise<void> {
    function convertFileOfDate(file: string) {
      let list = file.split("-");
      list[2] = list[2].slice(0, -3);
      let ldate = list.map(value => parseInt(value));
      return new Date(ldate[2], ldate[0] - 1, ldate[1]).getTime()
    }
    return this.uploadService.getDataList().then(data => {
      if (refresher) {
        refresher.complete();
      }
      const list = data.map(value => value.name);
      this.dataList = list.sort((item1, item2) => {
        const date1 = convertFileOfDate(item1)
        const date2 = convertFileOfDate(item2)
        return date1 - date2;
      }).reverse();
    });
  }
}
