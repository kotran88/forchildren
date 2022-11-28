import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import * as firebase from "firebase"
import { DragulaModule } from 'ng2-dragula';
import { initializeApp } from "firebase/app";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login2Page } from '../pages/login2/login2';
import { DrawingPage } from '../pages/drawing/drawing';
import { ReceiptPage } from '../pages/receipt/receipt';
import { DropdownPage } from '../pages/dropdown/dropdown';
import { DrawPage } from '../pages/draw/draw';
import { ReceiptsProvider } from '../providers/receipts/receipts';
import { HttpClientModule } from '@angular/common/http';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UtilProvider } from '../providers/util/util';
import { ExpansionRecipePage } from '../pages/expansion-recipe/expansion-recipe';
// import {Crop} from '@ionic-native/crop/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyDnAhTYDrVx_1hqwChoD44C5SbCl97soGA",
  authDomain: "forch-74f10.firebaseapp.com",
  databaseURL: "https://forch-74f10-default-rtdb.firebaseio.com",
  projectId: "forch-74f10",
  storageBucket: "forch-74f10.appspot.com",
  messagingSenderId: "164203318212",
  appId: "1:164203318212:web:1d553bebd574632a92b291",
  measurementId: "G-46Y6GB6FHV"
};
initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login2Page,
    DrawingPage,
    ReceiptPage,
    DropdownPage,
    DrawPage,
    ExpansionRecipePage,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DragulaModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login2Page,
    DrawingPage,
    ReceiptPage,
    DropdownPage,
    DrawPage,
    ExpansionRecipePage,
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReceiptsProvider,
    Screenshot,
    UtilProvider,
    // Crop,
  ]
})
export class AppModule {}
