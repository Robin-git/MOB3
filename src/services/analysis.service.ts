import { Injectable } from "@angular/core";

export class Analysis {
  data: {
    min: number | string;
    dateMin: Date | string;
    max: number | string;
    dateMax: Date | string;
    average: number | string;
  };

  constructor(public name: string) {
    this.data = {
      min: 0,
      dateMin: null,
      max: 0,
      dateMax: null,
      average: 0
    };
  }
}

@Injectable()
export class AnalysisService {
  constructor() {}

  formatData(file: string[][]): Analysis[] {
    let analysises: Analysis[] = [];
    for (let x = 1; x < file[1].length; x++) {
      let analysis: Analysis = new Analysis(file[1][x]);
      analysis.data.max = null;
      analysis.data.min = null;
      let indexMax: number = x;
      let indexMin: number = x;
      let tempAverage: number = 0;
      let nbValue = 0;

      for (let y = 2; y < file.length; y++) {
        if (file[y][x] == " " || !file[y][x]) {
          break;
        }
        let currentValue = parseInt(file[y][x]);
        if (isNaN(currentValue)) {
          analysis.data.min = file[y][x];
          break;
        }
        nbValue++;
        tempAverage += currentValue;
        if (!analysis.data.max || analysis.data.max <= currentValue) {
          analysis.data.max = currentValue;
          indexMax = y;
        }
        if (!analysis.data.min || analysis.data.min >= currentValue) {
          analysis.data.min = currentValue;
          indexMin = y;
        }
      }
      analysis.data.dateMax = file[indexMax][0];
      analysis.data.dateMin = file[indexMin][0];
      analysis.data.average = tempAverage / nbValue;
      analysises.push(analysis);
    }
    return analysises;
  }
}
