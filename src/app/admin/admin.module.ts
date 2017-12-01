import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LayoutComponent]
})
export class AdminModule { }
