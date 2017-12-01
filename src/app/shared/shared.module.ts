import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPipe } from './pipes/area.pipe';
import { AreaComponent } from './components/area/area.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AreaPipe, AreaComponent],
  exports: [AreaPipe, AreaComponent]
})
export class SharedModule {

}
