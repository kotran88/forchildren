import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import * as $ from 'jquery';
import firebase, { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// import { HomePage } from '../home/home';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DrawingPage } from '../drawing/drawing';
import { l } from '@angular/core/src/render3';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';
import { ViewCustomerPage } from '../viewcustomerpage/viewcustomerpage';
import { Home2Page } from '../home2/home2';
/**
 * Generated class for the Complete2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-complete2',
  templateUrl: 'complete2.html',
})
export class Complete2Page {
  firemain = firebase.database().ref();

  lloading:any;

  mypicref = firebase.storage().ref("images");
  count = 0;

  engineer_list = [{'agency' : '', 'engineer' : '',}];
  pc_automatic = [];
  error_list = [];
  out_door_list = [];
  in_door_list = [];
  // auto_list = [];
  // o_list = [];
  // i_list = [];
  complete_list = [];
  suspense_list = [];

  receipt_data:any;

  receiptContentFiles:any = {};
  processingContentsFiles:any = {};

  info_flag = false;

  engineer_data:any;

  agency_engineer = {'agency' : '', 'engineer' : '',};
  agency_engineer2 = '';

  // key = '';

  sign_data = {
    'latitude' : 0,
    'longitude' : 0,
    'time' : new Date(),
    'signimage' : '',
  }

  prev_receipt_data:any;

  constructor(public geolocation:Geolocation,
  public photoViewer:PhotoViewer,public loading:LoadingController,
  public modal:ModalController,public navCtrl: NavController,
  public navParams: NavParams, public camera: Camera,public imagePicker:ImagePicker) {
    this.receipt_data = navParams.get("list");
    if(this.receipt_data.due_time == '')
    {
      this.receipt_data.due_time = '00:00';
    }

    this.prev_receipt_data = this.receipt_data;

    this.engineer_data = JSON.parse(localStorage.getItem("engineer_data"));
    console.log(this.engineer_data);
    console.log(this.receipt_data);

    this.receiptContentFiles = this.receipt_data.receiptContentFiles;
    if(!this.receiptContentFiles){
      this.receiptContentFiles = [];

      // var temp_data = {};
      // for(var idx = 0; idx < 10; idx++)
      // {
      //   temp_data["-N3JhVXN2cKtPW-dVcV"+idx] = {"downloadURL" : "", "key" : ""};
      //   temp_data["-N3JhVXN2cKtPW-dVcV"+idx].key = "-N3JhVXN2cKtPW-dVcV"+idx;
      //   if(idx % 2){
      //     temp_data["-N3JhVXN2cKtPW-dVcV"+idx].downloadURL =
      //     "https://firebasestorage.googleapis.com/v0/b/samchully2-75f40.appspot.com/o/videos%2F20220427114122830%2Fvideo1?alt=media&token=bd099c9b-40d4-4f40-9cb1-89343d1017ab";
      //   }
      //   else{
      //     temp_data["-N3JhVXN2cKtPW-dVcV"+idx].downloadURL =
      //     "https://firebasestorage.googleapis.com/v0/b/samchully2-75f40.appspot.com/o/images%2F20220531203207182%2F0?alt=media&token=d87f4114-6d13-4f74-9278-46a9be52f778";
      //   }
      // }
      // this.receiptContentFiles = this.convert_json_to_array(temp_data);
    }
    else{
      this.receiptContentFiles = this.convert_json_to_array(this.receipt_data.receiptContentFiles);
    }
    console.log(this.receiptContentFiles);

    this.processingContentsFiles = this.receipt_data.processingContentsFiles;
    if(!this.processingContentsFiles){
      this.processingContentsFiles = [];

      // var temp_data = {};
      // for(var idx = 0; idx < 10; idx++)
      // {
      //   temp_data["-N3JhVXN2cKtPW-dVcV"+idx] = {"downloadURL" : "", "key" : ""};
      //   temp_data["-N3JhVXN2cKtPW-dVcV"+idx].key = "-N3JhVXN2cKtPW-dVcV"+idx;
      //   if(idx % 2){
      //     temp_data["-N3JhVXN2cKtPW-dVcV"+idx].downloadURL =
      //     "https://firebasestorage.googleapis.com/v0/b/samchully2-75f40.appspot.com/o/videos%2F20220427114122830%2Fvideo1?alt=media&token=bd099c9b-40d4-4f40-9cb1-89343d1017ab";
      //   }
      //   else{
      //     temp_data["-N3JhVXN2cKtPW-dVcV"+idx].downloadURL =
      //     "https://firebasestorage.googleapis.com/v0/b/samchully2-75f40.appspot.com/o/images%2F20220531203207182%2F0?alt=media&token=d87f4114-6d13-4f74-9278-46a9be52f778";
      //   }
      // }
      // this.processingContentsFiles = this.convert_json_to_array(temp_data);
    }
    else{
      this.processingContentsFiles = this.convert_json_to_array(this.receipt_data.processingContentsFiles);
    }
    console.log(this.processingContentsFiles);

    this.setting_InOutAuto_data();

    this.agency_engineer.agency = this.receipt_data.assigned_company; // 배정처
    this.agency_engineer.engineer = this.receipt_data.engineer; // 배정직원
    this.agency_engineer2 = this.agency_engineer.agency+"/"+this.agency_engineer.engineer;
    console.log(this.agency_engineer);

    this.data_check("engineer",(list)=>{
      this.engineer_list = [];
      var head_office = localStorage.getItem('head_office');
      for(let i in list) {
        // if(list[i].authority == '기사권한')
        if(this.engineer_data.agency == list[i].agency) {    // 로그인 한 사람의 소속 대리점
          this.engineer_list.push({'agency': list[i].agency, 'engineer' : list[i].name});
        }
        else if(this.engineer_data.agency == head_office
          && list[i].agency && list[i].name
          && list[i].agency != '' && list[i].name != ''){
          this.engineer_list.push({'agency': list[i].agency, 'engineer' : list[i].name});
        }
      }
      this.engineer_list = Array.from(new Set(this.engineer_list));
      console.log('기사권한');
      console.log(this.engineer_list);
    });
    // this.key = this.navParams.get("no");

    // complete_list : any = [];   // 완료 코드
    // suspense_list : any = [];   // 미결 코드
    // 처리결과 코드
    // this.firemain.child("complete").once("value", (snap) => {
    this.data_check("complete",(list)=>{
      for(let i in list) {
        this.complete_list.push(list[i].complete_code);
      }
    });

    // this.firemain.child("suspense").once("value", (snap) => {
    this.data_check("suspense",(list)=>{
      for(let i in list) {
        this.suspense_list.push(list[i].suspense_code);
      }
    });
  }

  engineer_change()
  {
    console.log(this.agency_engineer2);
    console.log(this.agency_engineer);
    this.agency_engineer.agency = this.agency_engineer2.split('/')[0];
    this.agency_engineer.engineer = this.agency_engineer2.split('/')[1];
    console.log(this.agency_engineer);
  }

  convert_json_to_array(json)
  {
    if(!json) return [];

    var list = [];
    for(var i in json)
    {
      list.push(json[i]);
    }
    return list;
  }

  convert_array_to_json(list)
  {
    if(!list) return {};

    var json = {};
    for(var i in list)
    {
      json[list[i].key] = list[i];
    }
    return json;
  }

  remove_f(list,num){
    var return_list = [];
    for(var i in list)
    {
      console.log(i, num);
      if(i != num)
        return_list.push(list[i]);
    }
    return return_list;
  }

  remove_file(m,n)
  {
    console.log(m,n);
    var flag = confirm("사진을 지우시겠습니까?");
    if(flag){
      if(m==1){
        this.receiptContentFiles = this.remove_f(this.receiptContentFiles, n.toString());
        console.log(this.receiptContentFiles);
      }
      else{
        this.processingContentsFiles = this.remove_f(this.processingContentsFiles, n.toString());
        console.log(this.processingContentsFiles);
      }
    }
  }

  takephoto(v){
    if(v == 1 && this.receiptContentFiles.length >= 10){
    // if(v==1&&(this.receipt_data.content_img9&&this.receipt_data.content_img9!='')){
      alert("파일은 최대 10장까지 업로드 할 수 있습니다.");
      return;
    }
    else if(v == 2 && this.processingContentsFiles.length >= 10){
    // else if(v==2&&(this.receipt_data.c_file10&&this.receipt_data.c_file10!='')){
      alert("파일은 최대 10장까지 업로드 할 수 있습니다.");
      return;
    }
    let modal = this.modal.create(Cameraselect2Page,{"key":this.receipt_data.receipt_number,"v":v});
    modal.onDidDismiss(url => {
      console.log("takephoto url is..");
      console.log(url.flag);
      console.log(url.data);

      if(url.flag=="videos"){
        console.log("upload video");
        if(v===1){
          this.receiptContentFiles.push(
            {
              "downloadURL" : url.data,
              "key" : this.firemain.push().key,
            }
          );
          console.log(this.receiptContentFiles);
        }
        else{
          this.processingContentsFiles.push(
            {
              "downloadURL" : url.data,
              "key" : this.firemain.push().key,
            }
          )
          console.log(this.processingContentsFiles);
        }
      }else{
        console.log("not a video ")
        this.show_loading("이미지 로딩중");
        this.camera_asd(url,v,(callback)=>{
          console.log("get it from url ");
          console.log(v);
          console.log(url);
          console.log(callback);
          if(v===1){
            this.receiptContentFiles.push(
              {
                "downloadURL" : callback,
                "key" : this.firemain.push().key,
              }
            );
            console.log(this.receiptContentFiles);
          }
          else{
            this.processingContentsFiles.push(
              {
                "downloadURL" : callback,
                "key" : this.firemain.push().key,
              }
            );
            console.log(this.processingContentsFiles);
          }
          this.dismiss_loading();
        });
      }
    })
    modal.present();
  }

  camera_asd(imagedata,indexing,callback){
    console.log("imagedataimagedataimagedata");
    console.log(imagedata);
    console.log(indexing)
    console.log(imagedata.data);
    if(imagedata.data!=''&&imagedata.data){

      // console.log(imagedata)
      this.uploadImage(imagedata,indexing,(imageurl)=>{

        // console.log("upload done");
        // console.log(imageurl);
        callback(imageurl);

      });
    }
    else{
      this.dismiss_loading();
    }
  }

  uploadImage(imageURI,index,callback){
    let storageRef = firebase.storage().ref();
    imageURI=  "data:image/png;base64," + imageURI.data;
        var a = this.mypicref.child(this.receipt_data.receipt_number).child(""+this.count);
    this.encodeImageUri(imageURI, (image64)=>{

      a.putString(image64, 'data_url')
      .then(snapshot => {
        this.dismiss_loading();
        // console.log(snapshot);
        this.mypicref.child(this.receipt_data.receipt_number).child("" + this.count).getDownloadURL().then((url)=>{
          this.count++;
          // console.log("download url is : "+url);
          callback(url);
          // this.photoarray.push(url);
          // if(this.numofimage==this.photoarray.length){
          //   this.lloading.dismiss()
          //   window.alert("사진업로드 완료!")
          //   this.view.dismiss({'data':this.photoarray})
          // }


        }).catch((e)=>{
          // console.log('eeeee');
          // console.log(e);
          this.dismiss_loading();
        })
      }).catch((e)=>{
        // console.log("error is....")
        window.alert(e);
        // console.log(e);
        this.dismiss_loading();
      })
    })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/png");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  photo_view(url){
    this.photoViewer.show(url);
  }

  data_check(key,callback){
    try{
      this.firemain.child(key).once('value')
      .then((snap)=>{
        console.log(key,snap.val());
        var list =[];
        for(var i in snap.val())
          list.push(snap.val()[i]);
        callback(list);
      })
    }catch(err){
      console.log(err);
      alert(err);
      callback(null);
    }
  }

  sign()
  {
    this.show_loading('Loading Please Wait');
    // 37.490663, 127.494764
    // this.geolocate_latitude=37.490663
    //   this.geolocate_longitude=127.494764

    setTimeout(() => {
      this.dismiss_loading();
    }, 3000);
    var options = {maximumAge:0, timeout: 10000, enableHighAccuracy: true}
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.sign_data.latitude=resp.coords.latitude;
      this.sign_data.longitude=resp.coords.longitude;

      this.sign_data.time=new Date();
      this.navCtrl.push(DrawingPage,{"id":this.receipt_data.receipt_number}).then(() => {
        if(this.lloading!=undefined){
          this.lloading.dismiss();
        }
        this.navCtrl.getActive().onDidDismiss(data => {
          // console.log(data);
          if(data!=undefined){
            this.sign_data.signimage=data.url;
          }
        });
      });



    }).catch((e)=>{
      window.alert("위치정보를 허용하지 않아서 취소되었거나 다른 문제가 발생하였습니다.")
      window.alert(e);
      if(this.lloading!=undefined){
        this.lloading.dismiss();
      }
    }).finally(()=>{
      if(this.lloading!=undefined){
        this.lloading.dismiss();
      }
    })
  }

  convert_title_to_ch(title)
  {
    var ch = '';
    switch(title)
    {
      case '현재접수':
        ch = 'receipt';
        break;
      case '처리진행':
        ch = 'request';
        break;
      case '처리완료':
        ch = 'complete';
        break;
      case '공지사항':
        ch = 'gongji';
        break;
      case '처리대기':
        ch = 'waiting';
        break;
      case '승인보류':
        ch = 'hold';
        break;
    }
    return ch;
  }

  set_home_icon_count2(agency, status, count){

    status = this.convert_title_to_ch(status);
    console.log("set_home_icon_count2")
    console.log("agency:"+agency);
    console.log("status:"+status);
    console.log("count:"+count);
    // var aa="온오프랩"
    // var ss ="receipt"
    // this.firemain.child('receipt_event').child(aa)
    // .child('count').child(ss).once('value').then((snap)=>{
    //   console.log(snap.val());
    //   window.alert(snap.val());

    // });

    this.firemain.child('receipt_event').child(agency)
    .child('count').child(status).once('value').then((snap)=>{
    var value=snap.val();
      if(snap.val()==null){
        value=0;
      }
      if(snap.val()==0&&count==-1){
        console.log("0 so no count -1 ")
        return;
      }
      this.firemain.child('receipt_event').child(agency)
      .child('count').update({[status] : (parseInt(value) + count) });
    })
    this.set_web_count(agency, status, count);
  }

  set_home_icon_count3()
  {
    console.log("set_home_icon_count3"+this.prev_receipt_data);
    console.log("set_home_icon_count333"+this.receipt_data);

    // 이전 처리사 == 현재 처리사 && 이전 상태 == 현재 상태 같다면 종료
    if(this.receipt_data.assigned_company == this.prev_receipt_data.assigned_company
      && this.receipt_data.status == this.prev_receipt_data.status) return;


    var head_office = localStorage.getItem("head_office");

    // 이전 처리사 == 본사
    if(this.prev_receipt_data.assigned_company == head_office)
    {
      // 현재 처리사 == 본사
      if(this.receipt_data.assigned_company == head_office)
      {
        // 이전 상태 카운트 -1, 현재 상태 카운트 + 1
        this.set_home_icon_count2(head_office, this.prev_receipt_data.status, -1);
        this.set_home_icon_count2(head_office, this.receipt_data.status, 1);
      }
      // 현재 처리사 != 본사
      else
      {
        //이전 상태 == 현재 상태
        if(this.prev_receipt_data.status == this.receipt_data.status)
        {
          //현재 처리사(대리점) 현재 상태 + 1
          this.set_home_icon_count2(this.receipt_data.assigned_company, this.receipt_data.status, 1);
        }
        //이전 상태 != 현재 상태
        else
        {
          //이전 처리사(본사) 이전 상태 -1, 이전 처리사(본사) 현재 상태 + 1
          this.set_home_icon_count2(head_office, this.prev_receipt_data.status, -1);
          this.set_home_icon_count2(head_office, this.receipt_data.status, 1);

          //현재 처리사(대리점) 현재 상태 + 1
          this.set_home_icon_count2(this.receipt_data.assigned_company, this.receipt_data.status, 1);
        }
      }
    }
    // 이전 처리사 != 본사
    else
    {
      // 현재 처리사 == 본사
      if(this.receipt_data.assigned_company == head_office)//후:본사
      {
        //이전 상태 == 현재 상태
        if(this.prev_receipt_data.status == this.receipt_data.status)
        {
          // 이전 처리사(대리점) 이전 상태 -1
          this.set_home_icon_count2(this.prev_receipt_data.assigned_company, this.prev_receipt_data.status, -1);
        }
        //이전 상태 != 현재 상태
        else
        {
          // 이전 처리사(대리점) 이전 상태 -1
          this.set_home_icon_count2(this.prev_receipt_data.assigned_company, this.prev_receipt_data.status, -1);

          //현재 처리사(본사) 이전 상태 -1, 현재 처리사(본사) 현재 상태 +1
          this.set_home_icon_count2(head_office, this.prev_receipt_data.status, -1);
          this.set_home_icon_count2(head_office, this.receipt_data.status, 1);
        }
      }
      // 현재 처리사 != 본사
      else
      {
        //이전 상태 == 현재 상태
        if(this.prev_receipt_data.status == this.receipt_data.status)
        {
          //이전 처리사(대리점) 이전 상태 -1, 현재 처리사(대리점) 현재 상태 +1
          this.set_home_icon_count2(this.prev_receipt_data.assigned_company, this.prev_receipt_data.status, -1);
          this.set_home_icon_count2(this.receipt_data.assigned_company, this.receipt_data.status, 1);
        }
        //이전 상태 != 현재 상태
        else
        {
          //이전 처리사(대리점) 이전 상태 -1, 현재 처리사(대리점) 현재 상태 +1
          this.set_home_icon_count2(this.prev_receipt_data.assigned_company, this.prev_receipt_data.status, -1);//대리점 이전 -1
          this.set_home_icon_count2(this.receipt_data.assigned_company, this.receipt_data.status, 1);//대리점2 현재 +1

          //본사 이전상태 -1, 본사 현재상태 +1
          this.set_home_icon_count2(head_office, this.prev_receipt_data.status, -1);//본사 이전 -1
          this.set_home_icon_count2(head_office, this.receipt_data.status, 1);//본사 현재 +1
        }
      }
    }
  }

  // set_home_icon_count(prev, next)
  // {
  //   if(prev == next) return;
  //   // 'receipt'    //현재접수
  //   // 'request'    //처리진행
  //   // 'complete'   //처리완료
  //   // 'gongji'     //공지사항
  //   // 'waiting'    //처리대기
  //   // 'hold'       //승인보류

  //   prev = this.convert_title_to_ch(prev);
  //   next = this.convert_title_to_ch(next);

  //   var home_icon_count = JSON.parse(localStorage.getItem('home_icon_count'));

  //   home_icon_count[prev].count -= 1;
  //   home_icon_count[next].count += 1;

  //   var count_list = {};
  //   for(var i in home_icon_count)
  //     count_list[i] = home_icon_count[i].count;

  //   // this.set_web_count(localStorage.getItem('head_office'), prev, -1);
  //   // this.set_web_count(localStorage.getItem('head_office'), next, 1);
  //   // this.set_head_office_count(prev, -1);
  //   // this.set_head_office_count(next, 1);

  //   //배정처 변경
  //   if(this.prev_data.assigned_company != this.receipt_data.assigned_company){
  //     if(this.prev_data.assigned_company == localStorage.getItem('head_office')){ // 전:본사 후:대리점
  //       this.firemain.child('receipt_event').child(this.receipt_data.assigned_company).child('count')
  //       .update(count_list);
  //     }
  //     else if(this.receipt_data.assigned_company == localStorage.getItem('head_office')){ // 전:대리점 후:본사

  //     }
  //   }
  //   else{
  //     if(this.prev_data.assigned_company == localStorage.getItem('head_office')){

  //     }
  //   }

  //   if(this.receipt_data.assigned_company != localStorage.getItem('head_office')){
  //     this.set_web_count(localStorage.getItem('head_office'), prev, -1);
  //     this.set_web_count(localStorage.getItem('head_office'), next, 1);
  //     this.set_head_office_count(prev, -1);
  //     this.set_head_office_count(next, 1);
  //   }

  //   this.set_web_count(this.receipt_data.assigned_company, prev, -1);
  //   this.set_web_count(this.receipt_data.assigned_company, next, 1);

  //   this.firemain.child('receipt_event').child(this.receipt_data.assigned_company).child('count')
  //   .update(count_list);

  // }

  set_head_office_count(key, num)
  {
    this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
    .orderByChild('count').equalTo(key).once('value', (snap)=>{

      var cnt = (snap.exists() == true)? parseInt(snap.val()) + num : 0;

      this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
      .child('count').update({[key] : cnt});
    })
  }

  set_web_count(agency, key, num)
  {
    this.firemain.child('receipt_event').child(agency)
    .orderByChild('web_count').equalTo(key).once('value', (snap)=>{
      var ch = '';

      if(key == 'receipt')
        ch = 'receipt';
      else if(key == 'request' || key == 'waiting')
        ch = 'request';
      else
        ch = 'complete';

      var cnt = (snap.exists() == true)? parseInt(snap.val()) + num : 0;

      this.firemain.child('receipt_event').child(agency)
      .child('web_count').update({[ch] : cnt});
    })
  }

  firemain_remove(agency)
  {
    try {
      console.log(agency);
      console.log(this.receipt_data);
      console.log("firemain_remove")

      this.firemain.child('receipt_event').child(agency).child("currentReceipt")
      .child(this.receipt_data.receipt_number).remove();

      this.firemain.child('schedule').child(agency).child(this.receipt_data.receipt_number)
      .remove();

      this.update_error_code(this.prev_receipt_data.error_code, -1);
    }
    catch(err) {
      console.log(err);
      alert(err);
    }
  }

  firemain_update(agency)
  {
    try {
      console.log(agency);
      console.log(this.receipt_data);
      console.log("firemain_upload")

      this.firemain.child('receipt_event').child(agency).child("currentReceipt")
      .child(this.receipt_data.receipt_number)
      .update(this.receipt_data);

      this.firemain.child('history').child(this.receipt_data.clientInfo.customer)
      .child(this.receipt_data.receipt_number).update(this.receipt_data);

      this.firemain.child('schedule').child(agency).child(this.receipt_data.receipt_number)
      .update(
        {
          "date": this.receipt_data.due_date,
          "customer": this.receipt_data.clientInfo.customer,
          "engineer": this.engineer_data.id.split('@')[0],
          "receipt_number": this.receipt_data.receipt_number,
          "agency": this.receipt_data.assigned_company,
        }
      );

      if(this.prev_receipt_data.error_code != this.receipt_data.error_code){
        this.update_error_code(this.prev_receipt_data.error_code, -1);
        this.update_error_code(this.receipt_data.error_code, 1);
      }

    }
    catch(err) {
      console.log(err);
      alert(err);
    }
  }

  update_error_code(code, num)
  {
    if(code == '') return;

    this.firemain.child('error').child(code)
    .once('value').then((snap)=>{
      if(snap.exists() == true)
      {
        this.firemain.child('error').child(code)
        .update({'sort_cnt' : parseInt(snap.val().sort_cnt) + num});
      }
    })
  }

  set_inoutauto_list()
  {
    let str1 = {};
    let str2 = {};
    let str3 = {};

    let outdoor_array = [];
    let indoor_array = [];
    let auto_array = [];
    $("input[name=outdoor_list]:checked").each(function() { let check = $(this).val(); outdoor_array.push(check); });
    $("input[name=indoor_list]:checked").each(function() { let check = $(this).val(); indoor_array.push(check); });
    $("input[name=pc_automatic]:checked").each(function() { let check = $(this).val(); auto_array.push(check); });

    // for(let i = 0; i < outdoor_array.length; i++) { str1 += outdoor_array[i] + ","; }
    // for(let i = 0; i < indoor_array.length; i++) { str2 += indoor_array[i] + ","; }
    // for(let i = 0; i < auto_array.length; i++) { str3 += auto_array[i] + ","; }
    for(let i = 0; i < outdoor_array.length; i++) {
      str1[outdoor_array[i]] = outdoor_array[i];              // 고장계통(실외기)
    }
    for(let i = 0; i < indoor_array.length; i++) {   // 고장계통(실내기)
      str2[indoor_array[i]] = indoor_array[i];
    }
    for(let i = 0; i < auto_array.length; i++) {   // PC자동제어
      str3[auto_array[i]] = auto_array[i];
    }

    this.receipt_data.outdoorlist = str1;
    this.receipt_data.indoorlist = str2;
    this.receipt_data.autolist = str3;
  }

  remove_prev_receiptContentFiles()
  {
    if(this.receipt_data.receiptContentFiles){
      var json = this.convert_array_to_json(this.receiptContentFiles);
      var remove_key_list = [];
      for(var i in this.receipt_data.receiptContentFiles){
        if(!json[i]){
          remove_key_list.push(this.receipt_data.receiptContentFiles[i].key);
        }
      }
      for(var i in remove_key_list){
        this.firemain.child('receipt_event').child(this.receipt_data.assigned_company)
        .child('currentReceipt').child(this.receipt_data.receipt_number)
        .child('receiptContentFiles').child(remove_key_list[i]).remove();
      }
      if(this.receipt_data.assigned_company != localStorage.getItem('head_office')){
        for(var i in remove_key_list){
          this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
          .child('currentReceipt').child(this.receipt_data.receipt_number)
          .child('receiptContentFiles').child(remove_key_list[i]).remove();
        }
      }
      this.receipt_data.receiptContentFiles = json;
    }
    else{
      this.receipt_data.receiptContentFiles = this.convert_array_to_json(this.receiptContentFiles);
    }
  }

  remove_prev_processingContentsFiles()
  {
    if(this.receipt_data.processingContentsFiles){
      var json = this.convert_array_to_json(this.processingContentsFiles);
      var remove_key_list = [];
      for(var i in this.receipt_data.processingContentsFiles){
        if(!json[i]){
          remove_key_list.push(this.receipt_data.processingContentsFiles[i].key);
        }
      }
      for(var i in remove_key_list){
        this.firemain.child('receipt_event').child(this.receipt_data.assigned_company)
        .child('currentReceipt').child(this.receipt_data.receipt_number)
        .child('processingContentsFiles').child(remove_key_list[i]).remove();
      }
      if(this.receipt_data.assigned_company != localStorage.getItem('head_office')){
        for(var i in remove_key_list){
          this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
          .child('currentReceipt').child(this.receipt_data.receipt_number)
          .child('processingContentsFiles').child(remove_key_list[i]).remove();
        }
      }
      this.receipt_data.processingContentsFiles = json;
    }
    else{
      this.receipt_data.processingContentsFiles = this.convert_array_to_json(this.processingContentsFiles);
    }
  }

  total_upload()
  {
    this.remove_prev_receiptContentFiles();
    this.remove_prev_processingContentsFiles();

    this.receipt_data.assigned_company = this.agency_engineer.agency;
    this.receipt_data.engineer = this.agency_engineer.engineer; //배정직원 설정;
    this.set_home_icon_count3();

    this.firemain_update(localStorage.getItem('head_office'));
    if(this.receipt_data.assigned_company != localStorage.getItem('head_office'))
      this.firemain_update(this.engineer_data.agency);

    if(this.prev_receipt_data.assigned_company != this.receipt_data.assigned_company){
      this.firemain_remove(this.prev_receipt_data.assigned_company);
    }
  }

  // 처리진행 버튼
  async receipt() {

    if(!this.receipt_data.due_date||this.receipt_data.due_date==""){ alert('처리예정일을 입력해주세요.'); return; }
    else if(!this.receipt_data.due_time||this.receipt_data.due_time==""){ alert('처리예정시간을 입력해주세요.'); return; }

    // 로딩 창 띄우기
    this.show_loading('저장중..');

    this.set_inoutauto_list();

    let datetime = new Date();
    this.receipt_data.assignment_date_and_time = this.str_format(datetime.getFullYear(), 4) + "-"
                                          + this.str_format(datetime.getMonth() + 1, 2) + "-"
                                            + this.str_format(datetime.getDate(), 2) + " "
                                              + this.str_format(datetime.getHours(), 2) + ":"
                                                + this.str_format(datetime.getMinutes(), 2);
    this.receipt_data.status = "처리진행";

    this.total_upload();

    this.lloading.dismiss();
    window.alert("처리진행 상태로 변경되었습니다.");
    this.navCtrl.setRoot(Home2Page,{id:this.engineer_data.id});
  }

  async stand() {

    this.show_loading('저장중..');

    this.set_inoutauto_list();

    // 만약 처리기사를 바꾸게 되면 DB경로를 바뀐 처리기사의 아이디로 해줘야 하는데
    // 현재 문제점은 접수한 사람의 아이디로 계속 접수건이 들어가는게 문제
    // if(this.sign_data.time==undefined) this.geolocate_time='';

    let datetime = new Date();
    let current_time = this.str_format(datetime.getFullYear(), 4)  + "-" + this.str_format(datetime.getMonth() + 1, 2)  + "-" + this.str_format(datetime.getDate(), 2)  + " " + this.str_format(datetime.getHours(), 2)  + ":" + this.str_format(datetime.getMinutes(), 2);

    this.receipt_data.status="처리대기";
    this.receipt_data.standby_date_and_time = current_time;
    this.receipt_data.engineer=this.agency_engineer.engineer; //처리기사 설정;

    this.total_upload();

    this.lloading.dismiss();
    window.alert("처리대기 상태로 변경되었습니다.");
    this.navCtrl.setRoot(Home2Page,{id:this.engineer_data.id});
  }

  async modify() {

    // console.log(this.receipt_data.assigned_company);
    // console.log(this.targetID);
    // console.log(this.list.engineerinformationprocessing_position);

    // 로딩 창 띄우기
    this.show_loading('수정중..')

    this.set_inoutauto_list();

    this.total_upload();

    this.lloading.dismiss();
    window.alert("수정하였습니다.");
    this.navCtrl.setRoot(Home2Page,{id:this.engineer_data.id});
  }
  async standbyToComplete(){
    //처리대기 to 처리완료

    if(!this.receipt_data.receipt_content&&this.receipt_data.receipt_content==""){ alert("고장증상을 입력해주세요."); return; }
    if(!this.receipt_data.c_result||this.receipt_data.c_result==""){ alert("처리결과항목을 선택해주세요."); return; }

    // this.lloading = this.loading.create({ spinner: 'hide', content: '저장중..' });
    // this.lloading.present();
    // window.alert(this.engineer_data.id.split('@')[0]);
    this.show_loading('저장중...');

    // this.receipt_data.engineer="testing";

    this.receipt_data.assigned_company = this.agency_engineer.agency
    this.receipt_data.engineer = this.agency_engineer.engineer; //처리기사 설정;
    // if(this.sign_data.time==undefined) this.geolocate_time='';

    this.set_inoutauto_list();

    this.receipt_data.status="처리완료";
    var date = new Date();
    this.receipt_data.completion_date_and_time =
      this.str_format(date.getFullYear(), 4) + "-" +
      this.str_format(date.getMonth() + 1, 2) + "-" +
      this.str_format(date.getDate(), 2) + " " +
      this.str_format(date.getHours(), 2) + ":" +
      this.str_format(date.getMinutes(), 2);
    this.receipt_data.c_cdate =
      this.str_format(date.getFullYear(), 4) + "-" +
      this.str_format(date.getMonth() + 1, 2) + "-" +
      this.str_format(date.getDate(), 2);

    // 기존 처리기사 engineerinformationprocessing_position
    // 현재 선택한 처리기사 this.targetID
    // this.remove_prev_receiptContentFiles();
    // this.remove_prev_processingContentsFiles();

    // this.firemain_update(localStorage.getItem('head_office'));
    // if(this.receipt_data.assigned_company != localStorage.getItem('head_office'))
    //   this.firemain_update(this.receipt_data.assigned_company);

    // // this.set_home_icon_count(this.prev_data.status,'처리완료');
    // this.set_home_icon_count3();
    this.total_upload();

    this.lloading.dismiss();
    window.alert("처리완료 상태로 변경되었습니다.");
    this.navCtrl.setRoot(Home2Page,{id:this.engineer_data.id});
  }
  async complete() {

    if(!this.receipt_data.receipt_content&&this.receipt_data.receipt_content==""){ alert("고장증상을 입력해주세요."); return; }
    if(!this.receipt_data.c_result||this.receipt_data.c_result==""){ alert("처리결과항목을 선택해주세요."); return; }

    // this.lloading = this.loading.create({ spinner: 'hide', content: '저장중..' });
    // this.lloading.present();
    // window.alert(this.engineer_data.id.split('@')[0]);
    this.show_loading('저장중...');

    // this.receipt_data.engineer="testing";

    this.receipt_data.assigned_company = this.agency_engineer.agency
    this.receipt_data.engineer = this.agency_engineer.engineer; //처리기사 설정;
    // if(this.sign_data.time==undefined) this.geolocate_time='';

    this.set_inoutauto_list();

    this.receipt_data.status="처리완료";
    var date = new Date();
    this.receipt_data.completion_date_and_time =
      this.str_format(date.getFullYear(), 4) + "-" +
      this.str_format(date.getMonth() + 1, 2) + "-" +
      this.str_format(date.getDate(), 2) + " " +
      this.str_format(date.getHours(), 2) + ":" +
      this.str_format(date.getMinutes(), 2);
    this.receipt_data.c_cdate =
      this.str_format(date.getFullYear(), 4) + "-" +
      this.str_format(date.getMonth() + 1, 2) + "-" +
      this.str_format(date.getDate(), 2);

    // 기존 처리기사 engineerinformationprocessing_position
    // 현재 선택한 처리기사 this.targetID
    // this.remove_prev_receiptContentFiles();
    // this.remove_prev_processingContentsFiles();

    // this.firemain_update(localStorage.getItem('head_office'));
    // if(this.receipt_data.assigned_company != localStorage.getItem('head_office'))
    //   this.firemain_update(this.receipt_data.assigned_company);

    // // this.set_home_icon_count(this.prev_data.status,'처리완료');
    // this.set_home_icon_count3();
    this.total_upload();

    this.lloading.dismiss();
    window.alert("처리완료 상태로 변경되었습니다.");
    this.navCtrl.setRoot(Home2Page,{id:this.engineer_data.id});
  }

  setting_InOutAuto_data()
  {
    this.show_loading('로딩중..');

    // this.data_check("product",(list)=>{
    //   this.product_list = [];
    //   this.model_list = [];
    //   for(let i in list) {
    //     this.product_list.push(list[i].product);
    //     this.model_list.push(list[i].model);
    //     this.product_list = Array.from(new Set(this.product_list));
    //   }
    // });

    this.data_check("pc_automatic",(list)=>{
      console.log(list);
      this.pc_automatic = [];
      for(let i in list) {

        this.pc_automatic.push(list[i].auto_code);
      }
      setTimeout(() => {
        for(let j = 0; j < this.pc_automatic.length; j++) {
          console.log(this.receipt_data.autolist)
          if(this.receipt_data.autolist!=undefined){
            if(this.receipt_data.autolist[this.pc_automatic[j]]){
              $("input:checkbox[id='pc_automatic" + j + "']").attr("checked", "true");
            }
          }

        }
      }, 1000);
    });

    this.data_check("outdoor_unit",(list)=>{
      this.out_door_list = [];
      for(let i in list) {
        this.out_door_list.push(list[i].outdoor_code);
      }
      setTimeout(() => {
        for(let j = 0; j < this.out_door_list.length; j++) {
          if(this.receipt_data.outdoorlist!=undefined){
            if(this.receipt_data.outdoorlist[this.out_door_list[j]]){
              $("input:checkbox[id='outdoor_list" + j + "']").attr("checked", "true");
            }
          }
        }
      },1000);
    });

    this.data_check("indoor_unit",(list)=>{
      this.in_door_list = [];
      for(let i in list) {
        this.in_door_list.push(list[i].indoor_code);
      }
      setTimeout(() => {
        for(let j = 0; j < this.in_door_list.length; j++) {
          if(this.receipt_data.indoorlist!=undefined){
            $("input:checkbox[id='indoor_list" + j + "']").attr("checked", "true");
          }
        }
      },1000);
    });

    this.data_check("error", (list)=>{
      this.error_list = [];
      for(var i in list){
        this.error_list.push(list[i]);
      }
      // this.error_list.sort({});
      this.error_list.sort((a,b)=>{
        if(!a.sort_cnt) a.sort_cnt = 0;
        if(!b.sort_cnt) b.sort_cnt = 0;

        if(Number(a.sort_cnt)>Number(b.sort_cnt)) return -1;
        else if(Number(a.sort_cnt)<Number(b.sort_cnt)) return 1;
        else return 0;
      })
      if(this.receipt_data.error_code == ''){
        this.receipt_data.error_code =
        (this.error_list[0])? this.error_list[0].code : '';
      }
    })

    // this.data_check("symptom",(list)=>{
    //   this.symptom_list = [];
    //   for(var i in list){
    //     this.zone.run(()=>{
    //       this.symptom_list.push(list[i]);
    //     });
    //   }
    //   this.receipt_data.symptom_code=
    //   (this.symptom_list[0])?this.symptom_list[0].symptom_code : '';

    //   localStorage.setItem("symptom", JSON.stringify(this.symptom_list));
    // });

    setTimeout(() => {
      this.dismiss_loading();
    }, 1000);
  }

  str_format(text, len) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
      text = '0' + text;
    }
    return text;
  }

  info_display() {
    this.info_flag = !this.info_flag;
    if (this.info_flag) {
      $('.info').css('display', 'block');
    } else {
      $('.info').css('display', 'none');
    }
  }

  go_view_customer_page()
  {
    this.navCtrl.push(ViewCustomerPage,
    {
      "engineer_id"      : this.engineer_data.id,
      "engineer_name"    : this.engineer_data.name,
      "engineer_position": this.engineer_data.position,
      "title"            : "AS이력",
      "list"             : this.receipt_data
    })
  }

  show_loading(content)
  {
    this.dismiss_loading();
    this.lloading = this.loading.create({
      spinner: 'hide',
      content: content,
    });
    this.lloading.present();
  }

  dismiss_loading()
  {
    if(this.lloading)
    {
      this.lloading.dismiss();
    }
  }

  phone_replace(phone) {
    phone = phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3");
    return phone;
  }

  ionViewDidLoad() {
  }

  goback() {
    this.navCtrl.pop();
  }
}
