import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Loading, LoadingController } from 'ionic-angular';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {
  firemain = firebase.database().ref();
  fireauth = firebase.auth();
  mypicref=firebase.storage().ref();

  lloading:Loading;
  constructor(public http: HttpClient, public loading: LoadingController) {
    console.log('Hello UtilProvider Provider');
  }

  present_loading(text)
  {
    if(this.lloading)
      this.dismiss_loading();

    this.lloading = this.loading.create({
      spinner: 'hide',
      content: text
    });
    this.lloading.present();
  }

  dismiss_loading()
  {
    if(this.lloading)
      this.lloading.dismiss();
  }

  upload_recipe(name, url)
  {
    var key = this.firemain.push().key;

    this.firemain.child("recipes").child(key)
    .update({
      "name" : name,
      "url" : url,
      "key" : key,
      "create_date" : new Date().toISOString(),
    })
  }

  // dir : storage 폴더명
  // key : storage에 올린후 해당 이미지의 이름
  // imageURI : base64이미지 데이터
  // callback : 콜백

  uploadImage(dir, key, imageURI, callback)
  {
    console.log(dir, key);
    // imageURI=  "data:image/png;base64," + imageURI;
    console.log(imageURI);

    // var key = this.date_format();

    var root = this.mypicref.child(dir).child(key)
    console.log(root);

    this.present_loading("이미지 업로드중");
    this.encodeImageUri(imageURI, (image64)=>{
      console.log(image64);
      if(imageURI != image64)
      {
        console.log(imageURI);
        console.log(image64);
      }
      else
      {
        console.log(true);
      }
      root.putString(image64, 'data_url')
      .then(snapshot => {
        console.log(snapshot);
        this.mypicref.child(dir).child(key).getDownloadURL().then((url)=>{

          console.log("download url is : "+url);
          this.dismiss_loading();
          callback(url);

        }).catch((e)=>{
          console.log('eeeee');
          console.log(e);
          this.dismiss_loading();
          callback(null);
        })
      }).catch((e)=>{
        console.log("error is....")
        window.alert(e);
        console.log(e);
        this.dismiss_loading();
        callback(null);
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
}
