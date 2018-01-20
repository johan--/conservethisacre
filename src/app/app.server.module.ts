import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
