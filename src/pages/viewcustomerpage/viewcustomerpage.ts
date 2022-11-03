import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular'
import * as firebase from "firebase";
import { Complete2Page } from "../complete2/complete2";

@Component({
    selector: "page-viewcustomerpage",
    templateUrl: "viewcustomerpage.html"
})
export class ViewCustomerPage {

    firemain = firebase.database().ref();   // DB접근 변수
    list              : any;                // 고객의 정보를 가지고 있는 list
    lloading          : any;                // 로딩 창
    title             = "";                 // ui상단의 제목을 뿌려주는 요도로 사용되는 변수
    engineer_id       = "";                 // 현재 로그인 한 사람의 아이디
    engineer_name     = "";                 // 현재 로그인 한 사람의 이름
    engineer_position = "";                 // 현재 로그인 한 사람의 직급
    history_list      = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController, public loading:LoadingController) {

        this.lloading = this.loading.create({
            content: 'AS이력 조회중'
        });
        this.lloading.present();
        this.list              = this.navParams.get("list");
        this.title             = this.navParams.get("title");
        this.engineer_id       = this.navParams.get("engineer_id");
        this.engineer_name     = this.navParams.get("engineer_name");
        this.engineer_position = this.navParams.get("engineer_position");

        console.log(this.list);
        console.log(this.engineer_id);
        console.log(this.engineer_name);
        console.log(this.engineer_position);
        console.log(this.title);


        this.firemain.child('history').child(this.list.clientInfo.customer)
        .once('value').then((snap)=>{
          if(snap.exists() == true){
            for(var i in snap.val())
            {
              this.history_list.push(snap.val()[i]);
            }
          }
          this.lloading.dismiss();
        }).catch((err)=>{
          console.log(err);
          this.lloading.dismiss();
        })
        // var interval=setInterval(()=>{
        //     if(flag==true){
        //         this.lloading.dismiss();
        //         clearInterval(interval);
        //     }
        //     else if(flag==false){
        //         flag=true;
        //     }
        // },2000)
    }

    detail(array) {

        this.navCtrl.push(Complete2Page, {"list": array, "id": this.engineer_id, "no": array.receipt_number, "title": this.title, "flag":100 });
    }
}
