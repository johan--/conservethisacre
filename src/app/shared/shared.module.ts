import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPipe } from './pipes/area.pipe';
import { AreaComponent } from './components/area/area.component';
import { CardChargeComponent } from './components/card-charge/card-charge.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AreaPipe, AreaComponent, CardChargeComponent],
  exports: [AreaPipe, AreaComponent, CardChargeComponent]
})
export class SharedModule {

}
