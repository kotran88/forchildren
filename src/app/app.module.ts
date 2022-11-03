import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as firebase from "firebase"
import { MyApp } from './app.component';
// import { LoginPage } from '../pages/login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { OnoffutilProvider } from '../providers/onoffutil/onoffutil';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation/';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Cameraselect2Page } from '../pages/cameraselect2/cameraselect2';
// import { HomePage } from '../pages/home/home';
// import { CompletePage } from '../pages/complete/complete';
import { GongjiPage } from '../pages/gongji/gongji';
import { DetailgongjiPage } from '../pages/detailgongji/detailgongji';
import { DrawingPage } from '../pages/drawing/drawing';
import { ViewdatapagePage } from '../pages/viewdatapage/viewdatapage';
import { ViewCustomerPage } from '../pages/viewcustomerpage/viewcustomerpage';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Complete2Page } from '../pages/complete2/complete2';
import { Home2Page } from '../pages/home2/home2';
import { Login2Page } from '../pages/login2/login2';

var firebaseConfig = {
  apiKey: "AIzaSyDtpcTlphU26s7cct2G3TcXEr96TbPCDs8",
  authDomain: "samchully2-75f40.firebaseapp.com",
  databaseURL: "https://samchully2-75f40-default-rtdb.firebaseio.com",
  projectId: "samchully2-75f40",
  storageBucket: "samchully2-75f40.appspot.com",
  messagingSenderId: "979267287895",
  appId: "1:979267287895:web:2d2abbcf439aaba2179c12",
  measurementId: "G-J9K6NFCNCQ"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    Login2Page,
    Cameraselect2Page,
    // HomePage,
    Home2Page,
    // CompletePage,
    Complete2Page,
    GongjiPage,
    DetailgongjiPage,
    DrawingPage,
    ViewdatapagePage,
    ViewCustomerPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // LoginPage,
    Login2Page,
    Cameraselect2Page,
    // HomePage,
    Home2Page,
    // CompletePage,
    Complete2Page,
    GongjiPage,
    DetailgongjiPage,
    DrawingPage,
    ViewdatapagePage,
    ViewCustomerPage

  ],
  providers: [
    AngularFireAuth,
    Camera,
    PhotoViewer,
    Geolocation,
    FCM,
    ImagePicker,
    EmailComposer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    OnoffutilProvider,
  ]
})
export class AppModule { }
