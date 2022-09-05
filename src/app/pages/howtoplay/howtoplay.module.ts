import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { HowToPlayPage } from './howtoplay.page';


const routes: Routes = [
  {
    path: '',
    component: HowToPlayPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [HowToPlayPage]
})

export class HowToPlayPageModule {}
