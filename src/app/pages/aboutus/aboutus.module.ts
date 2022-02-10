import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsPage } from './aboutus.page';


const routes: Routes = [
  {
    path: '',
    component: AboutUsPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [AboutUsPage]
})

export class AboutUsPageModule {}
