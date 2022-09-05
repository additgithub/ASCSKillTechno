import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingScrenPage } from './settingscren.page';

const routes: Routes = [
  {
    path: '',
    component: SettingScrenPage,
  }
];

@NgModule({
  imports: [
    SharedModule, 
       FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [SettingScrenPage]
})
export class SettingScrenPageModule {}
