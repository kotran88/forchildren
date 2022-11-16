import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DragulaService } from 'ng2-dragula';
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

  /** 각각의 메뉴바들에 대한 화살표의 높이) px */
  topValue : number[] = [ 264, 402, 533, 678, 822, 961, 1097, 1244, 1382 ];

  /** Food Popup_bg.png의 높이 */
  targetTopValue : number = 0;

  q1 : object[] = new Array();

  /** 각각의 메뉴바에 관련된 아이템
   *  "1" : 식용곤충류(건조형)
   *  "2" : 식용곤충류(분말형)
   *  "3" : 식물성원료
   *  "4" : 곡류
   *  "5" : 달걀, 콩류
   *  "6" : 채소
   *  "7" : 과일류
   *  "8" : 유지당류
   *  "9" : 기타 식재료
   */
  list = {
    "1" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_06.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_07.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_08.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_09.png", "assets/imgs/대체식품/03_Planning/01_menu btn/01_popup/01_popup_10.png", "" ],
    "2" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_06.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_07.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_08.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_09.png", "assets/imgs/대체식품/03_Planning/01_menu btn/02_popup/02_popup_10.png", "" ],
    "3" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_06.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_07.png", "assets/imgs/대체식품/03_Planning/01_menu btn/03_popup/03_popup_08.png", "" ],
    "4" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/04_popup/04_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/04_popup/04_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/04_popup/04_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/04_popup/04_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/04_popup/04_popup_05.png", "" ],
    "5" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/05_popup/05_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/05_popup/05_popup_02.png", "" ],
    "6" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/06_popup/06_popup_06.png", "" ],
    "7" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/07_popup/07_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/07_popup/07_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/07_popup/07_popup_03.png", "" ],
    "8" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/08_popup/08_popup_06.png", "" ],
    "9" : [ "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_01.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_02.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_03.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_04.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_05.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_06.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_07.png", "assets/imgs/대체식품/03_Planning/01_menu btn/09_popup/09_popup_08.png", "" ],
  };

  /** 각각의 메뉴바에 관련된 아이템을 화면에 보여주는 어레이 */
  targetList : string[] = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams, public dragulaService: DragulaService, public toastController: ToastController) {

    for (let i = 1; i <= 10; i++) { this.q1.push({ value: 'Write new Post', color: 'primary' }); }

    /* 현재 항목이 드래고 되고 있을 때 호출된다. */
    try {
      this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
        console.log(name);
        console.log(el);
        console.log(source);
        el.setAttribute('color', 'danger');
      });
  
      this.dragulaService.removeModel('bag')
        .subscribe(({ item }) => {
          console.log("removeModel");
          console.log(item);
          this.toastController.create({
            message: 'Removed: ' + item.value,
            duration: 2000
          })
          // .then(toast => toast.present());
        });
  
      this.dragulaService.dropModel('bag')
        .subscribe(({ item }) => {
          console.log("dropModel");
          console.log(item);
          item['color'] = 'success';
        });
  
      this.dragulaService.createGroup('bag', {
        removeOnSpill: true
      });
    }
    catch (e) {
      console.log(e);
    }
    
  }

  /** 메뉴바를 클릭 하였을때 타는 함수. */
  changeMenuButton(num : number) : void {

    for (let i : number = 1; i <= 9; i++) {
      document.getElementsByClassName("menu-" + i)[0].setAttribute("style", "background-color: #0E8D66;");
      document.getElementsByClassName("menu-" + i + "-" + 2)[0].setAttribute("src", "assets/imgs/대체식품/03_Planning/01_menu btn/btn_text0" + i + "_nor.png");
    }
    let targetMenu = document.getElementsByClassName("menu-" + num)[0];
    targetMenu.setAttribute("style", "background-color: white;");

    document.getElementsByClassName("menu-" + num + "-" + 2)[0]
    .setAttribute("src", "assets/imgs/대체식품/03_Planning/01_menu btn/btn_text0" + num + "_sel.png");

    // 메뉴바를 가리키는 화살표의 위치값을 바꿈.
    this.targetTopValue = this.topValue[num - 1];
    document.getElementById("food-popup-holder").style.display = "";
    document.getElementById("food-popup-bg").style.display = "";
    document.getElementById("food-popup-bar").style.display = "";
    document.getElementById("bnt-food-popup-close").style.display = "";

    // 각각의 메뉴바에 관련된 아이템들 체인지.
    this.targetList = this.list[String(num)];
  }

  /** 메뉴 아이콘 닫기 함수. */
  closeButton() : void {
    for (let i : number = 1; i <= 9; i++) {
      document.getElementsByClassName("menu-" + i)[0].setAttribute("style", "background-color: #0E8D66;");
      document.getElementsByClassName("menu-" + i + "-" + 2)[0].setAttribute("src", "assets/imgs/대체식품/03_Planning/01_menu btn/btn_text0" + i + "_nor.png");
    }
    document.getElementById("food-popup-holder").style.display = "none";
    document.getElementById("food-popup-bg").style.display = "none";
    document.getElementById("food-popup-bar").style.display = "none";
    document.getElementById("bnt-food-popup-close").style.display = "none";

    this.targetList = new Array();
  }

  back_button(): void {
    this.navCtrl.pop();
  }

  home_button(): void {
    location.reload();
    // this.navCtrl.setRoot(HomePage);
  }
}
