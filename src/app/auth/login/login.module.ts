import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginPage } from './login.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  }
];

@NgModule({
  imports: [
    SharedModule,    FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
