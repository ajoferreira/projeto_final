import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { HomePage } from '../home/home';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  email: string
  senha:string
  nome:string
  dtNascimento: string
  endereco: string
  telefone: string
  cpf: string

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider: UsuarioProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrarUsuario(){

    console.log(this.nome,this.email,this.senha,this.endereco,this.telefone,this.cpf);

    this.usuarioProvider.cadastrarUsuario(this.nome,this.email,this.senha,this.endereco,this.telefone,this.cpf).then(
      resp => {
        console.log(resp);
      }
    ).catch(error => {
      console.error(error)
    })


  // this.navCtrl.setRoot(HomePage)
  // this.usuarioProvider.cadastrarUsuario(this.nome,this.email,this.senha,this.endereco,this.telefone,this.cpf).then(resp=>{
  //   console.log(resp)
  // })
  }

  jaPossuoConta() {
    this.navCtrl.push(PerfilPage)
  }
}
