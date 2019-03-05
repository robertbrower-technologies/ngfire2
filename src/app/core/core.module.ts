import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ToolbarComponent } from '../ui/toolbar/toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import { FirebaseModule } from './firebase.module';
import {NgbootstrapModule} from '../shared/ngbootstrap.module';
import {WelcomeComponent} from '../welcome/welcome.component';

@NgModule({
  declarations: [ToolbarComponent, WelcomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    FirebaseModule,
    NgbootstrapModule
  ],
  exports: [ToolbarComponent, WelcomeComponent]
})
export class CoreModule { }
