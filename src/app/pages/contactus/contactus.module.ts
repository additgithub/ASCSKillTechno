import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsPage } from './contactus.page';


const routes: Routes = [
  {
    path: '',
    component: ContactUsPage,
  }
];

@NgModule({
  imports: [
    SharedModule,FormsModule,
    RouterModule.forChild(routes)  ],
  declarations: [ContactUsPage]
})

export class ContactUsPageModule {}
