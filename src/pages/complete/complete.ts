// import { Component } from '@angular/core';
// import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
// import * as $ from 'jquery';
// import firebase, { storage } from 'firebase';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { HomePage } from '../home/home';
// import { ImagePicker } from '@ionic-native/image-picker/ngx';
// import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { DrawingPage } from '../drawing/drawing';
// import { l } from '@angular/core/src/render3';
// import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
// import { ViewCustomerPage } from '../viewcustomerpage/viewcustomerpage';

// /**
//  * Generated class for the CompletePage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @Component({
//   selector: 'page-complete',
//   templateUrl: 'complete.html',
// })
// export class CompletePage {
//   firemain = firebase.database().ref();

//   flagflag:any;
//   count = 0;
//   mypicref:any;
//   list:any;
//   key:any;
//   info_flag = 0;
//   number: any;
//   broken: any;
//   subname: any;
//   date_format: any;

//   date = new Date();

//   videourl:any=""
//   videourl2:any=""

//   flag7_broken = "";
//   flag7_complete = "";
//   flag7_yet = "";

//   error_code: any;
//   symtom_code: any;
//   complete_code: any;
//   unprocess_code: any;
//   agancy_engineer='';

//   imageurl3:any="";
//   lloading:any;
//   errorlist=[];

//   geolocate_latitude=0;
//   geolocate_longitude=0;
//   geolocate_time:any;

//   title = "";
//   r_reason="";

//   position : string = "";   // 접수 한 사람의 직급
//   symptomlist : any = [];       // 증상 코드 리스트
//   processingengineer_list : any = [];   // 해당 대리점에 있는 기사들의 이름 리스트

//   complete_list : any = [];   // 완료 코드
//   suspense_list : any = [];   // 미결 코드

//   outdoor_list = [];          // 실외기
//   indoor_list = [];           // 실내기
//   pc_automatic = [];          // PC고장계통


//   o_list = [];
//   i_list = [];
//   auto_list = [];

//   out_unit_list=[]; //고객의 실외기
//   in_unit_list=[];  //고객의 실내기

//   engineer_id = "";
//   engineer_name = "";
//   engineer_position="";
//   receiptionist_id = "";      // 해당 건을 접수 한 사람의 아이디 이놈은 db에 저장이 되어있지 않음
//   pastengineer_name = "";       // 현재 접수건을 맡은 전 처리기사의 이름
//   pastengineer_agancy = "";
//   f_id = "";
//   targetID = "";

//   data_check(key,callback){
//     var data=JSON.parse(localStorage.getItem(key));
//     console.log(key);
//     console.log(data);
//     var list=[];
//     for(var i in data){
//       list.push(data[i]);
//     }
//     console.log(list);
//     callback(list);
//   }
//   constructor(public geolocation:Geolocation,
//     public photoViewer:PhotoViewer,public loading:LoadingController,public modal:ModalController,public navCtrl: NavController, public navParams: NavParams, public camera: Camera,public imagePicker:ImagePicker) {
//     // this.takephoto();

//     this.list = this.navParams.get("list");
//     this.engineer_id = this.navParams.get("id");                        // 현재 로그인 한 사람의 아이디
//     this.engineer_name = this.navParams.get("name");                    // 현재 로그인 한 사람의 이름
//     this.engineer_position = localStorage.getItem('engineer_position'); // 현재 로그인 한 사람의 직급
//     this.title = this.navParams.get("title");
//     this.pastengineer_name = this.list.engineer;
//     this.pastengineer_agancy = this.list.assigned_company;
//     if(!this.list.engineer||this.list.engineer==""){
//       this.agancy_engineer = "";
//     }
//     else{
//       this.agancy_engineer = this.list.assigned_company+' '+this.list.engineer;
//     }

//     if(!this.list.o_model) this.list.o_model='';
//     if(!this.list.o_serial) this.list.o_serial='';
//     if(!this.list.o_time) this.list.o_time='';

//     if(!this.list.i_model) this.list.i_model='';
//     if(!this.list.i_serial) this.list.i_serial='';
//     if(!this.list.i_time) this.list.i_time='';

//     if(!this.list.io_etc) this.list.io_etc='';
//     // alert(this.agancy_engineer);

//     if(this.list.sign_data&&this.list.sign_data.signimage){
//       this.imageurl3=this.list.sign_data.signimage;
//     }
//     this.targetID = this.list.engineerinformationprocessing_position;

//     if(typeof this.list.outdoor_code != "undefined") {
//       this.o_list = this.list.outdoor_code.split(",");
//     }
//     if(typeof this.list.indoor_code != "undefined") {
//       this.i_list = this.list.indoor_code.split(",");
//     }
//     if(typeof this.list.auto_code != "undefined") {
//       this.auto_list = this.list.auto_code.split(",");
//     }
//     if(this.navParams.get('flag')){
//       this.flagflag=this.navParams.get('flag')
//     }
//     if(this.list.due_time==undefined||this.list.due_time==""){
//       this.list.due_time="24:00:00";
//     }

//     // this.firemain.child("pc_automatic").once("value", (snap) => {
//     this.data_check("pc_automatic",(list)=>{
//       for(let i in list) {
//         this.pc_automatic.push(list[i].auto_code);
//       }
//       setTimeout(() => {
//         for(let i = 0; i < this.pc_automatic.length; i++) {
//           // $("input:checkbox[id='pc_automatic"+ i +"']").attr("checked", "false");
//           for(let j = 0; j < this.auto_list.length; j++) {
//               if(this.pc_automatic[i] == this.auto_list[j]) {
//                   $("input:checkbox[id='pc_automatic"+ i +"']").attr("checked", "true");
//                   break;
//               }
//           }
//         }
//       }, 500);
//     });

