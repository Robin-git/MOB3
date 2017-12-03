import { Injectable } from "@angular/core";

import { Loading, LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class InteractionService {
  public loader: Loading;

  constructor(
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {}

  /**
   * Create and present toast
   * @param msg {string}
   */
  public presentToast(msg: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }

  /**
   * Create and present loader
   * @param msg {string}
   */
  public presentLoader(msg: string) {
    this.loader = this.loadCtrl.create({
      content: msg
    });
    this.loader.present();
  }
}
