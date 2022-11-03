// import { Component } from '@angular/core';
// import { NavController,LoadingController, NavParams } from 'ionic-angular';
// import * as $ from 'jquery';
// import firebase from 'firebase';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { HomePage } from '../home/home';
// import {IamportCordova} from '@ionic-native/iamport-cordova'
// import { identifierModuleUrl } from '@angular/compiler';
// import { EmailComposer } from '@ionic-native/email-composer/ngx';

// /**
//  * Generated class for the LoginPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */

// @Component({
//   selector: 'page-login',
//   templateUrl: 'login.html',
// })
// export class LoginPage {
//   firemain = firebase.database().ref();

//   load:any;
//   loginflag = 1;
//   findflag = 1;

//   input_id = "";
//   input_pw = "";

//   join_id = "";
//   join_pw = "";
//   join_pw_check = "";
//   join_agency = "";
//   join_name = "";
//   join_position = "";
//   join_phone = "";
//   join_id_athentication = false;
//   agency_options = "";
//   ver="0903V1";

//   //아이디 / 비번 찾기
//   real_name="";
//   real_phone="";
//   real_email="";
//   real_data="";

//   constructor(
//     public emailComposer: EmailComposer,public loadingController: LoadingController,public navCtrl: NavController, public navParams: NavParams, public firebaseAuth: AngularFireAuth) {
//     this.loginflag = 1;
//     this.findflag = 1;

//     // this.asdasdasd();

//     this.load=this.loadingController;
//     $("#find-tab-id").css("background-color", "#1f488f");
//     $("#find-tab-id").css("color", "#fff");

//     // window.alert("login come"+localStorage.getItem('auto_login'))
//     if(localStorage.getItem('auto_login')=='true'||localStorage.getItem('once_login')=='true'){
//       localStorage.setItem('once_login','false')
//       this.login_data_update(localStorage.getItem('id'));
//       this.navCtrl.setRoot(HomePage,{id:localStorage.getItem('id')});
//     }
//     else if(localStorage.getItem('id')){
//       this.input_id=localStorage.getItem('id');
//       this.input_pw=localStorage.getItem('password');
//     }
//   }

//   login_data_update(id){
//     this.firemain.child('engineer').child(id.split('@')[0]).update({
//       version:this.ver,
//       last_login:new Date(),
//     })
//   }

//   ionViewDidLoad() {

//     if(localStorage.getItem("auto_login")=="was true"){
//       localStorage.setItem("auto_login","true");
//       $("input:checkbox[id='checked']").attr("checked", "true");
//     }
//     console.log('ionViewDidLoad LoginPage');
//     window.addEventListener('keyboardWillShow', (e) => {
//       $(".main-footer").hide();
//     });
//     window.addEventListener('keyboardWillHide', () => {
//       $(".main-footer").show();
//     });

//     $("#join-phone").on("change keyup paste", () => {
//       var val = $(this).val();
//       console.log(val);
//       // if (val != "") { $("#f7_search_result").hide(); }
//       // else { $("#f7_search_result").show(); }
//       // var searching = $("#fd7_search_result:contains('" + val + "')");
//       // $(searching).parent().show();

//       var rule=/^\d{3}-\d{3,4}-\d{4}$/;
//       console.log(this.join_phone);
//       if(rule.test(this.join_phone)){
//         console.log(true);
//       }
//       else console.log(false);
//     })
//   }

//   join() {
//     this.loginflag = 2;
//     this.agency_options = "<option value='' selected disabled hidden>Drop-down</option>"
//     this.firemain.child("agency").once('value', (sn) => {
//       for (var agency in sn.val()) {
//         this.agency_options += "<option value=" + sn.val()[agency].name + ">" + sn.val()[agency].name + "</option>";
//       }
//       document.getElementById("agency").innerHTML = this.agency_options;
//     })
//   }
//   find() {
//     this.loginflag = 3;
//   }
//   join_back() {
//     this.loginflag = 1;
//   }
//   find_tab_id(num) {
//     this.findflag = num;
//     if (this.findflag == 1) {
//       $("#find-tab-pw").css("background-color", "#488aff");
//       $("#find-tab-pw").css("color", "#e4e4e4");
//       $("#find-tab-id").css("background-color", "#1f488f");
//       $("#find-tab-id").css("color", "#fff");
//     } else if (this.findflag == 2) {
//       $("#find-tab-id").css("background-color", "#488aff");
//       $("#find-tab-id").css("color", "#e4e4e4");
//       $("#find-tab-pw").css("background-color", "#1f488f");
//       $("#find-tab-pw").css("color", "#fff");
//     }
//   }
//   authen() {
//     console.log("authentication");
//     console.log(this.join_id.trim());
//     window.alert("통신사 선택 후, PASS 앱을 통한 인증, 혹은 문자로 인증하기 버튼을 통해 인증하세요.")