//     // this.firemain.child("outdoor_unit").once("value", (snap) => {
//     this.data_check("outdoor_unit",(list)=>{
//       console.log(list)
//       console.log(this.o_list);
//       for(let i in list) {
//         this.outdoor_list.push(list[i].outdoor_code);
//       }
//       setTimeout(() => {
//         for(let j = 0; j < this.outdoor_list.length; j++) {
//           for(let i = 0; i < this.o_list.length; i++) {
//             if(this.outdoor_list[j] == this.o_list[i]) {
//               console.log(this.outdoor_list[j]);
//               console.log(this.o_list[i])
//               console.log('checked');
//               $("input:checkbox[id='outdoor_list" + j + "']").attr("checked", "true");
//               break;
//             }
//           }
//         }
//       }, 500);
//     });
//     // this.firemain.child("indoor_unit").once("value", (snap) => {
//     this.data_check("indoor_unit",(list)=>{
//       for(let i in list) {
//         this.indoor_list.push(list[i].indoor_code);
//       }
//       setTimeout(() => {
//         for(let i = 0; i < this.indoor_list.length; i++) {
//           // $("input:checkbox[id='indoor_list"+ i +"']").attr("checked", "false");
//           for(let j = 0; j < this.i_list.length; j++) {
//               if(this.indoor_list[i] == this.i_list[j]) {
//                   $("input:checkbox[id='indoor_list"+ i +"']").attr("checked", "true");
//                   break;
//               }
//           }
//         }
//       }, 500);
//     });

//     this.data_check("engineer",(list)=>{
//       // agency
//       for(let i in list) {
//         if(list[i].name == this.list.receiptionist && list[i].agency == this.list.assigned_company) {
//           this.receiptionist_id = list[i].id.split("@")[0];
//           break;
//         }
//       }

//       // 직급을 가져옴.
//       if(this.receiptionist_id!=''){
//         this.firemain.child("engineer").child(this.receiptionist_id).child("position").once("value", (snap) => {
//           this.position = snap.val();
//         });
//       }
//     })

//     // 증상코드를 가져와야 한다.
//     // this.firemain.child("symptom").once("value", (snap) => {
//     this.data_check("engineer",(list)=>{
//       for(let i in list) {
//         this.symptomlist.push(i);
//       }
//     });

//     // complete_list : any = [];   // 완료 코드
//     // suspense_list : any = [];   // 미결 코드
//     // 처리결과 코드
//     // this.firemain.child("complete").once("value", (snap) => {
//     this.data_check("complete",(list)=>{
//       for(let i in list) {
//         this.complete_list.push(list[i].complete_code);
//       }
//     });

//     // this.firemain.child("suspense").once("value", (snap) => {
//     this.data_check("suspense",(list)=>{
//       for(let i in list) {
//         this.suspense_list.push(list[i].suspense_code);
//       }
//     });

//     // 해당 대리점에 대한 기사들의 이름을 가져와야한다.
//     // localStorage.setItem("agency", this.agency_name); // 로그인 한 사람의 소속 대리점
//     // this.firemain.child("engineer").once("value", (snap) => {
//     this.data_check("engineer",(list)=>{
//       for(let i in list) {
//         if(list[i].position!="수퍼관리자")
//         if(localStorage.getItem("agency")=="(주)삼천리ES" || localStorage.getItem("agency") == list[i].agency) {    // 로그인 한 사람의 소속 대리점
//           if(list[i].name&&list[i].name!=""){
//             this.processingengineer_list.push(list[i].agency+' '+list[i].name);
//           }
//         }
//       }
//       this.processingengineer_list = Array.from(new Set(this.processingengineer_list));
//     });


//     this.mypicref=firebase.storage().ref("images");
//     this.error_code=this.list.error_code;
//     // this.firemain.child('error').once('value').then((snap)=>{
//     this.data_check("error",(list)=>{
//       list.sort((a,b)=>{
//         if(!a.sort_cnt&&b.sort_cnt) return 1;
//         else if(a.sort_cnt&&!b.sort_cnt) return -1;
//         else if(Number(a.sort_cnt)>Number(b.sort_cnt)) return 1;
//         else if(Number(a.sort_cnt)<Number(b.sort_cnt)) return -1;
//         else return 0;
//       })
//       console.log(list);
//       for(var i in list){
//         this.errorlist.push(list[i]);
//       }
//     });
//     console.log(this.list)
//     if(!this.list.complete_code) this.list.complete_code="";
//     if(!this.list.unprocess_code) this.list.unprocess_code="";
//     if(!this.list.complete_text) this.list.complete_text="";
//     if(!this.list.yet_text) this.list.yet_text="";

//     // if(this.list.image1){
//     //   this.imageurl=this.list.image1;
//     //   this.videourl='';
//     //   console.log('imageurl : ',this.imageurl)
//     // }
//     // else if(this.list.video1){
//     //   this.videourl=this.list.video1;
//     //   this.imageurl='';
//     //   console.log('videourl : ',this.videourl)
//     // }

//     // if(this.list.image2){
//     //   this.imageurl2=this.list.image2;
//     //   this.videourl2='';
//     //   console.log('imageurl2 : ',this.imageurl2)
//     // }
//     // else if(this.list.video2){
//     //   this.videourl2=this.list.video2;
//     //   this.imageurl2='';
//     //   console.log('videourl2 : ',this.videourl2)
//     // }

//     this.key = this.navParams.get("no");
//     console.log(this.key);
//     this.date_format =
//     this.str_format(this.date.getFullYear(), 4) + "" +
//     this.str_format(this.date.getMonth() + 1, 2) + "" +
//     this.str_format(this.date.getDate(), 2);
//     console.log(this.list);
//     for (var data in this.list) {
//       if (data == 'num') { this.number = this.list[data] }
//       if (data == 'broken') { this.broken = this.list[data] }
//     }

//     this.io_unit_start();
//   }

//   ionViewDidLoad() {
//     console.log('ionViewDidLoad CompletePage');

