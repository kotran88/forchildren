// import { Component,NgZone } from '@angular/core';
// import { NavController, ViewController,NavParams,LoadingController, ModalController } from 'ionic-angular';
// import * as $ from 'jquery';
// import firebase from 'firebase';
// import { CompletePage } from '../complete/complete';
// import { OnoffutilProvider } from '../../providers/onoffutil/onoffutil';
// import { GongjiPage } from '../gongji/gongji';
// import { once } from 'process';
// import { snapshotChanges } from 'angularfire2/database';
// import { ViewdatapagePage } from '../viewdatapage/viewdatapage';
// import { LoginPage } from '../login/login';
// import { setInterval } from 'timers';
// import { FCM } from '@ionic-native/fcm/ngx';
// import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
// import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
// import { callbackify } from 'util';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { Login2Page } from '../login2/login2';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {
//   firemain = firebase.database().ref();

//   all_receipt_list=[];
//   today = new Date();
//   date = new Date();
//   flag = 1;

//   errorlist=[];
//   symptomlist=[];
//   current_boru_count = 0;
//   agency_name = "";


//   engineer_id = "";           // 현재 로그인 한 사람의 아이디
//   engineer_name = "";         // 현재 로그인 한 사람의 이름
//   engineer_position = "";     // 현재 로그인 한 사람의 직급
//   engineer_authority = "";    // 현재 로그인 한 사람의 권한

//   agency_code = "";
//   mytoken:any="";
//   sameagencytokenarray=[];
//   as_data = [];//전체내역
//   as_receipt_data = [];//접수내역
//   as_request_data = [];//요청내역
//   as_complete_data = [];//완료내역
//   as_hold_data = [];//보류내역
//   as_waiting_data = [];//보류내역

//   mypage_as_receipt_data = [];//접수내역
//   mypage_as_request_data = [];//요청내역
//   mypage_as_complete_data = [];//완료내역
//   mypage_as_hold_data = [];//보류내역
//   mypage_as_waiting_data = [];//보류내역

//   new_date = new Date();
//   remain_time = "";
//   today_Date = "";
//   max_Date = "";
//   daysInThisMonth: any;
//   daysInLastMonth: any;
//   daysInNextMonth: any;
//   monthNames: string[];
//   currentMonth: any;
//   currentYear: any;
//   currentDate: any;
//   currentHour: any;
//   currentMinute: any;
//   currentSecond: any;
//   currentMillisecond: any;
//   schedule_title: any;
//   schedule_list=[];

//   current_recipt = [];
//   current_recipt_count = 0;
//   current_request_count = 0;
//   current_progress_count = 0;
//   current_complete_count = 0;
//   current_waiting_count = 0;

//   flag2_arr = [];
//   flag2_receipt_num = "";
//   flag2_name = "";
//   flag2_phone="";
//   flag2_remote: any;
//   flag2_status: any;
//   flag2_error = "";
//   flag2_symptom = "";
//   flag2_contents = "";
//   flag2_division: any;
//   flag2_date: any = "";
//   flag2_time: any = "";
//   flag2_view_list = [];

//   flag3_sort_ch='접수시간내림';

//   noarray = [];
//   flag6_name = "";
//   flag6_no = "";
//   flag6_building_manager_name = "";
//   flag6_building_manager_call = "";
//   flag6_representative_call = "";
//   flag6_customer_building = "";
//   flag6_sub_store = "";
//   flag6_building_call = "";
//   flag6_address = "";
//   flag6_product = "";
//   flag6_model = "";
//   flag6_guarantee: any;
//   flag6_repairlist=[];
//   flag6_customer_type="일반";
//   flag6_customer="";
//   flag6_c_remote_division="";
//   flag6_status="";
//   flag6_model_array=[];

//   flag6_product_totallist=[];
//   flag6_modellist=[];

//   flag6_productlist=[];

//   flag7_searchlist = [];
//   flag7_searchtext = '';
//   flag7_search_ch='';

//   flagflag=false;

//   searching_flag=false;
//   lloading:any;
//   flag4_info = [];
//   gongji_count=0;

//   newflag_receipt=[];
//   newflag_progress=[];
//   newflag_complete=[];
//   newflag_gongji=[];
//   newflag_stand=[];
//   newflag_hold=[];
//   gongji_list=[];
//   newflag_list=[false,false,false,false,false,false];

//   add_new_customer_flag=false;

//   newflag_get_flag=false;

//   outdoor_list = [];
//   indoor_list = [];
//   pc_automatic = [];

//   profilepicture="";

//   out_unit_list=[];
//   in_unit_list=[];

//   o_model='';
//   o_serial='';
//   o_time='';

//   i_model='';
//   i_serial='';
//   i_time='';

//   io_etc='';


//   data_check(key,callback){
//     if(!localStorage.getItem(key)){
//       setTimeout(() => {
//         this.data_check(key,(list)=>{
//           callback(list);
//         })
//       }, 1000);
//     }
//     else{
//       var data=JSON.parse(localStorage.getItem(key));
//       console.log(data);
//       var list=[];
//       for(var i in data){
//         list.push(data[i]);
//       }
//       console.log(list);
//       callback(list);
//     }
//   }

//   constructor(public photoViewer:PhotoViewer,public firebaseAuth: AngularFireAuth,
//     public fb:FCM,public zone:NgZone,public modal:ModalController,
//     public view:ViewController,public loading:LoadingController,
//     public navCtrl: NavController, public navParams: NavParams, public util: OnoffutilProvider) {
//     this.flag = 1;
//     localStorage.setItem('local_page','home');
//     var output = "";

//     // this.asdasdasd()
//     // this.qweqweqwe();
//     // flag6_modellist
//     // this.firemain.child("product").once("value", (snap) => {
//     this.data_check("product",(list)=>{
//       for(let i in list) {
//         this.flag6_productlist.push(list[i].product);
//         this.flag6_modellist.push(list[i].model);
//         this.flag6_productlist = Array.from(new Set(this.flag6_productlist));
//       }
//     });


//     // this.firemain.child("pc_automatic").once("value", (snap) => {
//     this.data_check("pc_automatic",(list)=>{
//       for(let i in list) {
//         this.pc_automatic.push(list[i].auto_code);
//       }
//     });
//     // this.firemain.child("outdoor_unit").once("value", (snap) => {
//     this.data_check("outdoor_unit",(list)=>{
//       for(let i in list) {
//         this.outdoor_list.push(list[i].outdoor_code);
//       }
//     });
//     // this.firemain.child("indoor_unit").once("value", (snap) => {
//     this.data_check("indoor_unit",(list)=>{
//       for(let i in list) {
//         this.indoor_list.push(list[i].indoor_code);
//       }
//     });

//     // get profilepicture
//     this.firemain.child("engineer").child(localStorage.getItem("id").split("@")[0]).child("profilepicture").once("value", (snap) => {
//       this.profilepicture = snap.val();
//     })

//     // Remember when we started
//     var start = new Date().getTime();
//     for (var i = 1; i <= 1e6; i++) {
//       output += i;
//     }
//     this.lloading = this.loading.create({
//       spinner: 'hide',
//       content: '데이터 불러오는 중..'
//     });
//     this.lloading.present();
//     this.today_Date = this.new_date.getFullYear() + '-' + (this.new_date.getMonth() + 1) + '-' + this.new_date.getDate();
//     this.max_Date = (this.new_date.getFullYear() + 5) + '-' + (this.new_date.getMonth() + 1) + '-' + this.new_date.getDate();
//     this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//     localStorage.setItem('once_login','false')
//     this.engineer_id = this.navParams.get("id");

//     setTimeout(()=>{
//       ///console.log(this.fb);
//       ///console.log("gaaaaaaaaggg")
//       this.fb.getToken().then(token => {
//         this.mytoken=token;

//         this.firemain.child('engineer').child(this.engineer_id.split('@')[0]).update({"token":token})

//       }).catch((e)=>{
//         window.alert(e);
//       })

//       this.fb.onNotification().subscribe(data => {
//         if(data.wasTapped){
//           if(String(data.flag)=="접수완료"){
//             this.go_viewdatapage("현재접수",this.as_receipt_data)
//           }else{
//             this.go_viewdatapage("처리진행",this.as_request_data)
//           }
//           ///console.log("Received in background");

//         } else {

//           if(String(data.flag)=="접수완료"){
//             this.go_viewdatapage("현재접수",this.as_receipt_data)
//           }else{
//             this.go_viewdatapage("처리진행",this.as_request_data)
//           }
//           ///console.log("Received in foreground");
//         };
//       });
//       this.fb.onTokenRefresh().subscribe(token => {
//         this.mytoken=token;
//         this.firemain.child('engineer').child(this.engineer_id.split('@')[0]).update({"token":token})
//       });

//     },3000)

//     // this.engineer_id = "test2@gmail.com";
//     var current_recipt_arr = [];
//     var current_progress_arr = [];
//     var current_complete_arr = [];
//     var current_waiting_arr = [];
//     var current_defer_arr = [];

//     this.get_newflag_localdata();

//     // this.firemain.child('error').once('value').then((snap)=>{
//     this.data_check("error",(list)=>{
//       for(var i in list){
//         this.zone.run(()=>{
//           this.errorlist.push(list[i]);
//         });
//       }
//       console.log(this.errorlist)
//       this.flag2_error=this.errorlist[0].code;
//     });

//     // this.firemain.child('symptom').once('value').then((snap)=>{
//     this.data_check("symptom",(list)=>{
//       ///console.log(snap.val())
//       for(var i in list){
//         // ///console.log(snap.val()[i]);
//         this.zone.run(()=>{
//           this.symptomlist.push(list[i]);
//         });
//       }
//       this.flag2_symptom=this.symptomlist[0].symptom_code;
//     });

