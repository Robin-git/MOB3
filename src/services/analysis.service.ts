import { Injectable } from "@angular/core";
import { Analysis, DataAnalysis } from "../class/Analysis";

/**
 * Interface for abstract function getMax, getMin, getAverage etc...
 */
interface ICallbackDataPerHours {
  (dataOneHour: number[]): number;
}

@Injectable()
export class AnalysisService {
  constructor() {}

  /**
   * Return data for display table.
   * @param file {string[][]}
   * @return {Analysis[]}
   */
  dataTable(file: string[][]): Analysis[] {
    let analysises: Analysis[] = [];
    for (let x = 1; x < file[1].length; x++) {
      let analysis: Analysis = new Analysis(file[1][x]);
      analysis.report.max = null;
      analysis.report.min = null;
      let indexMax: number = x;
      let indexMin: number = x;
      let tempAverage: number = 0;
      let nbValue = 0;

      for (let y = 2; y < file.length; y++) {
        if (file[y][x] == " " || !file[y][x]) {
          continue;
        }
        let currentValue = parseInt(file[y][x]);
        if (isNaN(currentValue)) {
          continue;
        }
        nbValue++;
        tempAverage += currentValue;
        analysis.data.push(new DataAnalysis(file[y][0], currentValue));
        if (!analysis.report.max || analysis.report.max <= currentValue) {
          analysis.report.max = currentValue;
          indexMax = y;
        }
        if (!analysis.report.min || analysis.report.min >= currentValue) {
          analysis.report.min = currentValue;
          indexMin = y;
        }
      }
      if (nbValue == 0) {
        continue;
      }
      analysis.report.dateMax = file[indexMax][0];
      analysis.report.dateMin = file[indexMin][0];
      analysis.report.average = tempAverage / nbValue;
      analysises.push(analysis);
    }
    return analysises;
  }

  /**
   * Générate data per hours by one analyse.
   * @param {Analysis}
   * @returns {number[][]}
   * @example
   * let data = generateDataPerHours();
   * // data[0] returns midnight value
   * // data[1] returns one o'clock in the morning
   */
  public generateDataPerHours(analyse: Analysis): number[][] {
    let dataPerHours: Array<Array<number>> = [];
    let currentDate: number = 0;
    let dataHours: Array<number> = [];
    for (const element of analyse.data) {
      const hour: number = new Date(element.date).getHours();
      if (hour == currentDate) {
        dataHours.push(element.value);
      } else {
        dataPerHours = [...dataPerHours, dataHours];
        dataHours = [];
        currentDate = hour;
      }
    }
    return dataPerHours;
  }

  /**
   * Abstract function getMax, getMin, getAverage etc...
   * @param {number[][]} option
   * @param {ICallbackDataPerHours} callback
   * @returns {number[]}
   */
  private iterateDataPerHours(
    option: number[][],
    callback: ICallbackDataPerHours
  ): number[] {
    return option.map(dataOneHours => {
      if (dataOneHours.length <= 0) {
        return null;
      }
      return callback(dataOneHours);
    });
  }

  /**
   * Get maximum value by hours.
   * @param {number[][]} dataPerHours data per hours by one analyse
   * @returns {number[]}
   */
  public getMax(dataPerHours: number[][]): number[] {
    return this.iterateDataPerHours(dataPerHours, dataOneHour => {
      return Math.max(...dataOneHour);
    });
  }

  /**
   * Get minimum value by hours.
   * @param {number[][]} dataPerHours data per hours by one analyse
   * @returns {number[]}
   */
  public getMin(dataPerHours: number[][]): number[] {
    return this.iterateDataPerHours(dataPerHours, dataOneHour => {
      return Math.min(...dataOneHour);
    });
  }

  /**
   * Get average value by hours.
   * @param {number[][]} dataPerHours data per hours by one analyse
   * @returns {number[]}
   */
  public getAverage(dataPerHours: number[][]): number[] {
    return this.iterateDataPerHours(dataPerHours, dataOneHour => {
      const reducer = dataOneHour.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      return reducer / dataOneHour.length;
    });
  }
}
