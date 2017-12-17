import Report from "./Report";

export class DataAnalysis {
  constructor(public date: string, public value: number) {}
}

export class Analysis {
  report: Report;
  data: DataAnalysis[];

  constructor(public name: string) {
    this.report = new Report();
    this.data = [];
  }

  public getDataByDate(date: Date) {
    return this.data.find(data => data.date == date.toString());
  }
}
