import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ExpansionRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-expansion-recipe',
  templateUrl: 'expansion-recipe.html',
})
export class ExpansionRecipePage {

  recipe_image:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.recipe_image = navParams.get("recipe_image")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpansionRecipePage');
  }

}
