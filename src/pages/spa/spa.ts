import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SpaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spa',
  templateUrl: 'spa.html',
})
export class SpaPage {
  cadlugar:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.cadlugar = this.navParams.get("cadlugar") 
    console.log(this.cadlugar)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpaPage');
  }

}
