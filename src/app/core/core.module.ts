import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ApiService } from './services/api.service';
import { ForestService } from './services/forest.service';
import { HttpClientModule } from '@angular/common/http';
import { ParcelService } from './services/parcel.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { PlatformService } from './services/platform.service';
import { ImageUploaderService } from './services/image-uploader.service';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { StripeService } from './services/stripe.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [ApiService, ForestService, ParcelService, ScriptLoaderService, PlatformService, ImageUploaderService, StripeService],
  declarations: [NotFoundComponent, LayoutComponent],
  exports: [LayoutComponent]
})
export class CoreModule {
}
