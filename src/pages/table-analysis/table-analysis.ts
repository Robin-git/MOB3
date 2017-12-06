import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";

import { InteractionService } from "../../services/interaction.service";
import { ParserService } from "../../services/parser.service";
import { AnalysisService, Analysis } from "../../services/analysis.service";
import { ChartPage } from "../chart/chart";

/**
 * Generated class for the TableAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-table-analysis",
  templateUrl: "table-analysis.html"
})
export class TableAnalysisPage {
  fileSelected: string;
  analysises: Analysis[] = [];

  constructor(
    private navParams: NavParams,
    private uiService: InteractionService,
    private parserService: ParserService,
    private analysisService: AnalysisService,
    private navCtrl: NavController
  ) {
    this.fileSelected = this.navParams.get("file");
  }

  /**
   * Push ChartPage onto the navigation stack.
   */
  goToChart() {
    this.navCtrl.push(ChartPage, { file: this.fileSelected });
  }

  async ionViewDidLoad() {
    try {
      this.uiService.presentLoader("Analyse du fichier en cours...");
      const allData = await this.parserService.parserFile(this.fileSelected);
      this.analysises = this.analysisService
        .formatData(allData)
        .sort(this.sortAnalysis);
      this.uiService.presentToast("Fichier analysé avec succés !");
    } catch (err) {
      console.log(err.message);
      if (err.message == "CANNOT_READ_FILE") {
        this.uiService.presentToast("Impossible de lire le fichier");
      }
    } finally {
      this.uiService.loader.dismiss();
    }
  }

  private sortAnalysis(a: Analysis, b: Analysis) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
}
