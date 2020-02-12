import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PsicologoPage } from '../psicologo/psicologo';
import { UsuarioProvider } from '../../providers/usuario/usuario';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
cadprof:any
  constructor(public navCtrl: NavController, public usuarioProvider: UsuarioProvider) {

  }

  ionViewDidLoad(){

    this.usuarioProvider.buscarpsicologo().then((response) =>{
      console.log(response)
      this.cadprof=response
    })

  }


  vermais(cadprof){
    console.log()
    this.navCtrl.push(PsicologoPage,{cadprof: cadprof})
  }

}
