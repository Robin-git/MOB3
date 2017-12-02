import { Component, OnInit } from "@angular/core";

import { UploadService } from "../../services/upload.service";
import { Refresher } from "ionic-angular/components/refresher/refresher";

@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage implements OnInit {
  dataList: string[] = [];

  constructor(
    private uploadService: UploadService
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
    console.log(item);
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
