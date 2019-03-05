import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SavedCitiesComponent } from './saved-cities/saved-cities.component';
import { ProfileComponent } from './profile/profile.component';
import {MaterialModule} from '../shared/material.module';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, SavedCitiesComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    MaterialModule,
    NgxAuthFirebaseUIModule
  ]
})
export class UserModule { }