//     // setTimeout(function() {
//     //   for(let j = 0; j < this.outdoor_list.length; j++) {
//     //     console.log(j);
//     //     $("input:checkbox[id='outdoor_list" + j + "']").attr("checked", "false");
//     //     for(let i = 0; i < this.o_list.length; i++) {
//     //       if($("#outdoor_list" + j).val() == this.o_list[i]) {
//     //         $("input:checkbox[id='outdoor_list" + j + "']").attr("checked", "true");
//     //         break;
//     //       }
//     //     }
//     //   }
//     //   for(let i = 0; i < this.indoor_list.length; i++) {
//     //     console.log(i);
//     //       $("input:checkbox[id='indoor_list"+ i +"']").attr("checked", "false");
//     //       for(let j = 0; j < this.i_list.length; j++) {
//     //           if($("#indoor_list" + i).val() == this.i_list[j]) {
//     //               $("input:checkbox[id='indoor_list"+ i +"']").attr("checked", "true");
//     //               break;
//     //           }
//     //       }
//     //   }
//     // }, 500);
//   }

//   str_format(text, len) {
//     text = String(text);
//     for (var i = text.length; i < len; i++) {
//       text = '0' + text;
//     }
//     return text;
//   }

//   info_display() {
//     console.log(this.info_flag);
//     if (this.info_flag % 2 == 0) {
//       $('.info').css('display', 'block');
//     } else {
//       $('.info').css('display', 'none');
//     }
//     this.info_flag++;
//   }

//   //자동 하이픈
//   phone_replace(phone) {
//     phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
//     return phone;
//   }

//   // 처리진행 버튼
//   async receipt() {

//     console.log(this.list.assigned_company);
//     console.log(this.targetID);
//     console.log(this.list.engineerinformationprocessing_position);

//     if(!this.list.due_date||this.list.due_date==""){ alert('처리예정일을 입력해주세요.'); return; }
//     else if(!this.list.due_time||this.list.due_time==""){ alert('처리예정시간을 입력해주세요.'); return; }

//     // 로딩 창 띄우기
//     this.lloading = this.loading.create({ spinner: 'hide', content: '저장중..' });
//     this.lloading.present();

//     let str1 = "";
//     let str2 = "";
//     let str3 = "";

//     let outdoor_array = [];
//     let indoor_array = [];
//     let auto_array = [];
//     $("input[name=outdoor_list]:checked").each(function() { let check = $(this).val(); outdoor_array.push(check); });
//     $("input[name=indoor_list]:checked").each(function() { let check = $(this).val(); indoor_array.push(check); });
//     $("input[name=pc_automatic]:checked").each(function() { let check = $(this).val(); auto_array.push(check); });

//     for(let i = 0; i < outdoor_array.length; i++) { str1 += outdoor_array[i] + ","; }
//     for(let i = 0; i < indoor_array.length; i++) { str2 += indoor_array[i] + ","; }
//     for(let i = 0; i < auto_array.length; i++) { str3 += auto_array[i] + ","; }

//     this.list.outdoor_code = str1;
//     this.list.indoor_code = str2;
//     this.list.auto_code = str3;

//     if(this.geolocate_time==undefined) this.geolocate_time='';
//     let datetime = new Date();
//     this.list.assignment_date_and_time = this.str_format(datetime.getFullYear(), 4) + ""
//                                           + this.str_format(datetime.getMonth() + 1, 2) + ""
//                                             + this.str_format(datetime.getDate(), 2) + ""
//                                               + this.str_format(datetime.getHours(), 2) + ""
//                                                 + this.str_format(datetime.getMinutes(), 2);
//     this.list.status = "처리진행";

//     // 기존 처리기사 engineerinformationprocessing_position
//     // 현재 선택한 처리기사 this.targetID
//     if(this.list.engineerinformationprocessing_position != this.targetID) {
//       try {
//         this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("schedule").child(this.key).remove();
//         await this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("currentReceipt").child(this.key).remove();
//       }
//       catch(error) {
//         console.log(error);
//       }
//     }

//     this.list.engineerinformationprocessing_position = this.targetID;
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update(this.list);
//       await this.firemain.child("engineer").child(this.targetID).child("schedule").child(this.key).update({ "date": this.list.due_date, "place": this.list.customer });
//     }
//     catch(error) {
//       console.log(error);
//     }


