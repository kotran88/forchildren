import { Component } from '@angular/core';
import { Platform, App, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from "firebase"

import { Home2Page } from '../pages/home2/home2';
import { Login2Page } from '../pages/login2/login2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = Login2Page;
  allowClose=false;

  firemain=firebase.database().ref();
  constructor(public toastCtrl:ToastController, platform: Platform,public app:App) {
    platform.ready().then(() => {
      // statusBar.styleDefault();
      // splashScreen.hide();
    });
    // this.set_firemain();
    localStorage.setItem('head_office', '(주)삼천리ES');
    platform.registerBackButtonAction(() => {

      let navv = app.getActiveNav();
      const overlay = this.app._appRoot._overlayPortal.getActive();
      if (navv.getActive().component.name == "HomePage") {

        var local_page=localStorage.getItem('local_page');

        console.log(navv.getActive())
        if(local_page!='home'){
          // alert(local_page);
          navv.setRoot(Home2Page,{id:localStorage.getItem('id')})
        }
        else if(!this.allowClose){
          this.allowClose = true;
          let toast = this.toastCtrl.create({
            message: "한번 더 누르면 종료됩니다.",
            duration: 2000,
            dismissOnPageChange: true
          });
          toast.onDidDismiss(() => {
            this.allowClose = false;
          });
          toast.present();
        }
        else{
          platform.exitApp();
        }

      }
      else{
        navv.pop();
      }
    });
  }

  check_data_and_update(mode, key, data)
  {
    console.log(mode,key,data);
    var list = JSON.parse(localStorage.getItem(key));
    console.log(list);
    var list2 = {};
    var flag = false;
    for(var i in list){
      console.log(JSON.stringify(list[i]) == JSON.stringify(data));
      if(JSON.stringify(list[i]) == JSON.stringify(data)){
        if(mode == 'remove')
          continue;
        else if(mode == 'add')
        {
          flag = true;
          return;
        }
      }
      list2[i] = list[i];
    }
    if(mode == 'add' && flag == false){
      list2[key] = data;
    }
    localStorage.setItem(key,JSON.stringify(list2));
  }

  // get_firemain(key)
  // {
  //   this.firemain.child(key).once('value', (snap)=>{
  //     console.log(key);
  //     console.log(snap.val());
  //     localStorage.setItem(key,JSON.stringify(snap.val()));
  //     this.firemain.child(key).on('child_added',
  //     (snap)=>{
  //       this.check_data_and_update('add', key,snap.val());
  //     })
  //     this.firemain.child(key).on('child_changed',
  //     (snap)=>{
  //       this.check_data_and_update('change', key,snap.val());
  //     })
  //     this.firemain.child(key).on('child_removed',
  //     (snap)=>{
  //       this.check_data_and_update('remove', key,snap.val());
  //     })
  //   })
  // }

  // set_firemain(){
  //   this.get_firemain('product');
  //   this.get_firemain('pc_automatic');
  //   this.get_firemain('outdoor_unit');
  //   this.get_firemain('indoor_unit');
  //   this.get_firemain('error');
  //   this.get_firemain('symptom');
  //   this.get_firemain('gongji');
  //   this.get_firemain('engineer');
  //   this.get_firemain('suspense');
  //   this.get_firemain('complete');
  //   // this.get_firemain('agency');
  // }
}

