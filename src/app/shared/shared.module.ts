import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaPipe } from './pipes/area.pipe';
import { AreaComponent } from './components/area/area.component';
import { CardChargeComponent } from './components/card-charge/card-charge.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploaderComponent } from './components/uploader/uploader.component';
import { PanoramaPreviewComponent } from './components/panorama-preview/panorama-preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AreaPipe, AreaComponent, CardChargeComponent, UploaderComponent, PanoramaPreviewComponent],
  exports: [AreaPipe, AreaComponent, CardChargeComponent, UploaderComponent, PanoramaPreviewComponent]
})
export class SharedModule {

}
