// Core
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Components
import { UploadPage } from '../pages/upload/upload';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from "@ionic-native/file-path";
import { File } from '@ionic-native/file';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

// Services
import { UploadService } from '../services/upload.service';
import { ParserService } from '../services/parser.service';
import { InteractionService } from '../services/interaction.service';
import { ErrorService } from '../services/error.service';

// Module
import { ComponentsModule } from '../components/components.module';
import { TableAnalysisPageModule } from '../pages/table-analysis/table-analysis.module';
import { ChartPageModule } from '../pages/chart/chart.module';

@NgModule({
  declarations: [
    MyApp,
    UploadPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    TableAnalysisPageModule,
    ChartPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UploadPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    ScreenOrientation,
    FileChooser,
    FileTransfer,
    FilePath,
    UploadService,
    ParserService,
    InteractionService,
    ErrorService
  ]
})
export class AppModule {}
