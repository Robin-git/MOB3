import { Component } from "@angular/core";
import { IonicPage, NavParams } from "ionic-angular";

import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { Analysis } from "../../class/Analysis";

import { AnalysisService } from "../../services/analysis.service";

/**
 * Generated class for the ChartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: "page-chart",
  templateUrl: "chart.html"
})
export class ChartPage {
  analyseSelected: Analysis;
  dataPerHours: number[][];

  constructor(
    navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    analyseService: AnalysisService
  ) {
    this.analyseSelected = navParams.get("analyseSelected") as Analysis;
    this.dataPerHours = analyseService.generateDataPerHours(
      this.analyseSelected
    );
  }

  async ionViewDidLoad() {
    await this.screenOrientation.lock(
      this.screenOrientation.ORIENTATIONS.PORTRAIT
    );
  }

  ionViewWillLeave() {
    this.screenOrientation.unlock();
  }
}
