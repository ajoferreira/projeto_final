import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { SpaPage } from '../spa/spa';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  cadlugar: any;

  constructor(public navCtrl: NavController, public usuarioProvider: UsuarioProvider) {

  }

  ionViewDidLoad(){

    this.usuarioProvider.buscarlocal().then((response) =>{
      console.log(response)
      this.cadlugar=response
    })

  }


  vermais(cadlugar){
    console.log()
    this.navCtrl.push(SpaPage,{cadlugar: cadlugar})
  }

}
