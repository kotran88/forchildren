import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Login2Page } from '../pages/login2/login2';
import { ReceiptPage } from '../pages/receipt/receipt';
import { DropdownPage } from '../pages/dropdown/dropdown';
import { DrawPage } from '../pages/draw/draw';
import { DrawingPage } from '../pages/drawing/drawing';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
  }
}

