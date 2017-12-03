import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { InteractionService } from '../../services/interaction.service';
import { ParserService } from '../../services/parser.service';

/**
 * Generated class for the TableAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-table-analysis',
  templateUrl: 'table-analysis.html',
})
export class TableAnalysisPage {

  fileSelected: string;

  constructor(
    private navParams: NavParams,
    private uiService: InteractionService,
    private parserService: ParserService
  ) {
    this.fileSelected = this.navParams.get('file');
  }

  async ionViewDidLoad() {
    try {
      this.uiService.presentLoader("Analyse du fichier en cours...");
      await this.parserService.parserFile(this.fileSelected);
      this.uiService.presentToast("Fichier lue avec success")
    } catch (err) {
      if (err.message == "CANNOT_READ_FILE") {
        this.uiService.presentToast("Impossible de lire le fichier");
      }
    } finally {
      this.uiService.loader.dismiss();
    }
  }

}
