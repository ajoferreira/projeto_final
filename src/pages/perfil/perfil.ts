import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { UsersPage } from '../users/users';
import { UsuarioProvider } from '../../providers/usuario/usuario';



/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  email:String
  senha:String
  cadastro:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider:UsuarioProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  fazerlogin(cadastro){
this.usuarioProvider.buscarusers(this.email, this.senha).then(response => {
  
  console.log(response)
  this.navCtrl.push(UsersPage,{cadastro: cadastro})

}).catch(err=>{
  console.error(err)
this.presentAlert("Usuario invalido", "Verifique seu e-mail e senha")
})

    // if (this.email =='admin' && this.senha =="admin"){
    //   alert('Logado')
    // } else {
    //   alert('E-mail ou senha inválido!')
    // }
    // this.navCtrl.push(UsersPage)
  }
  
  abrirCadastro() {
    this.navCtrl.push(CadastroPage)
  }
  presentAlert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
