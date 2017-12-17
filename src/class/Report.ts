export default class Report {
  min: number | string;
  dateMin: Date | string;
  max: number | string;
  dateMax: Date | string;
  average: number | string;

  constructor() {
    this.min = 0;
    this.dateMin = null;
    this.max = 0;
    this.dateMax = null;
    this.average = 0;
  }
}
