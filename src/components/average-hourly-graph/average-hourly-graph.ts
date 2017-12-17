import { Component, OnInit, Input } from "@angular/core";
import * as HighCharts from "highcharts";

import { AnalysisService } from "../../services/analysis.service";

/**
 * Generated class for the AverageHourlyGraphComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "average-hourly-graph",
  templateUrl: "average-hourly-graph.html"
})
export class AverageHourlyGraphComponent implements OnInit {
  @Input() dataPerHours: number[][];
  basicLine: HighCharts.ChartObject;

  constructor(private analyseService: AnalysisService) {}

  ngOnInit() {
    try {
      const min = this.analyseService.getMin(this.dataPerHours),
        max = this.analyseService.getMax(this.dataPerHours),
        average = this.analyseService.getAverage(this.dataPerHours);
      const minDay = Math.min(...min),
        maxDay = Math.max(...max);
      const averageDay = (function() {
        const sum = average.reduce(
          (previous, current) => (current += previous)
        );
        return sum / average.length;
      })();
      this.basicLine = HighCharts.chart("basicLine", {
        chart: { type: "line" },
        title: { text: "Moyenne par heure" },
        xAxis: {
          title: {
            text: "Heures de la journée"
          }
        },
        yAxis: {
          title: {
            text: ""
          },
          plotLines: [
            {
              value: minDay,
              color: "green",
              dashStyle: "shortdash",
              width: 1,
              label: {
                text: "Minimum"
              }
            },
            {
              value: maxDay,
              color: "green",
              dashStyle: "shortdash",
              width: 1,
              label: {
                text: "Maximum"
              }
            },
            {
              value: averageDay,
              color: "black",
              dashStyle: "shortdash",
              width: 1,
              label: {
                text: "Moyenne"
              }
            }
          ]
        },
        series: [
          {
            name: "Minimum pour chaque heure",
            data: min
          },
          {
            name: "Maximum pour chaque heure",
            data: max
          },
          {
            name: "Moyenne pour chaque heure",
            data: average
          }
        ]
      });
    } catch (err) {
      console.error(err.message);
    }
  }
}
