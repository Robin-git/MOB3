import { Injectable } from "@angular/core";

export class Analysis {
  data: {
    min: number;
    dateMin: Date | string;
    max: number;
    dateMax: Date | string;
    average: number;
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
    for (let x = 1; x < file[1].length - 1; x++) {
      let analysis: Analysis = new Analysis(file[1][x]);
      let tempMax: number = parseInt(file[3][x]);
      let indexMax: number = x;
      let tempMin: number = parseInt(file[3][x]);
      let indexMin: number = x;
      let tempAverage: number = 0;
      let nbValue = 0;

      for (let y = 2; y < file.length - 1; y++) {
        if (file[y][x] == " " || !file[y][x]) {
          continue;
        }
        let currentValue = parseInt(file[y][x]);
        if (isNaN(currentValue)) {
          continue;
        }
        nbValue++;
        tempAverage += currentValue;
        if (tempMax <= currentValue) {
          tempMax = currentValue;
          indexMax = y;
        }
        if (tempMin >= currentValue) {
          tempMin = currentValue;
          indexMin = y;
        }
      }
      if (isNaN(tempMax)) {
          console.log(tempMax);
      }
      analysis.data.max = tempMax;
      analysis.data.min = tempMin;
      analysis.data.dateMax = file[indexMax][0];
      analysis.data.dateMin = file[indexMin][0];
      analysis.data.average = tempAverage / nbValue;
      analysises.push(analysis);
    }
    return analysises;
  }
}
