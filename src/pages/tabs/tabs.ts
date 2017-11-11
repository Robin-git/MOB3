import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UploadPage } from '../upload/upload';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UploadPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