//     this.load = this.loadingController.create({
//       spinner: 'hide',
//       content: '로딩중...'
//     });
//     this.load.present();
//     setTimeout(()=>{
//       if(this.load!=undefined){
//         this.load.dismiss();
//       }
//     },1000)
//     if (this.join_name.length==0) { window.alert("본명(실명)을 입력하세요.");
//       window.alert("전화번호를 입력하세요 ")

//       return;

//     }else if(this.join_phone.length==0){
//       window.alert("전화번호를 입력하세요 ")
//       if(this.load!=undefined){
//         this.load.dismiss();
//       }
//       return;
//     }else{


//       //휴대폰 번호 인증 시작

//         var userCode = 'imp10391932';
//         var data = {
//           merchant_uid: 'mid_' + new Date().getTime(),
//           name:this.join_name,
//           phone:"0"+this.join_phone,
//         };


//         var params = {
//           userCode: userCode,                           // 가맹점 식별코드
//           data: data,                             // 결제 데이터
//           callback: (response)=> {console.log(response);
//             console.log(response.imp_success)
//             if(response.imp_success=="true"){
//               this.join_id_athentication = true;
//             }else{
//               window.alert(JSON.stringify(response))
//               this.join_id_athentication = false;
//             }
//             if(this.load!=undefined){
//               this.load.dismiss();
//             }
//           }, // 콜백 함수
//         }
//         IamportCordova.certification(params).catch((e)=>{
//           if(this.load!=undefined){
//             this.load.dismiss();
//           }
//           window.alert("err")
//           window.alert(JSON.stringify(e))
//         });

//     }
//   }

//   regExp(num, text) {
//     //num==1 for regExp for checking ID
//     if (num == 1) {
//       var emailExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
//       if (!emailExp.test(text).valueOf()) { return false; }
//     }
//     if (num == 2) {
//       var phoneExp = /[01](0|1|6|7|8|9)(\d{3}|\d{4})\d{4}$/g; //휴대폰 번호 정규식
//       if (!phoneExp.test(text).valueOf()) { return false; }
//     }
//   }

