import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAdminGuard } from './guards/no-admin.guard';
import { SetupComponent } from './containers/setup/setup.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SetupComponent],
  providers: [NoAdminGuard]
})
export class SetupModule { }