//     if(this.geolocate_time==undefined) { this.geolocate_time=''; }
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update({
//         sign_data: {
//           latitude : this.geolocate_latitude,
//           longitude : this.geolocate_longitude,
//           time : this.geolocate_time,
//           signimage:this.imageurl3
//         }
//       });
//     }
//     catch(error) {
//       console.log(error);
//     }
//     this.lloading.dismiss();
//     window.alert("처리진행 상태로 변경되었습니다.");
//     this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//   }

//   // 처리완료 버튼
//   async complete() {

//     if(!this.list.receipt_content&&this.list.receipt_content==""){ alert("고장증상을 입력해주세요."); return; }
//     if(!this.list.c_result||this.list.c_result==""){ alert("처리결과항목을 선택해주세요."); return; }

//     this.lloading = this.loading.create({ spinner: 'hide', content: '저장중..' });
//     this.lloading.present();

//     if(this.geolocate_time==undefined) this.geolocate_time='';

//     let outdoor_array = [];
//     let indoor_array = [];
//     let auto_array = [];

//     $("input[name=outdoor_list]:checked").each(function() { let check = $(this).val(); outdoor_array.push(check); });
//     $("input[name=indoor_list]:checked").each(function() { let check = $(this).val(); indoor_array.push(check); });
//     $("input[name=pc_automatic]:checked").each(function() { let check = $(this).val(); auto_array.push(check); });

//     let str1 = "";
//     let str2 = "";
//     let str3 = "";

//     for(let i = 0; i < outdoor_array.length; i++) { str1 += outdoor_array[i] + ","; }
//     for(let i = 0; i < indoor_array.length; i++) { str2 += indoor_array[i] + ","; }
//     for(let i = 0; i < auto_array.length; i++) { str3 += auto_array[i] + ","; }

//     this.list.outdoor_code = str1;
//     this.list.indoor_code = str2;
//     this.list.auto_code = str3;

//     this.list.status="처리완료";
//     this.list.completion_date_and_time = this.str_format(this.date.getFullYear(), 4) + "-" + this.str_format(this.date.getMonth() + 1, 2) + "-" + this.str_format(this.date.getDate(), 2);
//     this.list.c_cdate = this.str_format(this.date.getFullYear(), 4) + "-" + this.str_format(this.date.getMonth() + 1, 2) + "-" + this.str_format(this.date.getDate(), 2);

//     // 기존 처리기사 engineerinformationprocessing_position
//     // 현재 선택한 처리기사 this.targetID
//     if(this.list.engineerinformationprocessing_position != this.targetID) {
//       try {
//         this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("schedule").child(this.key).remove();
//         await this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("currentReceipt").child(this.key).remove();
//       }
//       catch(error) {
//         console.log(error);
//       }
//     }

//     this.list.engineerinformationprocessing_position = this.targetID;
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update(this.list);
//       await this.firemain.child("engineer").child(this.targetID).child("schedule").child(this.key).update({ "date": this.list.due_date, "place": this.list.customer });
//     }
//     catch(error) {
//       console.log(error);
//     }


//     if(this.geolocate_time==undefined) { this.geolocate_time=''; }
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update({
//         sign_data: {
//           latitude : this.geolocate_latitude,
//           longitude : this.geolocate_longitude,
//           time : this.geolocate_time,
//           signimage:this.imageurl3
//         }
//       });
//     }
//     catch(error) {
//       console.log(error);
//     }

//     this.lloading.dismiss();
//     window.alert("처리완료 상태로 변경되었습니다.");
//     this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//   }

//   // 처리대기 버튼
//   async stand() {

//     console.log(this.list.assigned_company);
//     console.log(this.targetID);
//     console.log(this.list.engineerinformationprocessing_position);

//     this.lloading = this.loading.create({ spinner: 'hide', content: '저장중..' });
//     this.lloading.present();

//     let outdoor_array = [];
//     let indoor_array = [];
//     let auto_array = [];

//     $("input[name=outdoor_list]:checked").each(function() { let check = $(this).val(); outdoor_array.push(check); });
//     $("input[name=indoor_list]:checked").each(function() { let check = $(this).val(); indoor_array.push(check); });
//     $("input[name=pc_automatic]:checked").each(function() { let check = $(this).val(); auto_array.push(check); });

//     let str1 = "";
//     let str2 = "";
//     let str3 = "";

//     for(let i = 0; i < outdoor_array.length; i++) {
//       str1 += outdoor_array[i] + ",";                   // 고장계통(실외기)
//     }
//     for(let i = 0; i < indoor_array.length; i++) {
//       str2 += indoor_array[i] + ",";                    // 고장계통(실내기)
//     }
//     for(let i = 0; i < auto_array.length; i++) {
//       str3 += auto_array[i] + ",";                    // 고장계통(실내기)
//     }

//     this.list.outdoor_code = str1;
//     this.list.indoor_code = str2;
//     this.list.auto_code = str3;

//     // 만약 처리기사를 바꾸게 되면 DB경로를 바뀐 처리기사의 아이디로 해줘야 하는데
//     // 현재 문제점은 접수한 사람의 아이디로 계속 접수건이 들어가는게 문제
//     if(this.geolocate_time==undefined) this.geolocate_time='';
//     this.list.status="처리대기";
//     this.list.undecided_date_and_time =
//     this.str_format(this.date.getFullYear(), 4) + "" +
//     this.str_format(this.date.getMonth() + 1, 2) + "" +
//     this.str_format(this.date.getDate(), 2) + "" +
//     this.str_format(this.date.getHours(), 2) + "" +
//     this.str_format(this.date.getMinutes(), 2);

//     if(this.list.engineerinformationprocessing_position != this.targetID) {
//       try {
//         this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("schedule").child(this.key).remove();
//         await this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("currentReceipt").child(this.key).remove();
//       }
//       catch(error) {
//         console.log(error);
//       }
//     }

//     this.list.engineerinformationprocessing_position = this.targetID;
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update(this.list);
//       await this.firemain.child("engineer").child(this.targetID).child("schedule").child(this.key).update({ "date": this.list.due_date, "place": this.list.customer });
//     }
//     catch(error) {
//       console.log(error);
//     }

//     if(this.geolocate_time==undefined) { this.geolocate_time=''; }
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update({
//         sign_data: {
//           latitude : this.geolocate_latitude,
//           longitude : this.geolocate_longitude,
//           time : this.geolocate_time,
//           signimage:this.imageurl3
//         }
//       });
//     }
//     catch(error) {
//       console.log(error);
//     }
//     this.lloading.dismiss();
//     window.alert("처리대기 상태로 변경되었습니다.");
//     this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//   }

//   use_cnt_update(key,name){
//     // for(var i in this.errorlist){
//     //   if(name==this.errorlist[i].code){
//     //     this.firemain.child(key).child(name).update({use_cnt:Number(this.errorlist[i].use_cnt)+1});
//     //   }
//     // }
//   }

//   // // 수정 버튼
//   // modify() {

//   //   // this.use_cnt_update('error',this.list.error_code);
//   //   this.lloading = this.loading.create({
//   //     spinner: 'hide',
//   //     content: '수정중..'
//   //   });
//   //   this.lloading.present();
//   //   let outdoor_array = [];
//   //   let indoor_array = [];
//   //   let auto_array = [];

//   //   $("input[name=outdoor_list]:checked").each(function() {
//   //     let check = $(this).val();
//   //     outdoor_array.push(check);
//   //   });
//   //   $("input[name=indoor_list]:checked").each(function() {
//   //     let check = $(this).val();
//   //     indoor_array.push(check);
//   //   });
//   //   $("input[name=pc_automatic]:checked").each(function() {
//   //     let check = $(this).val();
//   //     auto_array.push(check);
//   //   });

//   //   let str1 = "";
//   //   let str2 = "";
//   //   let str3 = "";

//   //   for(let i = 0; i < outdoor_array.length; i++) {
//   //     str1 += outdoor_array[i] + ",";                   // 고장계통(실외기)
//   //   }
//   //   for(let i = 0; i < indoor_array.length; i++) {
//   //     str2 += indoor_array[i] + ",";                    // 고장계통(실내기)
//   //   }
//   //   for(let i = 0; i < auto_array.length; i++) {
//   //     str3 += auto_array[i] + ",";                    // 고장계통(실내기)
//   //   }

//   //   this.list.outdoor_code = str1;
//   //   this.list.indoor_code = str2;
//   //   this.list.auto_code = str3;

//   //   let id = "";
//   //   let name = "";
//   //   let phone = "";
//   //   let pastengineer_id = "";
//   //   // this.firemain.child("engineer").once("value", (snap) => {
//   //   this.data_check("engineer",(list)=>{
//   //     for(let i in list) {
//   //       if(list[i].name == this.pastengineer_name && list[i].agency == this.pastengineer_agancy) {
//   //         pastengineer_id = list[i].id.split("@")[0];
//   //         break;
//   //       }
//   //     }

//   //     if(pastengineer_id!=""){
//   //       this.firemain.child("engineer").child(pastengineer_id).child("schedule").child(this.key).remove();
//   //       this.firemain.child("engineer").child(pastengineer_id).child("currentReceipt").child(this.key).remove();
//   //     }
//   //       // this.firemain.child("engineer").once("value",(snap) => {
//   //     // this.data_check("engineer",(list)=>{
//   //     for(let i in list) {
//   //       if(list[i].name == this.list.engineer && list[i].agency == this.list.assigned_company) {
//   //         id = list[i].id.split("@")[0];
//   //         name = list[i].name;
//   //         phone = list[i].phone;
//   //         break;
//   //       }
//   //     }
//   //     if(id==""){
//   //       for(let i in list) {
//   //         if(list[i].authority == "대리점대표" && list[i].agency == this.list.assigned_company) {
//   //           id = list[i].id.split("@")[0];
//   //           name = list[i].name;
//   //           phone = list[i].phone;
//   //           break;
//   //         }
//   //       }
//   //     }
//   //     this.list.c_name = name;
//   //     this.list.c_number = phone;
//   //     this.firemain.child("engineer").child(id).child("currentReceipt").child(this.key).update(this.list)
//   //     .then(() => {
//   //       // 여기에 스케줄 넣어 주는 로직도 짜야한다.
//   //       this.firemain.child("engineer").child(id).child("schedule").child(this.key).update({ "date": this.list.due_date, "place": this.list.customer })
//   //       .then(() => {
//   //         if(this.geolocate_time==undefined) this.geolocate_time='';
//   //         this.firemain.child("engineer").child(id).child("currentReceipt").child(this.key).update({
//   //           sign_data: {
//   //             latitude : this.geolocate_latitude,
//   //             longitude : this.geolocate_longitude,
//   //             time : this.geolocate_time,
//   //             signimage:this.imageurl3
//   //           }
//   //         })
//   //         .then(() => {
//   //           this.lloading.dismiss();
//   //           window.alert("수정하였습니다.")
//   //           this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//   //         })
//   //       })
//   //     })
//   //   })
//   // }


//   // 수정 버튼
//   async modify() {

//     console.log(this.list.assigned_company);
//     console.log(this.targetID);
//     console.log(this.list.engineerinformationprocessing_position);

//     // 로딩 창 띄우기
//     this.lloading = this.loading.create({ spinner: 'hide', content: '수정중..' });
//     this.lloading.present();

//     let str1 = "";
//     let str2 = "";
//     let str3 = "";
//     let outdoor_array = [];
//     let indoor_array = [];
//     let auto_array = [];

//     $("input[name=outdoor_list]:checked").each(function() { let check = $(this).val(); outdoor_array.push(check); });
//     $("input[name=indoor_list]:checked").each(function() { let check = $(this).val(); indoor_array.push(check); });
//     $("input[name=pc_automatic]:checked").each(function() { let check = $(this).val(); auto_array.push(check); });


//     for(let i = 0; i < outdoor_array.length; i++) { str1 += outdoor_array[i] + ","; }
//     for(let i = 0; i < indoor_array.length; i++) { str2 += indoor_array[i] + ","; }
//     for(let i = 0; i < auto_array.length; i++) { str3 += auto_array[i] + ","; }

//     this.list.outdoor_code = str1;
//     this.list.indoor_code = str2;
//     this.list.auto_code = str3;

//     // 기존 처리기사 engineerinformationprocessing_position
//     // 현재 선택한 처리기사 this.targetID
//     if(this.list.engineerinformationprocessing_position != this.targetID) {
//       try {
//         this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("schedule").child(this.key).remove();
//         await this.firemain.child("engineer").child(this.list.engineerinformationprocessing_position).child("currentReceipt").child(this.key).remove();
//       }
//       catch(error) {
//         console.log(error);
//       }
//     }

//     this.list.engineerinformationprocessing_position = this.targetID;
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update(this.list);
//       await this.firemain.child("engineer").child(this.targetID).child("schedule").child(this.key).update({ "date": this.list.due_date, "place": this.list.customer });
//     }
//     catch(error) {
//       console.log(error);
//     }


//     if(this.geolocate_time==undefined) { this.geolocate_time=''; }
//     try {
//       this.firemain.child("engineer").child(this.targetID).child("currentReceipt").child(this.key).update({
//         sign_data: {
//           latitude : this.geolocate_latitude,
//           longitude : this.geolocate_longitude,
//           time : this.geolocate_time,
//           signimage:this.imageurl3
//         }
//       });
//     }
//     catch(error) {
//       console.log(error);
//     }
//     this.lloading.dismiss();
//     window.alert("수정하였습니다.");
//     this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//   }


//   sign(){
//     this.lloading = this.loading.create({
//       spinner: 'hide',
//       content: 'Loading Please Wait'
//     });
//     this.lloading.present();
//     // 37.490663, 127.494764
//     // this.geolocate_latitude=37.490663
//     //   this.geolocate_longitude=127.494764

//     setTimeout(() => {
//       this.lloading.dismiss();
//     }, 3000);
//     var options = {maximumAge:0, timeout: 10000, enableHighAccuracy: true}
//     this.geolocation.getCurrentPosition(options).then((resp) => {
//       this.geolocate_latitude=resp.coords.latitude
//       this.geolocate_longitude=resp.coords.longitude
//       console.log(this.geolocate_latitude,this.geolocate_longitude);

//       this.geolocate_time=new Date();
//       this.navCtrl.push(DrawingPage,{"id":this.list.receipt_number}).then(() => {
//         if(this.lloading!=undefined){
//           this.lloading.dismiss();
//         }
//         this.navCtrl.getActive().onDidDismiss(data => {
//           console.log(data);
//           if(data!=undefined){
//             this.imageurl3=data.url;
//           }
//         });
//       });



//     }).catch((e)=>{
//       window.alert("위치정보를 허용하지 않아서 취소되었거나 다른 문제가 발생하였습니다.")
//       window.alert(e);
//       if(this.lloading!=undefined){
//         this.lloading.dismiss();
//       }
//     }).finally(()=>{
//       if(this.lloading!=undefined){
//         this.lloading.dismiss();
//       }
//     })

//   }


//   takephoto(v){
//     if(v==1&&(this.list.content_img9&&this.list.content_img9!='')){
//       alert("파일은 최대 10장까지 업로드 할 수 있습니다.");
//       return;
//     }
//     else if(v==2&&(this.list.c_file10&&this.list.c_file10!='')){
//       alert("파일은 최대 10장까지 업로드 할 수 있습니다.");
//       return;
//     }
//     let modal = this.modal.create(Cameraselect2Page,{"key":this.key,"v":v});
//     modal.onDidDismiss(url => {
//       console.log("url is..");
//       console.log(url.flag);
//       console.log(url.data);

//       if(url.flag=="videos"){
//         if(v===1){
//           if(!this.list.content_img||this.list.content_img==""){this.list.content_img=url.data;}
//           else if(!this.list.content_img1||this.list.content_img1==""){this.list.content_img1=url.data;}
//           else if(!this.list.content_img2||this.list.content_img2==""){this.list.content_img2=url.data;}
//           else if(!this.list.content_img3||this.list.content_img3==""){this.list.content_img3=url.data;}
//           else if(!this.list.content_img4||this.list.content_img4==""){this.list.content_img4=url.data;}
//           else if(!this.list.content_img5||this.list.content_img5==""){this.list.content_img5=url.data;}
//           else if(!this.list.content_img6||this.list.content_img6==""){this.list.content_img6=url.data;}
//           else if(!this.list.content_img7||this.list.content_img7==""){this.list.content_img7=url.data;}
//           else if(!this.list.content_img8||this.list.content_img8==""){this.list.content_img8=url.data;}
//           else if(!this.list.content_img9||this.list.content_img9==""){this.list.content_img9=url.data;}
//         }
//         else{
//           if(!this.list.c_file1||this.list.c_file1==""){this.list.c_file1=url.data;}
//           else if(!this.list.c_file2||this.list.c_file2==""){this.list.c_file2=url.data;}
//           else if(!this.list.c_file3||this.list.c_file3==""){this.list.c_file3=url.data;}
//           else if(!this.list.c_file4||this.list.c_file4==""){this.list.c_file4=url.data;}
//           else if(!this.list.c_file5||this.list.c_file5==""){this.list.c_file5=url.data;}
//           else if(!this.list.c_file6||this.list.c_file6==""){this.list.c_file6=url.data;}
//           else if(!this.list.c_file7||this.list.c_file7==""){this.list.c_file7=url.data;}
//           else if(!this.list.c_file8||this.list.c_file8==""){this.list.c_file8=url.data;}
//           else if(!this.list.c_file9||this.list.c_file9==""){this.list.c_file9=url.data;}
//           else if(!this.list.c_file10||this.list.c_file10==""){this.list.c_file10=url.data;}
//         }
//       }else{
//         console.log("not a video ")
//         this.camera_asd(url,v,(callback)=>{
//           console.log("get it from url ");
//           console.log(callback);
//           if(v===1){
//             if(!this.list.content_img||this.list.content_img==""){this.list.content_img=callback;}
//             else if(!this.list.content_img1||this.list.content_img1==""){this.list.content_img1=callback;}
//             else if(!this.list.content_img2||this.list.content_img2==""){this.list.content_img2=callback;}
//             else if(!this.list.content_img3||this.list.content_img3==""){this.list.content_img3=callback;}
//             else if(!this.list.content_img4||this.list.content_img4==""){this.list.content_img4=callback;}
//             else if(!this.list.content_img5||this.list.content_img5==""){this.list.content_img5=callback;}
//             else if(!this.list.content_img6||this.list.content_img6==""){this.list.content_img6=callback;}
//             else if(!this.list.content_img7||this.list.content_img7==""){this.list.content_img7=callback;}
//             else if(!this.list.content_img8||this.list.content_img8==""){this.list.content_img8=callback;}
//             else if(!this.list.content_img9||this.list.content_img9==""){this.list.content_img9=callback;}
//           }
//           else{
//             if(!this.list.c_file1||this.list.c_file1==""){this.list.c_file1=callback;}
//             else if(!this.list.c_file2||this.list.c_file2==""){this.list.c_file2=callback;}
//             else if(!this.list.c_file3||this.list.c_file3==""){this.list.c_file3=callback;}
//             else if(!this.list.c_file4||this.list.c_file4==""){this.list.c_file4=callback;}
//             else if(!this.list.c_file5||this.list.c_file5==""){this.list.c_file5=callback;}
//             else if(!this.list.c_file6||this.list.c_file6==""){this.list.c_file6=callback;}
//             else if(!this.list.c_file7||this.list.c_file7==""){this.list.c_file7=callback;}
//             else if(!this.list.c_file8||this.list.c_file8==""){this.list.c_file8=callback;}
//             else if(!this.list.c_file9||this.list.c_file9==""){this.list.c_file9=callback;}
//             else if(!this.list.c_file10||this.list.c_file10==""){this.list.c_file10=callback;}
//           }

//         });
//       }
//     })
//     modal.present();
//   }

//   camera_asd(imagedata,indexing,callback){
//     console.log("imagedataimagedataimagedata");
//     console.log(imagedata);
//     console.log(indexing)
//     console.log(imagedata.data);
//     if(imagedata.data!=''&&imagedata.data){

//       console.log(imagedata)
//       // this.lloading = this.loading.create({
//       //   spinner: 'hide',
//       //   content: 'Loading...'
//       // });
//       // this.lloading.present();
//       this.uploadImage(imagedata,indexing,(imageurl)=>{

//         console.log("upload done");
//         console.log(imageurl);
//         callback(imageurl);

//       });
//     }
//     else{
//       if(this.lloading!=undefined){
//         this.lloading.dismiss()
//       }
//     }
//   }

//   uploadImage(imageURI,index,callback){
//     let storageRef = firebase.storage().ref();
//     imageURI=  "data:image/png;base64," + imageURI.data;
//         var a = this.mypicref.child(this.list.receipt_number).child(""+this.count);
//     this.encodeImageUri(imageURI, (image64)=>{

//       a.putString(image64, 'data_url')
//       .then(snapshot => {
//         if(this.lloading!=undefined){
//           this.lloading.dismiss()
//         }
//         console.log(snapshot);
//         this.mypicref.child(this.list.receipt_number).child("" + this.count).getDownloadURL().then((url)=>{
//           this.count++;
//           console.log("download url is : "+url);
//           callback(url);
//           // this.photoarray.push(url);
//           // if(this.numofimage==this.photoarray.length){
//           //   this.lloading.dismiss()
//           //   window.alert("사진업로드 완료!")
//           //   this.view.dismiss({'data':this.photoarray})
//           // }


//         }).catch((e)=>{
//           console.log('eeeee');
//           console.log(e);
//           if(this.lloading!=undefined){
//             this.lloading.dismiss()
//           }
//         })
//       }).catch((e)=>{
//         console.log("error is....")
//         window.alert(e);
//         console.log(e);
//         if(this.lloading!=undefined){
//           this.lloading.dismiss()
//         }
//       })
//     })
//   }
//   encodeImageUri(imageUri, callback) {
//     var c = document.createElement('canvas');
//     var ctx = c.getContext("2d");
//     var img = new Image();
//     img.onload = function () {
//       var aux:any = this;
//       c.width = aux.width;
//       c.height = aux.height;
//       ctx.drawImage(img, 0, 0);
//       var dataURL = c.toDataURL("image/png");
//       callback(dataURL);
//     };
//     img.src = imageUri;
//   };

//   photo_view(url){
//     this.photoViewer.show(url);
//   }

//   goback() {
//     this.navCtrl.pop();
//   }


//   go_viewcustomerpage() {
//     // this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": list.receipt_number, "name": this.engineer_name, "title": this.title, "flag":this.num });

//     /*
//       this.list = this.navParams.get("list");
//       this.engineer_id = this.navParams.get("id");                        // 현재 로그인 한 사람의 아이디
//       this.engineer_name = this.navParams.get("name");                    // 현재 로그인 한 사람의 이름
//       this.engineer_position = localStorage.getItem('engineer_position'); // 현재 로그인 한 사람의 직급
//       this.title = this.navParams.get("title");
//     */

//     // complete.ts에 가면 위의 5개가 필요함.
//     // 어차피 customer은 this.list에 포함 되어 있음.

//     console.log('---------------------------------');
//     this.navCtrl.push(ViewCustomerPage, {
//       "engineer_id"      : this.engineer_id,
//       "engineer_name"    : this.engineer_name,
//       "engineer_position": this.engineer_position,
//       "title"            : "AS이력",
//       "list"             : this.list
//     });
//   }

//   remove_file(m,n)
//   {
//     var flag = confirm("사진을 지우시겠습니까?");
//     if(flag){
//       if(m==1){
//         if(n==1){this.list.content_img = this.list.content_img1; this.list.content_img1 = '';}
//         if(n<=2){this.list.content_img1 = this.list.content_img2; this.list.content_img2 = '';}
//         if(n<=3){this.list.content_img2 = this.list.content_img3; this.list.content_img3 = '';}
//         if(n<=4){this.list.content_img3 = this.list.content_img4; this.list.content_img4 = '';}
//         if(n<=5){this.list.content_img4 = this.list.content_img5; this.list.content_img5 = '';}
//         if(n<=6){this.list.content_img5 = this.list.content_img6; this.list.content_img6 = '';}
//         if(n<=7){this.list.content_img6 = this.list.content_img7; this.list.content_img7 = '';}
//         if(n<=8){this.list.content_img7 = this.list.content_img8; this.list.content_img8 = '';}
//         if(n<=9){this.list.content_img8 = this.list.content_img9; this.list.content_img9 = '';}
//         if(n<=10){this.list.content_img9 = '';}
//       }
//       else{
//         if(n==1){this.list.c_file1 = this.list.c_file2; this.list.c_file2 = '';}
//         if(n<=2){this.list.c_file2 = this.list.c_file3; this.list.c_file3 = '';}
//         if(n<=3){this.list.c_file3 = this.list.c_file4; this.list.c_file4 = '';}
//         if(n<=4){this.list.c_file4 = this.list.c_file5; this.list.c_file5 = '';}
//         if(n<=5){this.list.c_file5 = this.list.c_file6; this.list.c_file6 = '';}
//         if(n<=6){this.list.c_file6 = this.list.c_file7; this.list.c_file7 = '';}
//         if(n<=7){this.list.c_file7 = this.list.c_file8; this.list.c_file8 = '';}
//         if(n<=8){this.list.c_file8 = this.list.c_file9; this.list.c_file9 = '';}
//         if(n<=9){this.list.c_file9 = this.list.c_file10; this.list.c_file10 = '';}
//         if(n<=10){this.list.c_file10 = '';}
//       }
//     }
//   }

//   engineer_change(){

//     let targetAgency = localStorage.getItem("agency");
//     this.list.assigned_company=this.agancy_engineer.split(' ')[0];      // 배정처
//     this.list.engineer=this.agancy_engineer.split(' ')[1];              // 배정직원


//     if(this.list.assigned_company == "") {
//       this.list.assigned_company = localStorage.getItem("agency");
//     }

//     if(this.list.engineer == undefined) { this.list.engineer = ""; }

//     const db = firebase.database();
//     const fm = db.ref("engineer");
//     if(this.list.engineer == undefined || this.list.engineer == "") {
//       if(targetAgency != "(주)삼천리ES") {    // 대리점이라면
//         fm.orderByChild("agency").equalTo(targetAgency).once("value")
//         .then((snapshot) => {
//           for(let i in snapshot.val()) {
//             if(snapshot.val()[i].authority == "대리점대표") {
//               this.targetID = i;
//               break;
//             }
//           }
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//       }
//       else {
//         this.targetID = "TESNUECHCAOLERIRGODLYSEENEEPITTEVTTSMHSESIAEAHRETSSTOSN";
//       }
//     }
//     else {
//       fm.orderByChild("agency").equalTo(this.list.assigned_company).once("value")
//       .then((snapshot) => {
//         for(let i in snapshot.val()) {
//           if(snapshot.val()[i].name == this.list.engineer) {
//             this.list.engineer_phone = snapshot.val()[i].phone;
//             this.targetID = i;
//             break;
//           }
//         }
//       })
//       .catch(function(error) {
//         console.log(error);
//       })
//     }
//     return;
//   }

//   io_unit_check(ch,num){
//     if(ch=="out"){//실외기
//       if(num==1){//모델
//         // this.o_serial="";
//         // this.o_time="";
//         $("#out_unit_serial").empty();
//         $("#out_unit_time").empty();
//         for(var i in this.out_unit_list){
//           if(this.out_unit_list[i].o_model == this.list.o_model && this.out_unit_list[i].o_serial) {
//             var newOptionElement = document.createElement("option");
//             newOptionElement.value = this.out_unit_list[i].o_serial;
//             document.getElementById("out_unit_serial").appendChild(newOptionElement);
//           }
//         }
//       }
//       else if(num==2){//제조번호
//         // this.o_time="";
//         $("#out_unit_time").empty();
//         for(var i in this.out_unit_list){
//           if(this.out_unit_list[i].o_model==this.list.o_model
//           &&this.out_unit_list[i].o_serial==this.list.o_serial){
//             this.list.o_time=this.out_unit_list[i].o_time;
//             break;
//           }
//         }
//       }
//       else if(num==3){//운전시간

//       }
//     }
//     else if(ch=="in"){//실내기
//       if(num==1){//모델
//         // this.i_serial="";
//         // this.i_time="";
//         $("#in_unit_serial").empty();
//         $("#in_unit_time").empty();
//         for(var i in this.in_unit_list){
//           if(this.in_unit_list[i].i_model==this.list.i_model
//           &&this.in_unit_list[i].i_serial){
//             var newOptionElement = document.createElement("option");
//             newOptionElement.value = this.in_unit_list[i].i_serial;
//             document.getElementById("in_unit_serial").appendChild(newOptionElement);
//           }
//         }
//       }
//       else if(num==2){//제조번호
//         // this.i_time="";
//         $("#in_unit_time").empty();
//         for(var i in this.in_unit_list){
//           if(this.in_unit_list[i].i_model==this.list.i_model
//           &&this.in_unit_list[i].i_serial==this.list.i_serial){
//             this.list.i_time=this.in_unit_list[i].i_time;
//             break;
//           }
//         }
//       }
//       else if(num==3){//운전시간

//       }
//     }
//   }

//   flag6_iounit_input(){
//     // setTimeout(() => {
//       $("#olist_input_model").on("change keyup paste", () => {
//         console.log("o_model",this.list.o_model);
//         this.io_unit_check("out",1);
//       })
//       $("#olist_input_serial").on("change keyup paste", () => {
//         console.log("o_serial",this.list.o_serial);
//         this.io_unit_check("out",2);
//       })

//       $("#ilist_input_model").on("change keyup paste", () => {
//         console.log("i_model",this.list.i_model);
//         this.io_unit_check("in",1);
//       })
//       $("#ilist_input_serial").on("change keyup paste", () => {
//         console.log("i_serial",this.list.i_serial);
//         this.io_unit_check("in",2);
//       })
//     // }, 500);
//   }

//   io_unit_start(){
//     this.firemain.child('customer').child(this.list.customer).once('value').then((snap)=>{
//       this.out_unit_list=[];
//       this.in_unit_list=[];
//       for(var i in snap.val().ho_product){
//         this.out_unit_list.push(snap.val().ho_product[i]);
//       }
//       for(var i in snap.val().hi_product){
//         this.in_unit_list.push(snap.val().hi_product[i]);
//       }

//       $("#out_unit_model").empty();
//       $("#out_unit_serial").empty();
//       $("#out_unit_time").empty();

//       // this.i_model="";
//       // this.i_serial="";
//       // this.i_time="";
//       $("#in_unit_model").empty();
//       $("#in_unit_serial").empty();
//       $("#in_unit_time").empty();

//       // setTimeout(() => {
//         console.log(this.out_unit_list);
//         var o_models=[];
//         for(var i in this.out_unit_list){
//           o_models.push(this.out_unit_list[i].o_model);
//         }
//         o_models = Array.from(new Set(o_models));
//         console.log(o_models);
//         for(var i in o_models){
//           var newOptionElement = document.createElement("option");
//           newOptionElement.value = o_models[i];
//           document.getElementById("out_unit_model").appendChild(newOptionElement);
//         }
//         this.io_unit_check("out",1);

//         console.log(this.in_unit_list);
//         var i_models=[];
//         for(var i in this.in_unit_list){
//           i_models.push(this.in_unit_list[i].i_model);
//         }
//         i_models = Array.from(new Set(i_models));
//         console.log(i_models);
//         for(var i in i_models){
//           var newOptionElement = document.createElement("option");
//           newOptionElement.value = i_models[i];
//           document.getElementById("in_unit_model").appendChild(newOptionElement);
//         }
//         this.io_unit_check("in",1);
//         this.flag6_iounit_input();
//       // }, 500);
//     })
//   }
// }