//   join_save() {
//     console.log(this.join_id);
//     console.log(this.join_pw);
//     console.log(this.join_pw_check);
//     console.log(this.join_agency);
//     console.log(this.join_name);
//     console.log(this.join_position);
//     console.log(this.join_phone);
//     console.log(this.join_id_athentication);
//     if (this.join_id == "" || this.join_pw == "" || this.join_pw_check == "" || this.join_agency == "" || this.join_name == "" || this.join_position == "" || this.join_phone == "") {
//       if (this.join_id == "") { window.alert("아이디를 입력해주세요"); return $("#join-input-email").focus() }
//       if (this.join_pw == "") { window.alert("비밀번호를 입력해주세요"); return $("#join-input-pass").focus() }
//       if (this.join_pw_check == "") { window.alert("비밀번호 확인란을 입력해주세요"); return $("#join-input-passcheck").focus() }
//       if (this.join_agency == "") { window.alert("대리점을 선택해주세요"); return $("#agency").focus() }
//       if (this.join_name == "") { window.alert("이름을 입력해주세요"); return $("#join-name").focus() }
//       if (this.join_position == "") { window.alert("직책을 입력해주세요"); return $("#join-position").focus() }
//       if (this.join_phone == "") { window.alert("휴대폰 번호를 입력해주세요"); return $("#join-phone").focus() }
//     }
//     else {
//       if (this.join_id_athentication == false) { window.alert("인증이 필요합니다."); return $("#join-input-email").focus() }
//       if (this.join_pw.length < 8) { window.alert("비밀번호의 길이는 8자 이상이어야 합니다."); return $("#join-input-pass").focus() }
//       if (this.join_pw != this.join_pw_check) { window.alert("비밀번호를 확인해주세요"); return $("#join-input-passcheck").focus() }
//       if (this.regExp(2, this.join_phone) == false) { window.alert("잘못된 휴대폰 번호 형식입니다."); return $("#join-phone").focus() }
//       else {
//         this.firebaseAuth.auth.createUserWithEmailAndPassword(this.join_id, this.join_pw).then((data) => {
//           var now=new Date().toISOString().split('T')[0];
//           this.firemain.child("engineer").child(this.join_id.split("@")[0]).update({
//             "agency" : this.join_agency,
//             "id" : this.join_id,
//             "name" : this.join_name,
//             "flag" : false,
//             "phone" : this.join_phone,
//             "position" : this.join_position,
//             "create_date": new Date(),
//             "password": this.join_pw,
//             "authority": "기사권한",
//             "joinDate": now.split('-')[0]+now.split('-')[1]+now.split('-')[2]
//           })
//           this.firemain.child("engineer").child(this.join_id.split("@")[0]).child("current").child("count").update({
//             "complete":0,
//             "progress":0,
//             "receipt":0,
//           })
//           this.firemain.child("agency").child(this.join_agency).child("engineer").update({
//             "id": this.join_id,
//           }).then(() => {
//             window.alert("가입이 완료되었습니다. 로그인 후 이용하세요.");
//             this.loginflag = 1;
//           })
//         }).catch(function (error) {
//           console.log(error.code);
//           if (error.code == "auth/email-already-in-use") {
//             window.alert("이미 존재하는 ID입니다.");
//           };
//         });
//       }
//     }
//   }

//   login() {
//     console.log("login");
//     if (this.input_id == "") { window.alert("아이디를 입력해주세요"); return $("#input-email").focus() }
//     if (this.input_pw == "") { window.alert("비밀번호를 입력해주세요"); return $("#input-pass").focus() }
//     this.firebaseAuth.auth.signInWithEmailAndPassword(this.input_id, this.input_pw).then((data) => {
//       localStorage.setItem('auto_login',String($('#checked').is(":checked")))
//       localStorage.setItem('id',this.input_id)
//       localStorage.setItem('password',this.input_pw)
//       this.firemain.child('engineer').child(this.input_id.split('@')[0]).update({
//         id:this.input_id,
//         password:this.input_pw,
//       }).then(()=>{
//         this.login_data_update(this.input_id);
//         this.navCtrl.setRoot(HomePage, { "id": this.input_id });
//       })
//     }).catch(function (error) {
//       if (error.code == "auth/user-not-found" || error.code == "auth/wrong-password") {
//         window.alert("아이디 혹은 비밀번호가 맞지 않습니다.")
//         return;
//       }
//     });
//   }

//   sendEmail(){
//     alert('start!!!!!!!!');
//     if(this.findflag==1){
//       if(this.real_name==""){
//         alert('실명을 입력해주세요.');
//         return;
//       }
//       else if(this.real_phone==""){
//         alert('휴대폰번호를 입력해주세요.');
//         return;
//       }

//       this.firemain.child('engineer').once('value').then((snap)=>{
//         for(var i in snap.val()){
//           if(snap.val()[i].name==this.real_name
//           &&snap.val()[i].phone==this.real_phone){
//             this.real_email=snap.val()[i].email;
//             this.real_data=snap.val()[i].id;
//             $("#sendEmail_id").click();
//             break;
//           }
//         }
//       })
//     }
//     else if(this.findflag==1){
//       if(this.real_email==""){
//         alert('이메일을 입력해주세요.');
//         return;
//       }
//       //
//       this.firemain.child('engineer').once('value').then((snap)=>{
//         for(var i in snap.val()){
//           if(snap.val()[i].email==this.real_email){
//             this.real_email=snap.val()[i].email;
//             this.real_data=snap.val()[i].password;
//             $("#sendEmail_password").click();
//             break;
//           }
//         }
//       })
//     }
//   }

//   number_set()
//   {
//     var val=/^\d{3}-\d{3,4}-\d{4}$/;
//     console.log(this.join_phone);
//     if(val.test(this.join_phone)){
//       console.log(true);
//     }
//     else console.log(false);
//   }
// }
