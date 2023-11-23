import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./pages/login-page/login-form.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProfilPageComponent } from "./pages/profil-page/profil-page.component";
import { TransfertPageComponent } from "./pages/transfert-page/transfert-page.component";
import { ContactPageComponent } from "./pages/contact-page/contact-page.component";

const routes : Routes = [
{path: 'login', component: LoginFormComponent},
//{path: '', component: HomePageComponent },
{path: '', redirectTo: 'login', pathMatch: 'full' },
{path: 'profil', component: ProfilPageComponent},
{path: 'transfert', component: TransfertPageComponent},
//{path: 'contact', component: ContactPageComponent}
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