//     // this.firemain.child('product').once('value').then((snap)=>{
//     this.data_check("product",(list)=>{
//       ///console.log(snap.val())
//       for(var i in list){
//         this.zone.run(()=>{
//           this.flag6_product_totallist.push(list[i])
//         });
//       }
//     })

//     // this.firemain.child('gongji').on('value',(snap)=>{
//     this.data_check("gongji",(list)=>{
//       if(list){
//         this.zone.run(()=>{
//           this.gongji_count=list.length;
//           ///console.log('gongji_count');
//           ///console.log(this.gongji_count);
//           this.gongji_list=[];
//           for(var i in list)
//             this.gongji_list.push(list[i]);
//         });
//       }
//     })

//     this.firemain.child('engineer').on("value", (snap)=>{
//       for(var i in snap.val())
//       {
//         if(snap.val()[i].id == this.engineer_id)
//         {
//           this.zone.run(()=>{
//             this.agency_name = snap.val()[i].agency;
//             this.engineer_name = snap.val()[i].name;
//             this.engineer_position = snap.val()[i].position;
//             this.engineer_authority = snap.val()[i].authority;
//             localStorage.setItem("engineer_position",this.engineer_position);
//           });
//           break;
//         }
//       }
//       if(this.agency_name=='' && this.engineer_position!="수퍼관리자"){
//         alert('사용자가 해당되는 대리점이 없습니다...')
//         this.navCtrl.setRoot(Login2Page);
//       }

//       this.flag4_info=[];
//       this.all_receipt_list=[];
//       this.as_complete_data=[];
//       this.as_hold_data=[];
//       this.as_request_data=[];
//       this.as_waiting_data=[];
//       this.as_receipt_data=[];
//       this.current_recipt_count=0;
//       this.current_progress_count=0;
//       this.current_request_count=0;
//       this.current_boru_count=0;
//       this.current_waiting_count=0;

//       this.mypage_as_receipt_data = [];
//       this.mypage_as_complete_data = [];
//       this.mypage_as_hold_data = [];
//       this.mypage_as_request_data = [];
//       this.mypage_as_waiting_data = [];

//       this.firemain.child("agency").child(this.agency_name).once("value")
//       .then((snap)=>{
//         for(var i in snap.val().currentReceipt){
//           // if(snap.val().currentReceipt[i].engineerinformationprocessing_position
//           //   == list[engineer].id.split('@')[0]){
//           //   list[engineer].currentReceipt[j].progress_engineer_position=list[engineer].position;
//           //   // alert(list[engineer].currentReceipt[j].progress_engineer_position);
//           //   // break;
//           // }

//           var receipt = snap.val().currentReceipt[i];
//           for(var l in receipt)
//           {
//             if(receipt[l].error_code==""||
//             !receipt[l].error_code)
//               receipt[l].error_code="empty_code"

//             if(receipt[l].receipt_content==""||
//             !receipt[l].receipt_content)
//               receipt[l].receipt_content="empty_text"



//             var data=receipt[l];
//             // data.engineer_id=list[engineer].id;
//             if(receipt[l].status == "접수"||
//               receipt[l].status == "처리진행"||
//               receipt[l].status == "승인완료"||
//               receipt[l].status == "승인보류"||
//               receipt[l].status == "처리대기") {
//               this.all_receipt_list.push(data)
//             }

//             // if(receipt[l].status=="처리진행"
//             // && list[engineer].schedule
//             // && list[engineer].schedule[l]){
//             //   var flag=false;
//             //   for(var i in this.flag4_info){
//             //     if(this.flag4_info[i].receipt_number==l)
//             //     {
//             //       flag=true;
//             //       break;
//             //     }
//             //   }
//             //   if(flag==false){
//             //     var dataa={
//             //       date:list[engineer].schedule[l].date,
//             //       place:list[engineer].schedule[l].place,
//             //       receipt_date:l.substring(0,4)+'-'+l.substring(4,6)+'-'+l.substring(6,8),
//             //       engineer_name:list[engineer].name,
//             //       engineer_id:list[engineer].id,
//             //       receipt_number:l,
//             //       receipt_data:receipt[l],
//             //     };
//             //     this.flag4_info.push(dataa);
//             //   }
//             // }
//             if(receipt[l].engineer == "") {
//               receipt[l].progress_engineer_position = "";
//             }

//             if(receipt[l].status == "접수") {
//               this.as_receipt_data.push(data);
//               this.current_recipt_count++;
//               if(this.engineer_authority=="관리자"||this.engineer_authority=="대리점대표"||
//               receipt[l].engineer==this.engineer_name){
//                 this.mypage_as_receipt_data.push(data);
//               }
//             }
//             else if(receipt[l].status=="처리진행"){
//               this.as_request_data.push(data);

//               this.current_progress_count++;
//               if(this.engineer_authority=="관리자"||this.engineer_authority=="대리점대표"||
//               receipt[l].engineer==this.engineer_name){
//                 this.mypage_as_request_data.push(data);
//               }
//             }
//             else if(receipt[l].status=="처리완료"){
//               this.as_complete_data.push(data);

//               this.current_request_count++;
//               console.log(this.engineer_authority);
//               console.log(receipt[l].engineer);
//               console.log(this.engineer_name);
//               if(this.engineer_authority=="관리자"||this.engineer_authority=="대리점대표"||
//               receipt[l].engineer==this.engineer_name){
//                 this.mypage_as_complete_data.push(data);
//               }
//             }
//             else if(receipt[l].status=="처리대기"){
//               this.as_waiting_data.push(data);

//               this.current_waiting_count++;
//               if(this.engineer_authority=="관리자"||this.engineer_authority=="대리점대표"||
//               receipt[l].engineer==this.engineer_name){
//                 this.mypage_as_waiting_data.push(data);
//               }
//             }
//             else if(receipt[l].status=="승인보류"){
//               this.as_hold_data.push(data);

//               this.current_boru_count++;
//               if(this.engineer_authority=="관리자"||this.engineer_authority=="대리점대표"||
//               receipt[l].engineer==this.engineer_name){
//                 this.mypage_as_hold_data.push(data);
//               }
//             }
//           }
//         }
//       })
//       console.log(this.agency_name)
//       if(this.engineer_position!="수퍼관리자"){
//         this.firemain.child("agency").child(this.agency_name).once("value", (sn) => {
//           if(sn.val()&&sn.val().code){
//             this.agency_code = sn.val().code;
//           }
//           else this.agency_code='';
//         })
//       }

//       if(this.lloading!=undefined){
//         this.lloading.dismiss();
//       }

//       this.flag3_sorting();
//       localStorage.setItem("agency", this.agency_name); // 로그인 한 사람의 소속 대리점
//       var end = new Date().getTime();
//     })
//   }

//   add_new_customer_flag_change(){
//     this.add_new_customer_flag=!this.add_new_customer_flag;
//   }

//   new_check(mode,list){
//     if(!this.newflag_get_flag) return;

//     console.log(list);
//     this.newflag_list[mode-1]=false;
//     var list2=[];
//     if(mode==1) list2=this.newflag_receipt;
//     else if(mode==2) list2=this.newflag_progress;
//     else if(mode==3) list2=this.newflag_complete;
//     else if(mode==4) list2=this.newflag_gongji;
//     else if(mode==5) list2=this.newflag_stand;
//     else if(mode==6) list2=this.newflag_hold;
//     for(var i in list){
//       if(list[i]&&list2[i]){
//         if(mode==4&&list[i].key!=list2[i].key){
//           this.newflag_list[mode-1]=true;
//           break;
//         }
//         else if(mode!=4&&list[i].receipt_number!=list2[i].receipt_number){
//           this.newflag_list[mode-1]=true;
//           break;
//         }
//       }
//       else{
//         this.newflag_list[mode-1]=true;
//         break;
//       }
//     }
//     // if(this.newflag_list[mode-1]==false){
//     //   for(var i in list2){
//     //     if(list[i]&&list2[i]){
//     //       if(mode==4&&list[i].key!=list2[i].key){
//     //         this.newflag_list[mode-1]=true;
//     //         break;
//     //       }
//     //       else if(mode!=4&&list[i].receipt_number!=list2[i].receipt_number){
//     //         this.newflag_list[mode-1]=true;
//     //         break;
//     //       }
//     //     }
//     //     else{
//     //       this.newflag_list[mode-1]=true;
//     //       break;
//     //     }
//     //   }
//     // }
//   }

//   get_newflag_localdata(){
//     this.firemain.child('agency').child(this.engineer_id.split('@')[0]).child('new_flag')
//     .once('value',(snap)=>{
//       if(snap.val()){
//         if(snap.val().newflag_receipt){
//           // alert('1');
//           this.newflag_receipt=[];
//           for(var i in snap.val().newflag_receipt){
//             this.newflag_receipt.push(snap.val().newflag_receipt[i]);
//           }
//           ///console.log(this.newflag_receipt);
//           this.new_check(1,this.as_receipt_data);
//         }
//         if(snap.val().newflag_progress){
//           // alert('2');
//           this.newflag_progress=[];
//           for(var i in snap.val().newflag_progress){
//             this.newflag_progress.push(snap.val().newflag_progress[i]);
//           }
//           ///console.log(this.newflag_progress)
//           this.new_check(2,this.as_request_data);
//         }
//         if(snap.val().newflag_complete){
//           // alert('3');
//           this.newflag_complete=[];
//           for(var i in snap.val().newflag_complete){
//             this.newflag_complete.push(snap.val().newflag_complete[i]);
//           }
//           ///console.log(this.newflag_complete)
//           this.new_check(3,this.as_complete_data);
//         }
//         if(snap.val().newflag_gongji){
//           // alert('4');
//           this.newflag_gongji=[];
//           for(var i in snap.val().newflag_gongji){
//             this.newflag_gongji.push(snap.val().newflag_gongji[i]);
//           }
//           ///console.log(this.newflag_gongji)
//           this.new_check(4,this.gongji_list);
//         }
//         if(snap.val().newflag_stand){
//           // alert('5');
//           this.newflag_stand=[];
//           for(var i in snap.val().newflag_stand){
//             this.newflag_stand.push(snap.val().newflag_stand[i]);
//           }
//           ///console.log(this.newflag_stand)
//           this.new_check(5,this.as_waiting_data);
//         }
//         if(snap.val().newflag_hold){
//           // alert('6');
//           this.newflag_hold=[];
//           for(var i in snap.val().newflag_hold){
//             this.newflag_hold.push(snap.val().newflag_hold[i]);
//           }
//           ///console.log(this.newflag_hold)
//           this.new_check(6,this.as_hold_data);
//         }
//       }
//     })
//   }

