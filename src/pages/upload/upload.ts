import { Component } from "@angular/core";
import {
  NavController,
  LoadingController,
  ToastController
} from "ionic-angular";
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { File } from "@ionic-native/file";

@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {
  fileName: string;
  constructor(
    public navCtrl: NavController,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private file: File
  ) {}

  getFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    this.fileChooser
      .open()
      .then(uri => {
        fileTransfer.download(uri, this.file.dataDirectory + "file.jpg").then(
          data => {
            this.fileName = data.toURL();
            loader.dismiss();
            this.presentToast("Image uploaded successfully");
          },
          err => {
            console.log(err);
            loader.dismiss();
            this.presentToast(err);
          }
        );
      })
      .catch(_ => loader.dismiss());
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
