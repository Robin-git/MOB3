import { Component, OnInit } from "@angular/core";
import { Refresher } from "ionic-angular/components/refresher/refresher";

import { UploadService } from "../../services/upload.service";
import { ParserService } from "../../services/parser.service";

@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage implements OnInit {
  dataList: string[] = [];

  constructor(
    private uploadService: UploadService,
    private parserService: ParserService
  ) {}

  ngOnInit() {
    this.uploadService
      .checkDataDirectoryIsExist()
      .then(() => this.updateDataList());
  }

  upload(): Promise<void> {
    return this.uploadService.upload().then(() => this.updateDataList());
  }

  delete(item: string): Promise<void> {
    return this.uploadService.delete(item).then(() => this.updateDataList());
  }

  goToStat(item: string) {
    this.parserService.parserFile(item).then(
      data => console.log(data)
    );
  }

  private updateDataList(refresher?: Refresher): Promise<void> {
    return this.uploadService
      .getDataList()
      .then(data => { 
        if (refresher) {
          refresher.complete();
        }
        this.dataList = data.map(value => value.name)
      });
  }
}