//   foot_icon_switching(num) {
//     if (num == 1) {
//       this.flag = 1;
//       localStorage.setItem('local_page','home');
//       $('#switching1').css("color", "#e96a15");
//       $('#switching2, #switching3, #switching4, #switching5').css("color", "#6e6e6e");
//     }
//     if (num == 2) {
//       if(this.engineer_position=="수퍼관리자"){
//         alert("수퍼관리자는 접수할수 없습니다.")
//         return;
//       }
//       this.flagflag=false;
//       //0408 JPD 앱 실행후 바로 접수 들어갈경우 날짜 값 가져오지 못해서 에러나기에 추가.
//       this.currentMonth = this.date.getMonth() + 1;
//       this.currentYear = this.date.getFullYear();
//       this.currentHour = this.date.getHours();
//       this.currentMinute = this.date.getMinutes();
//       this.currentSecond = this.date.getSeconds();
//       this.currentMillisecond = this.date.getMilliseconds();
//       if (this.date.getMonth() === new Date().getMonth()) {
//         this.currentDate = new Date().getDate();
//       } else {
//         this.currentDate = 999;
//       }
//       this.flag = 2;
//       localStorage.setItem('local_page','jubsu');
//       $('#switching2').css("color", "#e96a15");
//       $('#switching1, #switching3, #switching4, #switching5').css("color", "#6e6e6e");
//       this.flag2_receipt_num =
//       this.str_format(this.currentYear,4) + '' +
//       this.str_format(this.currentMonth,2) + '' +
//       this.str_format(this.currentDate,2) + '' +
//       this.str_format(this.currentHour,2) + '' +
//       this.str_format(this.currentMinute,2) + '' +
//       this.str_format(this.currentSecond,2) + '' +
//       this.str_format(this.currentMillisecond,3) + '' +
//       this.agency_code;
//       ///console.log(this.flag2_receipt_num);
//     }
//     if (num == 3) {
//       this.flag = 3;
//       localStorage.setItem('local_page','aschuri');
//       $('#switching3').css("color", "#e96a15");
//       $('#switching1, #switching2, #switching4, #switching5').css("color", "#6e6e6e");
//     }
//     if (num == 4) {
//       this.flag = 4;
//       localStorage.setItem('local_page','schedule');
//       $('#switching4').css("color", "#e96a15");
//       $('#switching1, #switching2, #switching3, #switching5').css("color", "#6e6e6e");
//       this.getDaysOfMonth();
//     }
//     if (num == 5) {
//       this.flag = 5;
//       console.log(this.mypage_as_receipt_data);
//       console.log(this.mypage_as_request_data);
//       console.log(this.mypage_as_complete_data);
//       console.log(this.mypage_as_hold_data);
//       console.log(this.mypage_as_waiting_data);

//       this.as_request_data.sort(function(a,b){
//         if(a.receipt_number.substring(0,17)<b.receipt_number.substring(0,17))return 1;
//         else if(a.receipt_number.substring(0,17)>b.receipt_number.substring(0,17))return -1;
//         else return 0;
//       })
//       console.log(this.as_request_data)
//       // this.as_request_data;
//       // this.as_complete_data
//       // this.as_hold_data

//       localStorage.setItem('local_page','mypage');
//       $('#switching5').css("color", "#e96a15");
//       $('#switching1, #switching2, #switching3, #switching4').css("color", "#6e6e6e");
//     }
//   }

//   flag3_sorting(){
//     ///console.log("flag3_sorting");
//     var ch=$("#flag3-condition").val();
//     ///console.log(ch);

//     if(!ch||ch=='접수시간내림'){
//       this.all_receipt_list.sort((a,b)=>{
//         if(a.receipt_number<b.receipt_number){return 1;}
//         else if(a.receipt_number>b.receipt_number){return -1;}
//         else return 0;
//       })
//     }
//     else{
//       this.all_receipt_list.sort((a,b)=>{
//         if(a.receipt_number>b.receipt_number){return 1;}
//         else if(a.receipt_number<b.receipt_number){return -1;}
//         else return 0;
//       })
//     }
//   }

//   get_fixlist(text){
//     console.log(text);
//     this.flag6_repairlist=[];
//     // this.firemain.child('engineer').once('value').then((snap)=>{
//     this.data_check("agency",(list)=>{
//       for(var i in list){
//         if(list[i].currentReceipt){
//           for(var j in list[i].currentReceipt){
//             // console.log(snap.val()[i].currentReceipt[j].building_manager_name);
//             // console.log(snap.val()[i].currentReceipt[j].customer);
//             // console.log(snap.val()[i].currentReceipt[j].customer_building);
//             if(String(list[i].currentReceipt[j].building_manager_name).indexOf(text.building_manager_name)>-1){//건물담당자
//               this.flag6_repairlist.push(list[i].currentReceipt[j])
//             }
//             else if(String(list[i].currentReceipt[j].customer).indexOf(text.customer)>-1){//대표상호
//               this.flag6_repairlist.push(list[i].currentReceipt[j])
//             }
//             else if(String(list[i].currentReceipt[j].customer_building).indexOf(text.customer_building)>-1){//건물명
//               this.flag6_repairlist.push(list[i].currentReceipt[j])
//             }
//           }
//         }
//       }
//       ///console.log(this.flag6_repairlist);
//     })
//   }

//   ionViewWillEnter() {
//     this.date = new Date();
//   }
//   ionViewDidLoad() {
//     // this.add_outunit();
//     // this.add_inunit();
//     ///console.log('ionViewDidLoad HomePage')
//     // $("#f7_search_input").on("change keyup paste", () => {
//     //   var val = $(this).val();
//     //   console.log(val);
//     //   if (val != "") { $("#f7_search_result").hide(); }
//     //   else { $("#f7_search_result").show(); }
//     //   var searching = $("#f7_search_result:contains('" + val + "')");
//     //   $(searching).parent().show();
//     // })
//     window.addEventListener('keyboardWillShow', (e) => {
//       ///console.log('keyboard show!!!')
//       $(".main-footer").hide();
//     });
//     window.addEventListener('keyboardWillHide', () => {
//       ///console.log('keyboard hide!!!')
//       $(".main-footer").show();
//     });

//     console.log($('input[name="remote"]').val());
//   }
//   look_up(text) {
//     // ///console.log(text);
//     // if (text != "") { $(".f7_result").hide(); }
//     // else { $(".f7_result").show(); }
//     // var searching = $(".f7_result:contains('" + text + "')");
//     // $(searching).show();

//     var ch="";

//     if(this.flag7_search_ch=="building_manager_name"){
//       ch="building_manager_name";//건물담당자
//     }
//     else if(this.flag7_search_ch=="customer"){
//       ch="customer";//대표상호
//     }
//     else if(this.flag7_search_ch=="customer_building"){
//       ch="customer_building"//건물명
//     }
//     else if(this.flag7_search_ch=="building_manager_call"){
//       ch="building_manager_call";//휴대전화
//     }

//     this.lloading= this.loading.create({
//       content: '고객 데이터 조회중'
//     });
//     this.lloading.present();
//     this.flag7_searchlist=[];
//     var flag=true;
//     firebase.database().ref("customer").orderByChild("no").on('child_added', (sn) => {
//       // ///console.log(sn.val());
//       flag=false;
//       if(sn.val().no!=undefined){
//         if(!(sn.val().customer||sn.val().customer_building||sn.val().building_manager_name||sn.val().building_manager_call
//         ||sn.val().representative_call||sn.val().remote_division||sn.val().customer_type)){

//         }
//         else if(String(sn.val()[ch]).indexOf(text)>-1)
//         {
//           this.flag7_searchlist.push(sn.val());
//         }
//       }
//     })
//     var interval=setInterval(()=>{
//       if(flag==true){
//         localStorage.setItem('local_page','search');
//         if(this.lloading!=undefined){
//           this.lloading.dismiss();
//         }
//         clearInterval(interval);
//       }
//       else{
//         flag=true;
//       }
//     },1000)
//   }

