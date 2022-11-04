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
import { DrawingPage } from '../pages/drawing/drawing';
import { HomePage } from '../pages/home/home';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

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
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    DrawingPage,
    HomePage,
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
    DrawingPage,
    HomePage,
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
