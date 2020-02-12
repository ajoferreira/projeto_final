import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
cadastro:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.cadastro = this.navParams.get("cadastro") 
    console.log(this.cadastro)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

}