//   io_unit_check(ch,num){
//     if(ch=="out"){//실외기
//       if(num==1){//모델
//         // this.o_serial="";
//         // this.o_time="";
//         $("#out_unit_serial").empty();
//         $("#out_unit_time").empty();
//         for(var i in this.out_unit_list){
//           if(this.out_unit_list[i].o_model==this.o_model
//           &&this.out_unit_list[i].o_serial){
//             var newOptionElement = document.createElement("option");
//             newOptionElement.value = this.out_unit_list[i].o_serial;
//             newOptionElement.text = this.out_unit_list[i].o_serial;
//             document.getElementById("out_unit_serial").appendChild(newOptionElement);
//           }
//         }
//       }
//       else if(num==2){//제조번호
//         // this.o_time="";
//         $("#out_unit_time").empty();
//         for(var i in this.out_unit_list){
//           if(this.out_unit_list[i].o_model==this.o_model
//           &&this.out_unit_list[i].o_serial==this.o_serial){
//             this.o_time=this.out_unit_list[i].o_time;
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
//           if(this.in_unit_list[i].i_model==this.i_model
//           &&this.in_unit_list[i].i_serial){
//             var newOptionElement = document.createElement("option");
//             newOptionElement.value = this.in_unit_list[i].i_serial;
//             newOptionElement.text = this.in_unit_list[i].i_serial;
//             document.getElementById("in_unit_serial").appendChild(newOptionElement);
//           }
//         }
//       }
//       else if(num==2){//제조번호
//         // this.i_time="";
//         $("#in_unit_time").empty();
//         for(var i in this.in_unit_list){
//           if(this.in_unit_list[i].i_model==this.i_model
//           &&this.in_unit_list[i].i_serial==this.i_serial){
//             this.i_time=this.in_unit_list[i].i_time;
//             break;
//           }
//         }
//       }
//       else if(num==3){//운전시간

//       }
//     }
//   }

//   flag6_iounit_input(){
//     setTimeout(() => {
//       $("#olist_input_model").on("change keyup paste", () => {
//         console.log(this.o_model);
//         this.io_unit_check("out",1);
//       })
//       $("#olist_input_serial").on("change keyup paste", () => {
//         console.log(this.o_serial);
//         this.io_unit_check("out",2);
//       })

//       $("#ilist_input_model").on("change keyup paste", () => {
//         console.log(this.i_model);
//         this.io_unit_check("in",1);
//       })
//       $("#ilist_input_serial").on("change keyup paste", () => {
//         console.log(this.i_serial);
//         this.io_unit_check("in",2);
//       })
//     }, 500);
//   }

//   //여기서 실외기,실내기,기타에 값넣어주기
//   flag7_resultget(data){
//     this.flag = 6;
//     console.log(data);
//     localStorage.setItem('local_page','customer_get');
//     ///console.log(data);

//     this.flag6_no=data.no;//고객번호
//     this.flag6_building_manager_name=data.building_manager_name;//건물담당자
//     this.flag6_representative_call=data.building_manager_call	;//휴대전화
//     this.flag6_customer_building=data.customer_building;//대표상호
//     this.flag6_sub_store=data.sub_store;//건물명
//     this.flag6_building_call=data.building_call;
//     this.flag6_address=data.reg_address;
//     this.flag6_customer_type=data.customer_type;
//     this.flag6_customer=data.customer;

//     // o_model,
//     // o_serial,
//     // o_time

//     this.out_unit_list=[];
//     this.in_unit_list=[];
//     for(var i in data.ho_product){
//       this.out_unit_list.push(data.ho_product[i]);
//     }
//     for(var i in data.hi_product){
//       this.in_unit_list.push(data.hi_product[i]);
//     }

//     // this.o_model="";
//     // this.o_serial="";
//     // this.o_time="";
//     $("#out_unit_model").empty();
//     $("#out_unit_serial").empty();
//     $("#out_unit_time").empty();

//     // this.i_model="";
//     // this.i_serial="";
//     // this.i_time="";
//     $("#in_unit_model").empty();
//     $("#in_unit_serial").empty();
//     $("#in_unit_time").empty();

//     setTimeout(() => {
//       console.log(this.out_unit_list);
//       var o_models=[];
//       for(var i in this.out_unit_list){
//         if(this.o_model=="") this.o_model=this.out_unit_list[i].o_model;
//         o_models.push(this.out_unit_list[i].o_model);
//       }
//       o_models = Array.from(new Set(o_models));
//       console.log(o_models);
//       for(var i in o_models){
//         var newOptionElement = document.createElement("option");
//         newOptionElement.value = o_models[i];
//         newOptionElement.text = o_models[i];
//         document.getElementById("out_unit_model").appendChild(newOptionElement);
//       }
//       this.io_unit_check("out",1);

//       console.log(this.in_unit_list);
//       var i_models=[];
//       for(var i in this.in_unit_list){
//         if(this.i_model=="") this.i_model=this.in_unit_list[i].i_model;
//         i_models.push(this.in_unit_list[i].i_model);
//       }
//       i_models = Array.from(new Set(i_models));
//       console.log(i_models);
//       for(var i in i_models){
//         var newOptionElement = document.createElement("option");
//         newOptionElement.value = i_models[i];
//         newOptionElement.text = i_models[i];
//         document.getElementById("in_unit_model").appendChild(newOptionElement);
//       }
//       this.io_unit_check("in",1);
//       this.flag6_iounit_input();
//     }, 500);

//     if(data.c_remote_division=="유"){
//       this.flag6_c_remote_division="유";
//     }
//     else{
//       this.flag6_c_remote_division="무";
//     }

//     this.get_fixlist(data);


//     // if(this.flag7_search_ch=="building_manager_name"){

//     // }
//     // else if(this.flag7_search_ch=="customer"){

//     // }
//     // else if(this.flag7_search_ch=="flag6_sub_store"){

//     // }

//     // if (this.flag7_search_ch === "customer"){
//     //   ///console.log(this.flag7_search_ch)
//     //   this.flag6_name=data.name;
//     //   this.flag6_address=data.address;
//     //   this.flag6_customer_building=data.name;

//     //   this.flag6_modellist=[];
//     //   this.flag6_productlist=[];
//     //   this.flag6_product_totallist=[];
//     //   for(var i in data.product){
//     //     ///console.log(data);
//     //     this.flag6_productlist.push(data.product[i].serial)
//     //     this.flag6_product_totallist.push(data.product[i])
//     //   }
//     //   this.flag6_product=this.flag6_productlist[0];
//     //   this.flag6_modelchange();
//     //   this.flag6_model=this.flag6_modellist[0];
//     //   ///console.log(this.flag6_modellist)
//     //   ///console.log(this.flag6_productlist)
//     //   ///console.log(this.flag6_product_totallist)
//     //   ///console.log(this.flag6_model)
//     //   ///console.log(this.flag6_product)

//     //   // flag6_repairlist
//     // }
//   }
//   search_cancel(){
//     this.flag = 6;
//     localStorage.setItem('local_page','customer_get');
//   }

//   flag6_modelchange(){
//     this.flag6_modellist=[];
//     for(var i in this.flag6_product_totallist){
//       if(this.flag6_product_totallist[i].serial==this.flag6_product){
//         this.flag6_modellist.push(this.flag6_product_totallist[i].model);
//       }
//     }
//   }
//   // selectChange(a){
//   //   ///console.log("////"+a);
//   //   this.flag2_error=a;
//   // }

//   flag6_searching(key,text) {

//     this.flag7_search_ch=key;
//     this.flag7_searchtext=text;
//     this.flag=7;

//     setTimeout(() => {
//       $("#f7_search_input").on("change keyup paste", () => {
//         console.log(this.flag7_searchtext);
//       })
//     }, 1000);
//     console.log(key);   // building_manager_name
//     console.log(text);  // 사용자가 검색한 텍스트  ex) 건물담당자1060
//     this.look_up(text);

//   }

//   flag2_add() {
//     this.flag6_representative_call = String($("#as-add-manager_phone").val());

//     this.flag = 6;
//     this.firemain.child('customer_no').once('value', (snap) => {
//       this.flag6_no=snap.val();
//     });
//     //자동으로 들어가면 안된다고 해서 주석처리 0409 JPD
//     // this.flag6_building_manager_name=this.engineer_name;
//     localStorage.setItem('local_page','customer_get');

//     // this.o_model="";
//     // this.o_serial="";
//     // this.o_time="";
//     $("#out_unit_model").empty();
//     $("#out_unit_serial").empty();
//     $("#out_unit_time").empty();

//     // this.i_model="";
//     // this.i_serial="";
//     // this.i_time="";
//     $("#in_unit_model").empty();
//     $("#in_unit_serial").empty();
//     $("#in_unit_time").empty();

//     this.flag6_iounit_input();
//   }

//   flag2_view() {
//     ///console.log(this.flag6_name);
//     ///console.log(this.flag6_model);
//     if (this.flag6_name == "") { window.alert("업체명을 입력하세요.") }
//     else {
//       //완료코드 생기면
//       // this.firemain.child("customer")
//     }
//   }

//   go_detail(list){
//     this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": list.receipt_number , "name": this.engineer_name});
//   }

//   newflag_update(name,list){
//     console.log(name);
//     for(var i in list){
//       for(var j in list[i]){
//         if(list[i][j]==undefined){
//           list[i][j]="";
//         }
//       }
//     }
//     console.log(list);
//     this.firemain.child('agency').child(this.engineer_id.split('@')[0]).child("new_flag")
//     .update({[name]:list})
//   }

//   go_viewdatapage(title,data){
//     this.lloading = this.loading.create({
//       spinner: 'hide',
//       content: '이동중..'
//     });
//     this.lloading.present();
//     let num = "1";
//     if(title=="현재접수"){
//       this.newflag_list[0]=false;
//       this.newflag_update("newflag_receipt",this.as_receipt_data);
//     }
//     if(title=="처리진행"){
//       this.newflag_list[1]=false;
//       this.newflag_update("newflag_progress",this.as_request_data);
//     }
//     if(title=="승인완료"){
//       this.newflag_list[2]=false;
//       this.newflag_update("newflag_complete",this.as_complete_data);
//     }
//     if(title=="처리대기"){
//       this.newflag_list[4]=false;
//       this.newflag_update("newflag_stand",this.as_waiting_data);
//     }
//     if(title=="승인보류"){
//       num = "3";
//       this.newflag_list[5]=false;
//       this.newflag_update("newflag_hold",this.as_hold_data);
//     }
//     this.navCtrl.push(ViewdatapagePage,
//       {
//         engineer_id:this.engineer_id,     // 현재 로그인 한 사람의 아이디 ex) test2@gmail.com
//         title:title,
//         list:data,
//         name:this.engineer_name,          // 현재 로그인 한 사람의 이름
//         flag:num
//       }
//     )
//     .then(()=>{
//       if(this.lloading!=undefined){
//         this.lloading.dismiss();
//       }
//       this.navCtrl.getActive().onDidDismiss((data)=>{
//         if(title=="현재접수"){
//           ///console.log(data);

