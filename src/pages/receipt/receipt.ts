import { Component } from '@angular/core';
import { IonicPage, ModalCmp, ModalController, NavController, NavParams } from 'ionic-angular';
import { DrawPage } from '../draw/draw';
import { HomePage } from '../home/home';
import * as $ from "jquery";
import { ReceiptsProvider } from '../../providers/receipts/receipts';

/**
 * Generated class for the ReceiptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  root_image_path = "assets/imgs/대체식품/02_Recipe/"
  index:any;
  recipe_bar:any;

  modal_page = HomePage;


  // left_info 이미지 갯수
  left_info_cnt = 1;
  left_infos = [0, 1, 3, 3, 2, 4, 3, 1, 2, 2, 1];
  left_infos_position = []
  left_infos_url_list = [];


  // 0 : 가운데 큰 음식
  // 1 : 레시피 글
  // 2 : 레시피 아이콘
  receipts_positions = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public recpv: ReceiptsProvider) {
    this.index = this.navParams.get("index");
    if(!this.index) this.index = 1;

    this.left_infos_url_list = [];
    for(var i = 0; i < this.left_infos[this.index]; i++)
    {
      this.left_infos_url_list.push(this.root_image_path + this.fm_str(this.index)
      + "/left_info" + this.fm_str(i + 1) + ".png");
      this.left_infos_position.push((1600 * i) + 388);
    }

    this.receipts_positions = recpv.get_receipts_positions(this.index);
  }

  fm_str(num)
  {
    var s = '';
    if(num < 10)
      s = '0'

    return s + num;
  }

  chenage_left_info()
  {
    if(this.left_infos[this.index] == 1) return;
    if(this.left_info_cnt < this.left_infos[this.index])
    {
      for(var i = 0; i < this.left_infos_position.length; i++)
      {
        this.left_infos_position[i] -= 1600;
        document.getElementById('general_material'+(i+1)).style.transition = "0.5s";
        document.getElementById('general_material'+(i+1)).style.top = this.left_infos_position[i] + "px";

      }
      this.left_info_cnt++;
    }
    else
    {
      for(var i = 0; i < this.left_infos_position.length; i++)
      {
        this.left_infos_position[i] += 1600 * (this.left_infos[this.index] - 1);
        document.getElementById('general_material'+(i+1)).style.transition = "0.5s";
        document.getElementById('general_material'+(i+1)).style.top = this.left_infos_position[i] + "px";
      }
      this.left_info_cnt = 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
    $('#content').load("src/pages/home/home.html");

    this.recipe_bar = document.getElementById('recipe_bar');
    this.recipe_bar.addEventListener('touchstart', this.onTouchDown);
    this.recipe_bar.addEventListener('touchmove', this.onTouchMove);
    // this.recipe_bar.addEventListener('touchend', this.onTouchEnd);
    this.recipe_bar.addEventListener('touchend', (e)=>{

      console.log("end")
      var clientX = e.changedTouches[0].clientX
      console.log(clientX)
      document.getElementById('recipe_bar').style.transition = "0.5s";

      if(clientX < (2560 / 2)) // 화면을 절반 넘었을때
      {
        document.getElementById('recipe_bar').style.left = "-158px";
        this.go_slide_page();
      }
      else  // 화면을 넘어섰을때
      {
        document.getElementById('recipe_bar').style.left = (2560 - 158) + 'px';
      }
    });
  }

  onTouchDown(e)
  {
    console.log("down");
    console.log(e);

    document.getElementById('recipe_bar').style.transition = "0s";
  }
  onTouchMove(e)
  {
    document.getElementById('recipe_bar').style.left = e.changedTouches[0].clientX + "px";
  }
  // onTouchEnd(e)
  // {
  //   console.log("end")
  //   var clientX = e.changedTouches[0].clientX
  //   console.log(clientX)
  //   document.getElementById('recipe_bar').style.transition = "0.5s";

  //   if(clientX < (2560 / 2)) // 화면을 절반 넘었을때
  //   {
  //     document.getElementById('recipe_bar').style.left = "-158px";
  //     this.go_slide_page();
  //   }
  //   else  // 화면을 넘어섰을때
  //   {
  //     document.getElementById('recipe_bar').style.left = (2560 - 158) + 'px';
  //   }
  // }

  go_slide_page()
  {
    setTimeout(() => {
      console.log(this.navCtrl);
      this.navCtrl.setRoot(this.modal_page);
    }, 500);
  }

  back_button()
  {
    this.navCtrl.pop();
  }

  /**  다음 페이지로 이동  */
  next_button() : void {
    this.navCtrl.push(DrawPage);
  }

  home_button()
  {
    console.log(this.navCtrl);
    this.navCtrl.setRoot(HomePage);
  }
}
