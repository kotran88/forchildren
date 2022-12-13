import { Component, ViewChild } from '@angular/core';
import { Content, LoadingController, NavController, NavParams, Platform, Slides, ToastController, ViewController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { UtilProvider } from '../../providers/util/util';
import { ReceiptPage } from '../receipt/receipt';

// import * as firebase from "firebase"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;

  food_list= [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public util:UtilProvider) {
    var img_root = "assets/imgs/alternative food/01_Main/01_menu/"
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu01_nor.png", "enable_img": img_root + "btn_menu01_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu02_nor.png", "enable_img": img_root + "btn_menu02_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu03_nor.png", "enable_img": img_root + "btn_menu03_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu04_nor.png", "enable_img": img_root + "btn_menu04_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu05_nor.png", "enable_img": img_root + "btn_menu05_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu06_nor.png", "enable_img": img_root + "btn_menu06_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu07_nor.png", "enable_img": img_root + "btn_menu07_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu08_nor.png", "enable_img": img_root + "btn_menu08_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu09_nor.png", "enable_img": img_root + "btn_menu09_sel.png"})
    this.food_list.push({"active_flag": false, "disable_img": img_root + "btn_menu10_nor.png", "enable_img": img_root + "btn_menu10_sel.png"})

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    // $('ion-slide').slick({
    //   infinite: false,
    //   slidesToShow: 3,
    //   slidesToScroll: 3
    // });
  }

  menu_click(idx)
  {
    for(var i = 0; i < this.food_list.length; i++)
    {
      if(i == idx)
        this.food_list[idx].active_flag = !this.food_list[idx].active_flag;
      else
        this.food_list[i].active_flag = false;
    }
  }

  detail(idx)
  {
    console.log(idx);
    console.log(this.food_list[idx])
    this.navCtrl.push(ReceiptPage, {"index":(idx + 1)})
  }

  slidePrev() {
    console.log(this.slides)
    this.slides.slidePrev();
  }
  slideNext() {
    console.log(this.slides)
    this.slides.slideNext();
  }
  pressed()
  {
    console.log("pressed");
  }
  active()
  {
    console.log("active");
  }
  released()
  {
    console.log("released");
  }
}
