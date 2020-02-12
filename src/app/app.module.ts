import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PerfilPage } from '../pages/perfil/perfil';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '@angular/common/http';
import { NewsPage } from '../pages/news/news';
import { SpaPage } from '../pages/spa/spa';
import { PsicologoPage } from '../pages/psicologo/psicologo';
import { CalendarModule } from '../components/calendar/calendar.module';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { UsersPage } from '../pages/users/users';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PerfilPage,
    TabsPage,
    NewsPage,
    SpaPage,
    PsicologoPage,
    CadastroPage,
    UsersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    PerfilPage,
    TabsPage,
    NewsPage,
    SpaPage,
    PsicologoPage,
    CadastroPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
  ]
})
export class AppModule {}
