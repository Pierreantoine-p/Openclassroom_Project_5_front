import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './pages/login-page/login-form.component';
import { AppRoutingModule } from './app-routing.modules';
import { HeaderComponent } from './components/header/header.component';
import { ProfilPageComponent } from './pages/profil-page/profil-page.component';
import { TransfertPageComponent } from './pages/transfert-page/transfert-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AuthGardComponent } from './components/auth-gard/auth-gard.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HeaderComponent,
    ProfilPageComponent,
    TransfertPageComponent,
    ContactPageComponent,
    HomePageComponent,
    ProfilComponent,
    TransactionComponent,
    LoginComponent,
    HomeComponent,
    LogOutComponent,
    AuthGardComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
