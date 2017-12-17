import { Component, Input } from "@angular/core";
import * as HighCharts from "highcharts";

import { Analysis } from "../../class/Analysis";

/**
 * Generated class for the FullDataGraphicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "full-data-graphic",
  templateUrl: "full-data-graphic.html"
})
export class FullDataGraphicComponent {
  @Input() analyse: Analysis;
  timeSeries: HighCharts.ChartObject;

  constructor() {}

  ngOnInit() {
    try {
      this.timeSeries = HighCharts.chart("timeSeries", {
        chart: {
          zoomType: "x"
        },
        title: { text: "Totalité des données de la journée" },
        xAxis: {
          title: {
            text: "Seconde de la journée"
          }
        },
        yAxis: {
          title: {
            text: ""
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, HighCharts.getOptions().colors[0]],
                [
                  1,
                  HighCharts.Color(HighCharts.getOptions().colors[0])
                    .setOpacity(0)
                    .get("rgba")
                ]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [
          {
            type: "area",
            data: this.analyse.data.map(data => data.value)
          }
        ]
      });
    } catch (err) {
      console.error(err.message);
    }
  }
}
