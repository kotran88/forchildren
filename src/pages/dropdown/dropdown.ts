import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, LoadingController, NavController, NavParams, Platform, ToastController, ViewController } from 'ionic-angular';
import { DragulaService } from 'ng2-dragula';

/**
 * Generated class for the DropdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dropdown',
  templateUrl: 'dropdown.html',
})
export class DropdownPage {


  lloading:any;
  shapes=[];
  checked=true;
  canvasElement:any;
  canvasElement2:any;
  canvasElement3:any;
  saveX:number;
  saveY:number;
  startX:number;
  startY:number;
  storedImage=[];
  endX;
  endY;
  dragok:boolean=false;
  middleX;
  middleXarray=[];
  middleYarray=[];
  startXarray=[];
  startYarray=[];

  ctx:any;
  endXarray=[];
  endYarray=[];

  middleflag=0;

  private _Canvas:any;
  private _Canvas3:any;
  private _Context:any;
  middleY;
  evenflag=0;
  @ViewChild("imageCanvas") canvas:any;
  @ViewChild("imageCanvas2") canvas2:any;
  @ViewChild("imageCanvas3") canvas3:any;
  @ViewChild("fixedContainer") fixedContainer:any;
  @ViewChild(Content) content:Content;

  private image : any = new Image();
  selectedColor='#9e2956';

  selectedFlag='2';
  values=['1','2','3']
  picdata:any;
  receipt_number:any;
  mypicref:any;
  colors=['#9e2956','#c2281d','#de722f','#edbf4c','#5db37e','#459cde','#4250ad','#802fa3']

  q1 = [
    { value: 'Buy Milk', color: 'primary' },
    { value: 'Write new Post', color: 'primary' }
  ];
  q2 = [
    { value: 'Schedule newsletter', color: 'secondary' },
    { value: 'Find new Ionic Academy topics', color: 'secondary' }
  ];
  q3 = [
    { value: 'Improve page performance', color: 'tertiary' },
    { value: 'Clean the house', color: 'tertiary' }
  ];
  q4 = [
    { value: 'Unimportant things', color: 'warning' },
    { value: 'Watch Netflix', color: 'warning' }
  ];

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';

  constructor(public view:ViewController,public loading:LoadingController,public dragulaService: DragulaService,
  public plt : Platform, public navParams: NavParams,public navCtrl: NavController,
  public toastController: ToastController) {
    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      console.log(name);
      console.log(el);
      console.log(source);
      el.setAttribute('color', 'danger');
    });

    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      console.log(item);
      this.toastController.create({
        message: 'Removed: ' + item.value,
        duration: 2000
      })
      // .then(toast => toast.present());
    });

    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        console.log(item);
        item['color'] = 'success';
      });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });


    // this.mypicref=firebase.storage().ref("");
    this.shapes.push({x:10,y:100,width:30,height:30,fill:"#444444",isDragging:false});
    this.receipt_number=this.navParams.get("id");

  }
  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }
}
