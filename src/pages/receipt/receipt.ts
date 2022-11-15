import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrawPage } from '../draw/draw';
import { HomePage } from '../home/home';

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


  // left_info 이미지 갯수
  left_info_cnt = 1;
  left_infos = [0, 1, 3, 3, 2, 4, 3, 1, 2, 2, 1];
  left_infos_position = []
  left_infos_url_list = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.index = this.navParams.get("index");
    if(!this.index) this.index = 2;

    this.left_infos_url_list = [];
    for(var i = 0; i < this.left_infos[this.index]; i++)
    {
      this.left_infos_url_list.push(this.root_image_path + this.fm_str(this.index)
      + "/left_info" + this.fm_str(i + 1) + ".png");
      this.left_infos_position.push((1600 * i) + 388);
    }
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

    this.recipe_bar = document.getElementById('recipe_bar');
    this.recipe_bar.addEventListener('touchstart', this.onTouchDown);
    this.recipe_bar.addEventListener('touchmove', this.onTouchMove);
    this.recipe_bar.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchDown(e)
  {
    console.log("down");
    console.log(e);
    if(e.targetTouches.length > 0)
      console.log(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    if(e.changedTouches.length > 0)
      console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

    document.getElementById('recipe_bar').style.transition = "0s";
  }
  onTouchMove(e)
  {
    // console.log("move");
    // console.log(e);
    // if(e.targetTouches.length > 0)
    //   console.log(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    // if(e.changedTouches.length > 0)
    //   console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

    // if(e.changedTouches[0].clientX > (2560 - 158))// 화면을 넘어섰을때
    // {
    //   document.getElementById('recipe_bar').style.left = (2560 - 158) + 'px';
    // }
    // else
    // {
    document.getElementById('recipe_bar').style.left = e.changedTouches[0].clientX + "px";
    // document.getElementById('recipe_bar').style.transform = "translateX("+e.changedTouches[0].clientX+"px)";
  }
  onTouchEnd(e)
  {
    console.log("end")
    console.log(e);
    if(e.targetTouches.length > 0)
      console.log(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
    if(e.changedTouches.length > 0)
      console.log(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

    var clientX = e.changedTouches[0].clientX
    console.log(clientX)

    document.getElementById('recipe_bar').style.transition = "0.5s";

    if(clientX < (2560 / 2)) // 화면을 절반 넘었을때
    {
      document.getElementById('recipe_bar').style.left = "-158px";
      // document.getElementById('recipe_bar').style.transform = "translateX(-158px)";
    }
    else  // 화면을 넘어섰을때
    {
      document.getElementById('recipe_bar').style.left = (2560 - 158) + 'px';
      // document.getElementById('recipe_bar').style.transform = "translateX(2402px)";
    }
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
    this.navCtrl.setRoot(HomePage);
  }


  // minWidth = 60;
  // minHeight = 40;

  // // Thresholds
  // FULLSCREEN_MARGINS = -10;
  // MARGINS = 4;

  // // End of what's configurable.
  // clicked = null;
  // onRightEdge;
  // onBottomEdge;
  // onLeftEdge;
  // onTopEdge;

  // rightScreenEdge;
  // bottomScreenEdge;

  // preSnapped;

  // b; x; y;

  // redraw = false;

  // pane;
  // ghostpane;

  // e;

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReceiptPage');

  //   this.pane = document.getElementById('pane');
  //   this.ghostpane = document.getElementById('ghostpane');

  //   // Mouse events
  //   this.pane.addEventListener('mousedown', this.onMouseDown);
  //   document.addEventListener('mousemove', this.onMove);
  //   document.addEventListener('mouseup', this.onUp);

  //   // Touch events
  //   this.pane.addEventListener('touchstart', this.onTouchDown);
  //   document.addEventListener('touchmove', this.onTouchMove);
  //   document.addEventListener('touchend', this.onTouchEnd);

  //   this.animate();
  // }

  // setBounds(element, x, y, w, h) {
  //   element.style.left = x + 'px';
  //   element.style.top = y + 'px';
  //   element.style.width = w + 'px';
  //   element.style.height = h + 'px';
  // }

  // hintHide() {
  //   this.setBounds(this.ghostpane, this.b.left, this.b.top, this.b.width, this.b.height);
  //   this.ghostpane.style.opacity = '0';

  //   // var b = ghostpane.getBoundingClientRect();
  //   // ghostpane.style.top = b.top + b.height / 2;
  //   // ghostpane.style.left = b.left + b.width / 2;
  //   // ghostpane.style.width = 0;
  //   // ghostpane.style.height = 0;
  // }


  // onTouchDown(e) {
  //   this.onDown(e.touches[0]);
  //   e.preventDefault();
  // }

  // onTouchMove(e) {
  //   this.onMove(e.touches[0]);
  // }

  // onTouchEnd(e) {
  //   if (e.touches.length ==0) this.onUp(e.changedTouches[0]);
  // }

  // onMouseDown(e) {
  //   this.onDown(e);
  //   e.preventDefault();
  // }

  // onDown(e) {
  //   this.calc(e);

  //   var isResizing = this.onRightEdge || this.onBottomEdge || this.onTopEdge || this.onLeftEdge;

  //   this.clicked = {
  //     x: this.x,
  //     y: this.y,
  //     cx: e.clientX,
  //     cy: e.clientY,
  //     w: this.b.width,
  //     h: this.b.height,
  //     isResizing: isResizing,
  //     isMoving: !isResizing && this.canMove(),
  //     onTopEdge: this.onTopEdge,
  //     onLeftEdge: this.onLeftEdge,
  //     onRightEdge: this.onRightEdge,
  //     onBottomEdge: this.onBottomEdge
  //   };
  // }

  // canMove() {
  //   return this.x > 0 && this.x < this.b.width && this.y > 0 && this.y < this.b.height
  //   && this.y < 30;
  // }

  // calc(e) {
  //   this.b = this.pane.getBoundingClientRect();
  //   this.x = e.clientX - this.b.left;
  //   this.y = e.clientY - this.b.top;

  //   this.onTopEdge = this.y < this.MARGINS;
  //   this.onLeftEdge = this.x < this.MARGINS;
  //   this.onRightEdge = this.x >= this.b.width - this.MARGINS;
  //   this.onBottomEdge = this.y >= this.b.height - this.MARGINS;

  //   this.rightScreenEdge = window.innerWidth - this.MARGINS;
  //   this.bottomScreenEdge = window.innerHeight - this.MARGINS;
  // }

  // onMove(ee) {
  //   this.calc(ee);

  //   this.e = ee;

  //   this.redraw = true;

  // }

  // animate() {

  //   requestAnimationFrame(this.animate);

  //   if (!this.redraw) return;

  //   this.redraw = false;

  //   if (this.clicked && this.clicked.isResizing) {

  //     if (this.clicked.onRightEdge) this.pane.style.width = Math.max(this.x, this.minWidth) + 'px';
  //     if (this.clicked.onBottomEdge) this.pane.style.height = Math.max(this.y, this.minHeight) + 'px';

  //     if (this.clicked.onLeftEdge) {
  //       var currentWidth = Math.max(this.clicked.cx - this.e.clientX  + this.clicked.w, this.minWidth);
  //       if (currentWidth > this.minWidth) {
  //         this.pane.style.width = currentWidth + 'px';
  //         this.pane.style.left = this.e.clientX + 'px';
  //       }
  //     }

  //     if (this.clicked.onTopEdge) {
  //       var currentHeight = Math.max(this.clicked.cy - this.e.clientY  + this.clicked.h, this.minHeight);
  //       if (currentHeight > this.minHeight) {
  //         this.pane.style.height = currentHeight + 'px';
  //         this.pane.style.top = this.e.clientY + 'px';
  //       }
  //     }

  //     this.hintHide();

  //     return;
  //   }

  //   if (this.clicked && this.clicked.isMoving) {

  //     if (this.b.top < this.FULLSCREEN_MARGINS || this.b.left < this.FULLSCREEN_MARGINS || this.b.right > window.innerWidth - this.FULLSCREEN_MARGINS || this.b.bottom > window.innerHeight - this.FULLSCREEN_MARGINS) {
  //       // hintFull();
  //       this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight);
  //       this.ghostpane.style.opacity = 0.2;
  //     } else if (this.b.top < this.MARGINS) {
  //       // hintTop();
  //       this.setBounds(this.ghostpane, 0, 0, window.innerWidth, window.innerHeight / 2);
  //       this.ghostpane.style.opacity = 0.2;
  //     } else if (this.b.left < this.MARGINS) {
  //       // hintLeft();
  //       this.setBounds(this.ghostpane, 0, 0, window.innerWidth / 2, window.innerHeight);
  //       this.ghostpane.style.opacity = 0.2;
  //     } else if (this.b.right > this.rightScreenEdge) {
  //       // hintRight();
  //       this.setBounds(this.ghostpane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
  //       this.ghostpane.style.opacity = 0.2;
  //     } else if (this.b.bottom > this.bottomScreenEdge) {
  //       // hintBottom();
  //       this.setBounds(this.ghostpane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
  //       this.ghostpane.style.opacity = 0.2;
  //     } else {
  //       this.hintHide();
  //     }

  //     if (this.preSnapped) {
  //       this.setBounds(this.pane,
  //         this.e.clientX - this.preSnapped.width / 2,
  //         this.e.clientY - Math.min(this.clicked.y, this.preSnapped.height),
  //         this.preSnapped.width,
  //         this.preSnapped.height
  //       );
  //       return;
  //     }

  //     // moving
  //     this.pane.style.top = (this.e.clientY - this.clicked.y) + 'px';
  //     this.pane.style.left = (this.e.clientX - this.clicked.x) + 'px';

  //     return;
  //   }

  //   // This code executes when mouse moves without clicking

  //   // style cursor
  //   if (this.onRightEdge && this.onBottomEdge || this.onLeftEdge && this.onTopEdge) {
  //     this.pane.style.cursor = 'nwse-resize';
  //   } else if (this.onRightEdge && this.onTopEdge || this.onBottomEdge && this.onLeftEdge) {
  //     this.pane.style.cursor = 'nesw-resize';
  //   } else if (this.onRightEdge || this.onLeftEdge) {
  //     this.pane.style.cursor = 'ew-resize';
  //   } else if (this.onBottomEdge || this.onTopEdge) {
  //     this.pane.style.cursor = 'ns-resize';
  //   } else if (this.canMove()) {
  //     this.pane.style.cursor = 'move';
  //   } else {
  //     this.pane.style.cursor = 'default';
  //   }
  // }

  // onUp(e) {
  //   calc(e);

  //   if (clicked && clicked.isMoving) {
  //     // Snap
  //     var snapped = {
  //       width: b.width,
  //       height: b.height
  //     };

  //     if (b.top < FULLSCREEN_MARGINS || b.left < FULLSCREEN_MARGINS || b.right > window.innerWidth - FULLSCREEN_MARGINS || b.bottom > window.innerHeight - FULLSCREEN_MARGINS) {
  //       // hintFull();
  //       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight);
  //       preSnapped = snapped;
  //     } else if (b.top < MARGINS) {
  //       // hintTop();
  //       setBounds(pane, 0, 0, window.innerWidth, window.innerHeight / 2);
  //       preSnapped = snapped;
  //     } else if (b.left < MARGINS) {
  //       // hintLeft();
  //       setBounds(pane, 0, 0, window.innerWidth / 2, window.innerHeight);
  //       preSnapped = snapped;
  //     } else if (b.right > rightScreenEdge) {
  //       // hintRight();
  //       setBounds(pane, window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
  //       preSnapped = snapped;
  //     } else if (b.bottom > bottomScreenEdge) {
  //       // hintBottom();
  //       setBounds(pane, 0, window.innerHeight / 2, window.innerWidth, window.innerWidth / 2);
  //       preSnapped = snapped;
  //     } else {
  //       preSnapped = null;
  //     }

  //     hintHide();

  //   }

  //   clicked = null;

  //   }
}
