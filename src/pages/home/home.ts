import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NewsPage } from '../news/news';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  imageContainer = [
  {name: '1', url:"../../assets/imgs/1.jpg" },
  {name: '2', url:"../../assets/imgs/2.jpg" },
  {name : '3', url:"../../assets/imgs/3.jpg"} ];
  
news:any
  constructor(public navCtrl: NavController, public usuarioProvider: UsuarioProvider) {

  }


  ionViewDidLoad(){

    this.usuarioProvider.buscarNoticias().then((response) =>{
      console.log(response)
      this.news=response
    })

  }
  detalhe(news){
    console.log()
    this.navCtrl.push(NewsPage,{news: news})
  }
}

class MyPage {
  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
}