//           if(data){
//             this.detail(data,data.receipt_number);
//           }
//         }
//       })
//     })
//   }
//   click_customertype(value){
//     this.flag6_customer_type=value;
//   }

//   engineerinformationprocessing_position_find(fm,targetAgency,callback){
//     var engineerinformationprocessing_position='';
//     if (this.flag2_date == undefined || this.flag2_date == '') {     // 날짜를 선택하지 않았다면 접수로
//       this.flag2_date="";
//       this.flag2_time="";
//       // 날짜를 택하지 않았는데 접수를 한사람이 대리점이라면 대리점 대표 아이디가 필요함.
//       console.log(targetAgency);
//       if(targetAgency != "(주)삼천리ES") {  // 대리점이라면
//         fm.orderByChild("agency").equalTo(targetAgency).once("value")
//         .then(function(snapshot) {
//           console.log(snapshot.val());
//           for(let i in snapshot.val()) {
//             console.log(snapshot.val()[i]);
//             if(snapshot.val()[i].authority == "대리점대표") {
//               engineerinformationprocessing_position = i;
//               break;
//             }
//           }
//           callback(engineerinformationprocessing_position);
//         })
//         .catch(function(error) {
//           console.log(error);
//           callback(engineerinformationprocessing_position);
//         });
//       }
//       else {
//         engineerinformationprocessing_position = "TESNUECHCAOLERIRGODLYSEENEEPITTEVTTSMHSESIAEAHRETSSTOSN";
//         callback(engineerinformationprocessing_position);
//       }
//     }
//     else if(this.flag2_time == undefined || this.flag2_time == ''){
//       this.flag2_time=="";
//       engineerinformationprocessing_position=this.engineer_id.split("@")[0];
//       callback(engineerinformationprocessing_position);
//     }
//     else callback('');
//   }

//   async flag2_save(mode) {

//     const db = firebase.database();
//     const fm = db.ref("engineer");
//     let targetAgency = localStorage.getItem("agency");

//     if(this.flag2_contents == undefined || this.flag2_contents == "") {
//       alert("증상내용을 입력해주세요.");
//       return;
//     }
//     let outdoor_array = [];
//     let indoor_array = [];
//     let auto_array = [];


//     $("input[name=outdoor_list]:checked").each(function() {
//         let check = $(this).val();
//         outdoor_array.push(check);
//     });
//     $("input[name=indoor_list]:checked").each(function() {
//         let check = $(this).val();
//         indoor_array.push(check);
//     });
//     $("input[name=pc_automatic]:checked").each(function() {
//         let check = $(this).val();
//         auto_array.push(check);
//     });
//     // $("input[name=customer-model-name]:checked").each(function() {
//     //     console.log('왜 여기를 안타지?');
//     //     let check = $(this).val();
//     //     model_array.push(check);
//     // });

//     let str1 = "";
//     let str2 = "";
//     let str3 = "";
//     let str4 = "";

//     for(let i = 0; i < outdoor_array.length; i++) {
//         str1 += outdoor_array[i] + ",";              // 고장계통(실외기)
//     }
//     for(let i = 0; i < indoor_array.length; i++) {   // 고장계통(실내기)
//         str2 += indoor_array[i] + ",";
//     }
//     for(let i = 0; i < auto_array.length; i++) {   // PC자동제어
//         str3 += auto_array[i] + ",";
//     }
//     for(let i = 0; i < this.flag6_model_array.length; i++) {   // 모델명
//         str4 += this.flag6_model_array[i] + ",";
//     }

//     if(this.flag6_customer==""){
//       window.alert("대표상호는 필수입니다.");
//       this.flag=6;
//       return;
//     }
//     else if(this.flag6_customer_building==""){
//       window.alert("건물명은 필수입니다.");
//       this.flag=6;
//       return;
//     }
//     this.lloading = this.loading.create({
//       spinner: 'hide',
//       content: '저장중..'
//     });
//     this.lloading.present();
//     this.flag2_remote     = document.querySelector('input[name="remote"]:checked');
//     // this.flag2_status  = document.querySelector('input[name=" "]:checked');
//     this.flag2_division   = document.querySelector('input[name="division"]:checked');
//     var flag2_agency      = "";
//     var engineer_receipt  = 0;
//     var engineer_complete = 0;
//     var customer_num      = "";

//     //시간 접수완료를 눌렀을때 기준으로 재설정

//     if(mode==1){
//       this.flag2_receipt_num =
//       this.str_format(this.currentYear,4) + '' +
//       this.str_format(this.currentMonth,2) + '' +
//       this.str_format(this.currentDate,2) + '' +
//       this.str_format(this.currentHour,2) + '' +
//       this.str_format(this.currentMinute,2) + '' +
//       this.str_format(this.currentSecond,2) + '' +
//       this.str_format(this.currentMillisecond,3) + '' +
//       this.agency_code;

//       // alert("receipt_number  : "+this.flag2_receipt_num);
//     }

//     let worker_receipt      = "";           // 현재 접수한 사람의 이름
//     let worker_receiptgoing = "";           // 현재 처리진행한 사람의 이름

//     var status="처리진행";
//     let engineer = "";
//     var engineerinformationprocessing_position='';

//     if (this.flag2_date == undefined || this.flag2_date == '') {
//       status="접수"
//     }
//     // if (this.flag2_date == undefined || this.flag2_date == '') {     // 날짜를 선택하지 않았다면 접수로
//     //   this.flag2_date="";
//     //   this.flag2_time="";
//     //   status="접수"
//     //   // 날짜를 택하지 않았는데 접수를 한사람이 대리점이라면 대리점 대표 아이디가 필요함.
//     //   console.log(targetAgency);
//     //   if(targetAgency != "(주)삼천리ES") {  // 대리점이라면
//     //     fm.orderByChild("agency").equalTo(targetAgency).once("value")
//     //     .then(function(snapshot) {
//     //       console.log(snapshot.val());
//     //       for(let i in snapshot.val()) {
//     //         console.log(snapshot.val()[i]);
//     //         if(snapshot.val()[i].authority == "대리점대표") {
//     //           engineerinformationprocessing_position = i;
//     //           break;
//     //         }
//     //       }
//     //     })
//     //     .catch(function(error) {
//     //       console.log(error);
//     //     });
//     //   }
//     //   else {
//     //     engineerinformationprocessing_position = "TESNUECHCAOLERIRGODLYSEENEEPITTEVTTSMHSESIAEAHRETSSTOSN";
//     //   }
//     // }
//     // else if(this.flag2_time == undefined || this.flag2_time == ''){
//     //   this.flag2_time=="";
//     //   engineerinformationprocessing_position=this.engineer_id.split("@")[0];
//     // }


//     this.engineerinformationprocessing_position_find(fm,targetAgency,(data)=>{
//       engineerinformationprocessing_position = data;

//       if(this.flag2_date != "" && this.flag2_date != undefined) { // 날짜를 선택 했다면
//         engineer = this.engineer_name;
//         engineerinformationprocessing_position=this.engineer_id.split("@")[0];
//       }
//       else {
//         engineer = '';
//       }
//       console.log(engineerinformationprocessing_position);

//       this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).once("value", (sn) => {
//         for (var i in sn.val()) {
//           if (i == "agency") { flag2_agency = sn.val()[i]; }
//         }
//       })
//       this.flagflag=false;

//       if (!this.flag6_guarantee) this.flag6_guarantee = { value: '', };

//       var warranty=""
//       if(this.flag6_guarantee!=""){
//         var warranty_date=new Date(this.flag6_guarantee).getTime();
//         var datetime=new Date().getTime();
//         if (warranty_date - datetime >= 0) {
//           warranty = "기간 외";
//         } else {
//           warranty = "기간 내";
//         }
//       }

//       let d = new Date();
//       let y = d.getFullYear();
//       let m = new String(d.getMonth()+1);
//       let da = new String(d.getDate());
//       let registration_date = "";
//       // 한자리수일 경우 0을 채워준다.
//       if(m.length == 1) {
//           m = "0" + m;
//       }
//       if(da.length == 1) {
//           da = "0" + da;
//       }

//       console.log(y + "-" + m + "-" + da);
//       if(mode == 1) {     // 접수
//         registration_date = y + "-" + m + "-" + da;
//       }

//       // this.firemain.child("customer").child(this.flag6_customer).once("value", (sn) => {
//       //   if(sn.val()) {
//       //     if(sn.val().no) {
//       //       customer_num = sn.val().no;
//       //     }
//       //   }
//       //   else {
//       //     this.firemain.child("customer_no").once("value", (snap) => {
//       //       customer_num = snap.val();
//       //     });
//       //   }
//       customer_num=this.flag6_no;
//       if(!this.flag2_name) this.flag2_name="";
//       // if(!this.flag2_remote.value) this.flag2_remote.value="";
//       if(!this.flag2_error) this.flag2_error="";
//       if(!this.flag2_symptom) this.flag2_symptom="";
//       if(!this.flag2_contents) this.flag2_contents="";
//       if(!this.flag2_date) this.flag2_date="";
//       if(!this.flag2_time) this.flag2_time="";
//       if(this.flag2_time=='') this.flag2_time="24:00:00";
//       if(!this.flag6_building_manager_name) this.flag6_building_manager_name="";
//       if(!this.flag6_representative_call) this.flag6_representative_call="";
//       if(!this.flag6_customer_building) this.flag6_customer_building="";
//       if(!this.flag6_address) this.flag6_address="";
//       if(!this.flag6_product) this.flag6_product="";
//       if(!this.flag6_model) this.flag6_model="";
//       if(!this.flag6_guarantee) this.flag6_guarantee="";
//       if(!status) status="";
//       if(!flag2_agency) flag2_agency="";
//       if(!customer_num) customer_num="";
//       if(!this.flag2_receipt_num) this.flag2_receipt_num="";
//       if(!this.flag2_division.value) this.flag2_division.value="";
//       if(!this.flag6_customer_type) this.flag6_customer_type="";

