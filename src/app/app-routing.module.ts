import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'weather'},
  {path: '', pathMatch: 'full', component: WelcomeComponent},
  { path: 'weather', loadChildren: './weather/weather.module#WeatherModule'},
  { path: 'user', loadChildren: './user/user.module#UserModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
