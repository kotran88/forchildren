import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from "firebase";
import { snapshotChanges } from 'angularfire2/database';
import { Complete2Page } from '../complete2/complete2';
/**
 * Generated class for the ViewdatapagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-viewdatapage',
  templateUrl: 'viewdatapage.html',
})
export class ViewdatapagePage {

  engineer_id='';
  title='';
  engineer_name = "";
  list=[];
  noarray=[];

  num = "";
  firemain=firebase.database().ref();
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController) {

    this.engineer_id=this.navParams.get('engineer_id'); // 현재 로그인 한 사람의 아이디 ex) test2@gmail.com
    this.title=this.navParams.get('title');
    this.list=this.navParams.get('list');
    this.engineer_name = this.navParams.get("name");  // 현재 로그인 한 사람의 이름
    this.num = this.navParams.get("flag");

    console.log(this.list);

    this.list.sort((a, b)=>{
      if(a.receipt_number<b.receipt_number||!a.receipt_number){return 1;}
      else if(a.receipt_number>b.receipt_number||!b.receipt_number){return -1;}
      else return 0;
    })
    for(var i in this.list){
      this.remain_time(i,this.list[i].due_date,this.list[i].due_time)
    }
    if(this.title=="승인완료"){
      this.title="AS처리완료"
    }
  }

  set_position(n,key){
    this.firemain.child('engineer').child(key).child('position')
    .once('value').then((snap)=>{
      this.list[n].position=snap.val();
    })
  }


  remain_time(key,date,time){
    var due=new Date(date);
    var now=new Date();

    if(time&&time!=''){
      due.setHours(time.split(':')[0],time.split(':')[1]);
    }

    var data=due.getTime()-now.getTime();
    data=Math.floor(data/3600000);
    if(data==NaN) data=0;
    console.log("---------");
    console.log(data);
    console.log("---------");

    if(data<0){
      data=Math.abs(data);              // 절대값으로
      this.list[key].remain_flag="min"; // 텍스트 저장
      this.list[key].remain_text="";    // 텍스트 저장
      if(data/24>0){
        if(Math.floor(data/24) != 0) {
          this.list[key].remain_text=Math.floor(data/24)+'일 ';
        }
        data%=24;
      }
      this.list[key].remain_text+=data+'시간 지났습니다.';
    }
    else if(data>0){
      this.list[key].remain_flag="pls";

      this.list[key].remain_text="";
      if(data/24>0){
        if(Math.floor(data/24) != 0) {
          this.list[key].remain_text=Math.floor(data/24)+'일 ';
        }
        data%=24;
      }
      this.list[key].remain_text+=data+'시간 남았습니다.';
    }
    else{
      this.list[key].remain_flag=""
      this.list[key].remain_text=''
    }
  }

  detail(list) {
    console.log("detail click");
    console.log(list);
    //0303 접수건 눌렀을경우 dismiss로 가서 수정
    // if(this.title=="현재접수"){
    //   console.log("goto dismiss")
    //   this.viewCtrl.dismiss(list)
    // }
    // else{
      console.log(list + ",," + list.receipt_number);
      console.log(list)
      this.navCtrl.push(Complete2Page, { "list": list, "id": this.engineer_id, "no": list.receipt_number, "name": this.engineer_name, "title": this.title, "flag":this.num });
    }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewdatapagePage');
  }

}