//       var assignment_date_and_time='';
//       if(this.flag2_date!=''){
//         assignment_date_and_time=this.flag2_receipt_num.substring(0,12);
//       }

//       var receiptionist='';
//       receiptionist=this.engineer_name;

//       this.firemain.child("customer").child(this.flag6_customer).update({
//         "receiptionist"         : receiptionist,
//         "customer_receiptionist": this.flag2_name,
//         "remote_division"       : this.flag2_remote.value,
//         "c_remote_division"     : this.flag2_remote.value,
//         "error_code"            : this.flag2_error,
//         "symptom_code"          : this.flag2_symptom,
//         "receipt_content"       : this.flag2_contents,
//         "due_date"              : this.flag2_date,
//         "due_time"              : this.flag2_time,
//         "as_applicant"          : this.flag6_building_manager_name,     // 건물 담당자 & AS신청자
//         "building_manager_name" : this.flag6_building_manager_name,     // 건물 담당자 & AS신청자
//         "customer_type"         : this.flag6_customer_type,             // 고객 구분
//         // 그럼 건물 담당자는 어디로 들어가지?
//         "as_applicant_phone"    : this.flag6_representative_call,       // 건물 담당자의 휴대전화
//         "building_manager_call": this.flag6_representative_call,        // 건물 담당자의 휴대전화
//         "customer"              : this.flag6_customer,                  // 대표상호
//         "engineer"              : engineer,
//         "building_call"         : this.flag6_building_call,
//         "customer_building"     : this.flag6_customer_building,         // 건물명
//         "address"               : this.flag6_address,
//         "product_name"          : this.flag6_product,
//         // "ho_product"            : {},                   //실외기
//         // "hi_product"            : {},                   //실내기
//         // // "i_model"               : "",                                   // 실내기 모델명
//         // // "i_serial"              : "",                                   // 실내기 제조번호
//         // // "i_time"                : "",                                   // 실내기 운전시간
//         // "io_etc"                : "",                                      // 기타
//         "model"                 : str4,
//         "warranty"              : warranty,                             //건물 전화번호
//         "status"                : status,
//         "assigned_company"      : flag2_agency,
//         // engineer가 빠졌는가 ?      model   warranty
//         // 건물 전화번호가 빠졌는가?  this.flag6_model_array
//         "co_model":  "",
//         "co_serial": "",
//         "co_time":   "",
//         "ci_model":  "",
//         "ci_serial": "",
//         "ci_time":   "",
//         "cio_etc":   "",
//         "no"                    : Number(customer_num),
//         "receipt_number"        : this.flag2_receipt_num,
//         "receipt_type"          : this.flag2_division.value,
//         "worker_receipt"        : worker_receipt,               // 접수를 한 기사의 이름
//         "worker_receiptgoing"   : worker_receiptgoing,
//         "engineer_id": localStorage.getItem("id"),              // 접수를 한 기사의 아이디
//         "assignment_date_and_time" : assignment_date_and_time,
//         "reg_address"           : this.flag6_address, //주소
//         "outdoor_code"          : str1,
//         "indoor_code"           : str2,
//         "auto_code"             : str3,
//         "registration_date"     : registration_date,            // 등록일자
//         "position"              : this.engineer_position,
//         "engineerinformationprocessing_position" : engineerinformationprocessing_position,
//       });
//       this.firemain.child("customer").child(this.flag6_customer).child("history").child(this.flag2_receipt_num).update({
//         "receiptionist"         : receiptionist,
//         "customer_receiptionist": this.flag2_name,
//         "remote_division"       : this.flag2_remote.value,
//         "c_remote_division"     : this.flag2_remote.value,
//         "error_code"            : this.flag2_error,
//         "symptom_code"            : this.flag2_symptom,
//         "receipt_content"       : this.flag2_contents,
//         "due_date"              : this.flag2_date,
//         "due_time"              : this.flag2_time,
//         "as_applicant"          : this.flag6_building_manager_name,     // 건물 담당자 & AS신청자
//         "building_manager_name" : this.flag6_building_manager_name,     // 건물 담당자 & AS신청자
//         "customer_type"         : this.flag6_customer_type,             // 고객 구분
//         // 그럼 건물 담당자는 어디로 들어가지?
//         "as_applicant_phone"    : this.flag6_representative_call,       // 건물 담당자의 휴대전화
//         "building_manager_call": this.flag6_representative_call,        // 건물 담당자의 휴대전화
//         "customer"              : this.flag6_customer,                  // 대표상호
//         "engineer"              : engineer,
//         "building_call"         : this.flag6_building_call,
//         "customer_building"     : this.flag6_customer_building,         // 건물명
//         "address"               : this.flag6_address,
//         "product_name"          : this.flag6_product,
//         "o_model"               : "",                                     // 실외기 모델명
//         "o_serial"              : "",                                   // 실외기 제조번호
//         "o_time"                : "",                                       // 실외기 운전시간
//         "i_model"               : "",                                     // 실내기 모델명
//         "i_serial"              : "",                                   // 실내기 제조번호
//         "i_time"                : "",                                       // 실내기 운전시간
//         "io_etc"                : "",                                       // 기타
//         "model"                 : str4,
//         "warranty"              : warranty,                             //건물 전화번호
//         "status"                : status,
//         "assigned_company"      : flag2_agency,
//         "co_model":  "",
//         "co_serial": "",
//         "co_time":   "",
//         "ci_model":  "",
//         "ci_serial": "",
//         "ci_time":   "",
//         "cio_etc":   "",
//         // engineer가 빠졌는가 ?
//         // 건물 전화번호가 빠졌는가?
//         "no"                    : Number(customer_num),
//         "receipt_number"        : this.flag2_receipt_num,
//         "receipt_type"          : this.flag2_division.value,
//         "worker_receipt"        : worker_receipt,               // 접수를 한 기사의 이름
//         "worker_receiptgoing"   : worker_receiptgoing,
//         "engineer_id": localStorage.getItem("id"),              // 접수를 한 기사의 아이디
//         "assignment_date_and_time" : assignment_date_and_time,
//         "reg_address"           : this.flag6_address, //주소
//         "outdoor_code"          : str1,
//         "indoor_code"           : str2,
//         "auto_code"             : str3,
//         "registration_date"     : registration_date,            // 등록일자
//         "position"              : this.engineer_position,
//         "engineerinformationprocessing_position" : engineerinformationprocessing_position,
//       })


//       // console.log(receiptionist);
//       // console.log(this.flag2_name);
//       // console.log(this.flag2_remote.value);
//       // console.log(this.flag2_remote.value);
//       // console.log(this.flag2_error);
//       // console.log(this.flag2_symptom);
//       // console.log(this.flag2_contents);
//       // console.log(this.flag2_date);
//       // console.log(this.flag2_time);
//       // console.log(this.flag6_building_manager_name);
//       // console.log(this.flag6_building_manager_name);
//       // console.log(this.flag6_customer_type);
//       // console.log(this.flag6_representative_call);
//       // console.log(this.flag6_representative_call);
//       // console.log(this.flag6_customer);
//       // console.log(engineer);
//       // console.log(this.flag6_building_call);
//       // console.log(this.flag6_customer_building);
//       // console.log(this.flag6_address);
//       // console.log(this.flag6_product);
//       // console.log(this.o_model);
//       // console.log(this.o_serial);
//       // console.log(this.o_time);
//       // console.log(this.i_model);
//       // console.log(this.i_serial);
//       // console.log(this.i_time);
//       // console.log(this.io_etc);
//       // console.log(str4);
//       // console.log(warranty);
//       // console.log(status);
//       // console.log(flag2_agency);
//       // console.log(Number(customer_num));
//       // console.log(this.flag2_receipt_num);
//       // console.log(this.flag2_division.value);
//       // console.log(worker_receipt);
//       // console.log(worker_receiptgoing);
//       // console.log(assignment_date_and_time);
//       // console.log(localStorage.getItem("id"));
//       // console.log(str1);
//       // console.log(str2);
//       // console.log(str3);
//       // console.log(registration_date);
//       // console.log(this.engineer_position);
//       // console.log(engineerinformationprocessing_position);

