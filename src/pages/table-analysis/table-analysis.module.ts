import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { TableAnalysisPage } from './table-analysis';

import { AnalysisService } from '../../services/analysis.service';

@NgModule({
  declarations: [
    TableAnalysisPage,
  ],
  imports: [
    IonicPageModule.forChild(TableAnalysisPage),
  ],
  providers: [
    AnalysisService
  ]
})
export class TableAnalysisPageModule {}
