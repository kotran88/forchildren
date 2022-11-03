import { Component,NgZone } from '@angular/core';
import { NavController, ViewController,NavParams,LoadingController, ModalController, Content } from 'ionic-angular';
import * as $ from 'jquery';
import firebase from 'firebase';
import { OnoffutilProvider } from '../../providers/onoffutil/onoffutil';
import { GongjiPage } from '../gongji/gongji';
import { listenerCount, once } from 'process';
import { snapshotChanges } from 'angularfire2/database';
import { ViewdatapagePage } from '../viewdatapage/viewdatapage';
import { setInterval } from 'timers';
import { FCM } from '@ionic-native/fcm/ngx';
import { Cameraselect2Page } from '../cameraselect2/cameraselect2';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { callbackify } from 'util';
import { ThrowStmt } from '@angular/compiler';
import { data } from "jquery";
import { dateDataSortValue } from 'ionic-angular/umd/util/datetime-util';
import { keyframes } from '@angular/core/src/animation/dsl';
import { Login2Page } from '../login2/login2';
import { Complete2Page } from '../complete2/complete2';

/**
 * Generated class for the Home2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page {
  firemain = firebase.database().ref();

  lloading:any;

  currentTab = 0; // 현재 탭

  engineer_data = {
    'agency' : '',
    'agency_code' : '',
    'name' : '',
    'id' : '',
    'position' : '',
    'profile_image' : '',
    'password' : '',
    'phone' : '',
  };

  as_data = {
    'all' : [],
    'receipt' : [], //현재접수
    'request' : [], //처리진행
    'complete' : [], //처리완료
    'waiting' : [], //처리대기
    'hold' : [], //승인보류
  }

  home_icon_count = {
    'receipt' : {'count' : 0, 'new' : false},
    'request' : {'count' : 0, 'new' : false},
    'complete' : {'count' : 0, 'new' : false},
    'gongji' : {'count' : 0, 'new' : false},
    'waiting' : {'count' : 0, 'new' : false},
    'hold' : {'count' : 0, 'new' : false},
  }

  receipt_data = {
    engineer: '', //배정직원
    engineer_phone: '', //배정직원 핸드폰
    receiptionist: '', //'김형태',
    receiptionist_position:'',
    buildname: '',
    remote_division: '',
    error_code: '',
    receipt_content: '',
    outdoorlist: {},
    indoorlist: {},
    autolist: {},
    due_date: '',
    due_time: '', //'12:00:00',
    receipt_type: '',
    as_applicant: '',
    as_applicant_phone: '',
    as_postcode: '',
    as_address: '',
    as_extra_info: '',
    as_details: '',
    totalAddress: ' ',
    receipt_date_and_time: '',
    clientInfo: {
      no: '', //'-N2z9fiMZxlxOMCv59j7',
      registration_date: '', //'2022-05-26',
      customer: '',
      representative_call: '',
      manager_name: '',
      manager_call: '',
      customer_building: '',
      building_call: '',
      building_manager_name: '',
      building_manager_call: '',
      customer_type: '',
      warranty_date: '',
      reg_address: '',
      c_remote_division: ''
    },
    maker: '',
    product_name: '',
    io_etc: '',
    test_date: '',
    a_agency: '',
    airConditionerInfo: {
      o_serial : {
        o_model: '',
        o_serial: '',
        o_time: '',
      },
      i_serial : {
        i_model: '',
        i_serial: '',
        i_time: ''
      },
    },
    cAirConditionerInfo: {
      co_serial : {
        co_model: '',
        co_serial: '',
        co_time: '',
      },
      ci_serial : {
        ci_model: '',
        ci_serial: '',
        ci_time: ''
      },
    },
    assigned_company: '', //'온오프랩',
    reg_assign_worker: '', //'김형태',
    reg_engineer_phone: '', //'010-4077-5599',
    assignment_date_and_time: '', // 배정일시
    undecided_date_and_time: '', // 미결일시
    completion_date_and_time: '', // 완료일시
    status: '', //'현재접수',
    receipt_number: '', //'20220526160050047fQDn4S',
    warranty: '', //'기간 외'
    c_result: '',
    c_cdate: '',
    complete_text: '',
    c_memo: '',
  }

  // out_unit = {
  //   'model' : '',
  //   'serial' : '',
  //   'time' : '',
  // }
  // in_unit = {
  //   'model' : '',
  //   'serial' : '',
  //   'time' : '',
  // }

  product_list = []; //상품 리스트
  model_list = []; //모델명 리스트
  pc_automatic = []; //자동화 코드 리스트
  outdoor_list = []; //
  indoor_list = [];
  error_list = [];
  symptom_list = [];
  gongji_list = [];

  out_unit_list = [];
  in_unit_list = [];

  today_date = '';
  max_date = '';
  month_name = [];

  my_token = '';

  customer_no = '';

  receipt_list_sort_ch = 'descending';

  daysInThisMonth = [];
  daysInLastMonth = [];
  daysInNextMonth = [];
  monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentMonth = 0;
  currentYear = 0;
  currentDate = 0;
  currentHour = 0;
  currentMinute = 0;
  currentSecond = 0;
  currentMillisecond = 0;
  schedule_title: any;
  schedule_list=[];
  target_date = new Date();

  add_new_customer_flag = false;

  search_ch = '';
  search_text = '';
  search_result_list = [];

  fix_list = [];

  time_cnt100 = 1;

  constructor(public photoViewer:PhotoViewer,
  public fcm:FCM,public zone:NgZone,public modal:ModalController,
  public view:ViewController,public loading:LoadingController,
  public navCtrl: NavController, public navParams: NavParams, public util: OnoffutilProvider) {

    console.log(this.receipt_data);
    this.currentTab = 1;
    localStorage.setItem('local_page', 'home');

    this.show_loading('데이터 불러오는 중...');

    this.engineer_data.id = localStorage.getItem('id');
    // var agency="온오프랩"
    // var status ="receipt"
    // this.firemain.child('receipt_event').child(agency)
    // .child('count').child(status).once('value').then((snap)=>{
    //   console.log(snap.val());
    //   window.alert(snap.val());

    // });
    this.firemain.child("engineer").child(this.engineer_data.id.split("@")[0]).once("value", (snap) => {
      // this.engineer_data.profile_image = snap.val().profilepicture;
      this.engineer_data = {
        'agency' : snap.val().agency,
        'agency_code' : '',
        'name' : snap.val().name,
        'id' : snap.val().id,
        'password' : snap.val().password,
        'position' : snap.val().position,
        'profile_image' : snap.val().profilepicture,
        'phone' : snap.val().phone,
      }
      console.log(this.engineer_data);
      this.firemain.child('agency').child(snap.val().agency).child('code').once('value').then((snap)=>{
        console.log(snap.val());
        var code = (snap.exists() == true)? snap.val() : '';
        this.engineer_data.agency_code = code;
        localStorage.setItem('engineer_data', JSON.stringify(this.engineer_data));
        console.log(this.engineer_data);
      });
      this.get_home_icon_count();

      this.receipt_data.clientInfo.no = this.firemain.child("agency").child(snap.val().agency).push().key;

    }).catch((err)=>{

    });

    var now_date = new Date();
    this.today_date = now_date.getFullYear() + '-' + (now_date.getMonth() + 1) + '-' + now_date.getDate();
    this.max_date = (now_date.getFullYear() + 5) + '-' + (now_date.getMonth() + 1) + '-' + now_date.getDate();
    this.month_name = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    localStorage.setItem('once_login','false');

    this.fcm.getToken().then((token)=>{
      this.my_token = token;

      this.firemain.child('engineer').child(this.engineer_data.id.split('@')[0]).update({"token":token})
    }).catch((e)=>{
      window.alert(e);
    })

    this.fcm.onNotification().subscribe((data)=>{
      if(data.wasTapped)
      {
        // this.go_viewdatapage('', '');
      }
    });
    this.dismiss_loading();
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

  set_home_icon_count(key,num)
  {
    // this.firemain.child('receipt_event').child(this.engineer_data.agency).child('count')
    // .update({[key] : this.home_icon_count[key].count});
    // this.home_icon_count[key].count += num;

    if(num == 0)
      this.home_icon_count[key].new = false;
    else{
      console.log("this.home_icon_count[key].count:"+this.home_icon_count[key].count+"//"+num);
      this.firemain.child('receipt_event').child(this.engineer_data.agency).child('count')
      .update({[key] : (this.home_icon_count[key].count + num)});

      if(this.engineer_data.agency != localStorage.getItem('head_office')){
        this.set_web_count(localStorage.getItem('head_office'), key, num);
        this.set_head_office_count(key, num);
      }
      this.set_web_count(this.engineer_data.agency, key, num);
    }
    localStorage.setItem('home_icon_count', JSON.stringify(this.home_icon_count));
  }

  set_head_office_count(key, num)
  {
    console.log("set_head_office_count")
    console.log(key+"////"+num);
    this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
    .orderByChild('count').equalTo(key).once('value', (snap)=>{
      console.log(snap.val())
      var count = parseInt(snap.val());
      if(snap.val()==null||snap.val()==undefined){
        count=0;
      }else{

      }
      console.log(count);
      // var cnt = (snap.exists() == true)? parseInt(snap.val()) + num : 0;

      this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
      .child('count').update({[key] : count+1});
    })
  }

  get_home_icon_count()
  {
    var local_data = JSON.parse(localStorage.getItem('home_icon_count'));

    if(local_data != null){
      this.home_icon_count = local_data
    } else{
      localStorage.setItem('home_icon_count', JSON.stringify(this.home_icon_count));
    }
    console.log("this.home_icon_count:");
    console.log(this.home_icon_count);
    this.firemain.child('receipt_event').child(this.engineer_data.agency).child('count')
    .on('child_added', (snap)=>{
      console.log(snap.key);
      console.log(snap.val());

      this.home_icon_count[snap.key].new =
      (this.home_icon_count[snap.key].count < parseInt(snap.val())) ? true : false;

      this.home_icon_count[snap.key].count = snap.val();
      localStorage.setItem('home_icon_count', JSON.stringify(this.home_icon_count));
    });
    this.firemain.child('receipt_event').child(this.engineer_data.agency).child('count')
    .on('child_changed', (snap)=>{
      console.log(snap.key);
      console.log(snap.val());

      this.home_icon_count[snap.key].new =
      (this.home_icon_count[snap.key].count < parseInt(snap.val())) ? true : false;

      this.home_icon_count[snap.key].count = snap.val();
      localStorage.setItem('home_icon_count', JSON.stringify(this.home_icon_count));
    });
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

  // check_data_and_update(key, data)
  // {
  //   var list = JSON.parse(localStorage.getItem(key));
  //   var flag = false;
  //   for(var i in list){
  //     if(list[i] == data){
  //       flag = true;

  //       break;
  //     }
  //   }
  //   list.push(data);
  //   localStorage.setItem(key,JSON.stringify(list));
  // }

  // get_firemain(key, callback)
  // {
  //   this.firemain.child(key).once('child_added', (snap)=>{
  //     this.check_data_and_update(key,snap.val());
  //   })
  //   this.firemain.child(key).once('child_changed', (snap)=>{
  //     this.check_data_and_update(key,snap.val());
  //   })
  //   this.firemain.child(key).once('child_removed', (snap)=>{
  //     this.check_data_and_update(key,snap.val());
  //   })
  // }

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
    // if(!localStorage.getItem(key)){
    //   console.log(key);
    //   setTimeout(() => {
    //     this.data_check(key,(list)=>{
    //       callback(list);
    //     })
    //   }, 1000);
    // }
    // else{
    //   var data=JSON.parse(localStorage.getItem(key));
    //   // console.log(data);
    //   var list=[];
    //   for(var i in data){
    //     list.push(data[i]);
    //   }
    //   // console.log(list);
    //   callback(list);
    // }
  }
  async go_viewdatapage(ch)
  {

    // receipt // 현재접수
    // request // 처리진행
    // complete // 처리완료
    // waiting // 처리대기
    // hold // 승인보류

    var title = '';


    switch(ch)
    {
      case 'receipt':
        this.set_home_icon_count('receipt', 0);
        title = '현재접수';
        break;
      case 'request':
        this.set_home_icon_count('request', 0);
        title = '처리진행';
        break;
      case 'complete':
        this.set_home_icon_count('complete', 0);
        title = '처리완료';
        break;
      case 'gongji':
        this.set_home_icon_count('gongji', 0);
        this.navCtrl.push(GongjiPage, {id:this.engineer_data.id})
        .then(()=>{
        }); return;
        break;
      case 'waiting':
        this.set_home_icon_count('waiting', 0);
        title = '처리대기';
        break;
      case 'hold':
        this.set_home_icon_count('hold', 0);
        title = '승인보류';
        break;
    }

    this.show_loading('이동중...');
    if(title != '')
    {
      try
      {
        this.firemain.child('receipt_event').child(this.engineer_data.agency)
        .child('currentReceipt').orderByChild("status").equalTo(title).once('value')
        .then((snap)=>{
          console.log(snap.val());
          var list = [];
          for(var i in snap.val())
          {
            console.log(snap.val()[i]);
            list.push(snap.val()[i]);
          }
          list.reverse();
          console.log("list.....!!!!")
          console.log(list);
          this.go_other_page(title, ch, list);
        }).catch((err)=>{
          console.log(err)
        });
      }
      catch(err)
      {
        alert(err);
      }
    }
    else{
      alert();
      alert(ch+'!!!!');
      this.go_other_page(title, ch, []);
    }

  }

  go_other_page(title, ch, list)
  {
    try
    {
      this.navCtrl.push(ViewdatapagePage,
      {
        'engineer_id' : this.engineer_data.id,
        'title' : title,
        'list' : list,
        'name' : this.engineer_data.name,
        'flag' : (ch == 'hold')? '1' : '3',
      }).then(()=>{
        this.dismiss_loading();
        this.navCtrl.getActive().onDidDismiss((data)=>{
          if(ch == 'receipt' && data)
            this.detail(data, data.receipt_number);
        });
      })
    }
    catch(err)
    {
      this.dismiss_loading();
      // console.log(err);
    }
  }

  detail(list, no)
  {
    let title : string = '';

    title = list.status;

    this.navCtrl.push(Complete2Page, { "list": list, "id": this.engineer_data.id, "no": no, "flag":'true', "title" : title , "name": this.engineer_data.name});
  }

  // go_gongjipage()
  // {
  //   this.new_flag_list.gongji = false;
  //   this.navCtrl.push(GongjiPage, {id:this.engineer_data.id});
  // }

  add_applicant_data()
  {
    console.log(this.receipt_data);
    this.receipt_data.as_applicant_phone = String($("#as-add-manager_phone").val());

    this.currentTab = 6;
    this.firemain.child('customer_no').once('value').then((snap)=>{
      this.customer_no = snap.val();
    });

    localStorage.setItem('local_page', 'customer_get');

    // this.o_model="";
    // this.o_serial="";
    // this.o_time="";
    $("#out_unit_model").empty();
    $("#out_unit_serial").empty();
    $("#out_unit_time").empty();

    // this.i_model="";
    // this.i_serial="";
    // this.i_time="";
    $("#in_unit_model").empty();
    $("#in_unit_serial").empty();
    $("#in_unit_time").empty();

    // this.input_io_unit();
  }

  input_io_unit(ch, num)
  {
    console.log(this.receipt_data.airConditionerInfo);
    this.io_unit_check(ch,num);

    // setTimeout(() => {
    //   $("#olist_input_model").on("change keyup paste", () => {
    //     console.log(this.receipt_data.airConditionerInfo.o_serial.o_model);
    //     this.io_unit_check("out",1);
    //   })
    //   $("#olist_input_serial").on("change keyup paste", () => {
    //     console.log(this.receipt_data.airConditionerInfo.o_serial.o_serial);
    //     this.io_unit_check("out",2);
    //   })

    //   $("#ilist_input_model").on("change keyup paste", () => {
    //     console.log(this.receipt_data.airConditionerInfo.i_serial.i_model);
    //     this.io_unit_check("in",1);
    //   })
    //   $("#ilist_input_serial").on("change keyup paste", () => {
    //     console.log(this.receipt_data.airConditionerInfo.i_serial.i_serial);
    //     this.io_unit_check("in",2);
    //   })
    // }, 500);
  }

  io_unit_check(ch, num)
  {
    if(ch == 'out')//실외기
    {
      if(num == 1)//모델
      {
        $("#out_unit_serial").empty();
        $("#out_unit_time").empty();
        this.receipt_data.airConditionerInfo.o_serial.o_serial = '';
        this.receipt_data.airConditionerInfo.o_serial.o_time = '';

        for(var i in this.out_unit_list)
        {
          if(this.out_unit_list[i].o_model == this.receipt_data.airConditionerInfo.o_serial.o_model
          &&this.out_unit_list[i].o_serial)
          {
            var newOptionElement = document.createElement("option");
            newOptionElement.value = this.out_unit_list[i].o_serial;
            newOptionElement.text = this.out_unit_list[i].o_serial;
            document.getElementById("out_unit_serial").appendChild(newOptionElement);

            if(this.receipt_data.airConditionerInfo.o_serial.o_serial == '')
              this.receipt_data.airConditionerInfo.o_serial.o_serial = this.out_unit_list[i].o_serial;

            if(this.receipt_data.airConditionerInfo.o_serial.o_time == '')
              this.receipt_data.airConditionerInfo.o_serial.o_time = this.out_unit_list[i].o_time;
          }
        }
      }
      else if(num==2)//제조번호
      {
        // this.o_time="";
        $("#out_unit_time").empty();
        this.receipt_data.airConditionerInfo.o_serial.o_time = '';

        for(var i in this.out_unit_list){
          if(this.out_unit_list[i].o_model==this.receipt_data.airConditionerInfo.o_serial.o_model
          &&this.out_unit_list[i].o_serial==this.receipt_data.airConditionerInfo.o_serial.o_serial){
            this.receipt_data.airConditionerInfo.o_serial.o_time=this.out_unit_list[i].o_time;
            break;
          }
        }
      }
      else if(num==3){//운전시간

      }
    }
    else if(ch=="in"){//실내기
      if(num==1){//모델
        // this.i_serial="";
        // this.i_time="";
        $("#in_unit_serial").empty();
        $("#in_unit_time").empty();
        this.receipt_data.airConditionerInfo.i_serial.i_serial = '';
        this.receipt_data.airConditionerInfo.i_serial.i_time = '';

        for(var i in this.in_unit_list){
          if(this.in_unit_list[i].i_model == this.receipt_data.airConditionerInfo.i_serial.i_model
          &&this.in_unit_list[i].i_serial){
            var newOptionElement = document.createElement("option");
            newOptionElement.value = this.in_unit_list[i].i_serial;
            newOptionElement.text = this.in_unit_list[i].i_serial;
            document.getElementById("in_unit_serial").appendChild(newOptionElement);

            if(this.receipt_data.airConditionerInfo.i_serial.i_serial == '')
              this.receipt_data.airConditionerInfo.i_serial.i_serial = this.in_unit_list[i].i_serial;

            if(this.receipt_data.airConditionerInfo.i_serial.i_time == '')
              this.receipt_data.airConditionerInfo.i_serial.i_time = this.in_unit_list[i].i_time;
          }
        }
      }
      else if(num==2){//제조번호
        // this.i_time="";
        $("#in_unit_time").empty();
        this.receipt_data.airConditionerInfo.o_serial.o_time = '';

        for(var i in this.in_unit_list){
          if(this.in_unit_list[i].i_model==this.receipt_data.airConditionerInfo.i_serial.i_model
          &&this.in_unit_list[i].i_serial==this.receipt_data.airConditionerInfo.i_serial.i_serial){
            this.receipt_data.airConditionerInfo.i_serial.i_time=this.in_unit_list[i].i_time;
            break;
          }
        }
      }
      else if(num==3){//운전시간

      }
    }
  }

  onlynumber(ch)
  {
    switch(ch)
    {
      case 0:
        this.receipt_data.as_applicant_phone =
        this.receipt_data.as_applicant_phone.replace(/[^0-9]/g, "")
        .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
        .replace("--", "-");
        console.log(this.receipt_data.as_applicant_phone);
        break;
      case 1:
        this.receipt_data.clientInfo.building_manager_call =
        this.receipt_data.clientInfo.building_manager_call.replace(/[^0-9]/g, "")
        .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
        .replace("—", "-");
        console.log(this.receipt_data.clientInfo.building_manager_call);
        break;
      case 2:
        this.receipt_data.clientInfo.building_call =
        this.receipt_data.clientInfo.building_call.replace(/[^0-9]/g, "")
        .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
        .replace("—", "-");
        console.log(this.receipt_data.clientInfo.building_call);
        break;
    }
  }


  get_remainder_date(date,time)
  {
    var list = {
      'due_date' : date,
      'due_time' : time,
    }
    var now = new Date();
    var due = new Date(list.due_date);

    if(list.due_time != ''){
      due.setHours(
        parseInt(list.due_time.split(':')[0]),
        parseInt(list.due_time.split(':')[1],0));
    }
    else{
      due.setHours(24,0,0);
    }

    var res = now.getTime() - due.getTime();
    var text = '예정일로부터 ';

    res = Math.floor(res/3600000);

    if( (res/24) > 0 )
      text += Math.floor(Math.abs(res/24)) + '일 ';

    text += Math.floor(Math.abs(res%24)) + '시간 ';

    if(res<0)
      text+="남았습니다.";
    else if(res>0)
      text+="지났습니다.";
    else
      text=''

    return text;
  }

  get_warranty()
  {
    if(this.receipt_data.clientInfo.warranty_date != '')
    {
      var now = new Date().getTime();
      var wrt = new Date(this.receipt_data.clientInfo.warranty_date).getTime();

      this.receipt_data.warranty = (now <= wrt)? '기간 내' : '기간 외';

      console.log(now);
      console.log(wrt);
    }
    else{
      this.receipt_data.warranty = '';
    }
  }

  async receipt_save()
  {
    // const db = firebase.database();
    // const fm = db.ref("engineer");

    // let targetAgency = this.engineer_data.agency;

    if(this.receipt_data.receipt_content == ''){
      alert("증상내용을 입력해주세요.");
      return;
    }
    let outdoor_array = [];
    let indoor_array = [];
    let auto_array = [];

    $("input[name=outdoor_list]:checked").each(function() {
      let check = $(this).val();
      outdoor_array.push(check);
    });
    $("input[name=indoor_list]:checked").each(function() {
      let check = $(this).val();
      indoor_array.push(check);
    });
    $("input[name=pc_automatic]:checked").each(function() {
      let check = $(this).val();
      auto_array.push(check);
    });

    let str1 = {};
    let str2 = {};
    let str3 = {};
    let str4 = '';
    for(let i = 0; i < outdoor_array.length; i++) {
      str1[outdoor_array[i]] = outdoor_array[i];              // 고장계통(실외기)
    }
    for(let i = 0; i < indoor_array.length; i++) {   // 고장계통(실내기)
      str2[indoor_array[i]] = indoor_array[i];
    }
    for(let i = 0; i < auto_array.length; i++) {   // PC자동제어
      str3[auto_array[i]] = auto_array[i];
    }
    for(let i = 0; i < this.model_list.length; i++) {   // 모델명
      str4 += this.model_list[i] + ",";
    }

    this.receipt_data.outdoorlist = str1;
    this.receipt_data.indoorlist = str2;
    this.receipt_data.autolist = str3;

    if(this.receipt_data.clientInfo.customer == '')
    {
      window.alert("대표상호는 필수입니다.");
      this.currentTab = 6;
      return;
    }
    else if(this.receipt_data.clientInfo.customer_building == '')
    {
      window.alert("건물명은 필수입니다.");
      this.currentTab = 6;
      return;
    }

    this.show_loading('저장중..');

    this.get_warranty();

    var temp:any
    temp = document.querySelector('input[name="remote"]:checked');
    this.receipt_data.remote_division = temp.value;
    temp = document.querySelector('input[name="division"]:checked');
    this.receipt_data.receipt_type = temp.value;

    this.receipt_data.receiptionist = this.engineer_data.name;
    this.receipt_data.receiptionist_position = this.engineer_data.position;
    console.log(this.receipt_data);
    console.log(this.engineer_data);
    this.receipt_data.buildname = this.receipt_data.clientInfo.customer_building;
    this.receipt_data.status = (this.receipt_data.due_date == '')? "현재접수" : "처리진행";

    if(this.receipt_data.status == "처리진행"){
      var date = new Date();
      this.receipt_data.assignment_date_and_time =
      this.str_format(date.getFullYear(), 4) + "-" +
      this.str_format(date.getMonth() + 1, 2) + "-" +
      this.str_format(date.getDate(), 2) + " " +
      this.str_format(date.getHours(), 2) + ":" +
      this.str_format(date.getMinutes(), 2);

      this.receipt_data.engineer = this.engineer_data.name;
      this.receipt_data.engineer_phone = this.engineer_data.phone;
    }

    // this.engineerinformationprocessing_position_find(fm, targetAgency,
    // (data)=>{
    // var agency = "";
    this.receipt_data.clientInfo.registration_date = new Date().toISOString().split('T')[0];
    let datetime = new Date();
    let current_time = this.str_format(datetime.getFullYear(), 4)  + "-" + this.str_format(datetime.getMonth() + 1, 2)  + "-" + this.str_format(datetime.getDate(), 2)  + " " + this.str_format(datetime.getHours(), 2)  + ":" + this.str_format(datetime.getMinutes(), 2);

    this.receipt_data.receipt_date_and_time = current_time;
    this.receipt_data.assignment_date_and_time = current_time;
    // this.firemain.child("engineer").child(this.engineer_data.id.split('@')[0]).once('value')
    // .then((snap)=>{
    //   if(snap.val().agency)
    //     agency = snap.val().agency;
    // })

    this.receipt_data.assigned_company = this.engineer_data.agency;
    // this.receipt_data.engineer = this.engineer_data.name;
    console.log(this.receipt_data);
    this.firemain.child('history').child(this.receipt_data.clientInfo.customer)
    .child(this.receipt_data.receipt_number).update(this.receipt_data);

    this.update_error_cdoe(this.receipt_data.error_code, 1);
    this.firemain.child('receipt_event').child(localStorage.getItem('head_office'))
    .child("currentReceipt").child(this.receipt_data.receipt_number)
    .update(this.receipt_data)

    this.firemain.child('receipt_event').child(this.engineer_data.agency)
    .child("currentReceipt").child(this.receipt_data.receipt_number)
    .update(this.receipt_data)
    .then(()=>{
      // this.firemain.update({"customer_no" : Number(this.customer_no)+1})

      if(this.receipt_data.due_date != ''){
        if(this.receipt_data.due_time == ''){
          this.receipt_data.due_time = '24:00';
        }

        var data = {
          "agency": this.engineer_data.agency,
          "date": this.receipt_data.due_date,
          // "customer": this.receipt_data.clientInfo.customer,
          "engineer": this.engineer_data.id.split('@')[0],
          "receipt_number": this.receipt_data.receipt_number,
        };

        this.firemain.child('schedule').child(localStorage.getItem('head_office'))
        .child(this.receipt_data.receipt_number).update(data);

        this.firemain.child('schedule').child(this.engineer_data.agency)
        .child(this.receipt_data.receipt_number).update(data);
      }

      this.dismiss_loading();
      if(this.receipt_data.status == '현재접수')
      {
        this.set_home_icon_count('receipt', 1);
        this.util.gettoken_sameagency(this.engineer_data.agency,"접수완료"," 접수된 내역이 있습니다.",this.my_token);
        window.alert('접수가 완료되었습니다.');
        this.navCtrl.setRoot(Home2Page);
      }
      else
      {
        this.set_home_icon_count('request', 1);
        this.util.gettoken_sameagency(this.engineer_data.agency,"처리진행","처리진행 내역이 있습니다.",this.my_token);
        window.alert('처리진행이 완료되었습니다.')
        this.navCtrl.setRoot(Home2Page);
        // })
      }
    })
    // })
  }

  update_error_cdoe(code, num)
  {
    this.firemain.child('error').child(code)
    .once('value').then((snap)=>{
      if(snap.exists() == true)
      {
        this.firemain.child('error').child(this.receipt_data.error_code)
        .update({'sort_cnt' : parseInt(snap.val().sort_cnt) + num});
      }
    })
  }

  customer_data_cancel()
  {
    // this.flag6_name = "";
    this.receipt_data.clientInfo.building_manager_name = "";
    this.receipt_data.clientInfo.building_manager_call = "";
    this.receipt_data.clientInfo.customer_building = "";
    // this.receipt_data.flag6_sub_store = "";
    this.receipt_data.clientInfo.building_call = "";
    this.receipt_data.totalAddress = "";
    this.receipt_data.product_name = "";
    // this.receipt_data.flag6_model = "";
    // this.receipt_data.flag6_guarantee = "";
    this.currentTab = 2;
    localStorage.setItem('local_page','jubsu');
  }

  customer_data_save(flag)
  {
    if(this.add_new_customer_flag == true&&
      (this.receipt_data.clientInfo.building_manager_name == "")){
      window.alert("건물담당자를 입력해주세요.");
      return;
    }
    else if(this.add_new_customer_flag==true&&
      (this.receipt_data.clientInfo.building_manager_call=="")){
      window.alert("휴대전화를 입력해주세요.");
      return;
    }
    else if (this.receipt_data.clientInfo.customer == ""){
      window.alert("대표상호를 입력해주세요.");
      return;
    }
    else if(this.receipt_data.clientInfo.customer_building==""){
      window.alert("건물명을 입력해주세요.");
      return;
    }

    let model_array=[];
    $("input[name=customer-model-name]:checked").each(function() {
      let check = $(this).val();
      model_array.push(check);
    });
    this.model_list=model_array;
    this.receipt_data.clientInfo.building_manager_call = String($("#as-add-manager_phone1").val());
    this.receipt_data.clientInfo.building_call = String($("#as-add-manager_phone2").val());
    // this.receipt_data.customer_receiptionist = this.flag6_name;
    // this.flag2_phone = this.flag6_representative_call;

    this.currentTab = 2;
    console.log(this.receipt_data);


    console.log(this.receipt_data.clientInfo.customer);
    console.log(this.receipt_data.clientInfo);
    if(flag==1){
      var bools=false;
      this.firemain.child("customer").child(this.receipt_data.clientInfo.customer).once("value", (snap) => {
        if(snap.val().clientInfo.customer == this.receipt_data.clientInfo.customer || snap.val().clientInfo.no==this.receipt_data.clientInfo.no){
          console.log(snap.val().clientInfo.customer)
          console.log(snap.val().clientInfo.no)
          console.log(this.receipt_data.clientInfo.customer);
          console.log(this.receipt_data.clientInfo.no);
          bools=true;
        }
        if(bools){
          window.alert("이미 등록된 상호, 혹은 고객번호입니다");
        }else{
          this.firemain.child("customer").child(this.receipt_data.clientInfo.customer).update(this.receipt_data.clientInfo).then(()=>{
            window.alert("신규 고객등록이 완료되었습니다.");
          }).catch((e)=>{
            console.log(e);
            window.alert(e);
          })
        }

      });

    }

    setTimeout(() => {
      // alert(this.flag6_c_remote_division);
      if(this.receipt_data.remote_division=="유"){
        $('input:radio[name="remote"]:radio[value="유"]').prop('checked', true);
      }
      else{
        $('input:radio[name="remote"]:radio[value="무"]').prop('checked', true);
      }

      if(this.receipt_data.clientInfo.customer_type=="일반"){
        $('input:radio[name="status"]:radio[value="일반"]').prop('checked', true);
      }
      else{
        $('input:radio[name="status"]:radio[value="예스파트너"]').prop('checked', true);
      }
    }, 500);
    // <input type="radio" name="remote" id="remote-yes" value="유">
    // $('input:radio[name="remote"]:input[value="유"]').attr("checked");
    localStorage.setItem('local_page','jubsu');
  }

  engineerinformationprocessing_position_find(fm, targetAgency, callback)
  {
    var engineerinformationprocessing_position = '';

    if(this.receipt_data.due_date == '')
    {
      this.receipt_data.due_time = '';

      if(targetAgency != localStorage.getItem('head_office'))
      {
        fm.orderByChild("agency").equalTo(targetAgency).once("value")
        .then((snap)=>{
          for(var i in snap.val())
          {
            if(snap.val()[i].authority == "대리점대표")
            {
              engineerinformationprocessing_position = i;
              break;
            }
          }
          callback(engineerinformationprocessing_position);
        }).catch((error)=>{
          // console.log(error);
          callback(engineerinformationprocessing_position);
        })
      }
      else
      {
        engineerinformationprocessing_position =
        "TESNUECHCAOLERIRGODLYSEENEEPITTEVTTSMHSESIAEAHRETSSTOSN";
        callback(engineerinformationprocessing_position);
      }
    }
    // else if(this.receipt_data.process_time == '')
    // {
    //   engineerinformationprocessing_position = this.engineer_data.id.split("@")[0];
    //   callback(engineerinformationprocessing_position);
    // }
    else
    {
      engineerinformationprocessing_position = this.engineer_data.id.split("@")[0];
      callback(engineerinformationprocessing_position);
      // callback('');
    }
  }

  list_sorting()
  {
    var ch = $("#flag3-condition").val();

    if(ch == 'descending')
    {
      this.as_data.all.sort((a,b)=>{
        if(a.receipt_number<b.receipt_number){return 1;}
        else if(a.receipt_number>b.receipt_number){return -1;}
        else return 0;
      })
    }
    else
    {
      this.as_data.all.sort((a,b)=>{
        if(a.receipt_number<b.receipt_number){return -1;}
        else if(a.receipt_number>b.receipt_number){return 1;}
        else return 0;
      })
    }
  }

  str_format(text, len) {
    text = String(text);
    for (var i = text.length; i < len; i++) {
      text = '0' + text;
    }
    return text;
  }

  getDaysOfMonth()
  {
    var today = new Date(this.target_date);
    this.schedule_title = this.monthNames[today.getMonth()];
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = today.getMonth() + 1;
    this.currentYear = today.getFullYear();
    this.currentHour = today.getHours();
    this.currentMinute = today.getMinutes();
    if (today.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDay();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k + 1);
    }

    ///console.log(this.daysInNextMonth)
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
        this.daysInNextMonth.push(l);
      }
    }

    this.schedule_list = [];
    this.set_schedule(this.currentYear,this.currentMonth);
    // for(var day in this.daysInThisMonth){
    //   this.schedule_list[day]=
    //   this.check_schedule(this.currentYear,this.currentMonth,day);
    // }
  }

  set_schedule(year,month)
  {
    // this.firemain.child("스케줄").child("앱에서 로그인한 사람의 아이디").once("value");
    //
    this.firemain.child('schedule').child(this.engineer_data.agency)
    .once('value').then((snap)=>{
      console.log(snap.val());
      for(var i in snap.val())
      {
        var date = snap.val()[i].date.split('-');

        if(parseInt(date[0]) == parseInt(year)
        && parseInt(date[1]) == parseInt(month))
        {
          // this.schedule_list[date[2]].push(snap.val()[i]);
          this.get_receipt_data_to_schedule(date[2], snap.val()[i]);
        }
      }
    })
  }

  get_receipt_data_to_schedule(num, data)
  {
    this.firemain.child('receipt_event').child(this.engineer_data.agency)
    .child('currentReceipt').child(data.receipt_number).once('value', (snap)=>{
      if(snap.exists() == true){
        if(!this.schedule_list[num])
          this.schedule_list[num] = [];

        this.schedule_list[num].push(snap.val());
      }
    })
  }

  click_schedule(day)
  {
    if(this.schedule_list[day])
    {
      var list = [];
      for(var i in this.schedule_list[day])
      {
        list.push(this.schedule_list[day][i])
      }
      this.go_other_page("AS스케줄", "", list);
    }
  }

  goToday() {
    var today = new Date();
    this.target_date = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    ///console.log(this.target_date.getMonth() + 1);
    this.getDaysOfMonth();
  }

  goToLastMonth() {
    this.target_date = new Date(this.target_date.getFullYear(), this.target_date.getMonth(), 0);
    ///console.log(this.target_date.getMonth() + 1);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.target_date = new Date(this.target_date.getFullYear(), this.target_date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  logout()
  {
    localStorage.setItem('auto_login','was true');
    this.navCtrl.setRoot(Login2Page)
  }

  take_photo()
  {
    let modal = this.modal.create(Cameraselect2Page,{"userid":this.engineer_data.id});
    modal.onDidDismiss(url => {
      this.show_loading('저장중');
      this.camera_asd(url,(callback)=>{
        this.engineer_data.profile_image=callback;
        this.firemain.child('engineer').child(this.engineer_data.id.split('@')[0])
        .update({profilepicture:callback}).then(()=>{
          this.dismiss_loading();
          window.alert("사진을 저장하였습니다.")
        })
      })
    })
    modal.present();
  }
  camera_asd(imagedata,callback){
    // console.log("imagedataimagedataimagedata");
    // console.log(imagedata);
    // console.log(imagedata.data);
    if(imagedata.data!=''&&imagedata.data){

      // console.log(imagedata)
      this.uploadImage(imagedata,(imageurl)=>{

        // console.log("upload done");
        // console.log(imageurl);
        callback(imageurl);

      });
    }
    else{
      this.dismiss_loading();
    }
  }
  uploadImage(imageURI,callback){
    let mypicref = firebase.storage().ref("profile");
    imageURI=  "data:image/png;base64," + imageURI.data;
    var a = mypicref.child(this.engineer_data.id);
    this.encodeImageUri(imageURI, (image64)=>{

      a.putString(image64, 'data_url')
      .then(snapshot => {
        this.dismiss_loading();
        // console.log(snapshot);
        mypicref.child(this.engineer_data.id).getDownloadURL().then((url)=>{
          // console.log("download url is : "+url);
          callback(url);
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

  click_search_result(data)
  {
    this.get_fix_list(data);
    console.log(data);
    this.currentTab = 6;
    localStorage.setItem('local_page','customer_get');

    if(data.clientInfo == null)
      this.receipt_data.clientInfo.no = data.no;
    else
      this.receipt_data.clientInfo.no = data.clientInfo.no;

    if(data.clientInfo){
      this.receipt_data.clientInfo.building_manager_name=data.clientInfo.building_manager_name;//건물담당자
      this.receipt_data.clientInfo.building_manager_call=data.clientInfo.building_manager_call	;//휴대전화
      this.receipt_data.clientInfo.customer_building=data.clientInfo.customer_building;//대표상호
      // this.receipt_data.sub_store=data.sub_store;//건물명
      this.receipt_data.clientInfo.building_call=data.clientInfo.building_call;
      this.receipt_data.clientInfo.reg_address=data.clientInfo.reg_address;
      this.receipt_data.clientInfo.customer_type=data.clientInfo.customer_type;
      this.receipt_data.clientInfo.customer=data.clientInfo.customer;
    }
    else{
      this.receipt_data.clientInfo.building_manager_name=data.building_manager_name;//건물담당자
      this.receipt_data.clientInfo.building_manager_call=data.building_manager_call	;//휴대전화
      this.receipt_data.clientInfo.customer_building=data.customer_building;//대표상호
      this.receipt_data.clientInfo.building_call=data.building_call;
      this.receipt_data.clientInfo.reg_address=data.reg_address;
      this.receipt_data.clientInfo.customer_type=data.customer_type;
      this.receipt_data.clientInfo.customer=data.customer;
    }

    this.out_unit_list = [];
    this.in_unit_list = [];
    if(data.ho_product)
    for(var i in data.ho_product.o_serial){
      this.out_unit_list.push(data.ho_product.o_serial[i]);
    }
    if(data.hi_product)
    for(var i in data.hi_product.i_serial){
      this.in_unit_list.push(data.hi_product.i_serial[i]);
    }
    console.log(this.out_unit_list);
    console.log(this.in_unit_list);

    // this.o_model="";
    // this.o_serial="";
    // this.o_time="";
    $("#out_unit_model").empty();
    $("#out_unit_serial").empty();
    $("#out_unit_time").empty();

    // this.i_model="";
    // this.i_serial="";
    // this.i_time="";
    $("#in_unit_model").empty();
    $("#in_unit_serial").empty();
    $("#in_unit_time").empty();

    setTimeout(() => {
      // console.log(this.out_unit_list);
      var o_models=[];
      for(var i in this.out_unit_list)
      {
        if(this.receipt_data.airConditionerInfo.o_serial.o_model==""){
          this.receipt_data.airConditionerInfo.o_serial.o_model=this.out_unit_list[i].o_model;
          this.receipt_data.airConditionerInfo.o_serial.o_serial=this.out_unit_list[i].o_serial;
          this.receipt_data.airConditionerInfo.o_serial.o_time=this.out_unit_list[i].o_time;
        }
        o_models.push(this.out_unit_list[i].o_model);
      }
      o_models = Array.from(new Set(o_models));
      // console.log(o_models);
      for(var i in o_models){
        var newOptionElement = document.createElement("option");
        newOptionElement.value = o_models[i];
        newOptionElement.text = o_models[i];
        document.getElementById("out_unit_model").appendChild(newOptionElement);
      }
      this.io_unit_check("out",1);

      // console.log(this.in_unit_list);
      var i_models=[];
      for(var i in this.in_unit_list){
        if(this.receipt_data.airConditionerInfo.i_serial.i_model==""){
          this.receipt_data.airConditionerInfo.i_serial.i_model=this.in_unit_list[i].i_model;
          this.receipt_data.airConditionerInfo.i_serial.i_serial=this.in_unit_list[i].i_serial;
          this.receipt_data.airConditionerInfo.i_serial.i_time=this.in_unit_list[i].i_time;
        }
        i_models.push(this.in_unit_list[i].i_model);
      }
      i_models = Array.from(new Set(i_models));
      // console.log(i_models);
      for(var i in i_models){
        var newOptionElement = document.createElement("option");
        newOptionElement.value = i_models[i];
        newOptionElement.text = i_models[i];
        document.getElementById("in_unit_model").appendChild(newOptionElement);
      }
      this.io_unit_check("in",1);
      // this.input_io_unit();
    }, 500);
  }

  open_search_page(key, text)
  {
    this.search_ch = key;
    this.search_text = text;
    this.currentTab = 7;

    setTimeout(() => {
      $("#f7_search_input").on("change keyup paste", () => {
        // console.log(this.search_text);
      })
    }, 500);

    this.look_up(text);
  }

  look_up(text)
  {
    var ch="";

    if(this.search_ch=="building_manager_name"){
      ch="building_manager_name";//건물담당자
    }
    else if(this.search_ch=="customer"){
      ch="customer";//대표상호
    }
    else if(this.search_ch=="customer_building"){
      ch="customer_building"//건물명
    }
    else if(this.search_ch=="building_manager_call"){
      ch="building_manager_call";//휴대전화
      if(text.indexOf("-")>-1){
        text=text.replaceAll("-","");
        console.log("so text is changed"+text);
      }else{
        console.log("so text is not changed"+text);
      }
    }else{
      ch="customer";//대표상호
    }
    console.log(this.search_ch);
    console.log(ch);
    console.log(text);
    console.log("lookup come");
    this.show_loading("고객 데이터 조회중");
    this.search_result_list=[];
    var flag = null;
    this.firemain.child("customer").on('child_added', (sn) => {
      flag=false;
      if(sn.exists() == true)
      {
        if(sn.val().clientInfo)
        {
          if(String(sn.val().clientInfo[ch]).indexOf(text) > -1)
          {
            console.log('clientInfo');
            console.log(sn.val());
            this.search_result_list.push(sn.val());
          }
        }
        else
        {
          if(String(sn.val()[ch]).indexOf(text) > -1)
          {
            console.log('not clientInfo');
            console.log(sn.val());
            this.search_result_list.push(sn.val());
          }
        }
      }
    })
    var interval=setInterval(()=>{
      if(flag==true){
        console.log(this.search_result_list);
        localStorage.setItem('local_page','search');
        this.dismiss_loading();
        console.log(interval);
        clearInterval(interval['_id']);
      }
      else if(flag == false){
        flag=true;
      }
    },1000)
  }

  get_fix_list(text)
  {
    this.fix_list = [];

    var customer = (text.clientInfo != undefined)? text.clientInfo.customer : text.customer;
    this.firemain.child('history').child(customer).once('value',
    (snap)=>{
      if(snap.exists()){
        for(var i in snap.val())
        {
          this.fix_list.push(snap.val()[i])
          // for(var j in snap.val()[i].currentReceipt)
          // {
          //   if(String(snap.val()[i].currentReceipt[j].building_manager_name).indexOf(text.building_manager_name)>-1){//건물담당자
          //     this.fix_list.push(snap.val()[i].currentReceipt[j])
          //   }
          //   else if(String(snap.val()[i].currentReceipt[j].customer).indexOf(text.customer)>-1){//대표상호
          //     this.fix_list.push(snap.val()[i].currentReceipt[j])
          //   }
          //   else if(String(snap.val()[i].currentReceipt[j].customer_building).indexOf(text.customer_building)>-1){//건물명
          //     this.fix_list.push(snap.val()[i].currentReceipt[j])
          //   }
          // }
        }
      }
    });

    // this.data_check('agecny', (list)=>{
    //   for(var i in list)
    //   {
    //     if(list[i].currentReceipt)
    //     {
    //       for(var j in list[i].currentReceipt)
    //       {
    //         if(String(list[i].currentReceipt[j].building_manager_name).indexOf(text.building_manager_name)>-1){//건물담당자
    //           this.fix_list.push(list[i].currentReceipt[j])
    //         }
    //         else if(String(list[i].currentReceipt[j].customer).indexOf(text.customer)>-1){//대표상호
    //           this.fix_list.push(list[i].currentReceipt[j])
    //         }
    //         else if(String(list[i].currentReceipt[j].customer_building).indexOf(text.customer_building)>-1){//건물명
    //           this.fix_list.push(list[i].currentReceipt[j])
    //         }
    //       }
    //     }
    //   }
    // })
  }

  setting_InOutAuto_data()
  {
    this.show_loading('로딩중..');

    this.data_check("product",(list)=>{
      this.product_list = [];
      this.model_list = [];
      for(let i in list) {
        this.product_list.push(list[i].product);
        this.model_list.push(list[i].model);
        this.product_list = Array.from(new Set(this.product_list));
      }
    });

    this.data_check("pc_automatic",(list)=>{
      this.pc_automatic = [];
      for(let i in list) {
        this.pc_automatic.push(list[i].auto_code);
      }
      localStorage.setItem("pc_automatic", JSON.stringify(this.pc_automatic));
    });

    this.data_check("outdoor_unit",(list)=>{
      this.outdoor_list = [];
      for(let i in list) {
        this.outdoor_list.push(list[i].outdoor_code);
      }
      localStorage.setItem("outdoor_unit", JSON.stringify(this.outdoor_list));
    });

    this.data_check("indoor_unit",(list)=>{
      this.indoor_list = [];
      for(let i in list) {
        this.indoor_list.push(list[i].indoor_code);
      }
      localStorage.setItem("indoor_unit", JSON.stringify(this.indoor_list));
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
      this.receipt_data.error_code =
      (this.error_list[0])? this.error_list[0].code : '';
      localStorage.setItem("error_code", JSON.stringify(this.error_list));
    })

    this.data_check("symptom",(list)=>{
      this.symptom_list = [];
      for(var i in list){
        this.zone.run(()=>{
          this.symptom_list.push(list[i]);
        });
      }
      // this.receipt_data.symptom_code =
      // (this.symptom_list[0])?this.symptom_list[0].symptom_code : '';

      localStorage.setItem("symptom", JSON.stringify(this.symptom_list));
    });

    setTimeout(() => {
      this.dismiss_loading();
    }, 1000);
  }

  empty_receipt_data(list)
  {
    for(var i in list){
      if(typeof list[i] == 'string'){
        list[i] = '';
      }
      else{
        list[i] = this.empty_receipt_data(list[i]);
      }
    }
    return list;
  }

  bottom_icon_switching(num)
  {
    if (num == 1) {
      this.currentTab = 1;
      localStorage.setItem('local_page','home');
      $('#switching1').css("color", "#e96a15");
      $('#switching2, #switching3, #switching4, #switching5').css("color", "#6e6e6e");
    }
    if (num == 2) {
      if(this.engineer_data.position=="수퍼관리자"){
        alert("수퍼관리자는 접수할수 없습니다.")
        return;
      }
      this.setting_InOutAuto_data();
      //0408 JPD 앱 실행후 바로 접수 들어갈경우 날짜 값 가져오지 못해서 에러나기에 추가.
      this.currentMonth = this.target_date.getMonth() + 1;
      this.currentYear = this.target_date.getFullYear();
      this.currentHour = this.target_date.getHours();
      this.currentMinute = this.target_date.getMinutes();
      this.currentSecond = this.target_date.getSeconds();
      this.currentMillisecond = this.target_date.getMilliseconds();
      if (this.target_date.getMonth() === new Date().getMonth()) {
        this.currentDate = new Date().getDate();
      } else {
        this.currentDate = 999;
      }
      this.currentTab = 2;
      localStorage.setItem('local_page','jubsu');
      $('#switching2').css("color", "#e96a15");
      $('#switching1, #switching3, #switching4, #switching5').css("color", "#6e6e6e");

      this.receipt_data = this.empty_receipt_data(this.receipt_data);

      this.fix_list = [];

      this.receipt_data.receipt_number =
      this.str_format(this.currentYear,4) + '' +
      this.str_format(this.currentMonth,2) + '' +
      this.str_format(this.currentDate,2) + '' +
      this.str_format(this.currentHour,2) + '' +
      this.str_format(this.currentMinute,2) + '' +
      this.str_format(this.currentSecond,2) + '' +
      this.str_format(this.currentMillisecond,3);
      // this.engineer_data.agency_code;
    }
    if (num == 3) {
      this.currentTab = 3;
      this.get_as_data();
      localStorage.setItem('local_page','aschuri');
      $('#switching3').css("color", "#e96a15");
      $('#switching1, #switching2, #switching4, #switching5').css("color", "#6e6e6e");
    }
    if (num == 4) {
      this.currentTab = 4;
      localStorage.setItem('local_page','schedule');
      $('#switching4').css("color", "#e96a15");
      $('#switching1, #switching2, #switching3, #switching5').css("color", "#6e6e6e");
      this.getDaysOfMonth();
    }
    if (num == 5) {
      this.get_as_data();
      this.currentTab = 5;
      localStorage.setItem('local_page','mypage');
      $('#switching5').css("color", "#e96a15");
      $('#switching1, #switching2, #switching3, #switching4').css("color", "#6e6e6e");

      // this.as_data.request.sort(function(a,b){
      //   if(a.receipt_number.substring(0,17)<b.receipt_number.substring(0,17))return 1;
      //   else if(a.receipt_number.substring(0,17)>b.receipt_number.substring(0,17))return -1;
      //   else return 0;
      // })
      // this.as_request_data;
      // this.as_complete_data
      // this.as_hold_data
    }
  }

  get_as_data()
  {
    try {
      this.show_loading('데이터 불러오는 중....')
      this.firemain.child('receipt_event').child(this.engineer_data.agency)
      .child("currentReceipt").once('value').then((snap)=>{
        console.log(snap.val());

        for(var i in this.as_data)
          this.as_data[i] = [];

        for(var i in snap.val())
          this.as_data.all.push(snap.val()[i]);

        this.as_data.all.sort((a,b)=>{
          if(a.receipt_number<b.receipt_number){return 1;}
          else if(a.receipt_number>b.receipt_number){return -1;}
          else return 0;
        })

        for(var i in this.as_data.all){
          if(this.as_data.all[i].status == '현재접수'){
            this.as_data.receipt.push(this.as_data.all[i]);
          }
          else if(this.as_data.all[i].status == '처리진행'){
            this.as_data.request.push(this.as_data.all[i]);
          }
          else if(this.as_data.all[i].status == '처리완료'){
            this.as_data.complete.push(this.as_data.all[i]);
          }
          else if(this.as_data.all[i].status == '처리대기'){
            this.as_data.waiting.push(this.as_data.all[i]);
          }
          else if(this.as_data.all[i].status == '승인보류'){
            this.as_data.hold.push(this.as_data.all[i]);
          }
        }
        console.log(this.as_data);
        this.dismiss_loading()
      })
    } catch (err) {
      console.log(err);
      alert(err);
      this.dismiss_loading();
    }
  }

  search_cancel()
  {
    this.currentTab = 6;
    localStorage.setItem('local_page', 'customer_get');
  }

  photo_view(url)
  {
    this.photoViewer.show(url);
  }

  go_detail(list)
  {
    this.navCtrl.push(Complete2Page, { "list": list, "id": this.engineer_data.id, "no": list.receipt_number , "name": this.engineer_data.name});
  }

  add_new_customer_flag_change()
  {


        // no=count;
        // this.receipt_data.clientInfo.no=no;
    // this.firemain.child('receipt_event').child('(주)삼천리ES')
    // .child('currentReceipt').once('value').then((snap)=>{

    // });

    this.add_new_customer_flag=!this.add_new_customer_flag;
    if(this.add_new_customer_flag){
      this.firemain.child("customer").once("value", (snap) => {
        console.log(snap.val());
        var count=0;
        for(var a in snap.val()){
          count++;
        }
        this.receipt_data.clientInfo.no=""+count;
      });

    }else{
      this.receipt_data.clientInfo.no="";
    }
  }

  click_customertype(value)
  {
    this.receipt_data.clientInfo.customer_type=value;
  }

  ionViewDidLoad()
  {
    window.addEventListener('keyboardWillShow', (e) => {
      $(".main-footer").hide();
    });
    window.addEventListener('keyboardWillHide', () => {
      $(".main-footer").show();
    });
  }

  ionViewWillLoad()
  {
    // this.go_viewdatapage('', '');
  }
}
