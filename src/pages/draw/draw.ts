import { Component } from '@angular/core';
import { IonicPage, Keyboard, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DragulaService } from 'ng2-dragula';
import { disconnect } from 'process';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UtilProvider } from '../../providers/util/util';
// import * as htmlToImage from 'html-to-image';

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

  // 요리명 사진
  food_name_url : string = "";

  /** 각각의 메뉴바에 관련된 아이템을 화면에 보여주는 어레이 */
  targetList : object = {};

  context : CanvasRenderingContext2D[] = Array();
  painting : boolean = false;
  erase_flag : boolean = false;
  erase_size : number = 150;

  recipe_name : string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public dragulaService: DragulaService, public toastController: ToastController,
  public keyboard:Keyboard, private screenshot: Screenshot, public util: UtilProvider,
  public modal:ModalController) {
    for (let i = 1; i <= 58; i++) { this.q1.push({ value: 'Write new Post', color: 'primary' }); }

    /* 현재 항목이 드래고 되고 있을 때 호출된다. */
    try {
      this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
        el.setAttribute('color', 'danger');
      });

      this.dragulaService.removeModel('bag').subscribe(({ item }) => {
        this.toastController.create({
          message: 'Removed: ' + item.value,
          duration: 2000
        })
        // .then(toast => toast.present());
      });

      this.dragulaService.dropModel('bag').subscribe(({ item, el }) => {
        let ingredient = document.getElementById("white-board-ingredient");
        let pressTimer = null;
        let targetClass = el.classList[0];

        let span = document.createElement("span");
        span.className = targetClass;

        el.addEventListener("touchstart", (event : Event): void => {
          pressTimer = setTimeout(() => {
            close.style.display = "";
          }, 400);
        });
        el.addEventListener("touchend", (event : Event) : void => {
          clearTimeout(pressTimer);
        });
        let close = document.createElement("img");
        close.src = "assets/imgs/대체식품/03_Planning/01_menu btn/BNT_Food Popup_Close.png";
        close.style.position = "absolute";
        close.style.zIndex = "5";
        close.style.display = "none";
        close.width = 30;
        close.height = 30;
        close.className = targetClass;
        close.addEventListener("touchstart", (event) => {
          let tClass = document.getElementsByClassName(targetClass);
          for (let i = 0; i <  tClass.length; i++) {
            tClass[i].remove();
          }
        });
        span.appendChild(el);
        span.appendChild(close);
        ingredient.appendChild(span);
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
    document.getElementById("food-popup-div").style.display = "";
    document.getElementById("bnt-food-popup-close").style.display = "";

    // 각각의 메뉴바에 관련된 아이템들 체인지.
    this.targetList = {
      "key" : String(num),
      "value" : this.list[String(num)],
    };
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
    document.getElementById("food-popup-div").style.display = "none";
    document.getElementById("bnt-food-popup-close").style.display = "none";

    this.targetList = new Object();
  }

  /** 준비하기 영역 canvas 초기화 */
  initWhiteBoardReadyCanvas() : void {
    let canvas = document.createElement("canvas");
    canvas.className = "white-board-ready";
    canvas.id = "white-board-ready";
    canvas.width = 950;
    canvas.height = 381;

    this.context.push(canvas.getContext("2d"));
    this.context[0].lineWidth = 1;

    document.getElementById("white-board").append(canvas);

    canvas.addEventListener("touchmove", (event) => {
      let rect = canvas.getBoundingClientRect();
      let x = event.touches[0].pageX - rect.left;
      let y = event.touches[0].pageY - rect.top;

      if(this.erase_flag)
      {
        this.context[0].clearRect(x - this.erase_size / 2,
        y - this.erase_size / 2,
        this.erase_size, this.erase_size);
      }
      else
      {
        this.context[0].lineTo(x, y);
        this.context[0].stroke();
      }
    });
    canvas.addEventListener("touchstart", (event) => {
      this.painting = true;
      let rect = canvas.getBoundingClientRect();
      let x = event.touches[0].pageX - rect.left;
      let y = event.touches[0].pageY - rect.top;
      this.context[0].beginPath();
      this.context[0].moveTo(x, y);
    });
    canvas.addEventListener("touchend", () => {
      this.painting = false;
    });
  }

  /** 요리 만들기 영역 canvas 초기화 */
  initWhiteBoardCookingCanvas() : void {
    let canvas = document.createElement("canvas");
    canvas.className = "white-board-cooking";
    canvas.id = "white-board-cooking";
    canvas.width = 950;
    canvas.height = 1238;

    this.context.push(canvas.getContext("2d"));
    this.context[1].lineWidth = 1;

    document.getElementById("white-board").append(canvas);

    canvas.addEventListener("touchmove", (event) => {
      let rect = canvas.getBoundingClientRect();
      let x = event.touches[0].pageX - rect.left;
      let y = event.touches[0].pageY - rect.top;
      if(this.erase_flag)
      {
        this.context[1].clearRect(x - this.erase_size / 2,
        y - this.erase_size / 2,
        this.erase_size, this.erase_size);
      }
      else
      {
          // this.context[1].beginPath();
        this.context[1].lineTo(x, y);
        this.context[1].stroke();
      }

    });
    canvas.addEventListener("touchstart", (event) => {
      this.painting = true;
      let rect = canvas.getBoundingClientRect();
      let x = event.touches[0].pageX - rect.left;
      let y = event.touches[0].pageY - rect.top;
      this.context[1].beginPath();
      this.context[1].moveTo(x, y);
    });
    canvas.addEventListener("touchend", () => {
      this.painting = false;
    });
  }

  ionViewDidLoad() : void {
    /** canvas 초기화 작업. */
    this.initWhiteBoardReadyCanvas();
    this.initWhiteBoardCookingCanvas();
    this.food_name_url = this.navParams.get("food_name_url");
    addEventListener('keyboardWillShow', () => {

    });
    addEventListener('onKeyboardWillHide',()=>{

    });
  }

  open_keypad()
  {
    console.log("keypad");
    var doc = document.getElementById("white-board-cooking-textarea").style.zIndex;
    document.getElementById("white-board-cooking-textarea").style.zIndex =
    doc == '6' ? '0' : '6';

    if(doc == '6')
    {
      document.getElementById("pen-control-bar").style.opacity = '0.5';
    }
    else
    {
      document.getElementById("pen-control-bar").style.opacity = '1';
      document.getElementById("white-board-cooking-textarea").focus();
    }
    // this.keyboard.hasFocusedTextInput();
    document.getElementById("pen-control-bar").style.display = 'none';
    document.getElementById("pen-col-bg").style.display = 'none';
  }
  open_pen()
  {
    console.log("pen");
    document.getElementById("pen-control-bar").style.display = 'none';

    var doc = document.getElementById("pen-col-bg").style.display;
    document.getElementById("pen-col-bg").style.display =
    doc == 'none' ? "flex" : "none";

    this.erase_flag = false;
  }
  open_eraser()
  {
    console.log("eraser");
    document.getElementById("pen-col-bg").style.display = 'none';

    var doc = document.getElementById("pen-control-bar").style.display
    document.getElementById("pen-control-bar").style.display =
    doc == 'none' ? "flex" : "none";

    this.erase_flag = true;
  }

  change_color(col)
  {
    document.getElementById("col-black").classList.remove('col-active');
    document.getElementById("col-blue").classList.remove('col-active');
    document.getElementById("col-green").classList.remove('col-active');
    document.getElementById("col-red").classList.remove('col-active');
    document.getElementById("col-yellow").classList.remove('col-active');
    switch(col)
    {
      case 'black':
        this.context[0].strokeStyle = '#000000';
        this.context[1].strokeStyle = '#000000';
        document.getElementById("col-black").classList.add('col-active');
        break;
      case 'blue':
        this.context[0].strokeStyle = '#0000ff';
        this.context[1].strokeStyle = '#0000ff';
        document.getElementById("col-blue").classList.add('col-active');
        break;
      case 'green':
        this.context[0].strokeStyle = '#00ff00';
        this.context[1].strokeStyle = '#00ff00';
        document.getElementById("col-green").classList.add('col-active');
        break;
      case 'red':
        this.context[0].strokeStyle = '#ff0000';
        this.context[1].strokeStyle = '#ff0000';
        document.getElementById("col-red").classList.add('col-active');
        break;
      case 'yellow':
        this.context[0].strokeStyle = '#ffff00';
        this.context[1].strokeStyle = '#ffff00';
        document.getElementById("col-yellow").classList.add('col-active');
        break;
    }
  }

  change_pen(pen)
  {
    document.getElementById("pen-01").classList.remove('pen-active');
    document.getElementById("pen-02").classList.remove('pen-active');
    document.getElementById("pen-03").classList.remove('pen-active');
    switch(pen)
    {
      case '01':
        this.context[0].lineWidth = 1;
        this.context[1].lineWidth = 1;
        document.getElementById("pen-01").classList.add('pen-active');
        break;
      case '02':
        this.context[0].lineWidth = 5;
        this.context[1].lineWidth = 5;
        document.getElementById("pen-02").classList.add('pen-active');
        break;
      case '03':
        this.context[0].lineWidth = 10;
        this.context[1].lineWidth = 10;
        document.getElementById("pen-03").classList.add('pen-active');
        break;
    }
  }

  back_button(): void {
    this.navCtrl.pop();
  }

  home_button(): void {
    // location.reload();
    this.navCtrl.setRoot(HomePage);
  }

  save_modal_open()
  {
    var modal = document.getElementById("recipe-save-modal");
    modal.style.display = "";
  }

  save_modal_close()
  {
    var modal = document.getElementById("recipe-save-modal");
    modal.style.display = "none";
  }

  save()
  {
    if(this.recipe_name == "")
    {
      alert("이름을 입력해주세요.");
      document.getElementById("recipe-name").focus();
      return;
    }
    // htmlToImage.toPng(document.getElementById("white-board"),
    // {
    //   width: 1910,
    //   height: 1397,
    //   canvasWidth: 1910,
    //   canvasHeight: 1397,
    //   style: {
    //     margin: "0px",
    //   }
    // })
    // .then((image)=>{
    //   this.util.uploadImage("image", new Date().toISOString(), image, (result) => {
    //     console.log(result);
    //     if(result)
    //     {
    //       // this.util.upload_recipe(this.recipe_name, result);
    //       this.save_modal_close();
    //     }
    //   });
    // })
  }

  async TaskScreenShot() : Promise<void> {

    this.save_modal_open();
    // try
    // {
    //   let response = await this.screenshot.save();
    //   var uri = await this.screenshot.URI();
    //   let fileName = response.filePath.split("/")[5];
    //   this.util.uploadImage("image", fileName, uri, () => {});
    // }
    // catch(err)
    // {
    //   console.log(err);
    // }
  }

  /** 팝업 닫는 함수. */
  guidePopueCloseButton() : void {
    let guidePopup = document.getElementById("guide-popup");
    let guidePopupClose = document.getElementById("guide-popup-close");
    guidePopup.style.display = "none";
    guidePopupClose.style.display = "none";
  }
}