//       this.firemain.child("agency").child(engineerinformationprocessing_position).child("currentReceipt").child(this.flag2_receipt_num).update({
//         "receiptionist"         : receiptionist,
//         "customer_receiptionist": this.flag2_name,
//         "remote_division"       : this.flag2_remote.value,
//         "c_remote_division"     : this.flag2_remote.value,
//         "error_code"            : this.flag2_error,
//         "symptom_code"          : this.flag2_symptom,
//         "receipt_content"       : this.flag2_contents,
//         "due_date"              : this.flag2_date,
//         "due_time"              : this.flag2_time,
//         "as_applicant"          : this.flag6_building_manager_name,// 건물 담당자 & AS신청자
//         "building_manager_name" : this.flag6_building_manager_name,// 건물 담당자 & AS신청자
//         "customer_type"         : this.flag6_customer_type,             //고객 구분
//         "as_applicant_phone"    : this.flag6_representative_call,// 건물 담당자의 휴대전화
//         "building_manager_call" : this.flag6_representative_call,// 건물 담당자의 휴대전화
//         "customer"              : this.flag6_customer,// 대표상호
//         "engineer"              : engineer,
//         "building_call"         : this.flag6_building_call,
//         "customer_building"     : this.flag6_customer_building,// 건물명
//         "address"               : this.flag6_address, //주소
//         "reg_address"           : this.flag6_address, //주소
//         "product_name"          : this.flag6_product,
//         "o_model"               : this.o_model,                                     // 실외기 모델명
//         "o_serial"              : this.o_serial,                                   // 실외기 제조번호
//         "o_time"                : this.o_time,                                       // 실외기 운전시간
//         "i_model"               : this.i_model,                                     // 실내기 모델명
//         "i_serial"              : this.i_serial,                                   // 실내기 제조번호
//         "i_time"                : this.i_time,                                       // 실내기 운전시간
//         "io_etc"                : this.io_etc,                                       // 기타
//         "model"                 : str4,
//         "warranty"              : warranty,
//         "status"                : status,
//         "assigned_company"      : flag2_agency,
//         "no"                    : Number(customer_num),
//         "receipt_number"        : this.flag2_receipt_num,
//         "co_model":  "",
//         "co_serial": "",
//         "co_time":   "",
//         "ci_model":  "",
//         "ci_serial": "",
//         "ci_time":   "",
//         "cio_etc":   "",
//         "receipt_type"          : this.flag2_division.value,
//         "worker_receipt"        : worker_receipt,         // 접수를 한 기사의 아이디
//         "worker_receiptgoing"   : worker_receiptgoing,
//         "assignment_date_and_time" : assignment_date_and_time,
//         "engineer_id": localStorage.getItem("id"),
//         "outdoor_code"          : str1,
//         "indoor_code"           : str2,
//         "auto_code"             : str3,
//         "registration_date"     : registration_date,            // 등록일자
//         "position"              : this.engineer_position,
//         "engineerinformationprocessing_position" : engineerinformationprocessing_position,
//       }).then(() => {
//         this.firemain.update({"customer_no":Number(customer_num)+1})
//         if(mode===2){
//           if(this.lloading!=undefined){
//             this.lloading.dismiss();
//           }
//           window.alert("수정이 완료되었습니다. ");
//           setTimeout(() => {
//             localStorage.setItem('once_login','true')
//             location.reload()
//           }, 10);
//         }
//         else{
//           if(status=="접수"){
//             if(this.lloading!=undefined){
//               this.lloading.dismiss();
//             }
//             this.util.gettoken_sameagency(this.agency_name,"접수완료"," 접수된 내역이 있습니다.",this.mytoken);
//             window.alert("접수가 완료되었습니다. ");
//             setTimeout(() => {
//               localStorage.setItem('once_login','true')

//               // this.view.dismiss();
//               location.reload()
//               // this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//             }, 10);
//           }
//           else{
//             if(this.lloading!=undefined){
//               this.lloading.dismiss();
//             }
//             this.util.gettoken_sameagency(this.agency_name,"처리진행","처리진행 내역이 있습니다.",this.mytoken);
//             window.alert("접수완료하였습니다. 처리진행상태가 되었습니다.");
//             this.firemain.child("engineer").child(this.engineer_id.split("@")[0]).child("schedule").child(this.flag2_receipt_num).update({ "date": this.flag2_date, "place": this.flag2_name })
//             .then((snap)=>{
//               setTimeout(() => {
//                 localStorage.setItem('once_login','true')
//                 location.reload()
//                 // this.navCtrl.setRoot(HomePage,{id:this.engineer_id});
//               }, 500);
//             })
//           }
//         }
//       })
//     })
//     // })
//   }

//   flag6_cancel() {
//     this.flag6_name = "";
//     this.flag6_building_manager_name = "";
//     this.flag6_representative_call = "";
//     this.flag6_customer_building = "";
//     this.flag6_sub_store = "";
//     this.flag6_building_call = "";
//     this.flag6_address = "";
//     this.flag6_product = "";
//     this.flag6_model = "";
//     this.flag6_guarantee = "";
//     this.flag = 2;
//     localStorage.setItem('local_page','jubsu');
//   }

//   // 여기 탄다.
//   flag6_save() {

//     if(this.add_new_customer_flag == true&&
//       (this.flag6_building_manager_name == undefined||
//         this.flag6_building_manager_name == "")){
//       window.alert("건물담당자를 입력해주세요.");
//       return;
//     }
//     else if(this.add_new_customer_flag==true&&
//       (this.flag6_representative_call==undefined||
//         this.flag6_representative_call=="")){
//       window.alert("휴대전화를 입력해주세요.");
//       return;
//     }
//     else if (this.flag6_customer == undefined||
//       this.flag6_customer == ""){
//       window.alert("대표상호를 입력해주세요.");
//       return;
//     }
//     else if(this.flag6_customer_building==undefined||
//       this.flag6_customer_building==""){
//       window.alert("건물명을 입력해주세요.");
//       return;
//     }

//     let model_array=[];
//     $("input[name=customer-model-name]:checked").each(function() {
//       let check = $(this).val();
//       model_array.push(check);
//     });
//     this.flag6_model_array=model_array;
//     this.flag6_representative_call = String($("#as-add-manager_phone1").val());
//     this.flag6_building_call = String($("#as-add-manager_phone2").val());
//     this.flag2_name = this.flag6_name;
//     this.flag2_phone = this.flag6_representative_call;
//     this.flag = 2;

//     setTimeout(() => {
//       // alert(this.flag6_c_remote_division);
//       if(this.flag6_c_remote_division=="유"){
//         $('input:radio[name="remote"]:radio[value="유"]').prop('checked', true);
//       }
//       else{
//         $('input:radio[name="remote"]:radio[value="무"]').prop('checked', true);
//       }

//       if(this.flag6_customer_type=="일반"){
//         $('input:radio[name="status"]:radio[value="일반"]').prop('checked', true);
//       }
//       else{
//         $('input:radio[name="status"]:radio[value="예스파트너"]').prop('checked', true);
//       }
//     }, 500);
//     // <input type="radio" name="remote" id="remote-yes" value="유">
//     // $('input:radio[name="remote"]:input[value="유"]').attr("checked");
//     localStorage.setItem('local_page','jubsu');
//   }
//   /*
// npm uninstall @ionic/angular
// npm i @ionic/angular@3 --save
// npm uninstall @ionic/cli
// npm i @ionic/cli@latest --save
// npm uninstall cordova
// npm i cordova@9
// ionic cordova run android --emulator
//   */

//   // 하단에 AS처리 아이콘 클릭 후 나오는 리스트에서 상세보기로 넘어가주는 메서드
//   detail(list, no) {
//     let title : string = "";
//     if(list.status == "접수") {         // 접수한 사람의 이름을 뿌려줘야한다.
//       title = "접수";
//     }
//     if(list.status == "처리진행") {      // 처리진행을 누른 사람의 이름을 뿌려줘야한다.
//       title = "처리진행";
//     }
//     if(list.status == "처리대기") {
//       title = "처리대기";
//     }
//     if(list.status == "AS처리완료") {
//       title = "AS처리완료";
//     }
//     if(list.status == "승인보류") {
//       title = "승인보류";
//     }
//     if(list.status == "승인완료") {
//       title = "승인완료";
//     }
//     this.navCtrl.push(CompletePage, { "list": list, "id": this.engineer_id, "no": no, "flag":'true', "title" : title , "name": this.engineer_name});
//   }
// /*
// int main()
// {
//   char a[10];
//   int cnt[10]={0};
//   scanf("%s",a);

//   for(int i=1;i<strlen(a);i++){
//     cnt[a[i]-'0']++;
//   }
//   for(int i=0;i<=9;i++){
//     printf("%d ",i);
//     if(a[i]==0){
//       printf("-");
//     }else{
//       for(int j=0;j<cnt[i];j++)
//         printf("*");
//     }
//     printf("\n");
//   }
//   return 0;
// }
// */
//   click_schedule(day){
//     ///console.log(this.as_request_data);
//     ///console.log(this.schedule_list[day]);
//     if(this.schedule_list[day]){
//       var list=[];
//       for(var i in this.schedule_list[day])
//         list.push(this.schedule_list[day][i].receipt_data)

//       // this.go_viewdatapage(this.currentMonth+'월 '+day+'일',list)
//       this.go_viewdatapage("AS스케줄",list)
//     }

//     // this.firemain.child('engineer').child(data[n].engineer_id.split('@')[0]).child('currentReceipt')
//     // .child(data[n].receipt_number).once('value').then((snap)=>{

//     // })
//   }

//   check_schedule(y, m, d) {
//     // ///console.log(y,m,d);
//     var value=[];
//     var flag=false;
//     for (var i in this.flag4_info) {
//       if(!this.flag4_info[i].date&&!this.flag4_info[i].receipt_date){
//         continue;
//       }
//       var data = this.flag4_info[i].date.split('-');
//       var data2 = this.flag4_info[i].receipt_date.split('-');
//       // ///console.log(data2);
//       if (Number(data[0]) === Number(y) &&
//         Number(data[1]) === Number(m) &&
//         Number(data[2]) === Number(d)) {
//         flag=true;
//         // ///console.log('1');
//         value.push(this.flag4_info[i]);
//       }
//       else if (Number(data2[0]) === Number(y) &&
//         Number(data2[1]) === Number(m) &&
//         Number(data2[2]) === Number(d)) {
//           flag=true;
//           // ///console.log('2');
//           value.push(this.flag4_info[i]);
//       }
//       else if (
//         (Number(y)>=Number(data2[0])&&Number(y)<=Number(data[0]))&&
//         (Number(m)>=Number(data2[1])&&Number(m)<=Number(data[1]))&&
//         (Number(d)>=Number(data2[2])&&Number(d)<=Number(data[2]))
//         ) {
//           // ///console.log('3');
//           flag=true;
//           value.push(this.flag4_info[i]);
//       }
//     }
//     if(flag==false) return undefined;
//     else return value;
//   }

