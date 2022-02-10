import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FaqsPage } from './faqs.page';


const routes: Routes = [
  {
    path: '',
    component: FaqsPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [FaqsPage]
})

export class FaqsPageModule {}
