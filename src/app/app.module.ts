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
