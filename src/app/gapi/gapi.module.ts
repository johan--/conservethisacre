import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GapiService } from './services/gapi.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [GapiService],
  declarations: []
})
export class GapiModule { }
