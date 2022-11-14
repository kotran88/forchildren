import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
// import * as firebase from "firebase"
import { DragulaModule } from 'ng2-dragula';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login2Page } from '../pages/login2/login2';
import { DrawingPage } from '../pages/drawing/drawing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login2Page,
    DrawingPage
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login2Page,
    DrawingPage
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
