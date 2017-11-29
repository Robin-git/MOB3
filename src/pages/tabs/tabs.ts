import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { UploadPage } from '../upload/upload';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRootHome = HomePage;
  tabRootAbout = AboutPage;
  tabRootUpload = UploadPage;

  constructor() {

  }
}
