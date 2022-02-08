import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { BrochurePage } from './brochure.page';


const routes: Routes = [
  {
    path: '',
    component: BrochurePage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [BrochurePage]
})

export class BrochurePageModule {}
