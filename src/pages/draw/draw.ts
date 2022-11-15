import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the DrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-draw',
  templateUrl: 'draw.html',
})
export class DrawPage {

  root_image_path : string = "assets/imgs/대체식품/03_Planning/00_basic btn/";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DrawPage');
  }

  back_button()
  {
    this.navCtrl.pop();
  }

  home_button()
  {
    this.navCtrl.setRoot(HomePage);
  }
}
