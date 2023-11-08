import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './page/login-page/login-form.component';
import { AppRoutingModule } from './app-routing.modules';
import { HeaderComponent } from './header/header.component';
import { ProfilPageComponent } from './page/profil-page/profil-page.component';
import { TransfertPageComponent } from './page/transfert-page/transfert-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { ProfilComponent } from './profil/profil.component';
import { TransfertComponent } from './transfert/transfert.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderComponent,
    ProfilPageComponent,
    TransfertPageComponent,
    ContactPageComponent,
    LandingPageComponent,
    ProfilComponent,
    TransfertComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
