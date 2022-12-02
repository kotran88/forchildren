import { Component, ViewChild } from '@angular/core';
import { IonicPage, Keyboard, ModalCmp, ModalController, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
// import { Animation, AnimationController } from '@ionic/angular';
import { DrawPage } from '../draw/draw';
import { HomePage } from '../home/home';
import * as $ from "jquery";
import { ReceiptsProvider } from '../../providers/receipts/receipts';
import firebase from 'firebase';
import { DragulaService } from 'ng2-dragula';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { UtilProvider } from '../../providers/util/util';
import { ExpansionRecipePage } from '../expansion-recipe/expansion-recipe';
import * as htmlToImage from 'html-to-image';

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
  @ViewChild('recipe_slides') recipe_slides: Slides;

  firemain = firebase.database().ref();

  root_image_path = "assets/imgs/대체식품/02_Recipe/"
  index:any;
  recipe_bar:any;


  // left_info 이미지 갯수
  left_info_cnt = 1;
  left_infos = [0, 1, 3, 3, 2, 4, 3, 1, 2, 2, 1];
  left_infos_position = []
  left_infos_url_list = [];


  // 0 : 가운데 큰 음식
  // 1 : 레시피 글
  // 2 : 레시피 아이콘
  receipts_positions = []

  // 레시피 재료 텍스트
  sub_recipe_text = "";

  // 슬라이드아이콘 클릭 시작 좌표
  slide_start_x = 0;

  /** 각각의 메뉴바들에 대한 화살표의 높이) px */
  // topValue : number[] = [ 264, 402, 533, 678, 822, 961, 1097, 1244, 1382 ];
  topValue : number[] = [ 8, 15, 26, 35, 45, 54, 64, 74, 84 ];

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
  menu_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
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

  /* subscrible 변수) 페이지를 떠나는 경우 등록되어있는 리스너를 삭제하여야 한다. */
  dropSub : any;

  context : CanvasRenderingContext2D[] = Array();
  painting : boolean = false;
  erase_flag : boolean = false;
  erase_size : number = 50;

  recipe_name : string = "";

  // 1 레시피 페이지, 2 자작레시피 페이지
  draw_z_index = 0;
  // draw_page_ready_flag = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
  public recpv: ReceiptsProvider,
  public dragulaService: DragulaService, public toastController: ToastController,
  public keyboard:Keyboard, private screenshot: Screenshot, public util: UtilProvider,
  public modal:ModalController) {
    this.index = this.navParams.get("index");
    if(!this.index) this.index = 1;

    this.left_infos_url_list = [];
    for(var i = 0; i < this.left_infos[this.index]; i++)
    {
      this.left_infos_url_list.push(this.root_image_path + this.fm_str(this.index)
      + "/left_info" + this.fm_str(i + 1) + ".png");
      this.left_infos_position.push(i * 100);
    }
    // console.log(this.left_infos_position)

    this.receipts_positions = recpv.get_receipts_positions(this.index);
    this.sub_recipe_text = recpv.get_subrecipes(this.index);
    console.log(this.sub_recipe_text);
    console.log(this.receipts_positions);

  }

  fm_str(num)
  {
    var s = '';
    if(num < 10)
      s = '0'

    return s + num;
  }

  // 295.47
  chenage_left_info()
  {
    if(this.left_infos[this.index] == 1) return;
    if(this.left_info_cnt < this.left_infos[this.index])
    {
      for(var i = 0; i < this.left_infos_position.length; i++)
      {
        this.left_infos_position[i] -= 100;
        document.getElementById('general_material'+(i+1)).style.transition = "0.5s";
        document.getElementById('general_material'+(i+1)).style.top = this.left_infos_position[i] + "%";

      }
      this.left_info_cnt++;
    }
    else
    {
      for(var i = 0; i < this.left_infos_position.length; i++)
      {
        this.left_infos_position[i] += 100 * (this.left_infos[this.index] - 1);
        document.getElementById('general_material'+(i+1)).style.transition = "0.5s";
        document.getElementById('general_material'+(i+1)).style.top = this.left_infos_position[i] + "%";
      }
      this.left_info_cnt = 1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');

    // this.animationCtrl.create()
    // .addElement(document.getElementById("induction-arrow"))
    // .duration(1500)
    // .iterations(Infinity)
    // .fromTo('transform', 'translateX(-200%)', 'translateX(-100%)');
    this.ready_receipt_page();
    this.ready_draw_page();
  }

  ready_receipt_page()
  {
    this.recipe_bar = document.getElementById('recipe_bar');
    this.recipe_bar.addEventListener('touchmove', this.onTouchMove);
    this.recipe_bar.addEventListener('touchstart',(e)=>{
      console.log("down");
      console.log(e);

      this.slide_start_x = e.changedTouches[0].clientX;

      document.getElementById('recipe_bar').style.transition = "0s";
    });
    this.recipe_bar.addEventListener('touchend', (e)=>{

      console.log(e);
      console.log("end")
      var clientX = e.changedTouches[0].clientX
      console.log(clientX)
      document.getElementById('recipe_bar').style.transition = "0.5s";

      console.log(clientX)
      console.log(this.slide_start_x);
      if(clientX < (this.slide_start_x / 2)) // 화면을 절반 넘었을때
      {
        document.getElementById('recipe_bar').style.left = "-6.2%";
        // this.go_slide_page();
        setTimeout(() => {
          this.draw_z_index = 100;
          // document.getElementById('recipe_bar').style.left = 93.8 + '%';
        }, 500);
      }
      else  // 절반에 못 미쳤을때
      {
        document.getElementById('recipe_bar').style.left = '93.8%';
      }
    });
  }

  ready_draw_page()
  {
    for (let i = 1; i <= 58; i++) { this.q1.push({ value: 'Write new Post', color: 'primary' }); }

    /* 현재 항목이 드래고 되고 있을 때 호출된다. */
    try {
      this.dragulaService.drag('bag').subscribe(async ({ name, el, source }) => {
        el.setAttribute('color', 'danger');
        console.log("asdasd");
        let ingredient = document.getElementById("white-board-ingredient");
        if(ingredient.childNodes.length > 10)
        {
          alert("최대 10개까지 입니다.")
        }
      });

      this.dragulaService.dragend('bag').subscribe(({el}) =>{
        console.log("zxczxc");
      })

      this.dragulaService.removeModel('bag').subscribe(({ item }) => {
        this.toastController.create({
          message: 'Removed: ' + item.value,
          duration: 2000
        })
      });

      this.dropSub = this.dragulaService.dropModel('bag').subscribe(({ item, el }) => {
        console.log("qweqwe");
        console.log(item);
        console.log(el);
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
        close.style.width = "4%";
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
    }
    catch (e) {
      console.log(e);
    }
    /** canvas 초기화 작업. */
    this.initWhiteBoardReadyCanvas();
    this.initWhiteBoardCookingCanvas();
    this.food_name_url = this.navParams.get("food_name_url");

    addEventListener('keyboardWillShow', () => {
      console.log("willshow");
      document.getElementById("keyboard-bg").style.display = "";
    });
    addEventListener('keyboardWillHide',()=>{
      console.log("willhide");
      document.getElementById("keyboard-bg").style.display = "none";
    });
  }

  onTouchDown(e)
  {
    console.log("down");
    console.log(e);

    this.slide_start_x = e.changedTouches[0].clientX;

    document.getElementById('recipe_bar').style.transition = "0s";
  }
  onTouchMove(e)
  {
    document.getElementById('recipe_bar').style.left = e.changedTouches[0].clientX + "px";
  }
  // go_slide_page()
  // {
  //   setTimeout(() => {
  //     console.log(this.navCtrl);
  //     setTimeout(() => {
  //       document.getElementById('recipe_bar').style.left = 93.8 + '%';
  //     }, 300);
  //     this.navCtrl.push(DrawPage, {"food_name_url": this.root_image_path + this.fm_str(this.index) + "/title.png"});
  //   }, 500);
  // }

  back_button()
  {
    if(this.draw_z_index == 0)
      this.navCtrl.pop();
    else
    {
      this.draw_z_index = 0;
      document.getElementById('recipe_bar').style.left = '93.8%';
    }
  }

  home_button()
  {
    console.log(this.navCtrl);
    this.navCtrl.setRoot(HomePage);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////


  ionViewDidLeave() : void {
    this.dropSub.unsubscribe();
  }

  /** 메뉴바를 클릭 하였을때 타는 함수. */
  changeMenuButton(num : number) : void {

    for (let i : number = 1; i <= 9; i++) {
      document.getElementsByClassName("menu-" + i)[0].setAttribute("style", "background-color: #0E8D66;");
      document.getElementsByClassName("menu-" + i + "-" + 2)[0].setAttribute("src", "assets/imgs/대체식품/03_Planning/01_menu btn/btn_text0" + i + "_nor.png");
    }
    if(this.targetTopValue == this.topValue[num - 1])
    {
      this.closeButton();
      return;
    }
    let targetMenu = document.getElementsByClassName("menu-" + num)[0];
    targetMenu.setAttribute("style", "background-color: white;");

    document.getElementsByClassName("menu-" + num + "-" + 2)[0]
    .setAttribute("src", "assets/imgs/대체식품/03_Planning/01_menu btn/btn_text0" + num + "_sel.png");

    // 메뉴바를 가리키는 화살표의 위치값을 바꿈.
    this.targetTopValue = this.topValue[num - 1];
    // document.getElementById("food-popup-holder").style.display = "";
    // document.getElementById("food-popup-bg").style.display = "";
    // // document.getElementById("food-popup-bar").style.display = "";
    // document.getElementById("food-popup-div").style.display = "";
    // document.getElementById("bnt-food-popup-close").style.display = "";
    document.getElementById("menu-popup-div").style.display = "";

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
    // document.getElementById("food-popup-holder").style.display = "none";
    // document.getElementById("food-popup-bg").style.display = "none";
    // // document.getElementById("food-popup-bar").style.display = "none";
    // document.getElementById("food-popup-div").style.display = "none";
    // document.getElementById("bnt-food-popup-close").style.display = "none";

    document.getElementById("menu-popup-div").style.display = "none";

    this.targetList = new Object();
    this.targetTopValue = 0;
  }

  /** 준비하기 영역 canvas 초기화 */
  initWhiteBoardReadyCanvas() : void {
    let canvas = document.createElement("canvas");
    canvas.className = "white-board-ready";
    canvas.id = "white-board-ready";

    // 화면 전체크기 * white-board크기 * canvas크기
    canvas.width = screen.width * 0.73 * 0.51;
    canvas.height = screen.height * 0.85 * 0.26;

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

    // 화면 전체크기 * white-board크기 * canvas크기
    canvas.width = screen.width * 0.73 * 0.45;
    canvas.height = screen.height * 0.85 * 0.87;

    this.context.push(canvas.getContext("2d"));
    this.context[1].lineWidth = 1;

    document.getElementById("white-board").append(canvas);

    canvas.addEventListener("touchmove", (event) => {
      let rect = canvas.getBoundingClientRect();
      let x = event.touches[0].pageX - rect.left;
      let y = event.touches[0].pageY - rect.top;
      if(this.erase_flag)
      {
        var xx = x - this.erase_size / 2;
        var yy = y - this.erase_size / 2;

        this.context[1].clearRect(xx, yy, this.erase_size, this.erase_size);
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

  open_keypad()
  {
    console.log("keypad");
    var doc = document.getElementById("white-board-cooking-textarea-board").style.zIndex;

    document.getElementById("white-board-cooking-textarea-board").style.zIndex =
    doc == '8' ? '0' : '8';

    document.getElementById("white-board-ready-textarea-board").style.zIndex =
    doc == '8' ? '0' : '8';

    if(doc == '8') // 키보드 비활성화
    {
      document.getElementById("bnt-keypad-nor").style.opacity = '0.5';
      // document.getElementById("keyboard-bg").style.display = "none";
    }
    else // 키보드 활성화
    {
      document.getElementById("bnt-keypad-nor").style.opacity = '1';
      // document.getElementById("white-board-cooking-textarea").focus();
      // document.getElementById("keyboard-bg").style.display = "";
    }
    // this.keyboard.hasFocusedTextInput();
    document.getElementById("pen-control-bar").style.display = 'none';
    document.getElementById("pen-col-bg").style.display = 'none';
  }
  open_pen()
  {
    document.getElementById("white-board-ready-textarea-board").style.zIndex = '0';
    document.getElementById("white-board-cooking-textarea-board").style.zIndex = '0';
    document.getElementById("bnt-keypad-nor").style.opacity = '0.5';

    console.log("pen");
    document.getElementById("pen-control-bar").style.display = 'none';

    var doc = document.getElementById("pen-col-bg").style.display;
    document.getElementById("pen-col-bg").style.display =
    doc == 'none' ? "flex" : "none";

    this.erase_flag = false;
  }
  open_eraser()
  {
    document.getElementById("white-board-ready-textarea-board").style.zIndex = '0';
    document.getElementById("white-board-cooking-textarea-board").style.zIndex = '0';
    document.getElementById("bnt-keypad-nor").style.opacity = '0.5';

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
        this.context[0].lineWidth = 3;
        this.context[1].lineWidth = 5;
        document.getElementById("pen-02").classList.add('pen-active');
        break;
      case '03':
        this.context[0].lineWidth = 7;
        this.context[1].lineWidth = 7;
        document.getElementById("pen-03").classList.add('pen-active');
        break;
    }
  }

  save_modal_open(): void
  {
    // setTimeout(() => {
    //   this.util.dismiss_loading();
    // }, 2000);
    this.recipe_name = "";
    var modal = document.getElementById("recipe-save-modal");
    modal.style.display = "";
  }

  save_modal_close(): void
  {
    var modal = document.getElementById("recipe-save-modal");
    modal.style.display = "none";
  }

  save(): void
  {
    if(this.recipe_name == "")
    {
      alert("이름을 입력해주세요.");
      document.getElementById("recipe-name").focus();
      return;
    }
    htmlToImage.toPng(document.getElementById("white-board"),
    {
      style: {
        margin: "0px",
      }
    })
    .then((image)=>{
      this.save_modal_close();
      this.util.uploadImage("image", new Date().toISOString(), image, (result) => {
        console.log(result);
        if(result)
        {
          this.util.upload_recipe(this.recipe_name, result);
        }
      });
    })
  }

  recipe_list = [];
  async get_recipes_from_DB()
  {
    var k = (this.recipe_list.length == 0 ? "" :
    this.recipe_list[this.recipe_list.length - 1].key);

    var root = this.firemain.child('recipes').orderByChild('key');
    if(k != "") root = root.endAt(k);

    var snap = await root.limitToLast(6).once('value');

    console.log(snap.val());
    var list = [];
    for(var i in snap.val())
      list.push(snap.val()[i])

    list.reverse();

    for(var j = (this.recipe_list.length == 0 ? 0 : 1); j < list.length; j++)
      this.recipe_list.push(list[j])
  }

  slidePrev() {
    console.log("prev");
    console.log(this.recipe_slides)
    this.recipe_slides.slidePrev();
  }
  slideNext() {
    console.log("next");
    console.log(this.recipe_slides)
    if(this.recipe_slides.isEnd())
    {
      this.get_recipes_from_DB();
    }
    else
    {
      this.recipe_slides.slideNext();
    }
  }

  open_recipe_board(): void
  {
    this.recipe_list = [];
    this.get_recipes_from_DB();
    var doc = document.getElementById("other-recipe-board");
    doc.style.display = "";
  }

  close_recipe_board(): void
  {
    var doc = document.getElementById("other-recipe-board");
    doc.style.display = "none";
  }

  async TaskScreenShot() : Promise<void> {
    // this.save_modal_open();
    try
    {
      let response = await this.screenshot.save();
      var uri = await this.screenshot.URI();
      let fileName = response.filePath.split("/")[5];
      this.util.uploadImage("image", fileName, uri, () => {});
    }
    catch(err)
    {
      console.log(err);
    }
  }

  /** 팝업 닫는 함수. */
  guidePopueCloseButton() : void {
    // let guidePopupDiv = document.getElementById("guide-popup-div");
    // guidePopupDiv.style.display = "none"
    let guidePopup = document.getElementById("guide-popup");
    let guidePopupBg = document.getElementById("guide-popup-bg");
    let guidePopupClose = document.getElementById("guide-popup-close");
    guidePopup.style.display = "none";
    guidePopupBg.style.display = "none";
    guidePopupClose.style.display = "none";
  }

  open_recipe(item)
  {
    console.log(item);

    let modal = this.modal.create(ExpansionRecipePage,{"recipe_image" : item.url},{
      cssClass:'expansion-recipe',
      enableBackdropDismiss:false
    });
    modal.onDidDismiss(receiveddata=>{
      console.log(receiveddata)
      if(receiveddata!=undefined){
        console.log('back to homepage');
      }
    })
    modal.present();
  }
}
