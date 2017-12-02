import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ApiService } from './services/api.service';
import { ForestService } from './services/forest.service';
import { HttpClientModule } from '@angular/common/http';
import { ParcelService } from './services/parcel.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { PlatformService } from './services/platform.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiService, ForestService, ParcelService, ScriptLoaderService, PlatformService],
  declarations: [NotFoundComponent]
})
export class CoreModule { }
