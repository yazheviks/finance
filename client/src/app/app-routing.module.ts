import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegistrationComponent} from "./components/auth/registration/registration.component";
import {MainComponent} from "./components/site-layout/main/main.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthComponent} from "./components/auth/auth.component";
import {SiteLayoutComponent} from "./components/site-layout/site-layout.component";

const routes: Routes = [
  { path: '', component: AuthComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  { path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'main', component: MainComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
