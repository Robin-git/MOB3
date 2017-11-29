import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { FileChooser } from "@ionic-native/file-chooser";

import {
  FileTransfer,
  FileTransferObject
} from "@ionic-native/file-transfer";

import { File } from '@ionic-native/file';

@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {
  Err: any;
  imgURI: string;
  imgFileName: string;

  constructor(
    public navCtrl: NavController,
    public loadCtrl: LoadingController,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    private file: File,
    public toastCtrl: ToastController
  ) {}

  upload() {
    let loader = this.loadCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();

    this.fileChooser
      .open()
      .then(uri => {
        this.imgURI = uri
        fileTransfer.download(uri, this.file.dataDirectory + 'file.jpeg').then(
          data => {
            loader.dismiss();
            this.presentToast("Image uploaded successfully");
          },
          err => {
            this.Err = this.imgURI;
            loader.dismiss();
          }
        );
      })
      .catch(e => this.Err = e);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