//   /*about calendar */
//   getDaysOfMonth() {
//     this.schedule_title = this.monthNames[this.date.getMonth()];
//     this.daysInThisMonth = new Array();
//     this.daysInLastMonth = new Array();
//     this.daysInNextMonth = new Array();
//     this.currentMonth = this.date.getMonth() + 1;
//     this.currentYear = this.date.getFullYear();
//     this.currentHour = this.date.getHours();
//     this.currentMinute = this.date.getMinutes();
//     if (this.date.getMonth() === new Date().getMonth()) {
//       this.currentDate = new Date().getDate();
//     } else {
//       this.currentDate = 999;
//     }

//     var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
//     var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
//     for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
//       this.daysInLastMonth.push(i);
//     }

//     var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
//     for (var j = 0; j < thisNumOfDays; j++) {
//       this.daysInThisMonth.push(j + 1);
//     }

//     var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
//     for (var k = 0; k < (6 - lastDayThisMonth); k++) {
//       this.daysInNextMonth.push(k + 1);
//     }

//     ///console.log(this.daysInNextMonth)
//     var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
//     if (totalDays < 36) {
//       for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
//         this.daysInNextMonth.push(l);
//       }
//     }

//     this.schedule_list = [];
//     for(var day in this.daysInThisMonth){
//       this.schedule_list[day]=
//       this.check_schedule(this.currentYear,this.currentMonth,day);
//     }
//     ///console.log(this.flag4_info);
//     ///console.log(this.schedule_list);

//     ///console.log(this.daysInLastMonth)
//     ///console.log(this.daysInThisMonth)
//     ///console.log(this.daysInNextMonth)
//   }

//   goToday() {
//     this.date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);
//     ///console.log(this.date.getMonth() + 1);
//     this.getDaysOfMonth();
//   }

//   goToLastMonth() {
//     this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
//     ///console.log(this.date.getMonth() + 1);
//     this.getDaysOfMonth();
//   }

//   goToNextMonth() {
//     this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
//     this.getDaysOfMonth();
//   }


//   go_gongjipage() {

//     this.newflag_list[3]=false;
//     this.newflag_update("newflag_gongji",this.gongji_list);
//     this.navCtrl.push(GongjiPage,{id:this.engineer_id})
//     // .then(()=>{
//     //   this.navCtrl.getActive().onDidDismiss(()=>{
//     //     this.get_newflag_localdata();
//     //   })
//     // })
//   }

//   str_format(text, len) {
//     text = String(text);
//     for (var i = text.length; i < len; i++) {
//       text = '0' + text;
//     }
//     return text;
//   }

//   logout(){
//     localStorage.setItem('auto_login','was true');
//     this.navCtrl.setRoot(Login2Page)
//   }

//   // remain_time_set_ready(){
//   //   var now=new Date();
//   //   now.setHours(9,0,0,0);
//   //   ///console.log(now.toISOString())
//   //   $('#datetime_here ion-datetime').remove()
//   //   $('#datetime_here').append(
//   //     '<ion-datetime id="get_timepicker" style="display: none;" display-format="HH:mm" picker-format="HH:mm"'+
//   //     'value="'+now.toISOString()+'">'+'</ion-datetime>'
//   //   )
//   //   setTimeout(() => {
//   //     ///console.log($("#get_timepicker"))
//   //     $("#get_timepicker").trigger('click')
//   //   }, 500);
//   // }

//   remain_time_set(){
//     ///console.log(this.flag2_date);
//     var now=new Date();
//     var scd=new Date(this.flag2_date);
//     if(this.flag2_time){
//       scd.setHours(this.flag2_time.split(':')[0],this.flag2_time.split(':')[1],0)
//     }
//     else scd.setHours(24,0,0);
//     ///console.log(scd);
//     var num=scd.getTime()-now.getTime();

//     ///console.log("test")
//     ///console.log(now);
//     ///console.log(scd);
//     ///console.log(num);
//     this.remain_time=String(Math.floor(num/1000/60/60));
//     ///console.log(this.remain_time);
//   }

//   get_remainingtime(list){
//     // console.log(list);
//     var now=new Date();
//     var due=new Date(list.due_date);
//     if(list.due_time&&list.due_time!=''){
//       due.setHours(list.due_time.split(':')[0],list.due_time.split(':')[1],0);
//     }
//     else{
//       due.setHours(24,0,0);
//     }
//     var res=now.getTime()-due.getTime();
//     var text='예정일로부터 ';

//     ///console.log(res);
//     ///console.log(res/3600000);
//     res=Math.floor(res/3600000);
//     ///console.log(res);

//     if(Math.abs(res/24)>0){
//       text+=Math.floor(Math.abs(res/24))+'일 ';
//     }
//     text+=Math.floor(Math.abs(res%24))+'시간 ';

//     if(res<0) text+="남았습니다.";
//     else if(res>0) text+="지났습니다.";
//     else text=''

//     return text;
//   }

//   takephoto(){
//     let modal = this.modal.create(Cameraselect2Page,{"userid":this.engineer_id});
//     modal.onDidDismiss(url => {
//       // this.lloading = this.loading.create({
//       //   spinner: 'hide',
//       //   content: '저장중..'
//       // });
//       this.lloading.present();
//       this.camera_asd(url,(callback)=>{
//         console.log("get it from url ");
//         console.log(callback);
//         this.profilepicture=callback;
//         this.firemain.child('engineer').child(this.engineer_id.split('@')[0])
//         .update({profilepicture:callback}).then(()=>{
//           // this.lloading.dismiss();
//           window.alert("사진을 저장하였습니다.")
//         })
//       })
//     })
//     modal.present();
//   }
//   camera_asd(imagedata,callback){
//     console.log("imagedataimagedataimagedata");
//     console.log(imagedata);
//     console.log(imagedata.data);
//     if(imagedata.data!=''&&imagedata.data){

//       console.log(imagedata)
//       this.uploadImage(imagedata,(imageurl)=>{

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
//   uploadImage(imageURI,callback){
//     let mypicref = firebase.storage().ref("profile");
//     imageURI=  "data:image/png;base64," + imageURI.data;
//     var a = mypicref.child(this.engineer_id);
//     this.encodeImageUri(imageURI, (image64)=>{

//       a.putString(image64, 'data_url')
//       .then(snapshot => {
//         if(this.lloading!=undefined){
//           this.lloading.dismiss()
//         }
//         console.log(snapshot);
//         mypicref.child(this.engineer_id).getDownloadURL().then((url)=>{
//           console.log("download url is : "+url);
//           callback(url);
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


//   // onlynumber() {
//   //   // var cost1 = document.getElementById("as-add-manager_phone");
//   //   // var cost2 = document.getElementById("as-add-manager_phone1");
//   //   // var cost3 = document.getElementById("as-add-manager_phone2");
//   //   // $(document).on("keyup", "#as-add-manager_phone", function () { $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")); })
//   //   // $(document).on("keyup", "#as-add-manager_phone1", function () { $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")); })
//   //   // $(document).on("keyup", "#as-add-manager_phone2", function () { $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-")); })

//   //   var cost1 = $("#as-add-manager_phone").val();
//   //   var cost2 = $("#as-add-manager_phone1").val();
//   //   var cost3 = $("#as-add-manager_phone2").val();
//   //   // cost1 = String(cost1);
//   //   // cost2 = String(cost2);
//   //   // cost3 = String(cost3);
//   //   var regNumber = /^[0-9]*$/;

//   //   // if(cost1) {
//   //   //   $("#as-add-manager_phone").val(cost1.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
//   //   // }
//   //   // if(cost2) {
//   //   //   $("#as-add-manager_phone1").val(cost2.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
//   //   // }
//   //   // if(cost3) {
//   //   //   $("#as-add-manager_phone2").val(cost3.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));

//   //   // }
//   //   // return;


//   //   if(cost1&&cost1!=""&&!regNumber.test(String(cost1[String(cost1).length-1]))) {
//   //       window.alert("숫자만 입력해주세요.");
//   //       $("#as-add-manager_phone").val(String(cost1).substring(0,cost1.length-1));
//   //       return;
//   //   }
//   //   else if(cost1&&cost1!=""){
//   //     $("#as-add-manager_phone").val(cost1.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
//   //   }
//   //   if(cost2&&cost2!=""&&!regNumber.test(String(cost2[String(cost2).length-1]))) {
//   //     window.alert("숫자만 입력해주세요.");
//   //     $("#as-add-manager_phone1").val(cost2.substring(0,cost2.length-1));
//   //     return;
//   //   }
//   //   else if(cost2&&cost2!=""){
//   //     $("#as-add-manager_phone1").val(cost2.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
//   //   }
//   //   if(cost3&&cost3!=""&&!regNumber.test(String(cost1[String(cost1).length-1]))) {
//   //     window.alert("숫자만 입력해주세요.");
//   //     $("#as-add-manager_phone2").val(cost3.substring(0,cost3.length-1));
//   //     return;
//   //   }
//   //   else if(cost3&&cost3!=""){
//   //     $("#as-add-manager_phone2").val(cost3.replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));
//   //   }


//   onlynumber() {


//     $("#as-add-manager_phone").val(String($("#as-add-manager_phone").val()).replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-"));

//     $("#as-add-manager_phone1").val(String($("#as-add-manager_phone1").val()).replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("—", "-"));

//     $("#as-add-manager_phone2").val(String($("#as-add-manager_phone2").val()).replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("—", "-"));
//   }
// }
