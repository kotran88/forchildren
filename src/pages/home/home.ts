import { Component,ViewChild } from '@angular/core';
import { NavController, ViewController,NavParams,LoadingController, ModalController } from 'ionic-angular';
import * as $ from 'jquery';
import firebase from 'firebase';
import { OnoffutilProvider } from '../../providers/onoffutil/onoffutil';
import { AngularFireAuth } from 'angularfire2/auth';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  firemain = firebase.database().ref();

  constructor(public firebaseAuth: AngularFireAuth,
    public view:ViewController,public loading:LoadingController,
    public navCtrl: NavController, public navParams: NavParams, public util: OnoffutilProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage')
  }

  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
}
