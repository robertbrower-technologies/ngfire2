import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3CdQ5r6yK4pvRD8ZakBAzzJUaXD8YB-M'
    })
  ],
  exports: [
    FormsModule,
    AgmCoreModule
  ]
})
export class SharedModule { }
