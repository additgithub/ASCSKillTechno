import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { HelpCenterPage } from './helpcenter.page';


const routes: Routes = [
  {
    path: '',
    component: HelpCenterPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [HelpCenterPage]
})

export class HelpCenterPageModule {}
