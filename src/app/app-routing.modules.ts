import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./page/login-page/login-form.component";
import { LandingPageComponent } from "./page/landing-page/landing-page.component";
import { ProfilPageComponent } from "./page/profil-page/profil-page.component";
import { TransfertPageComponent } from "./page/transfert-page/transfert-page.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";

const routes : Routes = [
{path: 'login', component: LoginFormComponent},
{path: '', component: LandingPageComponent},
{path: 'profil', component: ProfilPageComponent},
{path: 'transfert', component: TransfertPageComponent},
{path: 'contact', component: ContactPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule{

}
